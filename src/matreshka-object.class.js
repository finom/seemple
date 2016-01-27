define([
	'matreshka_dir/matreshka.class',
	'matreshka_dir/matreshka-object/dynamic',
	'matreshka_dir/matreshka-object/iterator',
	'matreshka_dir/core/var/sym-iterator',
	'matreshka_dir/core/var/map'
], function(MK, dynamic, iterator, symIterator, map) {
	"use strict";

	/* istanbul ignore if  */
	if (!MK)  throw new Error('Matreshka is missing');

	var i,
		prototype = {
			'extends': MK,
			isMKObject: true,
			renderer: null,
			constructor: function MatreshkaObject(object) {
				/* istanbul ignore if  */
				if(!(this instanceof MatreshkaObject)) {
					throw new TypeError('Cannot call a class as a function');
				}

				return this.jset(object);
			},

			_initMK: function() {
				var _this = this,
					objectData,
					addedEvents;

				if (map.has(_this)) return _this;

				MK.prototype._initMK.call(_this);

				objectData =  map.get(_this);

				objectData.keys = {};

				MK._fastAddListener(_this, 'addevent:modify', function(evt) {
					if (!addedEvents) {
						MK._fastAddListener(_this, 'change', function(evt) {
							if (evt && (evt.key in objectData.keys) && !evt.silent) {
								MK._fastTrigger(_this, 'modify', evt);
							}
						});

						MK._fastAddListener(_this, 'delete', function(evt) {
							if (evt && (evt.key in objectData.keys)) {
								delete objectData.keys[evt.key];

								if (!evt.silent) {
									MK._fastTrigger(_this, 'remove', evt);
									MK._fastTrigger(_this, 'modify', evt);
								}
							}
						});

						addedEvents = true;
					}
				});

				return _this;
			},

			hasOwnProperty: function(key) {
				return map.get(this._initMK()).keys.hasOwnProperty(key);
			}
		};

	MK.extend(prototype, dynamic);

	prototype[symIterator] = iterator;

	return MK.Object = MK.Class(prototype);
});
