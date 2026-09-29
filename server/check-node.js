'use strict';

// Keep this preflight compatible with old Node so a stale host gets a clear error.
const fs = require('fs');
const path = require('path');
const requiredMajor = fs.readFileSync(path.join(__dirname, '..', '.node-version'), 'utf8').trim();
if (!/^\d+$/.test(requiredMajor)) throw new Error('.node-version must contain a Node.js major version.');

function assertNodeVersion(version = process.versions.node) {
  const match = /^(\d+)\.\d+\.\d+$/.exec(version);
  if (!match || match[1] !== requiredMajor) {
    throw new Error(`Node.js ${requiredMajor}.x is required; found ${version}. Select the version in .node-version before running this project.`);
  }
}

if (require.main === module) {
  try {
    assertNodeVersion();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { assertNodeVersion, requiredMajor };
