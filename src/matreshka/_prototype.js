import initMK from '../_core/init';
import matreshkaError from '../_helpers/matreshkaerror';
import * as universalMethods from './_universalmethods';
import assign from '../_helpers/assign';
import _afterInit from './_afterinit';

export default assign({
    _afterInit,
    $: universalMethods.selectAll
}, universalMethods);
