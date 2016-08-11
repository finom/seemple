import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';
import defs from '../_core/defs';

function changeDelegatedHandler(eventOptions = {}) {
    const { key } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys) {
        triggerOne(this, '_asterisk:set', eventOptions);
    }
}

function deleteDelegatedHandler(eventOptions = {}) {
    const { key } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys) {
        triggerOne(this, '_asterisk:remove', eventOptions);
    }
}

function changeHandler(eventOptions = {}) {
    const { key, silent } = eventOptions;
    const def = defs.get(this);

    if (key && key in def.keys && !silent) {
        triggerOne(this, 'set', eventOptions);
        triggerOne(this, 'modify', eventOptions);
    }
}

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

export default function afterMatreshkaObjectInit(def) {
    // call "afterinit" of Matreshka
    afterMatreshkaInit.call(this);
    // easy Matreshka.Object detection
    this.isMKObject = true;
    // create a set of data keys
    def.keys = {};

    // trigger asterisk events on the following event
    addListener(this, '_change:delegated', changeDelegatedHandler);

    // trigger asterisk events on the following event
    addListener(this, '_delete:delegated', deleteDelegatedHandler);

    // fire "modify" event when data key is changed
    addListener(this, 'change', changeHandler);

    // fire "modify" and "remove" events when data key is removed
    addListener(this, 'delete', deleteHandler);
}
