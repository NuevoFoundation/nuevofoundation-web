'use strict';

require('./check-node').assertNodeVersion();

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { createHandler, canonicalOrigin, wordpressEndpoint } = require('./app');

function listenTarget(value = '3001') {
  if (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 65535) return Number(value);
  // iisnode provides a Windows named pipe, not a numeric TCP port.
  if (/^\\\\\.\\pipe\\[^<>:"|?*\u0000-\u001f]+$/.test(value)) return value;
  throw new Error('PORT must be a TCP port from 1 to 65535 or an IIS Windows named pipe.');
}

function start() {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
  const siteUrl = canonicalOrigin(process.env.NF_SITE_URL || config.siteUrl, process.env.NODE_ENV === 'production');
  const endpoint = wordpressEndpoint(process.env.NF_WORDPRESS_ENDPOINT || config.wordpressEndpoint);
  const target = listenTarget(process.env.PORT);
  const handler = createHandler({ buildDir: path.resolve(__dirname, '..'), siteUrl, endpoint });
  const server = http.createServer(handler);
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.on('error', error => {
    console.error('Unable to start the blog preview server:', error.message);
    process.exitCode = 1;
  });
  const ready = () => console.log(`Blog metadata server listening on ${typeof target === 'number' ? `http://127.0.0.1:${target}` : 'the IIS named pipe'}; canonical origin ${siteUrl}`);
  if (typeof target === 'string') server.listen(target, ready);
  else server.listen(target, '127.0.0.1', ready);
  return server;
}

if (require.main === module) {
  try {
    start();
  } catch (error) {
    console.error('Unable to start the blog preview server:', error.message);
    process.exitCode = 1;
  }
}

module.exports = { listenTarget, start };
