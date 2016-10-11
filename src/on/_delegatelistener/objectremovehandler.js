import undelegateListener from '../../off/_undelegatelistener';
import triggerOne from '../../trigger/_triggerone';

// the function is called when data property is removed from Matreshka.Object
// it undelegates asterisk listener from removed object
export default function objectRemoveHandler({ value: item }, {
    path,
    name,
    callback,
    context,
    info
    // , object
} = triggerOne.latestEvent.info.delegatedData) {
    if (item && typeof item === 'object') {
        undelegateListener(item, path, name, callback, context, info);
    }
}
