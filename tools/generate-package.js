const fs = require('fs');
const path = require('path');
const sourcePackage = require('../package');

const npmPackage = { name: 'matreshka' };
const defaultVersion = '0.0.0-auto';

if (sourcePackage.version === '0.0.0-auto') {
    throw Error(`Package version cannot be "${defaultVersion}"`);
}

for (const key of [
    'version',
    'author',
    'repository',
    'license',
    'bugs',
    'homepage',
    'description'
]) {
    const value = sourcePackage[key];
    if (!value) {
        throw Error(`"${key}" is not specified at package.json`);
    }

    npmPackage[key] = value;
}

console.log('generating package.json'); // eslint-disable-line no-console

const npmPackageString = JSON.stringify(npmPackage, null, '\t');

fs.writeFileSync(path.resolve(__dirname, '../npm/package.json'), npmPackageString, {
    encoding: 'utf8'
});
