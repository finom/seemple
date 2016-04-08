define(function() {
	"use strict";
	return function() {
		var _this = this,
			i = 0;
		return {
			next: function() {
				if (i > _this.length - 1) {
					return {
						done: true
					};
				} else {
					return {
						done: false,
						value: _this[i++]
					};
				}
			}
		};
	};
});
