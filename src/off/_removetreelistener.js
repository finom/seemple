import undelegateListener from './_undelegatelistener';

// removes tree listener from all object tree of fiven path
// TODO pass context
// TODO pass info
export default function removeTreeListener(object, deepPath, handler) {
    if(typeof deepPath === 'string') {
        deepPath = deepPath.split('.');
    }

    // iterate over keys of the path and undelegate given handler (can be undefined)
    for(let i = 0; i < deepPath.length; i++) {
        // TODO slice is slow
        const listenPath = deepPath.slice(0, i);

        undelegateListener(
            object,
            listenPath,
            `_change:tree:${deepPath[i]}`,
            handler
        );
    }
}
