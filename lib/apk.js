#! /usr/bin/env node
const utils = require('./utils')
const configureGradle = require('./configGradle')

module.exports = function () {
  return configureGradle({ isProd: true })
    .then(apk)
    .then(promptCopyApkToRoot)
    .then(res => res && copyApkToRoot())
    .then(promptConfigBackForDev)
    .then(res => res && configBackForDev())
    .catch(console.error)
}

function apk () {
  return utils.execP(`cd ${utils.getRootPath()}/android && ./gradlew assembleRelease && cd .. && echo "apk generated"`)
}

function promptCopyApkToRoot () {
  return utils.promptUserBool('copy to project root?', { defaultAnswer: true })
}

function copyApkToRoot () {
  const { name, version } = utils.getPackageJson()
  const dest = `${utils.getRootPath()}/${name}-release-${version}.apk`
  return utils.execP(`cp ${utils.getRootPath()}/android/app/build/outputs/apk/app-release.apk ${dest}`)
    .then(() => {
      return utils.execP(`echo "apk copied to ${dest}"`)
    })
}

function promptConfigBackForDev () {
  return utils.promptUserBool('config gradle back to DEV?', { defaultAnswer: true })
}

function configBackForDev () {
  return configureGradle()
}
