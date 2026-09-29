/** @jest-environment node */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const {
  STAGING_SITE_URL, packageRuntime, enableStagingRuntime,
} = require('../../server/package-runtime');
const { DEFAULT_SITE_URL, FALLBACK_IMAGE } = require('../../server/app');

describe('Staging-only blog runtime packaging', () => {
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
    for (const filename of ['app.js', 'index.js', 'check-node.js', 'node_modules/he/he.js', 'node_modules/he/LICENSE-MIT.txt']) {
      expect(fs.existsSync(path.join(buildDir, 'runtime', filename))).toBe(true);
    }
  });

  it('selects the IIS handler only when explicitly enabled for a staging artifact', () => {
    packageRuntime({ buildDir, siteUrl: STAGING_SITE_URL });
    enableStagingRuntime(buildDir);
    expect(readWebConfig()).toContain('modules="iisnode"');
    expect(readWebConfig()).toContain('url="runtime/index.js"');
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

  it('refuses production artifacts without changing their hosting configuration', () => {
    packageRuntime({ buildDir, siteUrl: DEFAULT_SITE_URL });
    expect(() => enableStagingRuntime(buildDir)).toThrow('non-staging artifact');
    expect(readWebConfig()).toBe(staticWebConfig);
    expect(readConfig().siteUrl).toBe(DEFAULT_SITE_URL);
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
