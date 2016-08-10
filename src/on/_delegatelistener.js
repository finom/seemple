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

        if(key === '*') {
            if (object.isMKArray) {
                const onadd = function(evt) {
					(evt && evt.added ? evt.added : object).forEach(function(item) {
						item && delegateListener(item, path, name, callback, context, info);
					});
				};

                const onremove = function(evt) {
					(evt && evt.removed ? evt.removed : []).forEach(function(item) {
						item && undelegateListener(item, path, name, callback, context, info);
					});
				};

				onadd._callback = onremove._callback = callback;

				addListener(object, '_delegated:add', onadd, null, {
                    delegatedData,
                    pathStr
                });

                addListener(object, '_delegated:remove', onremove, null, {
                    delegatedData,
                    pathStr
                });

				onadd();
			} else if(object.isMKObject) {
                const onset = function(evt) {
					var target = object[evt.key];
                    if(target && typeof target === 'object') {
                        const def = defs.get(object);

    					if (evt && (evt.key in def.keys)) {
    						delegateListener(target, path, name, callback, context, info);
    					}
                    }
				};

				object.each(function(item) {
                    if(item && typeof item === 'object') {
    					delegateListener(item, path, name, callback, context, info);
                    }
				});



                addListener(object, '_delegated:set', onset, null, {
                    delegatedData,
                    pathStr
                });

                const onremove = function(evt) {
                    const item = evt && evt.value;
                    if(item && typeof item === 'object') {
    					undelegateListener(item, path, name, callback, context, info);
                    }
				};

                onremove._callback = onset._callback = callback;

                addListener(object, '_delegated:remove', onremove, null, {
                    delegatedData,
                    pathStr
                });
            }
        } else {
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
