import Class from '../class';
import Matreshka from '../matreshka';
import instanceMembers from './_instancemembers';
import assign from '../_helpers/assign';

const MatreshkaObject = Class(assign({
    extends: Matreshka,
    constructor(data) {
        if(!(this instanceof MatreshkaObject)) {
			throw matreshkaError('common:call_class');
		}

        // return is used to make possible to chain super() calls
        // initMK is called automatically by jset
        return this.setData(data);
    }
}, instanceMembers));

export default MatreshkaObject;
