import Class from '../class';
import Seemple from '../seemple';
import instanceMembers from './_prototype';
import seempleError from '../_helpers/seempleerror';
import initSeemple from '../_core/init';

instanceMembers.extends = Seemple;

instanceMembers.constructor = function SeempleObject(data) {
    if (!(this instanceof SeempleObject)) {
        throw seempleError('common:call_class');
    }

    initSeemple(this);

    // return is used to make possible to chain super() calls
    return typeof data !== 'undefined' ? this.setData(data) : this;
};

const SeempleObject = Class(instanceMembers);

export default SeempleObject;
