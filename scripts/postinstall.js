const fs = require('fs')
const path = require('path')
const utils = require('../lib/utils')
const packageJsonPath = path.resolve(utils.getRootPath(), 'package.json')

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
packageJson.scripts = packageJson.scripts || {}
packageJson.scripts.buildUtils = 'buildUtils'
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8')
console.log('react-native-build-utils:\nadded scripts to package.json:\nbuildUtils')

require('../lib/setupGradle')()
