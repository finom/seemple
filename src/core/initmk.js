define(['matreshka_dir/var/magic'], function(magic) {
	return function(object) {
		object._initMK ? object._initMK() : magic.initMK(object);
		return object;
	};
});