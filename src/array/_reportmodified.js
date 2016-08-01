import defs from '../_core/defs';
import triggerOne from '../trigger/_triggerone';

export default function reportModified(self, eventOptions, additionalEventName) {
    const { added, removed, silent, method, dontRender } = eventOptions;
    const modified = added.length || removed.length || method === 'sort' || method === 'reverse';
    const { events } = defs.get(self)

    if(!silent) {
        if(additionalEventName) {
            if(events[additionalEventName]) {
                triggerOne(self, additionalEventName, eventOptions);
            }
        }

        if(added.length) {
            if(events.add) {
                triggerOne(self, 'add', eventOptions);
            }

            if (events.addone) {
                for (let i = 0; i < added.length; i++) {
                    // TODO: "add" and "addone" get the same property "added" with different values
                    triggerOne(self, 'addone', {
                        self,
                        added: added[i]
                    });
                }
            }
        }

        if(removed.length) {
            if(events.remove) {
                triggerOne(self, 'remove', eventOptions);
            }

            if (events.removeone) {
                for (let i = 0; i < removed.length; i++) {
                    // TODO: "remove" and "removeone" get the same property "removed" with different values
                    triggerOne(self, 'removeone', {
                        self,
                        removed: removed[i]
                    });
                }
            }
        }

        if (modified) {
            if(events.modify) {
                triggerOne(self, 'modify', eventOptions);
            }
        }
    }


	if (modified && !dontRender) {
		// TODO: processRendering(self, eventOptions);
	}
}
