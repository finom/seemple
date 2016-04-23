define([
	'matreshka_dir/core/dom-lib/bquery'
], function($b) {
	"use strict";
	/* istanbul ignore if  */
	if(typeof window == 'undefined') {
		return;
	}
	var neededMethods = 'on off is add not find'.split(/\s/),
		dollar = typeof window.$ == 'function' ? window.$ : null,
		useDollar = true,
		fn,
		i;

	if (dollar) {
		fn = dollar.fn || dollar.prototype;
		for (i = 0; i < neededMethods.length; i++) {
			if (!fn[neededMethods[i]]) {
				useDollar = false;
				break;
			}
		}

		if (useDollar && !dollar.parseHTML) {
			dollar.parseHTML = $b.parseHTML;
		}
	} else {
		useDollar = false;
	}

	return useDollar ? dollar : $b;
});
