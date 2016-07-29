import matreshkaError from './matreshkaerror';

export default function(object, method) {
    const typeofObject = object === null ? 'null' : typeof object;

    if (typeofObject !== 'object') {
        throw matreshkaError('common:object_type', {
            object,
            method
        });
    }
}
