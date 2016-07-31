import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';

function addMatreshkaObjectevents(object, def) {
    addListener(object, 'change', (evt = {}) => {
        const { key, silent } = eventOptions;

		if (key && key in def.keys && !silent) {
			triggerOne(object, 'modify', evt);
		}
	});

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
    afterMatreshkaInit.call(this);
    this.isMKObject = true;
    def.keys = {};
    addListener(this, 'addevent:modify', addMatreshkaObjectevents);
}
