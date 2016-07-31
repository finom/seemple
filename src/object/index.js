import Class from '../class';
import Matreshka from '../matreshka';
import instanceMembers from './_instancemembers';
import assign from '../_helpers/assign';
import matreshkaError from '../_helpers/matreshkaerror';
import initMK from '../_core/init';

const MatreshkaObject = Class(assign({
    extends: Matreshka,
    constructor(data) {
        if(!(this instanceof MatreshkaObject)) {
			throw matreshkaError('common:call_class');
		}

        initMK(this);

        // return is used to make possible to chain super() calls
        // initMK is called automatically by jset
        return typeof data !== 'undefined' ? this.setData(data) : this;
    }
}, instanceMembers));

export default MatreshkaObject;
