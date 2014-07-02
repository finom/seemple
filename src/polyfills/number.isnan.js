(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        factory();
    }
}(this, function () {
	Number.isNaN = Number.isNaN || function(value) {
		return typeof value === 'number' && isNaN(value);
	};
}));