define([], function() {
	"use strict";
	return function(_this, array) {
		array = array || [];
		var diff = _this.length - array.length,
			prepared,
			i;

		for (i = 0; i < array.length; i++) {
			_this[i] = array[i];
		}

		for (i = 0; i < diff; i++) {
			_this.remove(i + array.length, {
				silent: true
			});
		}

		_this.length = array.length;

		return _this;
	};
});
