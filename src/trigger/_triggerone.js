import defs from '../_core/defs';

// triggers one event
export default function triggerOne(object, name, triggerArgs = []) {
    const def = defs.get(object);
    const events = def && def.events[name];

    if (events) {
        // allow to pass both array of args and single arg as triggerArgs
        const args = triggerArgs instanceof Array ? triggerArgs : [triggerArgs];
        const l = events.length;
        const [a1, a2] = args;

        let i = 0;
        let ev;

        // optimized apply call
        // this part is critical for common framework performance
        switch (args.length) {
            case 0:
                while (i < l) {
                    (triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx);
                }
                return;
            case 1:
                while (i < l) {
                    (triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1);
                }
                return;
            case 2:
                while (i < l) {
                    (triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1, a2);
                }
                return;
            default:
                while (i < l) {
                    (triggerOne.latestEvent = ev = events[i++]).callback.apply(ev.ctx, args);
                }
                return;
        }
    }
}

// latestEvent is used as required hack in somemethods
triggerOne.latestEvent = {
    info: {},
    name: null
};
