"use strict";
define([
	'matreshka_dir/polyfills/addeventlistener'
], function() {
	"use strict";
	// nsRegAndEvents is regesp for eventname.namespace and the list of all events
	// fn is empty array and balalaika prototype
	return (function(window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $) {
		$ = function(s, context) {
			return new $.i(s, context);
		};

		$.i = function(s, context) {
			fn.push.apply(this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test(s) ? ((i = document.createElement(context || 'div')).innerHTML = s, i.children) : (context && $(context)[0] || document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : 'length' in s ? s : [s]);
		};

		$.i[l = 'prototype'] = ($.extend = function(obj) {
			k = arguments;
			for (i = 1; i < k.length; i++) {
				if (l = k[i]) {
					for (j in l) {
						obj[j] = l[j];
					}
				}
			}

			return obj;
		})($.fn = $[l] = fn, { // $.fn = $.prototype = fn
			is: function(s) {
				i = this[0];
				j = !!i && (i.matches || i['webkit' + s_MatchesSelector] || i['moz' + s_MatchesSelector]
						|| i['ms' + s_MatchesSelector] || i['o' + s_MatchesSelector]);
				return !!j && j.call(i, s);
			}
		});
		return $;
	})(window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector');
});
