import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';




export default function afterMatreshkaObjectInit(def) {
    // call "afterinit" of Matreshka
    afterMatreshkaInit.call(this);
    // easy Matreshka.Object detection
    this.isMKObject = true;
    // create a set of data keys
    def.keys = {};

    addListener(this, '_change:delegated', (eventOptions = {}) => {
        const { key } = eventOptions;

        if (key && key in def.keys) {
            triggerOne(this, '_delegated:set', eventOptions);
        }
    });

    addListener(this, '_delete:delegated', (eventOptions = {}) => {
        const { key } = eventOptions;

        if (key && key in def.keys) {
            triggerOne(this, '_delegated:remove', eventOptions);
        }
    });

    // fire "modify" event when data key is changed
    addListener(this, 'change', (eventOptions = {}) => {
        const { key, silent } = eventOptions;

        if (key && key in def.keys && !silent) {
            triggerOne(this, 'set', eventOptions);
            triggerOne(this, 'modify', eventOptions);
        }
    });

    // fire "modify" and "remove" events when data key is removed
    addListener(this, 'delete', (eventOptions = {}) => {
        const { key, silent } = eventOptions;

        if (key && key in def.keys) {
            delete def.keys[key];

            if (!silent) {
                triggerOne(this, 'remove', eventOptions);
                triggerOne(this, 'modify', eventOptions);
            }
        }
    });


}
