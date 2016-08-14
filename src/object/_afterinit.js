import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import triggerOne from '../trigger/_triggerone';
import defs from '../_core/defs';

// called on _change:delegated
// tiggers asterisk events logic by triggering _asterisk:set
function changeDelegatedHandler(eventOptions = {}) {
    const { key } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys) {
        triggerOne(this, '_asterisk:set', eventOptions);
    }
}

// called on _delete:delegated
// removes asterisk events logic by triggering _asterisk:remove
function deleteDelegatedHandler(eventOptions = {}) {
    const { key } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys) {
        triggerOne(this, '_asterisk:remove', eventOptions);
    }
}

// called on change
// triggers set and modify if data keys are changed
function changeHandler(eventOptions = {}) {
    const { key, silent } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys && !silent) {
        triggerOne(this, 'set', eventOptions);
        triggerOne(this, 'modify', eventOptions);
    }
}

// called on delete
// triggers remove and modify if data keys are removed
function deleteHandler(eventOptions = {}) {
    const { key, silent } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys) {
        delete def.keys[key];

        if (!silent) {
            triggerOne(this, 'remove', eventOptions);
            triggerOne(this, 'modify', eventOptions);
        }
    }
}

// Matreshka.Object initializer
export default function afterMatreshkaObjectInit(def) {
    // Matreshka initializer
    afterMatreshkaInit.call(this);
    // for easy Matreshka.Object detection
    this.isMatreshkaObject = true;
    // create a set of data keys
    def.keys = {};

    // trigger asterisk events
    addListener(this, '_change:delegated', changeDelegatedHandler);

    // trigger asterisk events removal
    addListener(this, '_delete:delegated', deleteDelegatedHandler);

    // fire "modify" and "set" events when data key is changed
    addListener(this, 'change', changeHandler);

    // fire "modify" and "remove" events when data key is removed
    addListener(this, 'delete', deleteHandler);
}
