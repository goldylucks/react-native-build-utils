#! /usr/bin/env node
const path = require('path')
const child = require('child_process')
const fs = require('fs')
const readline = require('readline')

module.exports = {
  getRootPath,
  getPackageJson,
  execP,
  promptUserBool,
}

function getRootPath () {
  // assuming scripts are at ROOT/node_modules/react-native-build-utils/lib
  return path.resolve(__dirname, '..', '..', '..')
}

function getPackageJson () {
  const packageJsonPath = getRootPath() + '/package.json'
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
}

function execP (funcString) {
  return new Promise((resolve, reject) => {
    return child.exec(funcString, (err, result, stderr) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    }).stdout.pipe(process.stdout)
  })
}

function promptUserBool (question, { defaultAnswer }) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve, reject) => {
    if (defaultAnswer === false) {
      question += ' [y/N]'
    } else if (defaultAnswer === true) {
      question += ' [Y/n]'
    } else {
      question += ' [y/n]'
    }

    rl.question(question, answer => {
      rl.close()
      if (answer.match(/^yes$|^y$/)) return resolve(true)
      if (answer.match(/^no$|^n$/)) return resolve(false)
      if (defaultAnswer === true && answer === '') return resolve(true)
      if (defaultAnswer === false && answer === '') return resolve(false)
    })
  })
}
