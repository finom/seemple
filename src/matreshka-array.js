"use strict";

(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([
			'matreshka_dir/matreshka-core'
		], factory);
	} else {
		factory(root.MK);
	}
}(this, function(MK) {
	if (!MK) {
		throw new Error('Matreshka is missing');
	}

	var Array_prototype = Array.prototype,
		sym = MK.sym,
		toArray = MK.toArray,
		slice = Array_prototype.slice,
		isXDR = MK.isXDR,
		compare = function(a1, a2, i, l) {
			if (a1.length != a2.length)
				return false;

			for (i = 0, l = a1.length; i < l; i++) {
				if (a1[i] && a1[i].isMK ? !a1[i].eq(a2[i]) : a1[i] !== a2[i]) {
					return false;
				}
			}

			return true;
		},
		indexOf = isXDR ? function(sought) {
			var _this = this,
				l = _this.length,
				i, item,
				isMK = sought && sought.isMK;

			for (i = 0; i < l; i++) {
				item = _this[i];
				if (isMK ? sought.eq(item) : sought === item) {
					return i;
				}
			}

			return -1;
		} : Array_prototype.indexOf,
		lastIndexOf = isXDR ? function(sought) {
			var _this = this,
				l = _this.length,
				i, item,
				isMK = sought && sought.isMK;

			for (i = l - 1; i >= 0; i--) {
				item = _this[i];
				if (isMK ? sought.eq(item) : sought === item) {
					return i;
				}
			}

			return -1;
		} : Array_prototype.lastIndexOf,



		triggerModify = function(_this, evt, additional) {
			var added = evt.added,
				removed = evt.removed,
				events = _this[sym].events,
				i;

			if(!evt.silent) {
				if (additional) {
					events[additional] && MK._fastTrigger(_this, additional, evt);
				}

				if (added.length) {
					events.add && MK._fastTrigger(_this, 'add', evt);

					if (events.addone) {
						for (i = 0; i < added.length; i++) {
							MK._fastTrigger(_this, 'addone', {
								self: _this,
								added: added[i]
							});
						}
					}
				}

				if (removed.length) {
					events.remove && MK._fastTrigger(_this, 'remove', evt);

					if (events.removeone) {
						for (i = 0; i < removed.length; i++) {
							MK._fastTrigger(_this, 'removeone', {
								self: _this,
								removed: removed[i]
							});
						}
					}
				}

				if (added.length || removed.length) {
					events.modify && MK._fastTrigger(_this, 'modify', evt);
				}
			}

			if (added.length || removed.length) {
				if (!evt.dontRender) {
					_this.processRendering(evt);
				}
			}
		},

		recreate = function(_this, array) {
			array = array || [];
			var diff = _this.length - array.length,
				prepared,
				i;

			for (i = 0; i < array.length; i++) {
				_this[i] = array[i];
			}

			for (i = 0; i < diff; i++) {
				_this.remove(i + array.length, {
					silent: true
				});
			}

			_this.length = array.length;

			return _this;
		},

		createMethod = function(name, hasOptions) {
			var i,
				_evt;


			switch (name) {
				case 'forEach':
					return function() {
						var _this = this;
						Array_prototype[name].apply(isXDR ? _this.toArray() : _this, arguments);
						return _this;
					};
				case 'map':
				case 'filter':
				case 'slice':
					return function() {
						var _this = this;
						return MK.Array.from(Array_prototype[name].apply(isXDR ? _this.toArray() : _this, arguments));
					};
				case 'every':
				case 'some':
				case 'reduce':
				case 'reduceRight':
				case 'join':
					return function() {
						var _this = this;
						return Array_prototype[name].apply(isXDR ? _this.toArray() : _this, arguments);
					};
				case 'sort':
				case 'reverse':
					return function() {
						if (!this.length) return;

						var _this = this._initMK(),
							_arguments = arguments,
							args = toArray(_arguments),
							evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
							array = _this.toArray(),
							returns = Array_prototype[name].apply(array, args);

						if (hasOptions) {
							args.pop();
						}

						if (isXDR) {
							array = _this.toArray();
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
							array = _this.toArray();
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
							array = _this.toArray();
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
							array = _this.toArray();
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
		},

		prototype = {
			'extends': MK,
			isMKArray: true,
			length: 0,
			itemRenderer: null,
			renderIfPossible: true,
			useBindingsParser: false,
			Model: null,
			constructor: function MatreshkaArray(length) {
				var _this = this._initMK(),
					al = arguments.length,
					i;
				if (al == 1 && typeof length == 'number') {
					_this.length = length;
				} else {
					for (i = 0; i < al; i++) {
						_this[i] = arguments[i];
					}
					_this.length = arguments.length;
				}
			},


			mediateItem: function(itemMediator) {
				var _this = this,
					l = _this.length,
					i;
				_this._itemMediator = itemMediator;
				for (i = 0; i < l; i++) {
					_this[i] = itemMediator.call(_this, _this[i], i);
				}
				return _this;
			},


			recreate: function(array, evt) {
				array = array || [];
				var _this = this._initMK(),
					diff = _this.length - array.length,
					was = _this.toArray(),
					prepared,
					i, j,
					_evt,
					added, removed, now;

				evt = evt || {};

				if (_this._itemMediator && !evt.skipMediator) {
					prepared = [];
					for (i = 0; i < array.length; i++) {
						prepared[i] = _this._itemMediator.call(_this, array[i], i);
					}
					array = prepared;
				}

				for (i = 0; i < array.length; i++) {
					_this[i] = array[i];
				}

				for (i = 0; i < diff; i++) {
					try { // @IE8 spike
						delete _this[i + array.length];
					} catch (e) {}

					delete _this[sym].special[i + array.length];

					/*_this.remove(i + array.length, {
						silent: true
					});*/
				}

				_this.length = array.length;

				if (evt.silent && evt.dontRender) {
					return _this;
				}

				now = _this.toArray();

				if (now.length) {
					removed = [];
					j = 0;
					for (i = 0; i < was.length; i++) {
						if (!~indexOf.call(now, was[i])) {
							removed[j++] = was[i];
						}
					}
				} else {
					removed = was;
				}

				if (was.length) {
					added = [];
					j = 0;
					for (i = 0; i < now.length; i++) {
						if (!~indexOf.call(was, now[i])) {
							added[j++] = now[i];
						}
					}
				} else {
					added = now;
				}

				_evt = {
					added: added,
					removed: removed,
					was: was,
					now: now,
					method: 'recreate',
					self: _this
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				triggerModify(_this, _evt, 'recreate');

				return _this;
			},


			toArray: function() {
				var _this = this,
					array = [],
					l = _this.length,
					i;

				array = [];
				for (i = 0; i < l; i++) {
					array[i] = _this[i];
				}

				return array;
			},


			toNative: function() {
				return this.toArray();
			},

			/**
			 * @method Matreshka.Array#_initMK
			 * @private
			 */
			_initMK: function() {
				var _this = this,
					changeModel;

				if (_this[sym]) return _this;

				changeModel = function() {
					var Model = _this.Model;
					if (Model) {
						_this.mediateItem(function(item) {
							return !item || !item.isMK || !(item && item.instanceOf ? item.instanceOf(Model)
							: item instanceof Model)
							? new Model(item && item.toJSON ? item.toJSON() : item, _this) : item;
						});
					}
				};

				MK.prototype._initMK.call(_this);

				MK._addListener(_this, 'change:Model', changeModel);

				MK._addListener(_this, 'change:itemRenderer', function() {
					_this.rerender({
						forceRerender: true
					});
				});

				changeModel();

				return _this;
			},

			/**
			 * @private
			 * @since 0.1
			 */
			_renderOne: function(item, evt) {
				if (!item || !item.isMK || !this.renderIfPossible || evt.dontRender) return;

				var _this = this,
					id = _this[sym].id,
					renderer = item.renderer || _this.itemRenderer,
					rendererContext = renderer === item.renderer ? item : _this,
					arraysNodes = item[sym].arraysNodes = item[sym].arraysNodes || {},
					node = arraysNodes[id],
					$node,
					template,
					itemEvt,
					sandboxes,
					i;

				if(!renderer) return;

				if (evt.moveSandbox) {
					if (node = item.bound(['sandbox'])) {
						arraysNodes[id] = node;
					}
				}

				if(node && evt.forceRerender) {
					sandboxes = item.boundAll(['sandbox']);

					for(i = 0; i < sandboxes.length; i++) {
						if(node == sandboxes[i]) {
							item.unbindNode('sandbox', node);
							break;
						}
					}

					node = arraysNodes[id] = null;
				}

				if (!node) {
					if (typeof renderer == 'function') {
						renderer = renderer.call(rendererContext, item);
					}

					if (typeof renderer == 'string' && !/<|{{/.test(renderer)) {
						template = rendererContext._getNodes(renderer);
						if (template = template && template[0]) {
							template = template.innerHTML;
						} else {
							throw Error('renderer node is missing: ' + renderer);
						}
					} else {
						template = renderer;
					}

					$node = _this.useBindingsParser ? MK._parseBindings(item, template) : (typeof template == 'string'
						? MK.$.parseHTML(template.replace(/^\s+|\s+$/g, '')) : MK.$(template));

					if (item.bindRenderedAsSandbox !== false && $node.length) {
						MK.bindNode(item, 'sandbox', $node);
					}

					node = $node[0];

					arraysNodes[id] = node;

					itemEvt = {
						node: node,
						$nodes: $node,
						self: item,
						parentArray: _this
					};

					item.onRender && item.onRender(itemEvt);
					_this.onItemRender && _this.onItemRender(item, itemEvt);

					MK._fastTrigger(item, 'render', itemEvt);
				}

				return node;
			},

			processRendering: function(evt) {
				var _this = this,
					props = _this[sym],
					id = props.id,
					l = _this.length,
					destroyOne = function(item) {
						var arraysNodes;
						if (item && item.isMK) {
							if (arraysNodes = item[sym].arraysNodes) {
								node = arraysNodes[id];
								delete arraysNodes[id];
							}

							return node;
						}
					},
					node,
					i,
					item,
					container = props.special.container || props.special.sandbox;

				container = container && container.$nodes;
				container = container && container[0];

				if (!container) return _this;

				switch (evt.method) {
					case 'push':
						for (i = l - evt.added.length; i < l; i++) {
							if (node = _this._renderOne(_this[i], evt)) {
								container.appendChild(node);
							}
						}

						break;
					case 'unshift':
						for (i = evt.added.length - 1; i + 1; i--) {
							if (node = _this._renderOne(_this[i], evt)) {
								if (container.children) {
									container.insertBefore(node, container.firstChild);
								} else {
									container.appendChild(node);
								}
							}
						}

						break;
					case 'pull':
					case 'pop':
					case 'shift':
						for (i = 0; i < evt.removed.length; i++) {
							if (node = destroyOne(evt.removed[i])) {
								container.removeChild(node);
							}
						}

						break;
					case 'sort':
					case 'reverse':
						for (i = 0; i < l; i++) {
							item = _this[i];
							if (node = item && item.isMK && item[sym].arraysNodes[id]) {
								container.appendChild(node);
							}
						}

						break;
					case 'rerender':
						if(evt.forceRerender) {
							for (i = 0; i < l; i++) {
								if (node = destroyOne(_this[i])) {
									container.removeChild(node);
								}
							}
						}

						for (i = 0; i < l; i++) {
							if (node = _this._renderOne(_this[i], evt)) {
								container.appendChild(node);
							}
						}

						break;
					case 'recreate':
					case 'splice':
						for (i = 0; i < evt.removed.length; i++) {
							if (node = destroyOne(evt.removed[i])) {
								container.removeChild(node);
							}
						}

						for (i = 0; i < l; i++) {
							if (node = _this._renderOne(_this[i], evt)) {
								container.appendChild(node);
							}
						}

						break;
				}

				return _this;
			},


			rerender: function(evt) {
				var _evt = {
						method: 'rerender'
					},
					i;
				if(evt && typeof evt == 'object') {
					for(i in evt) {
						_evt[i] = evt[i];
					}
				}

				return this.processRendering(_evt);
			},


			hasOwnProperty: function(p) {
				return p == 'length' || p < this.length && p >= 0;
			},


			toJSON: function() {
				var _this = this,
					JSON = [],
					l = _this.length,
					i;

				for (i = 0; i < l; i++) {
					_this[i] && _this[i].toJSON ? JSON.push(_this[i].toJSON()) : JSON.push(_this[i]);
				}

				return JSON;
			},


			concat: function() {
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
			},



			pull: function(index, evt) {
				var _this = this._initMK(),
					array = _this.toArray(),
					_index = index,
					type = typeof index,
					returns,
					removed,
					_evt,
					i;

				if (type != 'number' && type != 'string') {
					index = _this.indexOf(index);
					if (!~index) {
						return null;
					}
				}

				returns = array.splice(index, 1)[0] || null;

				if (!compare(array, _this)) {
					evt = evt || {};

					recreate(_this, array, evt);

					_evt = {
						returns: returns,
						args: [_index],
						method: 'pull',
						self: _this,
						added: [],
						removed: removed = returns ? [returns] : []
					};

					for (i in evt) {
						_evt[i] = evt[i];
					}

					triggerModify(_this, _evt, 'pull');
				}

				return returns;
			},

			// es5-shim doesn't help with indexOf and lastIndexOf
			indexOf: indexOf,
			lastIndexOf: lastIndexOf,
			toString: function() {
				return this.toArray().join(',');
			}
		};

	'push pop unshift shift sort reverse splice map filter slice every some reduce reduceRight forEach join'
	.split(' ').forEach(function(name) {
		prototype[name] = createMethod(name);
	});

	'push pop unshift shift sort reverse splice'.split(' ').forEach(function(name) {
		prototype[name + '_'] = createMethod(name, 1);
	});

	prototype.each = prototype.forEach;

	prototype[typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator'] = function() {
		var _this = this,
			i = 0;
		return {
			next: function() {
				if (i > _this.length - 1) {
					return {
						done: true
					};
				} else {
					return {
						done: false,
						value: _this[i++]
					};
				}
			}
		};
	};

	MK.Array = MK.Class(prototype);

	MK.Array.of = function() {
		var result = new MK.Array(),
			args = arguments,
			i;

		result.length = args.length;

		for (i = 0; i < args.length; i++) {
			result[i] = args[i];
		}

		return result;
	};

	// Doesn't work with maps and sets yet
	MK.Array.from = function(arrayLike, mapFn, thisArg) {
		var result = new MK.Array(),
			i;

		result.length = arrayLike.length;

		for (i = 0; i < arrayLike.length; i++) {
			result[i] = mapFn ? mapFn.call(thisArg, arrayLike[i], i, arrayLike) : arrayLike[i];
		}

		return result;
	};

	return MK.Array;
}));
