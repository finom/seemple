export default function(obj, path) {
	var paths = typeof path == 'string' ? path.split('.') : path,
		current = obj,
		i;

	for (i = 0; i < paths.length; ++i) {
		if (typeof current[paths[i]] == 'undefined') {
			return undefined;
		} else {
			current = current[paths[i]];
		}
	}

	return current;
};
