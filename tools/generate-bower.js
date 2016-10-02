const fs = require('fs');
const path = require('path');
const sourcePackage = require('../package');

const bowerPackage = {
    name: 'matreshka',
    main: 'matreshka.min.js'
};
const defaultVersion = '0.0.0-auto';

if (sourcePackage.version === '0.0.0-auto') {
    throw Error(`Bower file version cannot be "${defaultVersion}"`);
}

for (const key of [
    'version',
    'repository',
    'license',
    'homepage',
    'description'
]) {
    const value = sourcePackage[key];
    if (!value) {
        throw Error(`"${key}" is not specified at package.json`);
    }

    bowerPackage[key] = value;
}

console.log('generating bower.json'); // eslint-disable-line no-console

const bowerPackageString = JSON.stringify(bowerPackage, null, '\t');

fs.writeFileSync(path.resolve(__dirname, '../bundle/bower.json'), bowerPackageString, {
    encoding: 'utf8'
});
