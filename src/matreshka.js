if ( typeof define === 'function' && define.amd ) {
	define( 'matreshka', [
		'matreshka_dir/matreshka-core',
		'matreshka_dir/matreshka-object',
		'matreshka_dir/matreshka-array',
		'matreshka_dir/matreshka-binders'
	], function( MK, MK_Object, MK_Array, MK_binders ) {
		return MK;
	});
}