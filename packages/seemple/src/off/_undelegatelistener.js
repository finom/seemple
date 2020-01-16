import defs from '../_core/defs';
import removeListener from './_removelistener';
import forEach from '../_helpers/foreach';

// the function removes internally used events such as _asterisk:add
function detatchDelegatedLogic({
    delegatedEventName,
    pathStr,
    allEvents
}) {
    const retain = [];
    const events = allEvents[delegatedEventName];

    forEach(events, (event) => {
        // pathStr is assigned to info in delegateListener
        if (event.info.pathStr !== pathStr) {
            retain.push(event);
        }
    });

    if (retain.length) {
        allEvents[delegatedEventName] = retain;
    } else {
        delete allEvents[delegatedEventName];
    }
}

// removes delegated event listener from an object by given path
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
        let pathStr;

        if (path.length > 1) {
            path = path.slice(1);
            pathStr = path.join('.');
        } else {
            path = [];
            pathStr = path[0] || '';
        }

        if (key === '*') {
            // remove asterisk events
            if (object.isSeempleArray) {
                const delegatedAddEvtName = '_asterisk:add';
                if (allEvents[delegatedAddEvtName]) {
                    detatchDelegatedLogic({
                        delegatedEventName: delegatedAddEvtName,
                        pathStr,
                        allEvents
                    });
                }

                const delegatedRemoveEvtName = '_asterisk:remove';
                if (allEvents[delegatedRemoveEvtName]) {
                    detatchDelegatedLogic({
                        delegatedEventName: delegatedRemoveEvtName,
                        pathStr,
                        allEvents
                    });
                }

                // undelegate asterisk events for existing items
                if (object.length) {
                    forEach(object, (item) => {
                        if (item && typeof item === 'object') {
                            undelegateListener(item, path, name, callback, context, info);
                        }
                    });
                }
            } else if (object.isSeempleObject) {
                const delegatedSetEvtName = '_asterisk:set';
                if (allEvents[delegatedSetEvtName]) {
                    detatchDelegatedLogic({
                        delegatedEventName: delegatedSetEvtName,
                        pathStr,
                        allEvents
                    });
                }

                const delegatedRemoveEvtName = '_asterisk:remove';
                if (allEvents[delegatedRemoveEvtName]) {
                    detatchDelegatedLogic({
                        delegatedEventName: delegatedRemoveEvtName,
                        pathStr,
                        allEvents
                    });
                }

                object.each((item) => {
                    if (item && typeof item === 'object') {
                        undelegateListener(item, path, name, callback, context, info);
                    }
                });
            }
        } else {
            // remove non-asterisk delegated events

            const delegatedChangeEvtName = `_change:delegated:${key}`;
            if (allEvents[delegatedChangeEvtName]) {
                detatchDelegatedLogic({
                    delegatedEventName: delegatedChangeEvtName,
                    pathStr,
                    allEvents
                });
            }

            if (typeof object[key] === 'object') {
                undelegateListener(object[key], path, name, callback, context, info);
            }
        }
    }
}
