define([
	'matreshka_dir/matreshka.class',
	'matreshka_dir/core/var/map',
	'matreshka_dir/matreshka-array/native-dynamic',
	'matreshka_dir/matreshka-array/native-static',
	'matreshka_dir/matreshka-array/custom-dynamic',
	'matreshka_dir/matreshka-array/triggermodify',
	'matreshka_dir/matreshka-array/processrendering',
	'matreshka_dir/matreshka-array/iterator',
	'matreshka_dir/core/var/sym-iterator'
], function(MK, map, nDynamic, nStatic, cDynamic, triggerModify, processRendering, iterator, symIterator) {
	"use strict";

	/* istanbul ignore if  */
	if (!MK) throw new Error('Matreshka is missing');

	var prototype = {
		'extends': MK,
		isMKArray: true,
		length: 0,
		itemRenderer: null,
		renderIfPossible: true,
		Model: null,
		constructor: function MatreshkaArray(length) {
			/* istanbul ignore if  */
			if(!(this instanceof MatreshkaArray)) {
				throw new TypeError('Cannot call a class as a function');
			}

			var _this = this._initMK(),
				al = arguments.length,
				i;
			if (al == 1 && typeof length == 'number') {
				_this.length = length;
			} else {
				for (i = 0; i < al; i++) {
					_this[i] = arguments[i];
				}
				_this.length = al;
			}

			return _this;
		},

		_initMK: function() {
			var _this = this,
				changeModel;

			if (map.has(_this)) return _this;

			if('Model' in _this && _this.Model !== null && typeof _this.Model != 'function') {
				throw Error('Only function or null are valid values for Model, not "' + typeof _this.Model + '"');
			}

			changeModel = function() {
				var Model = _this.Model;
				if (Model) {
					_this.mediateItem(function(item, i) {
						return !item || !(item.instanceOf ? item.instanceOf(Model) : item instanceof Model)
							? new Model(item && item.toJSON ? item.toJSON() : item, _this, i) : item;
					});
				}
			};

			MK.prototype._initMK.call(_this);

			MK._fastAddListener(_this, 'change:Model', changeModel);

			MK._fastAddListener(_this, 'change:itemRenderer', function(evt) {
				_this.rerender({
					forceRerender: evt && ('forceRerender' in evt) ? evt.forceRerender : true
				});
			});

			changeModel();

			return _this;
		},

		toJSON: function() {
			var _this = this,
				JSON = [],
				l = _this.length,
				i;

			for (i = 0; i < l; i++) {
				_this[i] && _this[i].toJSON ? JSON[i] = _this[i].toJSON() : JSON[i] = _this[i];
			}

			return JSON;
		},

		hasOwnProperty: function(p) {
			return p == 'length' || p < this.length && p >= 0;
		}
	};

	MK.extend(prototype, nDynamic, cDynamic);

	prototype[symIterator] = iterator;

	MK.Array = MK.Class(prototype, nStatic);

	return MK.Array;
});
