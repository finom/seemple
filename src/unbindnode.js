import checkObjectType from './_util/checkobjecttype';
import initMK from './_core/init';

export default function unbindNode(object, key, node, evt) {
	checkObjectType(object, 'unbindNode');

	const { props } = initMK(object);
	const propDef = props[key];

	if (key instanceof Array) {
		for (i = 0; i < key.length; i++) {
			evt = node;
			unbindNode(object, key[i][0], key[i][1] || evt, evt);
		}

		return object;
	}
}
