define('matreshka', [
	'matreshka_dir/matreshka.class',
	'matreshka_dir/matreshka-object.class',
	'matreshka_dir/matreshka-array.class'
], function(MK, MK_Object, MK_Array, MK_binders) {
	return MK;
});

define('balalaika', ['matreshka_dir/core/dom-lib/balalaika-extended'], function($b) {
	return $b;
});

define('xclass', ['matreshka_dir/xclass'], function(Class) {
	return Class;
});

define('matreshka-magic', ['matreshka_dir/matreshka-magic'], function(magic) {
	return magic;
});
