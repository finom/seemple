define([
	'matreshka_dir/matreshka.class'
], function(MK) {
	"use strict";
	return {
		of: function() {
			var result = new MK.Array(),
				args = arguments,
				i;

			result.length = args.length;

			for (i = 0; i < args.length; i++) {
				result[i] = args[i];
			}

			return result;
		},

		// Doesn't work with maps and sets yet
		from: function(arrayLike, mapFn, thisArg) {
			var result = new MK.Array(),
				i;

			result.length = arrayLike.length;

			for (i = 0; i < arrayLike.length; i++) {
				result[i] = mapFn ? mapFn.call(thisArg, arrayLike[i], i, arrayLike) : arrayLike[i];
			}

			return result;
		}
	};
});
