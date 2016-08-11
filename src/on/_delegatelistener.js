import addListener from '../on/_addlistener';
import undelegateListener from '../off/_undelegatelistener';
import triggerOne from '../trigger/_triggerone';
import defs from '../_core/defs';
import is from '../_helpers/is';


// the function is called when something is added to an array
// it delegates asterisk listener for newly added items
function arrayAddHandler({ added }, {
    path,
    name,
    callback,
    context,
    info
} = triggerOne.latestEvent.info.delegatedData) {
    nofn.forEach(added, item => {
        if(item && typeof item === 'object') {
            delegateListener(item, path, name, callback, context, info);
        }
    });
}

// the function is called when something is removed from an array
// it undelegates asterisk listener from removed items
function arrayRemoveHandler({ removed }, {
    path,
    name,
    callback,
    context,
    info
} = triggerOne.latestEvent.info.delegatedData) {
    if(removed && removed.length) {
        nofn.forEach(removed, item => {
            if(item && typeof item === 'object') {
                undelegateListener(item, path, name, callback, context, info);
            }
        });
    }
}

// the function is called when data property is changed in Matreshka.Object
// it delegates asterisk listener for new value
function objectSetHandler({ key }, {
    path,
    name,
    callback,
    context,
    info,
    object
} = triggerOne.latestEvent.info.delegatedData) {
    if(key) {
        const item = object[key];

        if(item && typeof item === 'object') {
            const def = defs.get(object);
            if (key in def.keys) {
                delegateListener(item, path, name, callback, context, info);
            }
        }
    }
}

// the function is called when data property is removed from Matreshka.Object
// it undelegates asterisk listener from removed object
function objectRemoveHandler({ value:item }, {
    path,
    name,
    callback,
    context,
    info,
    object
} = triggerOne.latestEvent.info.delegatedData) {
    if(item && typeof item === 'object') {
        undelegateListener(item, path, name, callback, context, info);
    }
}

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
            info,
            object
        };

        if(key === '*') {
            // handling asterisk events
            if (object.isMKArray) {
                // the event is triggered when something is added to array
				addListener(object, '_asterisk:add', arrayAddHandler, null, { delegatedData });

                // the event is triggered when something is removed from array
                addListener(object, '_asterisk:remove', arrayRemoveHandler, null, { delegatedData });

                // call handler manually to delegate listener for currently existing data props
                arrayAddHandler({
                    added: object
                }, delegatedData);
			} else if(object.isMKObject) {
                const def = defs.get(object);

                // the event is triggered when data prop is changed
                addListener(object, '_asterisk:set', objectSetHandler, null, { delegatedData });

                // the event is triggered when data prop is removed
                addListener(object, '_asterisk:remove', objectRemoveHandler, null, { delegatedData });

                // delegate listener for currently existing data props
                nofn.forOwn(def.keys, (_, key) => {
                    const item = object[key];
                    if(item && typeof item === 'object') {
    					delegateListener(item, path, name, callback, context, info);
                    }
                });
            }
        } else {
            // handling non-asterisk delegated event

            // the event is triggered by "set"
            addListener(object, `_change:delegated:${key}`, changeHandler, null, { delegatedData });

            // call handler manually
            changeHandler({
                value: object[key]
            }, delegatedData);
        }

    }
}
