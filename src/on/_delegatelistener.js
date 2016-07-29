import addListener from '../on/_addlistener';
import undelegateListener from '../off/_undelegatelistener';
import triggerOne from '../trigger/_triggerone';
import defs from '../_core/defs';
import is from '../_helpers/is';

// the function is called when some part of a path is changed
// it delegates event listener for new branch of an object and undelegates it for old one
function changeHandler({
    previousValue,
    value
}, {
    path,
    name,
    callback,
    context,
    info
} = triggerOne.latestEvent.info.delegatedData) {
    if (value && typeof value === 'object') {
        delegateListener(value, path, name, callback, context, info);
    }

    if (previousValue && typeof previousValue === 'object') {
        undelegateListener(previousValue, path, name, callback, context, info);
    }
}

// adds delegated event listener to an object by given path
export default function delegateListener(object, givenPath, name, callback, context, info = {foo: 'bar'}) {
    // if typeof path is string and path is not empty string then split it
    let path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

    if (!path || !path.length) {
        // if no path then add simple listener
        addListener(object, name, callback, context, info);
    } else {
        // else do all magic
        const key = path[0];
        let pathStr;

        if (path.length > 1) {
            path = nofn.slice(path, 1);
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
            info
        };

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
