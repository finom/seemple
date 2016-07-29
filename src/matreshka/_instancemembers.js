import initMK from '../_core/init';
import matreshkaError from '../_helpers/matreshkaerror';
import * as universalMethods from './_universalmethods';

export default nofn.assign({
    _initMatreshka() {
        initMK();
        this.isMK = true;
        this.nodes = {};
        this.$nodes = {};
        return this;
    },
    constructor() {
        if(!(this instanceof Matreshka)) {
			throw matreshkaError('common:call_class');
		}

		this._initMatreshka();
    }
}, universalMethods);
