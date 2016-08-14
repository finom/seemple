import triggerOne from '../../trigger/_triggerone';
import defs from '../../_core/defs';

// the function is called when data property is changed in Matreshka.Object
// it delegates asterisk listener for new value
export default function objectSetHandler({ key }, {
    path,
    name,
    callback,
    context,
    info,
    object
} = triggerOne.latestEvent.info.delegatedData) {
    if (key) {
        const item = object[key];

        if (item && typeof item === 'object') {
            const def = defs.get(object);
            if (key in def.keys) {
                const delegateListener = require('./'); // fixing circular ref

                delegateListener(item, path, name, callback, context, info);
            }
        }
    }
}
