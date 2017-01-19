#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const utils = require('./utils')

module.exports = function () {
  return Promise.all([getAppDirName(), getAppDisplayName(), getAppPackageName(), getIconName()])
    // tranform array to object for convenience
    .then(([appDirName, appDisplayName, appPackageName, iconName]) => {
      return { appDirName, appDisplayName, appPackageName, iconName }
    })
    .then(writeConfigFile)
    .then(outputSuccess)
    .catch(console.error)

  // configured initially by react-native init {project name}
  function getAppDirName () {
    const pathToDir = path.resolve(utils.getRootPath(), 'android', 'app', 'src', 'main', 'java', 'com')
    return new Promise((resolve, reject) => {
      fs.readdir(pathToDir, function getAppDirNameCb (err, [appDirName]) {
        if (err) {
          reject('error getting appDirName:\n' + err)
          return
        }
        resolve(appDirName.trim())
      })
    })
  }
}

function getAppDisplayName () {
  return new Promise((resolve, reject) => {
    const pathToFile = path.resolve(utils.getRootPath(), 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml')
    fs.readFile(pathToFile, 'utf-8', function getAppDisplayNameCb (err, stringsFileContent) {
      if (err) {
        reject('error getting stringsFileContent:\n' + err)
        return
      }
      resolve(stringsFileContent.match('app_name">(.*)<')[1])
    })
  })
}

function getAppPackageName () {
  const pathToFile = path.resolve(utils.getRootPath(), 'android', 'app', 'src', 'main', 'AndroidManifest.xml')
  return new Promise((resolve, reject) => {
    fs.readFile(pathToFile, 'utf-8', function getAppPackageNameCb (err, manifestFileContent) {
      if (err) {
        reject('error getting manifestFileContent:\n' + err)
        return
      }
      resolve(manifestFileContent.match('package="(.*)"')[1])
    })
  })
}

function getIconName () {
  const pathToFile = path.resolve(utils.getRootPath(), 'android', 'app', 'src', 'main', 'AndroidManifest.xml')
  return new Promise((resolve, reject) => {
    fs.readFile(pathToFile, 'utf-8', function getIconNameCb (err, manifestFileContent) {
      if (err) {
        reject('error getting manifestFileContent:\n' + err)
        return
      }
      resolve(manifestFileContent.match('icon="@mipmap/(.*)"')[1])
    })
  })
}

function writeConfigFile ({ appDirName, appDisplayName, appPackageName, iconName }) {
  const json = JSON.stringify({ appDirName, appDisplayName, appPackageName, iconName }, null, 2)
  const pathToFile = path.resolve(utils.getRootPath(), '.gradleConfig')
  return new Promise((resolve, reject) => {
    fs.writeFile(pathToFile, json, function writeConfigFileCb (err, result) {
      if (err) {
        reject('error writing gradleConfig file:\n' + err)
        return
      }
      resolve()
    })
  })
}

function outputSuccess () {
  console.log(`written gradle configs to file: ${utils.getRootPath()}/.gradleConfig`)
}
