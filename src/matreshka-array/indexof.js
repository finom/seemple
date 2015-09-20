define([
	'matreshka_dir/core/var/isxdr'
], function(isXDR) {
	"use strict";
	return isXDR ? function(sought) {
		var _this = this,
			l = _this.length,
			i, item,
			isMK = sought && sought.isMK;

		for (i = 0; i < l; i++) {
			item = _this[i];
			if (isMK ? sought.eq(item) : sought === item) {
				return i;
			}
		}

		return -1;
	} : Array.prototype.indexOf;
});
