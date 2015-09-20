define([
	'matreshka_dir/core/dom-lib/balalaika-extended'
], function($b) {
	"use strict";
	var neededMethods = 'on off is hasClass addClass removeClass toggleClass add not find'.split(/\s+/),
		dollar = typeof window.$ == 'function' ? window.$ : null,
		useDollar = true,
		i;

	if (dollar) {
		for (i = 0; i < neededMethods.length; i++) {
			if (!dollar.prototype[neededMethods[i]]) {
				useDollar = false;
				break;
			}
		}

		if (!dollar.parseHTML) {
			useDollar = false;
		}
	} else {
		useDollar = false;
	}

	return useDollar ? dollar : $b;
});
