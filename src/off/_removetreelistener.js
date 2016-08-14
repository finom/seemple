import undelegateListener from './_undelegatelistener';

// removes tree listener from all object tree of fiven path
// TODO: Pass context to removeTreeListener
// TODO: Pass info to removeTreeListener
export default function removeTreeListener(object, deepPath, handler) {
    if (typeof deepPath === 'string') {
        deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
    }

    // iterate over keys of the path and undelegate given handler (can be undefined)
    for (let i = 0; i < deepPath.length; i++) {
        // TODO: Array.prototype.slice is slow
        const listenPath = deepPath.slice(0, i);

        undelegateListener(
            object,
            listenPath,
            `_change:tree:${deepPath[i]}`,
            handler
        );
    }
}
