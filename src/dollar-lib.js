(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['matreshka_dir/balalaika-extended'], factory);
    } else {
        root.__DOLLAR_LIB = factory( root.$b );
    }
}(this, function ( $b ) {
	var neededMethods = ["on", "off", "is", "hasClass", "addClass", "removeClass", "toggleClass", "add", "find"],
		neededStaticMethods = [ 'parseHTML' ],
		$ = (function(){return this;})().$,
		useCurrentDollar = true,
		i;
	
	if( typeof $ === 'function' ) {
		for( i = 0; i < neededMethods.length; i++ ) {
			if( !$.prototype[ neededMethods[ i ] ] ) {
				useCurrentDollar = false;
				break;
			}
		}
		
		for( i = 0; i < neededStaticMethods.length; i++ ) {
			if( !$[ neededStaticMethods[ i ] ] ) {
				useCurrentDollar = false;
				break;
			}
		}
	} else {
		useCurrentDollar = false;
	}
	
    return useCurrentDollar ? $ : $b;
}));