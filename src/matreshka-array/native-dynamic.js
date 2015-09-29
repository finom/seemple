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
		var i,
			_evt;


		switch (name) {
			case 'forEach':
				return function() {
					var _this = this;
					Array_prototype[name].apply(isXDR ? toArray(_this) : _this, arguments);
					return _this;
				};
			case 'map':
			case 'filter':
			case 'slice':
				return function() {
					var _this = this;
					return MK.Array.from(Array_prototype[name].apply(isXDR ? toArray(_this) : _this, arguments));
				};
			case 'every':
			case 'some':
			case 'reduce':
			case 'reduceRight':
			case 'join':
				return function() {
					var _this = this;
					return Array_prototype[name].apply(isXDR ? toArray(_this) : _this, arguments);
				};
			case 'sort':
			case 'reverse':
				return function() {
					if (this.length <= 1) return _this;

					var _this = this._initMK(),
						_arguments = arguments,
						args = toArray(_arguments),
						evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
						array = toArray(_this),
						returns;

					if (hasOptions) {
						args.pop();
					}

					if (isXDR) {
						array = toArray(_this);
						returns = Array_prototype[name].apply(array, args);
						recreate(_this, array);
					} else {
						returns = Array_prototype[name].apply(_this, args);
					}

					_evt = {
						returns: returns,
						args: args,
						originalArgs: _arguments,
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
				return function() {
					if (!this.length) return;

					var _this = this._initMK(),
						_arguments = arguments,
						args = toArray(_arguments),
						evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
						array,
						returns,
						added,
						removed;

					if (hasOptions) {
						args.pop();
					}


					if (isXDR) {
						array = toArray(_this);
						returns = Array_prototype[name].apply(array, args);
						recreate(_this, array);
					} else {
						returns = Array_prototype[name].apply(_this, args);
					}

					_evt = {
						returns: returns,
						args: args,
						originalArgs: _arguments,
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
						args = toArray(_arguments),
						evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
						array,
						returns,
						added,
						removed;

					if (hasOptions) {
						args.pop();
					}

					if (!args.length) return _this.length;

					if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
						for (i = 0; i < args.length; i++) {
							args[i] = _this._itemMediator.call(_this, args[i], i);
						}
					}

					if (isXDR) {
						array = toArray(_this);
						returns = Array_prototype[name].apply(array, args);
						recreate(_this, array);
					} else {
						returns = Array_prototype[name].apply(_this, args);
					}

					_evt = {
						returns: returns,
						args: args,
						originalArgs: _arguments,
						method: name,
						self: _this,
						added: added = args,
						removed: removed = []
					};

					for (i in evt) {
						_evt[i] = evt[i];
					}

					triggerModify(_this, _evt, name);

					return returns;
				};
			case 'splice':
				return function() {
					var _this = this._initMK(),
						_arguments = arguments,
						args = toArray(_arguments),
						evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
						array,
						returns,
						added = toArray(args, 2),
						removed;

					if (hasOptions) {
						args.pop();
					}

					if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
						for (i = 2; i < args.length; i++) {
							args[i] = _this._itemMediator.call(_this, args[i], i);
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
							returns: returns,
							args: args,
							originalArgs: _arguments,
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
