
const utils = require('./utils');
const fse = require('fs-extra');

Promise.all([
    fse.copy('../ts_version/babel', '../dist/babel'),
    fse.copy('../ts_version/src', '../dist/src'),
    fse.copy('../ts_version/customize', '../dist/customize'),
    fse.copy('../ts_version/template', '../dist/template'),
    fse.copy('../ts_version/.eslintrc.js', '../dist/.eslintrc.js'),
    fse.copy('../.gitignore', '../dist/.gitignore'),
    fse.copy('../ts_version/document.js', '../dist/document.js'),
    fse.copy('../ts_version/LICENSE', '../dist/LICENSE'),
 //   fse.copy('../ts_version/package.json', '../dist/package.json'),
    fse.copy('../ts_version/README.md', '../dist/README.md'),
])
    .then(() => {
        utils.createJsConfig('../dist/jsconfig.json');

        const allFiles = utils.buildTree('../dist/src');
        utils.transformTsToJs(allFiles);
    })
    .catch((err) => console.log(err));