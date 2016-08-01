import Class from '../class';
import Matreshka from '../matreshka';
import instanceMembers from './_prototype';
import matreshkaError from '../_helpers/matreshkaerror';
import initMK from '../_core/init';
import staticMembers from './_staticmembers';

instanceMembers.extends = Matreshka;

instanceMembers.constructor = function MatreshkaArray(data) {
    if(!(this instanceof MatreshkaArray)) {
        throw matreshkaError('common:call_class');
    }

    initMK(this);

    // return is used to make possible to chain super() calls
    return typeof data !== 'undefined' ? this.recreate(data) : this;
}

const MatreshkaArray = Class(instanceMembers, staticMembers);

export default MatreshkaArray;
