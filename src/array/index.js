import Class from '../class';
import Seemple from '../seemple';
import instanceMembers from './_prototype';
import seempleError from '../_helpers/seempleerror';
import initSeemple from '../_core/init';
import staticMembers from './_staticmembers';

instanceMembers.extends = Seemple;

instanceMembers.constructor = function SeempleArray(length) {
    if (!(this instanceof SeempleArray)) {
        throw seempleError('common:call_class');
    }

    initSeemple(this);

    // repeat the same logic as for native Array
    if (arguments.length === 1 && typeof length === 'number') {
        this.length = length;
    } else if (arguments.length) {
        this.recreate(arguments, {
            silent: true,
            dontRender: true
        });
    }

    // return is used to make possible to chain super() calls
    return this;
};

const SeempleArray = Class(instanceMembers, staticMembers);

export default SeempleArray;
