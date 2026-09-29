'use strict';

require('./check-node').assertNodeVersion();

const fs = require('node:fs');
const path = require('node:path');
const { canonicalOrigin, wordpressEndpoint, FALLBACK_IMAGE, DEFAULT_SITE_URL } = require('./app');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const STAGING_SITE_URL = 'https://nuevofoundation-web-staging.azurewebsites.net';

function enableRuntime(buildDir, expectedSiteUrl, environment) {
  const runtime = path.join(buildDir, 'runtime');
  const candidate = path.join(runtime, 'iisnode.web.config');
  const configFile = path.join(runtime, 'config.json');
  if (!fs.existsSync(candidate) || !fs.existsSync(configFile)) {
    throw new Error(`Run npm run build:${environment} before selecting the ${environment} IIS configuration.`);
  }
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  if (canonicalOrigin(config.siteUrl, true) !== expectedSiteUrl) {
    throw new Error(`Refusing to enable the ${environment} runtime on a non-${environment} artifact. Run npm run build:${environment} first.`);
  }
  fs.copyFileSync(candidate, path.join(buildDir, 'web.config'));
}

function enableStagingRuntime(buildDir = build) {
  enableRuntime(buildDir, STAGING_SITE_URL, 'staging');
}

function enableProductionRuntime(buildDir = build) {
  enableRuntime(buildDir, DEFAULT_SITE_URL, 'production');
}

function packageRuntime({
  buildDir = build,
  siteUrl = process.env.NF_SITE_URL,
  endpoint = process.env.NF_WORDPRESS_ENDPOINT || process.env.REACT_APP_WORDPRESS_ENDPOINT,
} = {}) {
  if (!fs.existsSync(path.join(buildDir, 'index.html')) || !fs.existsSync(path.join(buildDir, FALLBACK_IMAGE))) {
    throw new Error('The CRA build and packaged NF fallback image must exist before packaging the runtime.');
  }
  siteUrl = canonicalOrigin(siteUrl, true);
  endpoint = wordpressEndpoint(endpoint);
  const runtime = path.join(buildDir, 'runtime');
  fs.mkdirSync(path.join(runtime, 'node_modules', 'he'), { recursive: true });
  fs.copyFileSync(path.join(root, '.node-version'), path.join(buildDir, '.node-version'));
  for (const filename of ['app.js', 'index.js', 'iisnode-entry.js', 'check-node.js', 'iisnode.web.config']) {
    fs.copyFileSync(path.join(__dirname, filename), path.join(runtime, filename));
  }
  const decoder = path.dirname(require.resolve('he/package.json'));
  for (const filename of ['he.js', 'package.json', 'LICENSE-MIT.txt']) {
    fs.copyFileSync(path.join(decoder, filename), path.join(runtime, 'node_modules', 'he', filename));
  }
  fs.writeFileSync(path.join(runtime, 'config.json'), `${JSON.stringify({ siteUrl, wordpressEndpoint: endpoint }, null, 2)}\n`);
  // Each environment must explicitly select its runtime after its own build.
  fs.copyFileSync(path.join(root, 'public', 'web.config'), path.join(buildDir, 'web.config'));
  return siteUrl;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    const siteUrl = packageRuntime();
    console.log(`Packaged self-contained blog runtime (${siteUrl}); IIS remains static until explicitly enabled.`);
  } else if (args.length === 1 && args[0] === '--enable-staging') {
    enableStagingRuntime();
    console.log('Local staging artifact opts into iisnode. No deployment or Azure changes were made.');
  } else if (args.length === 1 && args[0] === '--enable-production') {
    enableProductionRuntime();
    console.log('Local production artifact opts into iisnode. Deployment still requires the approved production release.');
  } else {
    throw new Error('Usage: node server/package-runtime.js [--enable-staging | --enable-production]');
  }
}

module.exports = { STAGING_SITE_URL, packageRuntime, enableStagingRuntime, enableProductionRuntime };
