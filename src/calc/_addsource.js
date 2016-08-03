import addListener from '../on/_addlistener';
import addTreeListener from '../on/_addtreelistener';
import matreshkaError from '../_helpers/matreshkaerror';

// adds source to a source list and adds event listener to a source
export default function addSource({
	calcHandler,
	object,
	allSources,
	sourceKey,
	sourceObject
}) {
	let isDelegated = false;

	// source key must be a string
	if(typeof sourceKey !== 'string') {
		throw matreshkaError('calc:source_key_type', { sourceKey });
	}

	// source object must be an object
	if(!sourceObject || typeof sourceObject !== 'object') {
		throw matreshkaError('calc:source_object_type', { sourceObject });
	}

	const deepPath = sourceKey.split('.');
	const deepPathLength = deepPath.length;

	// if something like a.b.c is used as a key
	if(deepPath.length > 1) {
		isDelegated = true;
		// TODO avoid collisions with bindings by using another event name instead of _change:tree:...
		addTreeListener(object, deepPath, calcHandler);
	} else {
		// normal handler
		addListener(object, `_change:deps:${sourceKey}`, calcHandler);
	}

	allSources.push({
		sourceKey,
		sourceObject,
		isDelegated
	});
}
