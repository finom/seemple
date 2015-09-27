define([
	'matreshka_dir/core/var/core'
], function(core) {
	"use strict";
	var extend = function(o1, o2) {
			var i, j;
			if (o1)
				for (i = 1; i < arguments.length; i++) {
					o2 = arguments[i];
					if (o2)
						for (j in o2)
							if (o2.hasOwnProperty(j)) {
								o1[j] = o2[j];
							}
				}
			return o1;
		},
		util = {
			extend: extend,

			trim: function(s) {
				return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, '');
			},

			randomString: function() {
				return (new Date().getTime() - new Date(2013, 4, 3).getTime()).toString(36) + Math.floor(Math.random() * 1679616).toString(36);
			},

			toArray: function(object, start) {
				var array = [],
					l = object.length,
					i;

				start = start || 0;

				for (i = start; i < l; i++) {
					array[i - start] = object[i];
				}

				return array;
			},

			debounce: function(f, d, thisArg) {
				var timeout;
				if (typeof d !== 'number') {
					thisArg = d;
					d = 0;
				}

				return function() {
					var args = arguments,
						ctx = this;
					clearTimeout(timeout);
					timeout = setTimeout(function() {
						f.apply(thisArg || ctx, args);
					}, d || 0);
				};
			},

			each: function(o, f, thisArg) {
				if (!o) return;
				if (o.isMK && typeof o.each == 'function') o.each(f, thisArg);
				else if ('length' in o)[].forEach.call(o, f, thisArg);
				else
					for (var i in o)
						if (o.hasOwnProperty(i)) {
							f.call(thisArg, o[i], i, o);
						}
				return o;
			},

			delay: function(object, f, delay, thisArg) {
				if (typeof delay == 'object') {
					thisArg = delay;
					delay = 0;
				}

				setTimeout(function() {
					f.call(thisArg || object);
				}, delay || 0);

				return object;
			},

			deepFind: function(obj, path) {
				var paths = path.split('.'),
					current = obj,
					i;

				for (i = 0; i < paths.length; ++i) {
					if (typeof current[paths[i]] == 'undefined') {
						return undefined;
					} else {
						current = current[paths[i]];
					}
				}

				return current;
			},

			noop: function() {}
		};

	extend(core, util);

	return util;
});
