import addListener from '../_addlistener';
import defs from '../../_core/defs';
import arrayAddHandler from './arrayaddhandler';
import objectSetHandler from './objectsethandler';
import arrayRemoveHandler from './arrayremovehandler';
import objectRemoveHandler from './objectremovehandler';
import changeHandler from './changehandler';
import forOwn from '../../_helpers/forown';

// adds delegated event listener to an object by given path
export default function delegateListener(object, givenPath, name, callback, context, info = {}) {
    // if typeof path is string and path is not empty string then split it
    let path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

    if (!path || !path.length) {
        // if no path then add simple listener
        addListener(object, name, callback, context, info);
    } else {
        // else do all magic
        const key = path[0];
        let pathStr; // needed for undelegation

        if (path.length > 1) {
            path = path.slice(1);
            pathStr = path.join('.');
        } else {
            path = [];
            pathStr = path[0] || '';
        }

        const delegatedData = {
            path,
            name,
            callback,
            context,
            info,
            object
        };

        if (key === '*') {
            // handling asterisk events
            // { skipChecks: true } allows to use same event name and event handler few times
            if (object.isMatreshkaArray) {
                // the event is triggered when something is added to an array
                addListener(object, '_asterisk:add', arrayAddHandler, null, {
                    delegatedData,
                    pathStr,
                    skipChecks: true
                });

                // the event is triggered when something is removed from an array
                addListener(object, '_asterisk:remove', arrayRemoveHandler, null, {
                    delegatedData,
                    pathStr,
                    skipChecks: true
                });

                // call handler manually to delegate listener for currently existing data props
                arrayAddHandler({
                    added: object
                }, delegatedData);
            } else if (object.isMatreshkaObject) {
                const def = defs.get(object);

                // the event is triggered when data prop is changed
                addListener(object, '_asterisk:set', objectSetHandler, null, {
                    delegatedData,
                    pathStr,
                    skipChecks: true
                });

                // the event is triggered when data prop is removed
                addListener(object, '_asterisk:remove', objectRemoveHandler, null, {
                    delegatedData,
                    pathStr,
                    skipChecks: true
                });

                // delegate listener for currently existing data props
                forOwn(def.keys, (_, defKey) => {
                    const item = object[defKey];
                    if (item && typeof item === 'object') {
                        delegateListener(item, path, name, callback, context, info);
                    }
                });
            }
        } else {
            // handling non-asterisk delegated event

            // the event is triggered by "set"
            addListener(object, `_change:delegated:${key}`, changeHandler, null, {
                delegatedData,
                pathStr
            });

            // call handler manually
            changeHandler({
                value: object[key]
            }, delegatedData);
        }
    }
}
