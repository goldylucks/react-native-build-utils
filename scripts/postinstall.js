const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const utils = require('../lib/utils')
const packageJsonPath = path.resolve(utils.getRootPath(), 'package.json')

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts.buildUtils = 'buildUtils'
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8')
  console.log('react-native-build-utils:', '\n', 'added scripts to package.json:', '\n', 'buildUtils')
}

if (!fs.existsSync(path.resolve(utils.getRootPath(), '.gradleConfig'))) {
  require('../lib/setupGradle')()
}

if (!fs.existsSync(path.resolve(utils.getRootPath(), 'android/app/src/main/res/mipmap-mdpi/ic_launcher_dev.png'))) {
  execSync(`${__dirname}/../lib/icons.sh`, { stdio: [0, 1, 2] })
}
