define(function() {
	return typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator';
});