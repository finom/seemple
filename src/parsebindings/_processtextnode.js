import parserData from './_parserdata';
import bindNode from '../bindnode';

// adds binding for text node
// it splits up one text node into simple text nodes and bound text nodes and removes original text node
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

    // tokens contains normal text as odd items
    // and bound keys as even items
    // 'foo{{x}}bar{{y}}baz{{z}}' -> ['foo', 'x', 'bar', 'y', 'baz', 'z', '']
    const tokens = textContent.split(bindingReg);

    // fragment contains all new text nodes
    const fragment = document.createDocumentFragment();

    nofn.forEach(tokens, (token, index) => {
        if(token) {
            const textNode = document.createTextNode(token);
            fragment.appendChild(textNode);

            // if tokens item is even then it is a key
            // which needs to be bound to newly created text node
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
