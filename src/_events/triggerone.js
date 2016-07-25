import defs from '../_core/defs';

export default function triggerOne(object, name) {
    const def = defs.get(object);

    if (!def) return;

    const events = def.events[name];

    if (events) {
        const args = nofn.slice(arguments, 2);
        const l = events.length;
        const [a1, a2] = args;

        let i = 0;
        let ev;

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

triggerOne.latestEvent = {
    info: {},
    name: null
};
