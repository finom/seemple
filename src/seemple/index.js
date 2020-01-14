import Class from '../class';
import staticMembers from './_staticmembers';
import instanceMembers from './_prototype';
import initSeemple from '../_core/init';
import seempleError from '../_helpers/seempleerror';

instanceMembers.constructor = function Seemple() {
    if (!(this instanceof Seemple)) {
        throw seempleError('common:call_class');
    }

    initSeemple(this);
};

const Seemple = Class(instanceMembers, staticMembers);

export default Seemple;
