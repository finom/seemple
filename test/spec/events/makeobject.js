export default function makeObject(path = '') {
	path = path ? path.split('.') : [];
	const result = {};
	let obj = result,
		key;

	while (key = path.shift()) {
		obj = obj[key] = {};
	}

	return result;
}
