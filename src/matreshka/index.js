import Class from '../class';
import staticMembers from './_staticmembers';
import instanceMembers from './_instancemembers';
import assign from '../_helpers/assign';

const Matreshka = Class(assign({
    constructor() {
        if(!(this instanceof Matreshka)) {
			throw matreshkaError('common:call_class');
		}

		this._initMatreshka();
    }
}, instanceMembers), staticMembers);

export default Matreshka;
