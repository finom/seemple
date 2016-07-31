import initMK from '../_core/init';
import matreshkaError from '../_helpers/matreshkaerror';
import * as universalMethods from './_universalmethods';
import assign from '../_helpers/assign';

export default assign({
    _initMatreshka() {
        this.isMK = true;
        this.nodes = {};
        this.$nodes = {};
        return this;
    }
}, universalMethods);
