define([
	'matreshka_dir/core/util/common'
], function(util) {
	return typeof Symbol == 'undefined' ? 'mk-' + util.randomString() : Symbol('matreshka');
});