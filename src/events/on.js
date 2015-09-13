define([
    'matreshka_dir/var/magic',
    'matreshka_dir/core/initmk',
    'matreshka_dir/util/common'
], function(magic, initMK, util) {
    var _on, on;

    _on = magic._on = function(object, name, callback, context) {
        if (!object) return object;
        initMK(object);

        var path;
        // index of @
        var lastIndexOfET = name.lastIndexOf('@');

        if (~lastIndexOfET) {
            path = name.slice(0, lastIndexOfET).replace(/([^@]*)@/g, function($0, key) {
                return (key || '*') + '.';
            }).replace(/\.$/, '.*') || '*';

            name = name.slice(lastIndexOfET + 1);

            magic._delegateListener(object, path, name, callback, context || object);
        } else {
            magic._addListener(object, name, callback, context);
        }

        return object;
    };

    on = magic.on = function(object, names, callback, triggerOnInit, context, evtData) {
        if (!object) return object;
        initMK(object);

        var t, i;

        // if event-callback object is passed to the function
        if (typeof names == 'object' && !(names instanceof Array)) {
            for (i in names) {
                if (names.hasOwnProperty(i)) {
                    on(object, i, names[i], callback, triggerOnInit);
                }
            }

            return object;
        }

        // callback is required
        if (!callback) throw Error('callback is not function for event(s) "' + names + '"');

        names = names instanceof Array ? names : util.trim(names)
            .replace(/\s+/g, ' ') // single spaces only
            .split(/\s(?![^(]*\))/g) // split by spaces
        ;

        // allow to flip triggerOnInit and context
        if (typeof triggerOnInit != 'boolean' && typeof triggerOnInit != 'undefined') {
            t = context;
            context = triggerOnInit;
            triggerOnInit = t;
        }

        // for every name call _on method
        for (i = 0; i < names.length; i++) {
            _on(object, names[i], callback, context, evtData);
        }

        // trigger after event is initialized
        if (triggerOnInit === true) {
            callback.call(context || object, {
                triggeredOnInit: true
            });
        }

        return object;
    };
});
