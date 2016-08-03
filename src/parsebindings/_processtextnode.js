import getBindingKey from './_getbindingkey';
import bindNode from '../bindnode';

const textNodeBinder = {
    setValue(value) {
        this.textContent = value;
    }
};

// adds bindings to text node
export default function processTextNode({
    object,
    node,
    eventOptions
}) {
    const { textContent } = node;
    const key = getBindingKey({
        object,
        text: textContent
    });

    bindNode(object, key, node, textNodeBinder, eventOptions);
}
