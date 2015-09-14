define([
	'matreshka_dir/xclass'
], function(Class) {
	return {
		version: 'dev',
		Class: Class,
		isXDR: Class.isXDR,
		to: function(data) {
			var result,
				i;

			if (typeof data == 'object') {
				if ('length' in data) {
					result = [];
					for (i = 0; i < data.length; i++) {
						result[i] = MK.to(data[i]);
					}
					result = new MK.Array().recreate(result);
				} else {
					result = {};
					for (i in data)
						if (data.hasOwnProperty(i)) {
							result[i] = MK.to(data[i]);
						}
					result = new MK.Object(result);
				}
			} else {
				result = data;
			}

			return result;
		}
	};
});