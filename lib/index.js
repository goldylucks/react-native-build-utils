#! /usr/bin/env node
const { execSync } = require('child_process')
const apk = require('./apk')
const installOnDevice = require('./installOnDevice')
const configGradle = require('./configGradle')
const setupGradle = require('./setupGradle')
const isProd = (process.argv.indexOf('-p') > -1) || (process.argv.indexOf('--prod') > -1)

let action

if (process.argv.indexOf('icons') > -1) {
  execSync(`${__dirname}/icons.sh`, { stdio: [0, 1, 2] })
  process.exit(0)
}

if (process.argv.indexOf('apk') > -1) action = apk
if (process.argv.indexOf('installOnDevice') > -1) action = installOnDevice
if (process.argv.indexOf('configGradle') > -1) action = configGradle
if (process.argv.indexOf('setupGradle') > -1) action = setupGradle

if (!action) {
  console.error('no supported action detected, pass one of the following:')
  console.error('apk, installOnDevice, configGradle, setupGradle, icons')
  process.exit(1)
}

action({ isProd })
