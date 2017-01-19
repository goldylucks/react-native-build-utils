#! /usr/bin/env node
const utils = require('./utils')
const configGradle = require('./configGradle')

module.exports = function ({ isProd }) {
  configGradle({ isProd })
  .then(() => {
    utils.execP(`cd ${utils.getRootPath()}/android && ./gradlew assembleRelease && cd ..`)
  })
  .then(() => {
    if (isProd) {
      return utils.execP('react-native run-android --configuration=release')
    }
    return utils.execP('react-native run-android')
  })
  .then(() => {
    return isProd && utils.promptUserBool('config gradle back to DEV?', { defaultAnswer: true })
  })
  .then(res => res && configGradle())
}
