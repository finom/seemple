import delegateListener from './_delegatelistener';
import removeTreeListener from '../off/_removetreelistener';

// creates tree listener
function getTreeListener({ handler, restPath }) {
    const newHandler = function treeListener(changeEvt) {
        const newChangeEvent = nofn.assign({ restPath }, changeEvt);
        const { previousValue, value } = changeEvt;

        // removes listener for all branches of the path on old object
        if(previousValue && typeof previousValue === 'object') {
            removeTreeListener(previousValue, restPath, handler);
        }

        // adds listener for all branches of "restPath" path on newly assigned object
        if(value && typeof value === 'object') {
            addTreeListener(value, restPath, handler);
        }

        // call original handler
        handler.call(this, newChangeEvent);
    }

    newHandler._callback = handler;

    return newHandler;
}

// listens changes for all branches of given path
// TODO pass context
// TODO pass info
export default function addTreeListener(object, deepPath, handler) {
    if(typeof deepPath === 'string') {
        deepPath = deepPath.split('.');
    }

    // iterate over all keys and delegate listener for all objects of given branch
    for(let i = 0; i < deepPath.length; i++) {
        // TODO slice method is slow
        const listenPath = deepPath.slice(0, i);
        const restPath = deepPath.slice(i + 1);

        delegateListener(
            object,
            listenPath,
            `_change:tree:${deepPath[i]}`,
            getTreeListener({
                handler,
                restPath
            })
        );
    }
}
