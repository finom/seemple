import parserData from './_parserdata';
import bindNode from '../bindnode';

export default function processTextNode({
    object,
    node,
    textNode,
    eventOptions
}) {
    const {
        bindingReg,
        strictBindingReg
    } = parserData;

    const { textContent } = textNode;
    const { document } = window;

    bindingReg.lastIndex = 0;

    const tokens = textContent.split(bindingReg);
    const fragment = document.createDocumentFragment();

    nofn.forEach(tokens, (token, index) => {
        if(token) {
            const textNode = document.createTextNode(token);
            fragment.appendChild(textNode);

            if(index % 2 !== 0) {
                bindNode(object, token, textNode, {
                    setValue(value) {
                        this.textContent = value;
                    }
                }, eventOptions);
            }
        }
    });

    node.insertBefore(fragment, textNode);
    node.removeChild(textNode);
}
