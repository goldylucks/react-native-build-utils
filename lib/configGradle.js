#! /usr/bin/env node

/* eslint no-useless-escape: 0 */

const fs = require('fs')
const replace = require('replace')
const path = require('path')
const utils = require('./utils')
let _isProd

module.exports = function ({ isProd } = {}) {
  _isProd = isProd
  return getConfig()
    .then(JSON.parse)
    .then(config)
    .then(outputSuccess)
    .catch(console.error)
}

function getConfig () {
  const pathToFile = path.resolve(utils.getRootPath(), '.gradleConfig')
  return new Promise((resolve, reject) => {
    fs.readFile(pathToFile, 'utf-8', (err, configJson) => {
      if (err) {
        reject('error reading .gradleConfig file:\n' + err + '\n\nThis usually happens because u didn\'t run `npm run configGradleSetup` first')
        return
      }
      resolve(configJson)
    })
  })
}

function config ({ appDirName, appPackageName, appDisplayName, iconName }) {
  const appDevPackageName = appPackageName + 'Dev'
  const appDisplayNameDev = appDisplayName + ' \(DEV\)'
  const appDisplayNameDevRegex = new RegExp(appDisplayName + ' \\(DEV\\)')
  // App name
  replace({
    paths: [path.join(utils.getRootPath(), 'android/app/src/main/res/values/strings.xml')],
    regex: !_isProd ? `>${appDisplayName}<` : appDisplayNameDevRegex, // weird syntax due to bug in replace package
    replacement: !_isProd ? `>${appDisplayNameDev}<` : appDisplayName, // weird syntax due to bug in replace package
  })

  // Package name single quotes
  replace({
    paths: [path.join(utils.getRootPath(), 'android/app/BUCK')],
    regex: !_isProd ? '\'' + appPackageName + '\'' : '\'' + appDevPackageName + '\'',
    replacement: !_isProd ? '\'' + appDevPackageName + '\'' : '\'' + appPackageName + '\'',
  })

  // Package name double quotes
  replace({
    paths: [
      path.join(utils.getRootPath(), 'android/app/build.gradle'),
      path.join(utils.getRootPath(), 'android/app/src/main/AndroidManifest.xml'),
    ],
    regex: !_isProd ? '"' + appPackageName + '"' : '"' + appDevPackageName + '"',
    replacement: !_isProd ? '"' + appDevPackageName + '"' : '"' + appPackageName + '"',
  })

  // icon name
  replace({
    paths: [
      path.join(utils.getRootPath(), 'android/app/src/main/AndroidManifest.xml'),
    ],
    regex: !_isProd ? `${iconName}"` : `${iconName}_dev"`,
    replacement: _isProd ? `${iconName}"` : `${iconName}_dev"`,
  })

  // Package name no quotes
  replace({
    paths: [
      path.join(utils.getRootPath(), 'android/app/src/main/java/com/' + appDirName + '/MainApplication.java'),
      path.join(utils.getRootPath(), 'android/app/src/main/java/com/' + appDirName + '/MainActivity.java'),
    ],
    regex: !_isProd ? appPackageName + ';' : appDevPackageName + ';',
    replacement: !_isProd ? appDevPackageName + ';' : appPackageName + ';',
  })
}

function outputSuccess () {
  const mode = !_isProd ? 'DEV' : 'PRODUCTION'
  console.log('\ngradelw configured for ' + mode)
}
