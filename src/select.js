import defs from './_core/defs';
import dom from './_dom';
import selectNodes from './bindnode/_selectnodes';
import toArray from './_helpers/toarray';
import checkObjectType from './_helpers/checkobjecttype';

const customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;

export default function select(object, selector) {
    if (typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        selector = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'select');
    }

    if (customSelectorTestReg.test(selector)) {
        return selectNodes(object, selector)[0] || null;
    } else {
        const def = defs.get(object);

        if (!def || typeof selector !== 'string') {
            return null;
        }

        const propDef = def.props.sandbox;

        if (!propDef) {
            return null;
        }

        const { bindings } = propDef;

        if (bindings) {
            const { node } = bindings[0];
            return node.querySelector(selector);
        }

        return null;
    }
}
