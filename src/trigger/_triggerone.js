import defs from '../_core/defs';
import apply from '../_helpers/apply';

// triggers one event
export default function triggerOne(object, name, triggerArgs = []) {
    const def = defs.get(object);
    const events = def && def.events[name];

    if (events) {
        // allow to pass both array of args and single arg as triggerArgs
        const args = triggerArgs instanceof Array ? triggerArgs : [triggerArgs];
        const l = events.length;

        let i = 0;

        while (i < l) {
            const event = triggerOne.latestEvent = events[i++];
            const { callback, ctx } = event;
            apply(callback, ctx, args);
        }
    }
}

// latestEvent is used as required hack in somemethods
triggerOne.latestEvent = {
    info: {},
    name: null
};
