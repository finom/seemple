define(['matreshka_dir/var/magic', 'matreshka_dir/core/initmk'], function(magic, initMK) {
    var mediate = magic.mediate = function(object, keys, mediator) {
        if (!object || typeof object != 'object') return object;

        initMK(object);

        var type = typeof keys,
            i,
            special;

        if (type == 'object' && !(keys instanceof Array)) {
            for (i in keys) {
                if (keys.hasOwnProperty(i)) {
                    magic.mediate(object, i, keys[i]);
                }
            }
            return object;
        }

        keys = type == 'string' ? keys.split(/\s/) : keys;

        for (i = 0; i < keys.length; i++)(function(key) {
            special = magic._defineSpecial(object, key);

            special.mediator = function(v) {
                return mediator.call(object, v, special.value, key, object);
            };

            magic.set(object, key, special.mediator(special.value), {
                fromMediator: true
            });
        })(keys[i]);

        return object;
    };

    var setClassFor = magic.setClassFor = function(object, keys, Class, updateFunction) {
        if (!object || typeof object != 'object') return object;

        initMK(object);

        var type = typeof keys,
            i;

        if (type == 'object' && !(keys instanceof Array)) {
            for (i in keys)
                if (keys.hasOwnProperty(i)) {
                    magic.setClassFor(object, i, keys[i], Class);
                }

            return object;
        }

        keys = type == 'string' ? keys.split(/\s/) : keys;

        updateFunction = updateFunction || function(instance, data) {
            var i;

            if(instance.isMKArray) {
                instance.recreate(data);
            } else if(instance.isMKObject) {
                instance.jset(data);
            } else {
                for (i in data) {
                    if (data.hasOwnProperty(i)) {
                        instance[i] = data[i];
                    }
                }
            }
        };

        for (i = 0; i < keys.length; i++) {
            magic.mediate(object, keys[i], function(v, previousValue) {
                var result;
                if (previousValue instanceof Class) {
                    updateFunction.call(object, previousValue, v);
                    result = previousValue;
                } else {
                    result = new Class(v);
                }

                return result;
            });
        }

        return object;
    };
});
