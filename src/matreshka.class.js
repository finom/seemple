"use strict";
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

	var MK = Class(dynamic);

	return magic.extend(MK.Matreshka = MK.prototype.Matreshka = MK, magic, _static);
});
