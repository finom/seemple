import Class from '../class';
import MatreshkaArray from '../array';
import MatreshkaObject from '../object';
import defaultBinders from '../defaultbinders';
import lookForBinder from '../lookforbinder';
import * as binders from '../binders';
import * as universalMethods from './_universalmethods';

export default nofn.assign({
    Class,
    Array: MatreshkaArray,
    Object: MatreshkaObject,
    defaultBinders,
    lookForBinder,
    binders
}, universalMethods);
