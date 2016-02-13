define([
	'matreshka_dir/xclass',
	'matreshka_dir/matreshka-magic',
	'matreshka_dir/matreshka/dynamic',
	'matreshka_dir/matreshka/static'
], function(Class, magic, dynamic, _static) {
	"use strict";

	/* istanbul ignore if  */
	if (!Class) throw Error('Class function is missing');

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

	var MK = Class(dynamic, _static);

	MK.setProto = function(proto) {
		/* jshint proto: true */
		var __proto__ = '__proto__',
			prototype = MK.prototype;

		if(Object.setPrototypeOf) {
			Object.setPrototypeOf(MK.prototype, proto);
		} else {
			if(!(__proto__ in MK.prototype)) {
				Object.defineProperty(
					prototype, __proto__,
					Object.getOwnPropertyDescriptor(Object.prototype, __proto__)
				);
			}

			MK.prototype[__proto__] = proto;
		}

		return MK;
	};

	return magic.extend(MK.Matreshka = MK.prototype.Matreshka = MK, magic);
});
