import triggerOne from '../../trigger/_triggerone';

// the function is called when something is added to an array
// it delegates asterisk listener for newly added items
export default function arrayAddHandler({ added }, {
    path,
    name,
    callback,
    context,
    info
} = triggerOne.latestEvent.info.delegatedData) {
    nofn.forEach(added, (item) => {
        if (item && typeof item === 'object') {
            const delegateListener = require('./'); // fixing circular ref

            delegateListener(item, path, name, callback, context, info);
        }
    });
}
