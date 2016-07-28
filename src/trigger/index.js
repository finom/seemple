export default function trigger(...allArgs) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        const [givenNames, ...args] = allArgs;
        object = this;
    } else {
        const [object, givenNames, ...args] = allArgs;
        // throw error when object type is wrong
        checkObjectType(object, 'trigger');
    }
    let names;

    if(typeof names === 'string') {
        names = givenNames.split(/\s+/)
    } else {
        throw matreshkaError('trigger:name_type', { name: givenNames })
    }

    const def = defs.get(object);

    // if no definition do nothing
    if (!def) {
        return object;
    }

    const { events: allEvents } = def;

    if(!allEvents) {
        return object;
    }


    nofn.forEach(names, name => {
        const events = allEvents[name];

        /*if(~name.indexOf('::')) {
			executed = domEvtReg.exec(name);
			nodes = objectData.special[executed[3] || 'sandbox'];
			nodes = nodes && nodes.$nodes;
			_nodes = core.$();
			selector = executed[5];
			if(selector) {
				for(j = 0; j < nodes.length; j++) {
					_nodes = _nodes.add(nodes.find(selector));
				}
			} else {
				_nodes = nodes;
			}

			for(j = 0; j < _nodes.length; j++) {
				triggerDOMEvent(_nodes[i], executed[1], args);
			}
		} else {
			events = allEvents[name];
			if (events) {
				j = -1, l = events.length;
				while (++j < l)(ev = events[j]).callback.apply(ev.ctx, args);
			}
		}*/
    });

}
