import defs from '../_core/defs';

triggerOne.latestEvent = {
	info: {},
	name: null
};

export default function triggerOne(object, name) {
	const def = defs.get(object);

	if (!def) return;

	const events = def.events[name];

	if (events) {
		const args = nofn.slice(arguments, 2),
			l = events.length,
			[a1, a2, a3] = args;

		let i = 0,
			ev;


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
		case 3:
			while (i < l) {
				(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1, a2, a3);
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
