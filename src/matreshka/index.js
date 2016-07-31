import Class from '../class';
import staticMembers from './_staticmembers';
import instanceMembers from './_instancemembers';
import assign from '../_helpers/assign';
import initMK from '../_core/init';

const Matreshka = Class(assign({
    constructor() {
        if(!(this instanceof Matreshka)) {
			throw matreshkaError('common:call_class');
		}

        initMK(this);
    }
}, instanceMembers), staticMembers);

export default Matreshka;
