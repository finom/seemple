import defs from '../_core/defs';
import removeListener from './_removelistener';

// TODO description
export default function undelegateListener(object, givenPath, name, callback, context, info = {}) {
    const def = defs.get(object);

    // if no definition do nothing
    if (!def) {
		return;
    }

    const { events: allEvents } = def;

    let path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

    if (!path || !path.length) {
        // if no path then remove listener
        removeListener(object, name, callback, context, info);
    } else {
        // else do all magic
        const key = path[0];
        const changeDelegatedEvtName = `_change:delegated:${key}`;
        const events = allEvents[changeDelegatedEvtName];
        let pathStr;

        if (path.length > 1) {
            path = nofn.slice(path, 1);
            pathStr = path.join('.');
        } else {
            path = [];
            pathStr = path[0] || '';
        }

        if (events) {
            const retain = [];
            nofn.forEach(events, event => {
                if (event.info.pathStr !== pathStr) {
                    retain.push(event);
                }
            });

            if (retain.length) {
                allEvents[changeDelegatedEvtName] = retain;
            } else {
                delete allEvents[changeDelegatedEvtName];
            }
        }

        if (typeof object[key] === 'object') {
            undelegateListener(object[key], path, name, callback, context, info);
        }
    }
}
