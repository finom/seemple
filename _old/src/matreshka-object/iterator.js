define([], function() {
	"use strict";
	return function() {
		var _this = this,
			keys = _this.keys(),
			i = 0;

		return {
			next: function() {
				if (i > keys.length - 1) {
					return {
						done: true
					};
				} else {
					return {
						done: false,
						value: _this[keys[i++]]
					};
				}
			}
		};
	};
});
