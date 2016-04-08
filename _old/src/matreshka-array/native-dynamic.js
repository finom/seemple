define([
	'matreshka_dir/matreshka.class',
	'matreshka_dir/core/util/common',
	'matreshka_dir/matreshka-array/triggermodify',
	'matreshka_dir/matreshka-array/recreate'
], function(MK, util, triggerModify, recreate) {
	"use strict";
	var methods = {},
		Array_prototype = Array.prototype,
		toArray = util.toArray;

	function createMethod(name, hasOptions) {
		switch (name) {
			case 'forEach':
				return function(callback, thisArg) {
					var _this = this;
					Array_prototype[name].call(_this, callback, thisArg);
					return _this;
				};
			case 'map':
			case 'filter':
			case 'slice':
				return function(a, b) {
					var _this = this;
					return MK.Array.from(Array_prototype[name].call(_this, a, b));
				};
			case 'every':
			case 'some':
				return function(callback, thisArg) {
					var _this = this;
					return Array_prototype[name].call(_this, callback, thisArg);
				};
			case 'join':
				return function(separator) {
					var _this = this;
					return Array_prototype[name].call(_this, separator || ',');
				};
			case 'indexOf':
			case 'lastIndexOf':
				return function(item) {
					var _this = this;
					return Array_prototype[name].call(_this, item);
				};
			case 'reduce':
			case 'reduceRight':
				return function() {
					var _this = this;
					return Array_prototype[name].apply(_this, arguments);
				};
			case 'sort':
			case 'reverse':
				return function(a, b) {
					if (this.length <= 1) return _this;

					var _this = this._initMK(),
						evt,
						array,
						returns,
						i,
						_evt;

					evt = hasOptions ? ( name == 'sort' && b ? b : a ) || {} : {};

					returns = Array_prototype[name].call(_this, a);

					_evt = {
						method: name,
						self: _this,
						added: [],
						removed: []
					};

					for (i in evt) {
						_evt[i] = evt[i];
					}

					triggerModify(_this, _evt, name);

					return _this;
				};

			case 'pop':
			case 'shift':
				return function(evtOptions) {
					if (!this.length) return;

					var _this = this._initMK(),
						evt,
						array,
						returns,
						added,
						removed,
						i,
						_evt;

					evt = hasOptions ? evtOptions || {} : {};

					returns = Array_prototype[name].call(_this);

					_evt = {
						method: name,
						self: _this,
						added: added = [],
						removed: removed = [returns]
					};

					for (i in evt) {
						_evt[i] = evt[i];
					}

					triggerModify(_this, _evt, name);

					return returns;
				};
			case 'push':
			case 'unshift':
				return function() {
					var _this = this._initMK(),
						_arguments = arguments,
						args = new Array(_arguments.length),
						length = _this.length,
						argsLength = args.length,
						evt,
						array,
						returns,
						added,
						removed,
						i,
						_evt;

	  				for (i = 0; i < argsLength; i++) {
						args[i] = _arguments[i];
					}

					evt = hasOptions ? args[argsLength - 1] || {} : {};

					if (hasOptions) {
						args.pop();
						argsLength--;
					}


					if (!argsLength) {
						return length;
					}

					if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
						for (i = 0; i < argsLength; i++) {
							args[i] = _this._itemMediator.call(_this, args[i], name == 'push' ? i + length : i);
						}
					}

					if(name == 'push') {
						for(i = 0; i < argsLength; i++) {
							_this[length + i] = args[i];
						}
					} else if(name == 'unshift') {
						for(i = length - 1; i >= 0; i--) {
							_this[argsLength + i] = _this[i];
						}

						for(i = 0; i < argsLength; i++) {
							_this[i] = args[i];
						}
					}


					_this.length = length = length + argsLength;

					_evt = {
						method: name,
						self: _this,
						added: args,
						removed: []
					};

					for (i in evt) {
						_evt[i] = evt[i];
					}

					triggerModify(_this, _evt, name);

					return length;
				};
			case 'splice':
				return function() {
					var _this = this._initMK(),
						_arguments = arguments,
						args = new Array(_arguments.length),
						length = _this.length,
						argsLength = args.length,
						added = [],
						start,
						evt,
						array,
						returns,
						removed,
						i,
						_evt;

					for (i = 0; i < argsLength; i++) {
						args[i] = _arguments[i];
					}

					start = args[0];

					evt = hasOptions ? args[argsLength - 1] || {} : {};

					start = start < 0 ? length + start : start;

					if (hasOptions) {
						args.pop();
						argsLength--;
					}

					if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
						for(i = 2; i < argsLength; i++) {
							args[i] = _this._itemMediator.call(_this, args[i], start + i - 2);
						}
					}

					for (i = 2; i < argsLength; i++) {
						if(i >= 2) {
							added[i - 2] = args[i];
						}
					}

					returns = Array_prototype[name].apply(_this, args);

					removed = returns;

					if (added.length || removed.length) {
						_evt = {
							args: args,
							method: name,
							self: _this,
							added: added,
							removed: removed
						};

						for (i in evt) {
							_evt[i] = evt[i];
						}

						triggerModify(_this, _evt, name);
					}

					return MK.Array.from(returns);
				};
		}
	}


	'push pop unshift shift sort reverse splice map filter slice every some reduce reduceRight forEach join indexOf lastIndexOf'
	.split(' ').forEach(function(name) {
		methods[name] = createMethod(name);
	});

	'push pop unshift shift sort reverse splice'.split(' ').forEach(function(name) {
		methods[name + '_'] = createMethod(name, true);
	});

	methods.each = methods.forEach;

	methods.concat = function() {
		var args = arguments,
			result = this.toArray(),
			arg,
			i,
			j;

		for (i = 0; i < args.length; i++) {
			arg = args[i];
			if (arg instanceof Array || arg instanceof MK.Array || arg && arg.instanceOf && arg.instanceOf(MK.Array)) {
				for (j = 0; j < arg.length; j++) {
					result.push(arg[j]);
				}
			}
		}

		return MK.Array.from(result);
	};

	methods.toString = function() {
		return this.toArray().join(',');
	};


	return methods;
});
