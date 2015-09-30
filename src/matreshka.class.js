define([
	'matreshka_dir/xclass',
	'matreshka_dir/matreshka-magic',
	'matreshka_dir/matreshka/dynamic',
	'matreshka_dir/matreshka/static'
], function(Class, magic, dynamic, _static) {
	"use strict";
	if (!Class) {
		throw Error('Class function is missing');
	}

	if (![].forEach) {
		throw Error('Internet Explorer 8 requires to use es5-shim: https://github.com/es-shims/es5-shim');
	}

	_static.to = function(data) {
		var result,
			i;

		if (typeof data == 'object') {
			if ('length' in data) {
				result = [];
				for (i = 0; i < data.length; i++) {
					result[i] = MK.to(data[i]);
				}
				result = new MK.Array().recreate(result);
			} else {
				result = {};
				for (i in data) {
					if (data.hasOwnProperty(i)) {
						result[i] = MK.to(data[i]);
					}
				}
				result = new MK.Object(result);
			}
		} else {
			result = data;
		}

		return result;
	};

	var MK = Class(dynamic);
	return magic.extend(MK.Matreshka = MK.prototype.Matreshka = MK, magic, _static);
});
