import defaultBinders from './defaultbinders';

export default function(node) {
    let result;

    for (let i = 0; i < defaultBinders.length; i++) {
        if (result = defaultBinders[i].call(node, node)) {
            return result;
        }
    }
}
