import defaultBinders from './defaultbinders';

export default function(node) {
    var result,
        i;

    for (i = 0; i < defaultBinders.length; i++) {
        if (result = defaultBinders[i].call(node, node)) {
            return result;
        }
    }
}
