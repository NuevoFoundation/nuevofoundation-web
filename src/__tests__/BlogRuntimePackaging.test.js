/** @jest-environment node */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { randomBytes } = require('node:crypto');
const { once } = require('node:events');
const { spawn, spawnSync } = require('node:child_process');
const {
  STAGING_SITE_URL, packageRuntime, enableStagingRuntime, enableProductionRuntime,
} = require('../../server/package-runtime');
const { DEFAULT_SITE_URL, FALLBACK_IMAGE } = require('../../server/app');

describe('Environment-specific blog runtime packaging', () => {
  let buildDir;
  const readConfig = () => JSON.parse(fs.readFileSync(path.join(buildDir, 'runtime', 'config.json'), 'utf8'));
  const readWebConfig = () => fs.readFileSync(path.join(buildDir, 'web.config'), 'utf8');
  const staticWebConfig = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'web.config'), 'utf8');

  beforeEach(() => {
    buildDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nf-blog-runtime-'));
    fs.writeFileSync(path.join(buildDir, 'index.html'), '<html><head></head><body></body></html>');
    const image = path.join(buildDir, FALLBACK_IMAGE);
    fs.mkdirSync(path.dirname(image), { recursive: true });
    fs.copyFileSync(path.join(__dirname, '..', '..', 'public', FALLBACK_IMAGE), image);
  });

  afterEach(() => {
    fs.rmSync(buildDir, { recursive: true, force: true });
  });

  it('packages a self-contained staging runtime but leaves normal hosting static', () => {
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    expect(readConfig().siteUrl).toBe(STAGING_SITE_URL);
    expect(readWebConfig()).toBe(staticWebConfig);
    expect(fs.readFileSync(path.join(buildDir, '.node-version'), 'utf8').trim()).toBe('22');
    for (const filename of ['app.js', 'index.js', 'iisnode-entry.js', 'check-node.js', 'node_modules/he/he.js', 'node_modules/he/LICENSE-MIT.txt']) {
      expect(fs.existsSync(path.join(buildDir, 'runtime', filename))).toBe(true);
    }
  });

  it('selects the IIS handler only when explicitly enabled for a staging artifact', () => {
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    enableStagingRuntime(buildDir);
    expect(readWebConfig()).toContain('modules="iisnode"');
    expect(readWebConfig()).toContain('path="runtime/iisnode-entry.js"');
    expect(readWebConfig()).toContain('url="runtime/iisnode-entry.js"');
    expect(readWebConfig()).toContain('name="Preserve API routes"');
    expect(readConfig().siteUrl).toBe(STAGING_SITE_URL);
  });

  it('runs the packaged Node guard without access to repository configuration', () => {
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    const result = spawnSync(process.execPath, [path.join(buildDir, 'runtime', 'check-node.js')], {
      cwd: os.tmpdir(), encoding: 'utf8',
    });
    expect(result.status).toBe(0);
    expect(result.stderr).toBe('');
  });

  it('listens on the IIS pipe when an interceptor requires the packaged entry point', async () => {
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    const pipe = `\\\\.\\pipe\\nf-${randomBytes(8).toString('hex')}`;
    const entry = path.join(buildDir, 'runtime', 'iisnode-entry.js');
    const child = spawn(process.execPath, ['-e', `require(${JSON.stringify(entry)})`], {
      cwd: buildDir,
      env: { ...process.env, PORT: pipe, NODE_ENV: 'production', NF_SITE_URL: STAGING_SITE_URL },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', chunk => { stderr += chunk; });
    try {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`No IIS listener: ${stderr}`)), 5000);
        child.once('error', error => { clearTimeout(timer); reject(error); });
        child.once('exit', code => {
          clearTimeout(timer);
          reject(new Error(`Exited before listening (${code}): ${stderr}`));
        });
        child.stdout.on('data', chunk => {
          if (chunk.toString().includes('listening on the IIS named pipe')) {
            clearTimeout(timer);
            resolve();
          }
        });
      });
      const status = await new Promise((resolve, reject) => {
        const request = http.get({
          socketPath: process.platform === 'win32' ? pipe : path.join(buildDir, pipe),
          path: '/', timeout: 5000,
        }, response => {
          response.resume();
          response.on('end', () => resolve(response.statusCode));
        });
        request.on('error', reject);
        request.on('timeout', () => request.destroy(new Error('IIS pipe request timed out.')));
      });
      expect(status).toBe(200);
    } finally {
      if (child.pid && child.exitCode === null && child.signalCode === null) {
        const exited = once(child, 'exit');
        child.kill();
        await exited;
      }
    }
  }, 15000);

  it('refuses production artifacts without changing their hosting configuration', () => {
    packageRuntime({ buildDir, siteUrl: DEFAULT_SITE_URL });
    expect(() => enableStagingRuntime(buildDir)).toThrow('non-staging artifact');
    expect(readWebConfig()).toBe(staticWebConfig);
    expect(readConfig().siteUrl).toBe(DEFAULT_SITE_URL);
  });

  it('selects production metadata only for an explicitly enabled production artifact', () => {
    packageRuntime({ buildDir, siteUrl: DEFAULT_SITE_URL });
    enableProductionRuntime(buildDir);
    expect(readWebConfig()).toContain('modules="iisnode"');
    expect(readConfig().siteUrl).toBe(DEFAULT_SITE_URL);
  });

  it.each([STAGING_SITE_URL, 'https://other.example'])('refuses production activation for origin %s', siteUrl => {
    packageRuntime({ buildDir, siteUrl });
    expect(() => enableProductionRuntime(buildDir)).toThrow('non-production artifact');
    expect(readWebConfig()).toBe(staticWebConfig);
  });

  it('does not carry a production handler into the next normal staging build', () => {
    packageRuntime({ buildDir, siteUrl: DEFAULT_SITE_URL });
    enableProductionRuntime(buildDir);
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    expect(readWebConfig()).toBe(staticWebConfig);
    expect(readConfig().siteUrl).toBe(STAGING_SITE_URL);
  });

  it('resets the selected staging handler before the same directory becomes a production artifact', () => {
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    enableStagingRuntime(buildDir);
    expect(readWebConfig()).toContain('modules="iisnode"');
    packageRuntime({ buildDir, siteUrl: DEFAULT_SITE_URL });
    expect(readWebConfig()).toBe(staticWebConfig);
    expect(readWebConfig()).not.toContain('modules="iisnode"');
    expect(readConfig().siteUrl).toBe(DEFAULT_SITE_URL);
  });

  it('requires a packaged build and rejects malformed configuration', () => {
    expect(() => enableStagingRuntime(buildDir)).toThrow('build:staging');
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    fs.writeFileSync(path.join(buildDir, 'runtime', 'config.json'), '{broken');
    expect(() => enableStagingRuntime(buildDir)).toThrow();
    expect(readWebConfig()).toBe(staticWebConfig);
  });

  it('rejects a local-only canonical URL when packaging deployable artifacts', () => {
    expect(() => packageRuntime({ buildDir, siteUrl: 'http://127.0.0.1:3001' })).toThrow('HTTPS site origin');
  });
});
