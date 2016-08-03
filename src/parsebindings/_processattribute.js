import getBindingKey from './_getbindingkey';
import bindNode from '../bindnode';
import lookForBinder from '../lookforbinder';

const attributeBinder = {
    setValue(value) {
        this.value = value;
    }
};

// adds binding for an attribute
export default function processAttribute({
    node,
    attribute,
    object,
    eventOptions
}) {
    const { name, value } = attribute;
    const { type } = node;
    const key = getBindingKey({
        object,
        text: value
    })

    // check is this node probably default HTML5 form element
    if (name == 'value' && type != 'checkbox' && type != 'radio'
        || name == 'checked' && (type == 'checkbox' || type == 'radio')) {
        const defaultBinder = lookForBinder(node);


        // if deault binder is found then this is default HTML5 form element
        // remove the attribute and use found binder
        if(defaultBinder) {
            node.setAttribute(name, '');
            bindNode(object, key, node, defaultBinder, eventOptions);
        } else {
            // bind attribute
            bindNode(object, key, attribute, attributeBinder, eventOptions);
        }
    } else {
        // bind attribute
        bindNode(object, key, attribute, attributeBinder, eventOptions);
    }
}
