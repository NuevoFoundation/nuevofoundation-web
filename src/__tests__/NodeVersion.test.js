/** @jest-environment node */

const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { assertNodeVersion, requiredMajor } = require('../../server/check-node');
const manifest = require('../../package.json');

describe('Project Node version policy', () => {
  it('keeps the install requirement and Node types aligned with the version-manager pin', () => {
    expect(manifest.engines.node).toBe(`${requiredMajor}.x`);
    expect(manifest.devDependencies['@types/node']).toMatch(new RegExp(`^\\^${requiredMajor}\\.`));
  });

  it('accepts stable patch releases within the selected major version', () => {
    expect(() => assertNodeVersion(`${requiredMajor}.0.0`)).not.toThrow();
    expect(() => assertNodeVersion(`${requiredMajor}.23.2`)).not.toThrow();
  });

  it.each(['6.9.1', '20.20.2', '24.19.0', '22.0.0-rc.1', ''])
  ('rejects unsupported or prerelease version %p', version => {
    expect(() => assertNodeVersion(version)).toThrow(`Node.js ${requiredMajor}.x is required`);
  });

  it('rejects a stale host before importing the modern server or attempting to listen', () => {
    const result = spawnSync(process.execPath, ['-e',
      "Object.defineProperty(process.versions, 'node', { value: '6.9.1' }); require('./server/index');",
    ], { cwd: path.resolve(__dirname, '..', '..'), encoding: 'utf8' });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`Node.js ${requiredMajor}.x is required; found 6.9.1`);
    expect(result.stderr).not.toContain('Cannot find module');
  });
});
