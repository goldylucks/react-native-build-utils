# React Native Build Utils
Build utils for react native: (only android at the moment)
- apk
- dev/prod gradle configs
- install on device
- generate dev icons

[![npm-version][npm-version-image]][npm-package-url] [![npm-downloads][npm-downloads-image]][npm-package-url] [![peer-dependencies][peer-dependencies-image]][peer-dependencies-url] [![devDependencies][dev-dependencies-image]][dev-dependencies-url] [![dependencies][dependencies-image]][dependencies-url] [![GPLv3][license-image]][license-url]

## Install
```bash
$ npm install --save-dev react-native-build-utils replace # replace is a peer dependency
```

## Use
```bash
$ npm run buildUtils configGradle # config gradle for DEV
$ npm run buildUtils configGradle -- -p # config gradle for PROD
$ npm run buildUtils apk # generates release apk
$ npm run buildUtils installOnDevice # installs DEV version on connected devices
$ npm run buildUtils installOnDevice -- -p # installs PROD version on connected devices
$ npm run buildUtils icons # generates dev icons based on existing prod icons
```
easy peasy! ;)

## Config file
`.gradleConfig` contains 4 keys:  
- `appDirName`: created initially by react-native init, located at `PROJECT_ROOT/android/app/src/main/java/com/`
- `appDisplayName`: what your users c, located at `PROJECT_ROOT/android/app/src/main/res/values/strings.xml`
- `appPackageName`: the app's identifier for google store, located at the "package" attribute at the manifest file `PROJECT_ROOT/android/app/src/main/AndroidManifest.xml`
- iconName: The name of the icon files to use for the app, located at:
  - `PROJECT_ROOT/android/app/src/main/res/mipmap-mdpi/`
  - `PROJECT_ROOT/android/app/src/main/res/mipmap-hdpi/`
  - `PROJECT_ROOT/android/app/src/main/res/mipmap-xhdpi/`
  - `PROJECT_ROOT/android/app/src/main/res/mipmap-xxhdpi/`
  default is `ic_launcher`

if u make any changes to any of the above fields in your project, i.e. change the display name, u can either edit `.gradleConfig` manually, or run the setup script again:
```bash
$ npm run buildUtils setupGradle
```

## Contact
Issues, features (and PRs!) are always [welcomed][issues-url] :)  

## License
The code is available under the [GPL v3 license][license-url].

[npm-package-url]: https://www.npmjs.com/package/react-native-build-utils.svg
[npm-downloads-image]: https://img.shields.io/npm/dt/react-native-build-utils.svg
[npm-version-image]: https://img.shields.io/npm/v/react-native-build-utils.svg
[peer-dependencies-image]: https://img.shields.io/david/peer/goldylucks/react-native-build-utils.svg
[peer-dependencies-url]: https://david-dm.org/goldylucks/react-native-build-utils?type=peer
[dev-dependencies-image]: https://img.shields.io/david/dev/goldylucks/react-native-build-utils.svg
[dev-dependencies-url]: https://david-dm.org/goldylucks/react-native-build-utils?type=dev
[dependencies-image]: https://img.shields.io/david/goldylucks/react-native-build-utils.svg
[dependencies-url]: https://david-dm.org/goldylucks/react-native-build-utils
[issues-url]: https://github.com/goldylucks/react-native-build-utils/issues
[license-image]: https://img.shields.io/badge/license-GPL%20v3-brightgreen.svg
[license-url]: http://www.gnu.org/licenses/gpl-3.0.en.html
