define([
	'matreshka_dir/core/var/core'
], function(core) {
	"use strict";
	var extend = function(o1, o2) {
			var i, j;
			if (o1) {
				for (i = 1; i < arguments.length; i++) {
					o2 = arguments[i];
					if (o2) {
						for (j in o2) {
							if (o2.hasOwnProperty(j)) {
								o1[j] = o2[j];
							}
						}
					}
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
				if (o.isMK && typeof o.each == 'function') {
					o.each(f, thisArg);
				} else if ('length' in o) {
					[].forEach.call(o, f, thisArg);
				} else {
					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							f.call(thisArg, o[i], i, o);
						}
					}
				}
				return o;
			},

			deepFind: function(obj, path) {
				var paths = typeof path == 'string' ? path.split('.') : path,
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

			noop: function() {},

			orderBy: function(arr, keys, orders) {
				var defaultOrder = 'asc',
					newArr,
					length,
					i,
					commonOrder;

				if ('length' in arr && typeof arr == 'object') {
					if (!(orders instanceof Array)) {
						commonOrder = orders || defaultOrder;
					}

					length = arr.length;

					newArr = Array(length);

					for(i = 0; i < length; i++) {
						newArr[i] = arr[i];
					}

					if(!keys) return newArr;

					keys = keys instanceof Array ? keys : [keys];

					return newArr.sort(function(a, b) {
						var length = keys.length,
							i,
							order,
							key;

						if(a && b) {
							for (i = 0; i < length; i++) {
								key = keys[i];
								order = (commonOrder || orders[i]) != 'desc' ? -1 : 1;

								if (a[key] > b[key]) {
									return -order;
								} else if (a[key] < b[key]) {
									return order;
								}
							}
						}

						return 0;
					});
				} else {
					return [];
				}
			}
		};

	function PseudoMap() {}



	extend(PseudoMap.prototype, {
		get: function(obj) {
			return obj.matreshkaData;
		},
		set: function(obj, data) {
			Object.defineProperty(obj, 'matreshkaData', {
				value: data,
				enumerable: false,
				writable: false,
				configurable: false
			});
		},
		has: function(obj) {
			return 'matreshkaData' in obj;
		}
	});

	util.PseudoMap = PseudoMap;

	extend(core, util);

	return util;
});
