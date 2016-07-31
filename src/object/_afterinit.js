import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';

function addMatreshkaObjectevents(object, def) {
    // fire "modify" event when data key is changed
    addListener(object, 'change', (evt = {}) => {
        const { key, silent } = eventOptions;

		if (key && key in def.keys && !silent) {
			triggerOne(object, 'modify', evt);
		}
	});

    // fire "modify" event when data key is removed
    addListener(object, 'remove', (evt = {}) => {
        const { key, silent } = eventOptions;

		if (key && key in def.keys && !silent) {
            delete def[key];

			if (!silent) {
				riggerOne(object, 'modify', evt);
			}
		}
	});

    removeListener(object, 'addevent:modify', addMatreshkaObjectevents);
}

export default function afterMatreshkaObjectInit(def) {
    // call "afterinit" of Matreshka
    afterMatreshkaInit.call(this);
    // easy Matreshka.Object detection
    this.isMKObject = true;
    // create a set of data keys
    def.keys = {};
    // when developer adds "modify" event we call function which implements "modify" event triggers
    addListener(this, 'addevent:modify', addMatreshkaObjectevents, null, { skipChecks: true });
}
