define(function() {
	"use strict";
	return typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator';
});
