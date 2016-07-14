import data from './_data';
import Init from './_init';

// adds event listener to a set of elemnts
export default function on(names, selector, handler) {
	let delegate;

	if (typeof selector === 'function') {
		handler = selector;
		selector = null;
	}

	if (selector) {
		delegate = function delegateHandler(evt) {
			var randomID = 'x' + String(Math.random()).split('.')[1],
				scopeSelector,
				is;

			this.setAttribute(randomID, randomID);

			scopeSelector = '[' + randomID + '="' + randomID + '"] ';

			is = selector.split(',').map(function(sel) {
				return scopeSelector + sel + ',' + scopeSelector + sel + ' *';
			}).join(',');

			if (new Init(evt.target).is(is)) {
				handler.call(this, evt);
			}

			this.removeAttribute(randomID);
		};
	}

	names = names.split(/\s/);

	for (let i = 0; i < names.length; i++) {
		let name = names[i].split(/\.(.+)/);
		const namespace = name[1];
		name = name[0];

		for (let j = 0; j < this.length; j++) {
			const node = this[j],
				nodeID = node.b$ = node.b$ || ++data.nodeIndex,
				events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [];

			let exist = false;


			for (let k = 0; k < events.length; k++) {
				const event = events[k];

				if (handler === event.handler && (!selector || selector === event.selector)) {
					exist = true;
					break;
				}
			}

			if (!exist) {
				events.push({
					delegate,
					handler,
					namespace,
					selector
				});

				node.addEventListener(name, delegate || handler, false);
			}
		}
	}

	return this;
}
