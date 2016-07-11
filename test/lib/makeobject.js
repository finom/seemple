// creates nested object based on path and lastValue
// example: makeObject('a.b.c', 42) -> {a: {b: {c; 42}}}
export default function makeObject(path = '', lastValue = {}) {
	path = path ? path.split('.') : [];
	const result = {};
	let obj = result,
		key;


	while (path.length > 1) {
		key = path.shift();
		obj = obj[key] = {};
	}

	obj[path.shift()] = lastValue;

	return result;
}
