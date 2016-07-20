import MatreshkaError from './matreshkaerror';

export default function(object, method) {
	const typeofObject = object === null ? 'null' : typeof object;

    if(typeofObject !== 'object') {
        throw MatreshkaError('common:object_type', {
            type: typeofObject,
            method
        });
    }
}
