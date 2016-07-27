/* eslint no-use-before-define: ["error", { "functions": false }]*/
import addListener from '../on/_addlistener';
import undelegateListener from '../off/_undelegatelistener';
import triggerOne from '../trigger/_triggerone';
import defs from '../_core/defs';
import is from '../_util/is';

const treeChangeEvtReg = /^_change:tree:/;

function changeHandler({
    previousValue,
    value
}, {
    path,
    name,
    callback,
    context
} = triggerOne.latestEvent.info.delegatedData) {
    if (value && typeof value === 'object') {
        delegateListener(value, path, name, callback, context);
    }

    if (previousValue && typeof previousValue === 'object') {
        undelegateListener(previousValue, path, name, callback, context);
    }
}

export default function delegateListener(object, givenPath, name, callback, context) {
    // if typeof path is string and path is not empty string then split it
    let path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

    if (!path || !path.length) {
        // if no path then add simple listener
        addListener(object, name, callback, context);
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
            context
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
