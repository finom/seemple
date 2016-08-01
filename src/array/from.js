export default function from() {
    var result = new MK.Array(),
		i;

	result.length = arrayLike.length;

	for (i = 0; i < arrayLike.length; i++) {
		result[i] = mapFn ? mapFn.call(thisArg, arrayLike[i], i, arrayLike) : arrayLike[i];
	}

	return result;
}
