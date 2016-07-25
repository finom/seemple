const bindingErrorPrefix = 'Binding error:';

const errors = {
    'binding:node_missing': ({ key, node }) => {
        const selectorInfo = typeof node === 'string' ? ` The selector is ${node}` : '';
        return `${bindingErrorPrefix} node is missing for ${key}.${selectorInfo}`;
    },
    'binding:falsy_key': () => 'Binding error: "key" arg cannot be falsy',
    'binding:instance_nodes_missing': ({ $nodes }) => {
        const missing = !$nodes ? '$nodes' : 'nodes';
        return `${bindingErrorPrefix} "${missing}" property of Matreshka instance is missing. `
            + 'It must be an object and must not be reassigned.';
    },
    'common:object_type': ({ type, method }) =>
		`Method "${method}" does not accept ${type} as target object`;
};

export default function matreshkaError(key, data) {
    const getError = errors[key];
    if(!getError) {
        throw Error(`Unknown error "${key}"`);
    }

    return new Error(errors[key](data));
}
