import assign from '../_helpers/assign';
import createPseudoNativeMethod from './_createpseudonativemethod';
import _afterInit from './_afterinit';
import mediateItem from './mediateitem';
import orderBy from './orderby';
import pull from './pull';
import recreate from './recreate';
import rerender from './rerender';
import restore from './restore';
import toJSON from './tojson';
import trackBy from './trackby';
import concat from './concat';

const splitBySpaceReg = /\s+/;
const prototype = {};

`push pop unshift shift sort reverse splice map filter slice every
some reduce reduceRight forEach join indexOf lastIndexOf`
	.split(splitBySpaceReg).forEach(name => {
		prototype[name] = createPseudoNativeMethod(name);
	});

'push pop unshift shift sort reverse splice'
    .split(splitBySpaceReg).forEach(name => {
    	prototype[`${name}_`] = createPseudoNativeMethod(name, true);
    });

export default assign({
    _afterInit,
    mediateItem,
    orderBy,
    pull,
    recreate,
    rerender,
    restore,
    toJSON,
    trackBy,
    concat
}, prototype);
