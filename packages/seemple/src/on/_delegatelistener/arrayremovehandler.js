import undelegateListener from '../../off/_undelegatelistener';
import triggerOne from '../../trigger/_triggerone';
import forEach from '../../_helpers/foreach';


// the function is called when something is removed from an array
// it undelegates asterisk listener from removed items
export default function arrayRemoveHandler({ removed }, {
  path,
  name,
  callback,
  context,
  info
} = triggerOne.latestEvent.info.delegatedData) {
  if (removed && removed.length) {
    forEach(removed, (item) => {
      if (item && typeof item === 'object') {
        undelegateListener(item, path, name, callback, context, info);
      }
    });
  }
}
