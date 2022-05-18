
const utils = require('./utils');
const fse = require('fs-extra');

Promise.all([
    fse.copy('../ts_version/babel', '../js_version/babel'),
    fse.copy('../ts_version/customize', '../js_version/customize'),
    fse.copy('../ts_version/src', '../js_version/src'),
    fse.copy('../ts_version/template', '../js_version/template'),
    fse.copy('../ts_version/document.js', '../js_version/document.js'),
//    fse.copy('../.gitignore', '../js_version/.gitignore'),
 //   fse.copy('../ts_version/.eslintrc.js', '../js_version/.eslintrc.js'),
//    fse.copy('../ts_version/LICENSE', '../js_version/LICENSE'),
 //   fse.copy('../ts_version/package.json', '../js_version/package.json'),
//    fse.copy('../ts_version/README.md', '../js_version/README.md'),
])
    .then(() => {
        //Remove stray ts script files
        fse.removeSync('../js_version/babel/index.d.ts')
        fse.removeSync('../js_version/customize/index.d.ts'),
        utils.createJsConfig('../js_version/jsconfig.json');

        const allFiles = utils.buildTree('../js_version/src');
        utils.transformTsToJs(allFiles);
    })
    .catch((err) => console.log(err));