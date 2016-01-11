define([
	'matreshka_dir/matreshka.class',
	'matreshka_dir/core/var/isxdr',
	'matreshka_dir/core/util/common',
	'matreshka_dir/matreshka-array/triggermodify',
	'matreshka_dir/matreshka-array/indexof',
	'matreshka_dir/matreshka-array/lastindexof',
	'matreshka_dir/matreshka-array/recreate',
], function(MK, isXDR, util, triggerModify, indexOf, lastIndexOf, recreate) {
	"use strict";
	var methods = {},
		Array_prototype = Array.prototype,
		toArray = util.toArray;

	function createMethod(name, hasOptions) {
		switch (name) {
			case 'forEach':
				return function(callback, thisArg) {
					var _this = this;
					Array_prototype[name].call(isXDR ? toArray(_this) : _this, callback, thisArg);
					return _this;
				};
			case 'map':
			case 'filter':
			case 'slice':
				return function(a, b) {
					var _this = this;
					return MK.Array.from(Array_prototype[name].call(isXDR ? toArray(_this) : _this, a, b));
				};
			case 'every':
			case 'some':
			case 'reduce':
			case 'reduceRight':
			case 'join':
				return function(a, b) {
					var _this = this;
					return Array_prototype[name].call(isXDR ? toArray(_this) : _this, a, b);
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

					if (isXDR) {
						array = toArray(_this);
						returns = Array_prototype[name].call(array, a);
						recreate(_this, array);
					} else {
						returns = Array_prototype[name].call(_this, a);
					}

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


					if (isXDR) {
						array = toArray(_this);
						returns = Array_prototype[name].call(array);
						recreate(_this, array);
					} else {
						returns = Array_prototype[name].call(_this);
					}

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
						if(i >= 2) {
							added[i - 2] = args[i];
						}
					}

					start = args[0];

					evt = hasOptions ? args[argsLength - 1] || {} : {};

					start = start < 0 ? length + start : start;

					if (hasOptions) {
						args.pop();
						argsLength--;
					}

					if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
						for(i = 2; i < args.length; i++) {
							args[i] = _this._itemMediator.call(_this, args[i], start + i - 2);
						}
					}

					if (isXDR) {
						array = toArray(_this);
						returns = Array_prototype[name].apply(array, args);
						recreate(_this, array);
					} else {
						returns = Array_prototype[name].apply(_this, args);
					}

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


	'push pop unshift shift sort reverse splice map filter slice every some reduce reduceRight forEach join'
	.split(' ').forEach(function(name) {
		methods[name] = createMethod(name);
	});

	'push pop unshift shift sort reverse splice'.split(' ').forEach(function(name) {
		methods[name + '_'] = createMethod(name, 1);
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

	// es5-shim doesn't help with indexOf and lastIndexOf
	methods.indexOf = indexOf;
	methods.lastIndexOf = lastIndexOf;

	return methods;
});
