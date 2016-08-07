const bindingErrorPrefix = 'Binding error:';
const calcErrorPrefix = 'Calc error:';
const eventsErrorPrefix = 'Events error:';

const getType = variable => {
    if(variable === null) {
        return 'null';
    }

    return typeof variable;
};
const getTypeError = (variable, variableName, expectedType) =>
    `${variableName} must have type "${expectedType}" but got "${getType(variable)}" instead.`

const errors = {
    'binding:node_missing': ({ key, node }) => {
        const selectorInfo = typeof node === 'string' ? ` (given selector is "${node}")` : '';
        return `${bindingErrorPrefix} node is missing for key "${key}"${selectorInfo}.`;
    },
    'binding:falsy_key': () => 'Binding error: "key" arg cannot be falsy',
    'binding:instance_nodes_missing': ({ $nodes }) => {
        const missing = !$nodes ? '$nodes' : 'nodes';
        return `${bindingErrorPrefix} "${missing}" property of Matreshka instance is missing. `
            + 'It must be an object and must not be reassigned.';
    },
    'common:object_type': ({ object, method }) => `Error in ${method}: ${getTypeError(object, 'object', 'object')}`,
    'calc:target_type': ({ target }) =>
        `${calcErrorPrefix} ${getTypeError(target, 'target key', 'string')}`,
    'calc:source_key_type': ({ sourceKey }) =>
        `${calcErrorPrefix} ${getTypeError(sourceKey, 'source key', 'string')}`,
    'calc:source_object_type': ({ sourceObject }) =>
        `${calcErrorPrefix} ${getTypeError(sourceObject, 'source object', 'object')}`,
    'calc:source_type': ({ source }) =>
        `${calcErrorPrefix} ${getTypeError(source, 'source', 'object')}`,
    'trigger:names_type': ({ names }) =>
        `${eventsErrorPrefix} ${getTypeError(names, 'event name', 'string')}`,
    'on:names_type': () => errors['trigger:names_type'](),
    'common:call_class': () => 'Cannot call a class as a function',
    'removedatakeys:key_type': ({ key }) => `Error in removeDataKeys: ${getTypeError(key, 'key', 'string')}`,
    'adddatakeys:key_type': ({ key }) => `Error in addDataKeys: ${getTypeError(key, 'key', 'string')}`,
    'remove:key_type': ({ key }) => `Error in remove: ${getTypeError(key, 'key', 'string')}`,
    'mediate:key_type': ({ key }) => `Error in mediate: ${getTypeError(key, 'key', 'string')}`,
    'pull:to_remove_type': ({ toRemove }) => `Error in pull: ${getTypeError(toRemove, 'toRemove', 'number')}`,
    'array:model_type': ({ Model }) => `Matreshka.Array error: ${getTypeError(Model, 'Model', 'function')}`,
    'array:add_render_twice': () => 'Matreshka.Array error: you have inserted one rendered object twice.',
    'array:rendered_number_nodes': ({ length }) => `Matreshka.Array error: renderer returned ${length} nodes instead of one. `
        + ( length > 0 ? 'To fix this wrap these nodes by single node.' : '' ),
    'array:renderer_node_missing': ({ selector }) => `Matreshka.Array error: renderer node is missing (given selector is "${selector}")`
};

export default function matreshkaError(key, data) {
    const getError = errors[key];
    if (!getError) {
        throw Error(`Unknown error "${key}". Please report about this on Github.`);
    }

    return new Error(getError(data));
}
