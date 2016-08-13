import defs from './_core/defs';
import dom from './_dom';
import selectNodes from './bindnode/_selectnodes';
import toArray from './_helpers/toarray';
import checkObjectType from './_helpers/checkobjecttype';

const customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;

export default function selectAll(object, selector) {
    if(typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        selector = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'selectAll or $');
    }


    if (customSelectorTestReg.test(selector)) {
        return selectNodes(object, selector);
    } else {
        const result = dom.$();
        const def = defs.get(object);

        if (!def || typeof selector !== 'string') {
            return result;
        }

        const propDef = def.props.sandbox;

        if (!propDef) {
            return result;
        }

        const { bindings } = propDef;

        if(bindings) {
            nofn.forEach(bindings, ({ node }) => {
                const selected = node.querySelectorAll(selector);
                result = result.add(toArray(selected));
            });
        }

        return result;
    }
};
