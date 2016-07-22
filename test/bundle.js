/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This gets replaced by karma webpack with the updated files on rebuild
	var __karmaWebpackManifest__ = [];
	
	// require all modules ending in "_test" from the
	// current directory and all subdirectories
	var testsContext = __webpack_require__(1);
	
	function inManifest(path) {
		return __karmaWebpackManifest__.indexOf(path) >= 0;
	}
	
	var runnable = testsContext.keys().filter(inManifest);
	
	// Run all tests if we didn't find any changes
	if (!runnable.length) {
		runnable = testsContext.keys();
	}
	
	runnable.forEach(testsContext);
	
	var componentsContext = __webpack_require__(57);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 36,
		"./bquery/create_spec.js": 37,
		"./bquery/events_spec.js": 38,
		"./bquery/find_spec.js": 40,
		"./bquery/init_spec.js": 41,
		"./bquery/is_spec.js": 42,
		"./bquery/not_spec.js": 43,
		"./bquery/one_spec.js": 44,
		"./bquery/parsehtml_spec.js": 45,
		"./class_spec.js": 46,
		"./events/delegated_collection_spec.js": 48,
		"./events/delegated_spec.js": 49,
		"./events/events_change_spec.js": 53,
		"./events/events_core_spec.js": 54,
		"./events/events_dom_spec.js": 55,
		"./events/events_summary_spec.js": 56
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var bindNode = __webpack_require__(3);
	
	var unbindNode = __webpack_require__(34);
	
	var makeObject = __webpack_require__(52);
	
	/*import magic from 'matreshka-magic';
	import MK from 'matreshka';
	import $ from 'bquery';
	let q = (s, c) => $(s, c)[0] || null;
	
	let bindInput = (obj, key, evt) => {
		let input = $.create('input'),
			binder = {
				on(cbc) {
					this._onkeyup = cbc;
				},
				getValue() {
					return this.value;
				},
				setValue(v) {
					this.value = v;
				}
			};
	
		if(obj instanceof MK) {
			obj.bindNode(key, input, binder, evt);
		} else {
			magic.bindNode(obj, key, input, binder, evt);
		}
	
	
		return input;
	};*/
	
	describe('Bindings', function () {
		var obj = void 0;
		var node = void 0;
		var node2 = void 0;
		var binder = void 0;
		var simulateDomEvent = void 0;
		var initializeCall = void 0;
		var destroyCall = void 0;
	
		beforeEach(function () {
			obj = {};
			node = document.createElement('span');
			node2 = document.createElement('span');
	
			_this.initializeCall = function () {};
			_this.destroyCall = function () {};
			spyOn(_this, 'initializeCall');
			spyOn(_this, 'destroyCall');
			initializeCall = _this.initializeCall;
			destroyCall = _this.destroyCall;
	
			binder = {
				on: function (cbc) {
					this.ondummyevent = cbc;
				},
				getValue: function () {
					return this.value;
				},
				setValue: function (v) {
					this.value = v;
				},
				initialize: function (o) {
					this.value = '';
					initializeCall();
				},
				destroy: function () {
					this.ondummyevent = function () {};
					destroyCall();
				}
			};
		});
	
		it('should bind and call initialize', function () {
			bindNode(obj, 'x', node, binder);
			obj.x = 'foo';
			expect(node.value).toEqual('foo');
			node.value = 'bar';
			node.ondummyevent();
			expect(obj.x).toEqual('bar');
			expect(initializeCall).toHaveBeenCalled();
		});
	
		it('should unbind and call destroy', function () {
			bindNode(obj, 'x', node, binder);
			unbindNode(obj, 'x', node);
			obj.x = 'foo';
			expect(node.value).toEqual('');
			node.value = 'baz';
			node.ondummyevent();
			expect(obj.x).toEqual('foo');
			expect(destroyCall).toHaveBeenCalled();
		});
	
		it('should bind using key-node object', function () {
			bindNode(obj, { x: node }, binder);
			obj.x = 'foo';
			expect(node.value).toEqual('foo');
			node.value = 'bar';
			node.ondummyevent();
			expect(obj.x).toEqual('bar');
			expect(initializeCall).toHaveBeenCalled();
		});
	
		it('should unbind key-node object', function () {
			bindNode(obj, { x: node }, binder);
			unbindNode(obj, { x: node });
			obj.x = 'foo';
			expect(node.value).toEqual('');
			node.value = 'baz';
			node.ondummyevent();
			expect(obj.x).toEqual('foo');
			expect(destroyCall).toHaveBeenCalled();
		});
	
		it('should bind delegated target', function () {
			var obj = makeObject('x.y');
			bindNode(obj, 'x.y.z', node, binder);
			obj.x.y.z = 'foo';
			expect(node.value).toEqual('foo');
			node.value = 'bar';
			node.ondummyevent({});
			expect(obj.x.y.z).toEqual('bar');
		});
	
		it('should unbind delegated target', function () {
			var obj = makeObject('x.y');
			bindNode(obj, 'x.y.z', node, binder);
			unbindNode(obj, 'x.y.z', node);
			obj.x.y.z = 'foo';
			expect(node.value).toEqual('');
			node.value = 'bar';
			node.ondummyevent({});
			expect(obj.x.y.z).toEqual('foo');
		});
	
		xit('should rebind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');
	
			obj.x = {
				y: {
					z: 'foo'
				}
			};
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y.z).toEqual('bar');
		});
	
		xit('should remove binding if delegated target is reassigned', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z'),
			    x = obj.x;
	
			obj.x = {
				y: {
					z: 'foo'
				}
			};
	
			input.value = 'bar';
			input._onkeyup({});
			expect(x.y.z).not.toEqual('bar');
			expect(obj.x.y.z).toEqual('bar');
	
			x.y.z = 'baz';
			expect(input.value).toEqual('bar');
		});
	
		xit('uses custom selectors on current target', function () {
			var obj = MK.to({ x: { y: 'foo' } }),
			    div = $.create('div'),
			    input = div.appendChild($.create('input'));
	
			obj.bindNode('sandbox', div);
			obj.bindNode('x.y', ':sandbox input', {
				on: function (cbc) {
					this._onkeyup = cbc;
				}
			});
	
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y).toEqual('bar');
		});
	
		xit('throws error when node isn\'t there', function () {
			var obj = {},
			    error = false;
	
			try {
				magic.bindNode(obj, 'x');
			} catch (e) {
				error = true;
			}
	
			expect(error).toBe(true);
		});
	
		xit('doesn\'t throw error with bindOptionalNode when node is missing', function () {
			var obj = {};
	
			magic.bindOptionalNode(obj, 'x');
	
			expect(true).toBe(true);
		});
	
		xit('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', function () {
			var mk = new MK();
	
			mk.bindOptionalNode('x', null);
	
			expect(true).toBe(true);
		});
	
		xit('returns bound nodes', function () {
			var obj = {},
			    input = bindInput(obj, 'x');
	
			expect(input).toEqual(magic.bound(obj, 'x'));
			expect(input).toEqual(magic.$bound(obj, 'x')[0]);
		});
	
		xit('selects children of sandbox', function () {
			var obj = {};
	
			magic.bindNode(obj, 'sandbox', '<div>\n\t\t\t\t<div>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');
	
			expect('SPAN').toEqual(magic.select(obj, 'span').tagName);
			expect('SPAN').toEqual(magic.selectAll(obj, 'span')[0].tagName);
		});
	
		xit('selects nodes with custom selector', function () {
			var obj = {};
	
			magic.bindNode(obj, 'sandbox', '<div>\n\t\t\t\t<div>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');
	
			expect('SPAN').toEqual(magic.select(obj, ':bound(sandbox) span').tagName);
			expect('SPAN').toEqual(magic.selectAll(obj, ':sandbox span')[0].tagName);
		});
	
		xit('cancels deep binding via deep: false', function () {
			var obj = {},
			    input = bindInput(obj, 'a.b', {
				deep: false
			});
	
			obj['a.b'] = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj['a.b']).toEqual('bar');
		});
	
		xit('allows to debounce handler', function (done) {
			var obj = {},
			    input = bindInput(obj, 'x', {
				debounce: true
			});
	
			obj.x = 'foo';
			expect(input.value).toEqual('');
			obj.x = 'bar';
			expect(input.value).toEqual('');
	
			setTimeout(function () {
				expect(input.value).toEqual('bar');
				done();
			}, 400);
		});
	
		xit('allows to bind sandbox via bindSandbox', function () {
			var obj = {},
			    div = $.create('div');
	
			MK.bindSandbox(obj, div);
	
			expect(MK.bound(obj, 'sandbox')).toEqual(div);
		});
	
		xit('bindSandbox throws an error when node is missing', function () {
			var obj = {},
			    bool = false;
	
			try {
				MK.bindSandbox(obj, null);
			} catch (e) {
				bool = true;
			}
	
			expect(bool).toBeTruthy();
		});
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var defineProp = __webpack_require__(6);
	
	var getNodes = __webpack_require__(12);
	
	var MatreshkaError = __webpack_require__(10);
	
	var bindSingleNode = __webpack_require__(30);
	
	var checkObjectType = __webpack_require__(9);
	
	var unbindNode = __webpack_require__(34);
	
	var delegateListener = __webpack_require__(50);
	
	// TODO Debounced!
	module.exports = bindNode;
	function bindNode(object, key, node) {
		var binder = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
		var evt = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
		if (typeof this === 'object' && this.isMK) {
			// when context is Matreshka instance, use this as an object and shift other args
			evt = binder;
			binder = node;
			node = key;
			key = object;
			object = this;
		} else {
			// throw error when object type is wrong
			checkObjectType(object, 'bindNode');
		}
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
		var _evt = evt;
		var optional = _evt.optional;
		var deep = _evt.deep;
	
	
		if (!key) {
			throw MatreshkaError('binding:falsy_key');
		}
	
		if (key instanceof Array) {
			if (typeof key[0] === 'string') {
				for (var _target = key, _index = 0, itemKey, _l = _target.length; itemKey = _target[_index], _index < _l; _index++) {
					bindNode(object, itemKey, node, binder, evt)
				}
				/*
	    * this.bindNode(['a', 'b', 'c'], node)
	    */
	
			} else {
				for (var _target2 = key, _index2 = 0, _ref, _l6 = _target2.length; _ref = _target2[_index2], _index2 < _l6; _index2++) {
					var itemKey = _ref.key;
					var itemNode = _ref.node;
					var itemBinder = _ref.binder;
					var itemEvent = _ref.event;
	
					var commonEvent = node;
					var mergedEvent = {};
	
					if (itemEvent) {
						var _result = mergedEvent;
	
						for (var _source2 = itemEvent, _keys2 = Object.keys(_source2), _l3 = _keys2.length, _i2 = 0, _key2; _i2 < _l3; _i2++) {
							_key2 = _keys2[_i2];
							_result[_key2] = _source2[_key2];
						}
					}
	
					if (commonEvent) {
						var _result2 = mergedEvent;
	
						for (var _source4 = commonEvent, _keys4 = Object.keys(_source4), _l5 = _keys4.length, _i4 = 0, _key4; _i4 < _l5; _i4++) {
							_key4 = _keys4[_i4];
							_result2[_key4] = _source4[_key4];
						}
					}
	
					bindNode(object, itemKey, itemNode, itemBinder, mergedEvent);
				}
				/*
	    * this.bindNode([{key, node, binder, event}], { silent: true });
	    */
	
			}
	
			return object;
		}
	
		/*
	  * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	  */
		if (typeof key === 'object') {
			for (var _target3 = key, _keys5 = Object.keys(_target3), _i5 = 0, keyObjKey, keyObjValue, _l7 = _keys5.length; (keyObjKey = _keys5[_i5], keyObjValue = _target3[keyObjKey]), _i5 < _l7; _i5++) {
				bindNode(object, keyObjKey, keyObjValue, node, binder)
			}
	
			return object;
		}
	
		var $nodes = getNodes(object, node);
	
		if (!$nodes.length) {
			if (optional) {
				return object;
			} else {
				throw MatreshkaError('binding:node_missing', { key: key, node: node });
			}
		}
	
		var propDef = defineProp(object, key);
	
		if (object.isMK) {
			object.$nodes[key] = object.$nodes[key].length ? object.$nodes[key].add($nodes) : $nodes;
			object.nodes[key] = object.$nodes[key][0];
		}
	
		var deepPath = key.split('.');
		if (deep !== false && deepPath.length > 1) {
			var changeHandler = function () {
				var evt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
				var target = evt.value;
	
				if (!target) {
					target = object;
					for (var i = 0; i < deepPath.length - 1; i++) {
						target = target[deepPath[i]];
					}
				}
	
				bindNode(target, deepPath[deepPath.length - 1], $nodes, binder, evt);
	
				if (evt.previousValue) {
					unbindNode(evt.previousValue, path[deepPath.length - 1], $nodes);
				}
			};
	
			delegateListener(object, deepPath.slice(0, deepPath.length - 2).join('.'), 'change:' + deepPath[deepPath.length - 2], changeHandler);
	
			changeHandler();
	
			return object;
			/*path = key.split('.');
	  changeHandler = function(evt) {
	  evt = evt && evt.originalEvent;
	  var target = evt && evt.value,
	  i;
	  if (!target) {
	  target = object;
	  for (i = 0; i < path.length - 1; i++) {
	  target = target[path[i]];
	  }
	  }
	  bindNode(target, path[path.length - 1], $nodes, binder, evt, optional);
	  if (evt && evt.previousValue) {
	  core.unbindNode(evt.previousValue, path[path.length - 1], $nodes);
	  }
	  };
	  core._delegateListener(object, path.slice(0, path.length - 2).join('.'),
	  'change:' + path[path.length - 2], changeHandler);
	  changeHandler();
	  return object;*/
			// TODO
		}
	
		/*
	  for (i = 0; i < $nodes.length; i++) {
	     initBinding(object, objectData, key, $nodes, i, binder, evt, special);
	 }
	  if (!evt.silent) {
	     _evt = {
	         key: key,
	         $nodes: $nodes,
	         node: $nodes[0] || null
	     };
	      for (i in evt) {
	         _evt[i] = evt[i];
	     }
	      core._fastTrigger(object, 'bind:' + key, _evt);
	     core._fastTrigger(object, 'bind', _evt);
	 }*/
	
		for (var _target4 = $nodes, _index3 = 0, node, _l8 = _target4.length; node = _target4[_index3], _index3 < _l8; _index3++) {
			bindSingleNode(object, {
				$nodes: $nodes,
				node: node,
				key: key,
				evt: evt,
				binder: binder,
				propDef: propDef
			})
		}
	
		return object;
	}
	
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map',
		'matreshka_dir/core/initmk',
		'matreshka_dir/core/util/common'
	], function(core, map, initMK, util) {

		var bindNode = core.bindNode = function(object, key, node, binder, evt, optional) {
			/* istanbul ignore if  *
			if (!object || typeof object != 'object') return object;

			if(key == 'sandbox') {
				return bindSandbox(object, node, evt, optional);
			}


			initMK(object);


			var objectData = map.get(object),
				win = typeof window != 'undefined' ? window : null,
				$nodes,
				keys,
				i,
				special,
				path,
				listenKey,
				changeHandler,
				_evt;

			/*
			 * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
			 *
			if (key instanceof Array) {
				for (i = 0; i < key.length; i++) {
					bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
				}

				return object;
			}

			/*
			 * this.bindNode('key1 key2', node, binder, { silent: true });
			 *
			if (typeof key == 'string' && ~key.indexOf(' ')) {
				keys = key.split(/\s+/);
				if (keys.length > 1) {
					for (i = 0; i < keys.length; i++) {
						bindNode(object, keys[i], node, binder, evt, optional);
					}
					return object;
				}
			}

			/*
			 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
			 *
			if (typeof key == 'object') {
				for (i in key) {
					if (key.hasOwnProperty(i)) {
						bindNode(object, i, key[i], node, binder, evt);
					}
				}

				return object;
			}

			/*
			 * this.bindNode('key', [ node, binder ], { silent: true });
			 *
			// node !== win is the most uncommon bugfix ever. Don't ask what does it mean.
			// This is about iframes, CORS and deprecated DOM API.
			if (node && node.length == 2 && node !== win && !node[1].nodeName
					&& (node[1].setValue || node[1].getValue)) {
				return bindNode(object, key, node[0], node[1], binder, optional);
			}

			$nodes = core._getNodes(object, node);

			if (!$nodes.length) {
				if (optional) {
					return object;
				} else {
					throw Error('Binding error: node is missing for "' + key + '".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
				}
			}

			if ((!evt || evt.deep !== false) && ~key.indexOf('.')) {
				path = key.split('.');
				changeHandler = function(evt) {
					evt = evt && evt.originalEvent;

					var target = evt && evt.value,
						i;
					if (!target) {
						target = object;
						for (i = 0; i < path.length - 1; i++) {
							target = target[path[i]];
						}
					}

					bindNode(target, path[path.length - 1], $nodes, binder, evt, optional);


					if (evt && evt.previousValue) {
						core.unbindNode(evt.previousValue, path[path.length - 1], $nodes);
					}
				};

				core._delegateListener(object, path.slice(0, path.length - 2).join('.'),
					'change:' + path[path.length - 2], changeHandler);

				changeHandler();

				return object;
			}

			evt = evt || {};

			special = core._defineSpecial(object, key);

			special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

			if (object.isMK) {
				object.$nodes[key] = special.$nodes;
				object.nodes[key] = special.$nodes[0];
			}

			for (i = 0; i < $nodes.length; i++) {
				initBinding(object, objectData, key, $nodes, i, binder, evt, special);
			}

			if (!evt.silent) {
				_evt = {
					key: key,
					$nodes: $nodes,
					node: $nodes[0] || null
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				core._fastTrigger(object, 'bind:' + key, _evt);
				core._fastTrigger(object, 'bind', _evt);
			}



			return object;
		};

		function initBinding(object, objectData, key, $nodes, index, binder, evt, special) {
			var options = {
					self: object,
					key: key,
					$nodes: $nodes,
					node: node
				},
				node = $nodes[index],
				isUndefined = typeof special.value == 'undefined',
				_binder,
				_evt,
				foundBinder,
				_options,
				i,
				domEvt,
				mkHandler,
				val;




			if (binder === null) {
				_binder = {};
			} else {
				foundBinder = lookForBinder(node);

				if (foundBinder) {
					if (binder) {
						for (i in binder) {
							foundBinder[i] = binder[i];
						}
					}

					_binder = foundBinder;
				} else {
					_binder = binder || {};
				}
			}

			if (_binder.initialize) {
				_options = {
					value: special.value
				};
				for (i in options) {
					_options[i] = options[i];
				}
				_binder.initialize.call(node, _options);
			}

			if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {

				_evt = {
					fromNode: true
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				val = _binder.getValue.call(node, options);
				isUndefined = typeof val == 'undefined';

				core.set(object, key, val, _evt);
			}


			if (_binder.setValue) {
				mkHandler = function (evt) {
					var v = objectData.special[key].value,
						// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
						_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
						i;

					if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;

					_options = {
						value: v
					};

					for (i in options) {
						_options[i] = options[i];
					}

					_binder.setValue.call(node, v, _options);
				};

				if(evt.debounce) {
					mkHandler = util.debounce(mkHandler);
				}

				core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, {node: node});

				!isUndefined && mkHandler();
			}




			if (_binder.getValue && _binder.on) {
				domEvt = {
					node: node,
					on: _binder.on,
					instance: object,
					key: key,
					mkHandler: mkHandler,
					handler: function(evt) {
						if (domEvt.removed) return;
						var oldvalue = object[key],
							value,
							j,
							_options = {
								value: oldvalue,
								domEvent: evt,
								originalEvent: evt.originalEvent || evt,
								preventDefault: function() {
									evt.preventDefault();
								},
								stopPropagation: function() {
									evt.stopPropagation();
								},
								which: evt.which,
								target: evt.target
							};


						// hasOwnProperty is not required there
						for (j in options) {
							_options[j] = options[j];
						}

						value = _binder.getValue.call(node, _options);

						if (value !== oldvalue) {
							core.set(object, key, value, {
								fromNode: true,
								changedNode: node,
								onChangeValue: value
							});
						}
					}
				};

				core.domEvents.add(domEvt);
			}
		}
	});
	*/

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	// this is common function which associates an object with its Matreshka definition
	function commonInit(object) {
		var def = defs.get(object);
		if (!def) {
			def = {
				// a property name of "events" object is an event name
				// and a value is an array of event handlers
				events: {
					/*example: {
	    	callback: function,
	    	ctx: object,
	    	context: object2,
	    	name: "example"
	    } */
				},
				// "props" contains special information about properties (getters, setters etc)
				props: {
					/*example: {
	    	? nodes: core.$(),
	    	value: object[key],
	    	getter: null,
	    	setter: null,
	    	mediator: null,
	    	//?destroyers: Map,
	    	bindings: [{
	    		node,
	    		binder,
	    		nodeHandler,
	    		objectHandler
	    	}]
	    }*/
				},
				id: 'mk' + Math.random()
			};
	
			defs.set(object, def);
		}
	
		return def;
	}
	
	module.exports = initMK;
	function initMK(object) {
		var type = typeof object;
		if (!object || type !== 'object') {
			throw new TypeError(type + ' cannot be used in this method');
		}
	
		// if object has _initMK method, run it
		// else run commonInit
		// every _initMK implementation have to run commonInit or parent's _initMK
		return object._initMK ? object._initMK() : commonInit(object);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	function PseudoMap() {}
	
	// PseudoMap simulates WeakMap behavior with O(1) search complexity
	// it's needed for @IE9 and @IE10
	var _result = PseudoMap.prototype;
	
	for (var _source2 = {
		get: function (obj) {
			return obj.matreshkaData;
		},
		set: function (obj, data) {
			Object.defineProperty(obj, 'matreshkaData', {
				value: data,
				enumerable: false,
				writable: false,
				configurable: false
			});
		},
		has: function (obj) {
			return ('matreshkaData' in obj);
		}
	}, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
		_key2 = _keys2[_i2];
		_result[_key2] = _source2[_key2];
	}
	
	module.exports = typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var set = __webpack_require__(7);
	
	module.exports = defineProp;
	function defineProp(object, key) {
		var def = defs.get(object);
	
		// if no object definition do nothing
		if (!def) {
			return null;
		}
	
		if (!def.props[key]) {
			(function () {
				var propDef = def.props[key] = {
					value: object[key],
					getter: null,
					setter: null,
					mediator: null,
					bindings: null
				};
	
				Object.defineProperty(object, key, {
					configurable: false,
					enumerable: true,
					get: function () {
						return propDef.getter ? propDef.getter.call(object) : propDef.value;
					},
					set: function (v) {
						return propDef.setter ? propDef.setter.call(object, v) : set(object, key, v, {
							fromSetter: true
						});
					}
				});
			})();
		}
	
		return def.props[key];
	}
	
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map'
	], function(core, map) {
		"use strict";
		core._defineSpecial = function(object, key, noAccessors) {
			if (!object || typeof object != 'object' || !map.has(object)) return object;

			var objectData = map.get(object),
				specialProps = objectData.special[key];

			if (!specialProps) {
				specialProps = objectData.special[key] = {
					$nodes: core.$(),
					value: object[key],
					getter: null,
					setter: null,
					mediator: null
				};

				if (!noAccessors && key != 'sandbox') {
					Object.defineProperty(object, key, {
						configurable: true,
						enumerable: true,
						get: function() {
							return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
						},
						set: function(v) {
							specialProps.setter ? specialProps.setter.call(object, v) : core.set(object, key, v, {
								fromSetter: true
							});
						}
					});
				}
			}

			return specialProps;
		};
	});
	*/

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var triggerOne = __webpack_require__(8);
	
	var checkObjectType = __webpack_require__(9);
	
	var is = __webpack_require__(11);
	
	// the function sets new value for a property
	module.exports = set;
	function set(object, key, value) {
				var evt = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
				checkObjectType(object, 'set');
	
				// if no key or falsy key is given
				if (!key) {
							return object;
				}
	
				var def = defs.get(object);
	
				// if no object definition then make simple assignment
				if (!def) {
							object[key] = value;
							return object;
				}
	
				var props = def.props;
				var events = def.events;
	
				var propDef = props[key];
	
				// allow to use key-value object as another variation
				if (typeof key == 'object') {
							for (var _target = key, _keys = Object.keys(_target), _i = 0, objKey, objVal, _l = _keys.length; (objKey = _keys[_i], objVal = _target[objKey]), _i < _l; _i++) {
										set(object, objKey, objVal, value)
							}
	
							return object;
				}
	
				// if no property definition then make simple assignment
				if (!propDef) {
							object[key] = value;
							return object;
				}
	
				var previousValue = propDef.value;
				var mediator = propDef.mediator;
	
				// possible flags
	
				var skipMediator = evt.skipMediator;
				var fromMediator = evt.fromMediator;
				var force = evt.force;
				var forceHTML = evt.forceHTML;
				var silent = evt.silent;
				var silentHTML = evt.silentHTML;
				var skipLinks = evt.skipLinks;
	
	
				var newValue = void 0;
	
				if (mediator && !is(value, previousValue) && !skipMediator && !fromMediator) {
							// TODO
							newValue = special.mediator(v, prevVal, key, object);
				} else {
							newValue = value;
				}
	
				var isChanged = !is(newValue, previousValue);
	
				// add to evt object some useful properties
				var _result = {
							value: newValue,
							self: object,
							previousValue: previousValue,
							key: key,
							isChanged: isChanged
				};
	
				for (var _source2 = evt, _keys3 = Object.keys(_source2), _l3 = _keys3.length, _i3 = 0, _key2; _i3 < _l3; _i3++) {
							_key2 = _keys3[_i3];
							_result[_key2] = _source2[_key2];
				}
	
				var extendedEvt = _result;
	
				var triggerChange = (isChanged || force) && !silent;
	
				// trigger beforechange:KEY and beforechange events
				if (triggerChange) {
							var beforechangeStr = 'beforechange';
							var beforechangeEvtName = beforechangeStr + ':' + key;
	
							if (events[beforechangeEvtName]) {
										triggerOne(object, beforechangeEvtName, extendedEvt);
							}
	
							if (events[beforechangeStr]) {
										triggerOne(object, beforechangeStr, extendedEvt);
							}
				}
	
				propDef.value = newValue;
	
				// triger bindings
				if (!silentHTML && (isChanged || force || forceHTML)) {
							var changeBindingsEvtName = '_change:bindings:' + key;
							if (events[changeBindingsEvtName]) {
										triggerOne(object, changeBindingsEvtName, extendedEvt);
							}
				}
	
				// trigger change:KEY and change events
				if (triggerChange) {
							var changeStr = 'change';
							var changeEvtName = changeStr + ':' + key;
							if (events[changeEvtName]) {
										triggerOne(object, changeEvtName, extendedEvt);
							}
	
							if (events[changeStr]) {
										triggerOne(object, changeStr, extendedEvt);
							}
				}
	
				// trigger dependencies (made with linkProps)
				if ((isChanged || force) && !skipLinks) {
							var changeDepsEvtName = '_change:deps:' + key;
							if (events[changeDepsEvtName]) {
										triggerOne(object, changeDepsEvtName, extendedEvt);
							}
				}
	
				// trigger delegated events logic
				if (isChanged) {
							var changeDelegatedEvtName = '_change:delegated:' + key;
							if (events[changeDelegatedEvtName]) {
										triggerOne(object, changeDelegatedEvtName, extendedEvt);
							}
				}
	
				return object;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	module.exports = triggerOne;
	function triggerOne(object, name) {
		var def = defs.get(object);
	
		if (!def) return;
	
		var events = def.events[name];
	
		if (events) {
			var _source = arguments,
			    _l = _source.length,
			    _i = 2 || 0,
			    _end = null || _l,
			    _j = 0,
			    _result = Array(_end - _i);
	
			while (_i < _end) {
				_result[_j++] = _source[_i++];
			}
	
			var args = _result;
			var l = events.length;
			var a1 = args[0];
			var a2 = args[1];
			var a3 = args[2];
	
	
			var i = 0,
			    ev = void 0;
	
			switch (args.length) {
				case 0:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx);
					}
					return;
				case 1:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1);
					}
					return;
				case 2:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1, a2);
					}
					return;
				case 3:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1, a2, a3);
					}
					return;
				default:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.apply(ev.ctx, args);
					}
					return;
			}
		}
	}
	
	triggerOne.latestEvent = {
		info: {},
		name: null
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaError = __webpack_require__(10);
	
	module.exports = function (object, method) {
	    var typeofObject = object === null ? 'null' : typeof object;
	
	    if (typeofObject !== 'object') {
	        throw MatreshkaError('common:object_type', {
	            type: typeofObject,
	            method: method
	        });
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var bindingErrorPrefix = 'Binding error:';
	var errors = {
		'binding:node_missing': function (_ref) {
			var key = _ref.key;
			var node = _ref.node;
	
			var selectorInfo = typeof node === 'string' ? ' The selector is ' + node : '';
			return bindingErrorPrefix + ' node is missing for ' + key + '.' + selectorInfo;
		},
		'binding:falsy_key': function () {
			return 'Binding error: "key" arg cannot be falsy';
		},
		'common:object_type': function (_ref2) {
			var type = _ref2.type;
			var method = _ref2.method;
	
			return 'Method "' + method + '" does not accept ' + type + ' as target object';
		}
	};
	
	module.exports = MatreshkaError;
	function MatreshkaError(key, data) {
		var getError = errors[key];
		if (!getError) {
			throw Error('Unknown error "' + key + '"');
		}
	
		return new Error(errors[key](data));
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	// determines whether two values are the same value
	var isPolyfill = function (v1, v2) {
	    return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};
	
	module.exports = Object.is || isPolyfill;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(13);
	
	var dom = __webpack_require__(14);
	
	module.exports = getNodes;
	function getNodes(object, selector) {
		var nodes = void 0;
		if (typeof selector == 'string' && !/</.test(selector) && /:sandbox|:bound\(([^(]*)\)/.test(selector)) {
			nodes = selectNodes(object, selector);
		} else {
			nodes = dom.$(selector);
		}
		return nodes;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = selectNodes;
	function selectNodes(object, selectors) {
	
		var objectData = map.get(object),
		    $ = core.$,
		    result = $(),
		    execResult,
		    $bound,
		    node,
		    selector,
		    i,
		    j,
		    random,
		    subSelector,
		    key,
		    selected;
	
		if (!object || typeof object != 'object' || !objectData) return result;
	
		// replacing :sandbox to :bound(sandbox)
		selectors = selectors.split(',');
	
		for (i = 0; i < selectors.length; i++) {
			selector = selectors[i];
	
			if (execResult = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/.exec(selector)) {
				key = execResult[3] !== undefined ? 'sandbox' : execResult[1];
				subSelector = execResult[3] !== undefined ? execResult[3] : execResult[2];
	
				// getting KEY from :bound(KEY)
				$bound = objectData.special[key] && objectData.special[key].$nodes;
				if (!$bound || !$bound.length) {
					continue;
				}
	
				// if native selector passed after :bound(KEY) is not empty string
				// for example ":bound(KEY) .my-selector"
				if (subSelector) {
					// if native selector contains children selector
					// for example ":bound(KEY) > .my-selector"
					if (subSelector.indexOf('>') === 0) {
						// selecting children
						for (j = 0; j < $bound.length; j++) {
							node = $bound[j];
							random = 'm' + core.randomString();
							node.setAttribute(random, random);
							selected = node.querySelectorAll('[' + random + '="' + random + '"]' + subSelector);
							result = result.add(util.toArray(selected));
							node.removeAttribute(random);
						}
					} else {
						// if native selector doesn't contain children selector
						result = result.add($bound.find(subSelector));
					}
				} else {
					// if native selector is empty string
					result = result.add($bound);
				}
				// if it's native selector
			} else {
					result = result.add(selector);
				}
		}
	
		return result;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(15);
	
	var dom = {
		$: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(16);
	
	var neededMethods = 'on off is add not find'.split(/\s/); /*global $*/
	
	
	var globalDollar = typeof $ === 'function' ? $ : null;
	var useGlobalDollar = true;
	
	if (globalDollar) {
		var fn = globalDollar.fn || globalDollar.prototype;
		for (var i = 0; i < neededMethods.length; i++) {
			if (!fn[neededMethods[i]]) {
				useGlobalDollar = false;
				break;
			}
		}
	
		if (!globalDollar.parseHTML) {
			globalDollar.parseHTML = bQuery.parseHTML;
		}
	} else {
		useGlobalDollar = false;
	}
	
	module.exports = useGlobalDollar ? globalDollar : bQuery;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	var extend = __webpack_require__(19);
	
	var parseHTML = __webpack_require__(20);
	
	var one = __webpack_require__(21);
	
	var create = __webpack_require__(22);
	
	var on = __webpack_require__(23);
	
	var off = __webpack_require__(26);
	
	var is = __webpack_require__(25);
	
	var add = __webpack_require__(27);
	
	var not = __webpack_require__(28);
	
	var find = __webpack_require__(29);
	
	// tiny jQuery replacement for Matreshka
	// bQuery is rewritten version of balalaika.js
	module.exports = bQuery;
	function bQuery(selector, context) {
		return new Init(selector, context);
	}
	
	var _result = bQuery;
	
	for (var _source3 = {
		fn: Init.prototype,
		extend: extend,
		parseHTML: parseHTML,
		one: one,
		create: create
	}, _keys3 = Object.keys(_source3), _l3 = _keys3.length, _i3 = 0, _key3; _i3 < _l3; _i3++) {
		_key3 = _keys3[_i3];
		_result[_key3] = _source3[_key3];
	}
	
	var _result2 = bQuery.fn;
	
	for (var _source4 = {
		on: on,
		off: off,
		is: is,
		add: add,
		not: not,
		find: find
	}, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
		_key4 = _keys4[_i4];
		_result2[_key4] = _source4[_key4];
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(18);
	
	// function-constructor of bQuery library
	// accepts many kinds of arguments (selector, html, function)
	function BQueryInit(selector, context) {
		var result = void 0;
	
		if (selector) {
			if (selector.nodeType || typeof window === 'object' && selector === window) {
				result = [selector];
			} else if (typeof selector === 'string') {
				if (/</.test(selector)) {
					result = html2nodeList(selector);
				} else {
					if (context) {
						var newContext = new BQueryInit(context)[0];
	
						if (newContext) {
							result = newContext.querySelectorAll(selector);
						}
					} else {
						result = document.querySelectorAll(selector);
					}
				}
			} else if (selector instanceof Function) {
				// typeof nodeList returns "function" in old WebKit
				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', selector);
				} else {
					selector();
				}
			} else {
				result = selector;
			}
		}
	
		var length = result && result.length;
	
		if (length) {
			for (var i = 0; i < length; i++) {
				this.push(result[i]);
			}
		}
	}
	
	BQueryInit.prototype = [];
	
	module.exports = BQueryInit;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	// converts HTML string to NodeList instance
	module.exports = html2nodeList;
	function html2nodeList(html) {
		// wrapMap is taken from jQuery
		var wrapMap = {
			option: [1, '<select multiple="multiple">', '</select>'],
			legend: [1, '<fieldset>', '</fieldset>'],
			thead: [1, '<table>', '</table>'],
			tr: [2, '<table><tbody>', '</tbody></table>'],
			td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
			col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
			area: [1, '<map>', '</map>'],
			_: [0, '', '']
		};
	
		var node = document.createElement('div'),
		    i = void 0;
	
		html = html.replace(/^\s+|\s+$/g, '');
	
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
	
		var ex = /<([\w:]+)/.exec(html),
		    wrapper = ex && wrapMap[ex[1]] || wrapMap._;
	
		node.innerHTML = wrapper[1] + html + wrapper[2];
	
		i = wrapper[0];
	
		while (i--) {
			node = node.children[0];
		}
	
		return node.childNodes;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	// Object.assign polyfyll is taken there:
	// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
	// and will be removed in future
	
	var assign = Object.assign || function assign(target) {
		/* istanbul ignore next */
		if (target === undefined || target === null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}
	
		var output = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source !== undefined && source !== null) {
				for (var nextKey in source) {
					if (source.hasOwnProperty(nextKey)) {
						output[nextKey] = source[nextKey];
					}
				}
			}
		}
	
		return output;
	};
	
	module.exports = assign;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(18);
	
	var Init = __webpack_require__(17);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
		return new Init(html2nodeList(html));
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
		return new Init(s, context)[0];
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	// creates HTML element
	module.exports = create;
	function create(tagName, props) {
		if (typeof tagName === 'object') {
			props = tagName;
			tagName = props.tagName;
		}
	
		var el = document.createElement(tagName);
	
		if (props) {
			for (var _target3 = props, _keys4 = Object.keys(_target3), _i4 = 0, key, value, _l5 = _keys4.length; (key = _keys4[_i4], value = _target3[key]), _i4 < _l5; _i4++) {
				if (key === 'attributes' && typeof value === 'object') {
					for (var _target = value, _keys = Object.keys(_target), _i = 0, attrName, attrValue, _l = _keys.length; (attrName = _keys[_i], attrValue = _target[attrName]), _i < _l; _i++) {
						el.setAttribute(attrName, attrValue);
					}
				} else if (key === 'children' && value) {
					for (var _target2 = value, _index = 0, child, _l2 = _target2.length; child = _target2[_index], _index < _l2; _index++) {
						el.appendChild(create(child));
					}
				} else if (el[key] && typeof el[key] === 'object' && typeof value === 'object') {
					var _result = el[key];
	
					for (var _source2 = value, _keys3 = Object.keys(_source2), _l4 = _keys3.length, _i3 = 0, _key2; _i3 < _l4; _i3++) {
						_key2 = _keys3[_i3];
						_result[_key2] = _source2[_key2];
					}
				} else if (key !== 'tagName') {
					el[key] = value;
				}
			}
		}
	
		return el;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(24);
	
	var is = __webpack_require__(25);
	
	// the function is used when a selector is given
	function delegateHandler(evt, selector, handler) {
		var randomID = Math.random().toString().replace('0.', 'x'),
		    scopeSelector = '[' + randomID + '="' + randomID + '"] ',
		    splittedSelector = selector.split(',');
	
		var matching = '';
	
		for (var i = 0; i < splittedSelector.length; i++) {
			var sel = splittedSelector[i];
			matching += '' + (i === 0 ? '' : ',') + scopeSelector + sel + ',' + scopeSelector + sel + ' *';
		}
	
		this.setAttribute(randomID, randomID);
	
		if (is.call([evt.target], matching)) {
			handler.call(this, evt);
		}
	
		this.removeAttribute(randomID);
	}
	
	// adds event listener to a set of elemnts
	module.exports = on;
	function on(names, selector, handler) {
		var delegate = void 0;
	
		if (typeof selector === 'function') {
			handler = selector;
			selector = null;
		}
	
		if (selector) {
			delegate = function uniqueDelegateHandler(evt) {
				delegateHandler.call(this, evt, selector, handler);
			};
		}
	
		names = names.split(/\s/);
	
		for (var i = 0; i < names.length; i++) {
			var name = names[i].split(/\.(.+)/);
			var namespace = name[1];
			name = name[0];
	
			for (var j = 0; j < this.length; j++) {
				var node = this[j],
				    nodeID = node.b$ = node.b$ || ++data.nodeIndex,
				    events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [];
	
				var exist = false;
	
				for (var k = 0; k < events.length; k++) {
					var event = events[k];
	
					if (handler === event.handler && (!selector || selector === event.selector)) {
						exist = true;
						break;
					}
				}
	
				if (!exist) {
					events.push({
						delegate: delegate,
						handler: handler,
						namespace: namespace,
						selector: selector
					});
	
					node.addEventListener(name, delegate || handler, false);
				}
			}
		}
	
		return this;
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
		nodeIndex: 0,
		allEvents: {}
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
		var node = this[0];
		return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(24);
	
	// removes event handler from a set of elements
	module.exports = off;
	function off(names, selector, handler) {
		if (typeof selector === 'function') {
			handler = selector;
			selector = null;
		}
	
		names = names.split(/\s/);
	
		for (var i = 0; i < names.length; i++) {
			var name = names[i].split(/\.(.+)/);
			var namespace = name[1];
			name = name[0];
	
			for (var j = 0; j < this.length; j++) {
				var node = this[j],
				    events = data.allEvents[name + node.b$];
	
				if (events) {
					for (var k = 0; k < events.length; k++) {
						var event = events[k];
						if ((!handler || handler === event.handler || handler === event.delegate) && (!namespace || namespace === event.namespace) && (!selector || selector === event.selector)) {
							node.removeEventListener(name, event.delegate || event.handler);
							events.splice(k--, 1);
						}
					}
				} else {
					if (!namespace && !selector) {
						node.removeEventListener(name, handler);
					}
				}
			}
		}
	
		return this;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	var data = __webpack_require__(24);
	
	// adds unique nodes to bQuery collection
	module.exports = add;
	function add(selector) {
		var idMap = {};
	
		var result = void 0,
		    nodeID = void 0,
		    node = void 0,
		    i = void 0;
	
		selector = new Init(selector);
	
		if (this.length) {
			result = new Init(this);
			for (i = 0; i < result.length; i++) {
				node = result[i];
				nodeID = node.b$ = node.b$ || ++data.nodeIndex;
				idMap[nodeID] = 1;
			}
	
			for (i = 0; i < selector.length; i++) {
				node = selector[i];
				nodeID = node.b$ = node.b$ || ++data.nodeIndex;
				if (!idMap[nodeID]) {
					idMap[nodeID] = 1;
					result.push(node);
				}
			}
		} else {
			result = selector;
		}
	
		return result;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	// excludes elements from current set by given selector
	module.exports = not;
	function not(selector) {
		var result = new Init();
	
		for (var i = 0; i < this.length; i++) {
			if (!new Init(this[i]).is(selector)) {
				result.push(this[i]);
			}
		}
	
		return result;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	// get the descendants of each element in the current set of matched elements,
	// filtered by a selector
	module.exports = find;
	function find(selector) {
		var result = new Init();
	
		for (var _target = this, _index = 0, el, _l = _target.length; el = _target[_index], _index < _l; _index++) {
			result = result.add(el.querySelectorAll(selector));
		}
	
		return result;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(31);
	
	var set = __webpack_require__(7);
	
	var addListener = __webpack_require__(33);
	
	var is = __webpack_require__(11);
	
	var dom = __webpack_require__(14);
	
	function runMatreshkaHandler(node, propDef, binder, options, evt) {
		var value = propDef.value;
		var onChangeValue = evt.onChangeValue;
		var changedNode = evt.changedNode;
		var evtBinder = evt.binder;
		var setValue = binder.setValue;
		// dirty hack for https://github.com/matreshkajs/matreshka/issues/19
	
		var dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? value + '' : value;
	
		if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
			return;
		}
	
		var _result = { value: value };
	
		for (var _source2 = options, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
			_key2 = _keys2[_i2];
			_result[_key2] = _source2[_key2];
		}
	
		setValue.call(node, value, _result);
	};
	
	module.exports = bindSingleNode;
	function bindSingleNode(object, _ref) {
		var givenBinder = _ref.binder;
		var key = _ref.key;
		var $nodes = _ref.$nodes;
		var node = _ref.node;
		var evt = _ref.evt;
		var propDef = _ref.propDef;
		var assignDefaultValue = evt.assignDefaultValue;
		var debounce = evt.debounce;
		var value = propDef.value;
	
		var options = {
			self: object,
			key: key,
			value: value,
			$nodes: $nodes,
			node: node
		};
		var bindings = propDef.bindings = propDef.bindings || [];
		var isUndefined = typeof value == 'undefined';
		var binder = void 0;
		var objectHandler = void 0;
	
		if (givenBinder !== null) {
			var foundBinder = lookForBinder(node);
	
			if (foundBinder) {
				if (givenBinder) {
					var _result2 = foundBinder;
	
					for (var _source4 = givenBinder, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
						_key4 = _keys4[_i4];
						_result2[_key4] = _source4[_key4];
					}
				}
	
				binder = foundBinder;
			} else {
				binder = givenBinder;
			}
		}
	
		var _binder = binder;
		var getValue = _binder.getValue;
		var setValue = _binder.setValue;
		var on = _binder.on;
		var initialize = _binder.initialize;
	
	
		if (initialize) {
			initialize.call(node, options);
		}
	
		if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
			var _value = getValue.call(node, options);
			isUndefined = typeof _value === 'undefined';
	
			var _result3 = { fromNode: true };
	
			for (var _source6 = evt, _keys6 = Object.keys(_source6), _l6 = _keys6.length, _i6 = 0, _key6; _i6 < _l6; _i6++) {
				_key6 = _keys6[_i6];
				_result3[_key6] = _source6[_key6];
			}
	
			set(object, key, _value, _result3);
		}
	
		if (setValue) {
			objectHandler = function () {
				return runMatreshkaHandler(node, propDef, binder, options, evt);
			};
	
			if (debounce) {
				// TODO
				objectHandler = util.debounce(mkHandler);
			}
	
			addListener(object, '_change:bindings:' + key, objectHandler);
	
			if (!isUndefined) {
				objectHandler();
			}
		}
	
		if (getValue && on) {
			(function () {
				// TODO use CustomEvent instance instead of an object as default value
				// TODO move it to top
				var nodeHandler = function () {
					var domEvent = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
					// nodeHandler.disabled = true is set in unbindNode
					// we cannot "turn off" binder.on when its value is function
					// developer needs to clean memory (turn off callback) manualy in binder.destroy
					if (nodeHandler.disabled) return;
	
					var previousValue = propDef.value;
					var which = domEvent.which;
					var target = domEvent.target;
					var _result4 = {
						previousValue: previousValue,
						domEvent: domEvent,
						originalEvent: domEvent.originalEvent || domEvent, // jQuery thing
						preventDefault: function () {
							return domEvent.preventDefault();
						},
						stopPropagation: function () {
							return domEvent.stopPropagation();
						},
						which: which,
						target: target
					};
	
					for (var _source8 = options, _keys8 = Object.keys(_source8), _l8 = _keys8.length, _i8 = 0, _key8; _i8 < _l8; _i8++) {
						_key8 = _keys8[_i8];
						_result4[_key8] = _source8[_key8];
					}
	
					var value = getValue.call(node, _result4);
	
					if (!is(value, previousValue)) {
						// TODO add description of a hack
						// why do we need changedNode, onChangeValue, binder?
						set(object, key, value, {
							fromNode: true,
							changedNode: node,
							onChangeValue: value,
							binder: binder
						});
					}
				};
	
				bindings.push({
					on: on,
					node: node,
					binder: binder,
					objectHandler: objectHandler,
					nodeHandler: nodeHandler,
					options: options
				});
	
				if (typeof on == 'function') {
					on.call(node, nodeHandler, options);
				} else {
					dom.$(node).on(on, nodeHandler);
				}
			})();
		}
	}
	/*
	function initBinding(object, objectData, key, $nodes, index, binder, evt, special) {
		var options = {
				self: object,
				key: key,
				$nodes: $nodes,
				node: node
			},
			node = $nodes[index],
			isUndefined = typeof special.value == 'undefined',
			_binder,
			_evt,
			foundBinder,
			_options,
			i,
			domEvt,
			mkHandler,
			val;




		if (binder === null) {
			_binder = {};
		} else {
			foundBinder = lookForBinder(node);

			if (foundBinder) {
				if (binder) {
					for (i in binder) {
						foundBinder[i] = binder[i];
					}
				}

				_binder = foundBinder;
			} else {
				_binder = binder || {};
			}
		}

		if (_binder.initialize) {
			_options = {
				value: special.value
			};
			for (i in options) {
				_options[i] = options[i];
			}
			_binder.initialize.call(node, _options);
		}

		if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {

			_evt = {
				fromNode: true
			};

			for (i in evt) {
				_evt[i] = evt[i];
			}

			val = _binder.getValue.call(node, options);
			isUndefined = typeof val == 'undefined';

			core.set(object, key, val, _evt);
		}


		if (_binder.setValue) {
			mkHandler = function (evt) {
				var v = objectData.special[key].value,
					// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
					_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
					i;

				if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;

				_options = {
					value: v
				};

				for (i in options) {
					_options[i] = options[i];
				}

				_binder.setValue.call(node, v, _options);
			};

			if(evt.debounce) {
				mkHandler = util.debounce(mkHandler);
			}

			core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, {node: node});

			!isUndefined && mkHandler();
		}




		if (_binder.getValue && _binder.on) {
			domEvt = {
				node: node,
				on: _binder.on,
				instance: object,
				key: key,
				mkHandler: mkHandler,
				handler: function(evt) {
					if (domEvt.removed) return;
					var oldvalue = object[key],
						value,
						j,
						_options = {
							value: oldvalue,
							domEvent: evt,
							originalEvent: evt.originalEvent || evt,
							preventDefault: function() {
								evt.preventDefault();
							},
							stopPropagation: function() {
								evt.stopPropagation();
							},
							which: evt.which,
							target: evt.target
						};


					// hasOwnProperty is not required there
					for (j in options) {
						_options[j] = options[j];
					}

					value = _binder.getValue.call(node, _options);

					if (value !== oldvalue) {
						core.set(object, key, value, {
							fromNode: true,
							changedNode: node,
							onChangeValue: value
						});
					}
				}
			};

			core.domEvents.add(domEvt);
		}
	}*/

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(32);
	
	module.exports = function (node) {
	    var result, i;
	
	    for (i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = [function (node) {
		var tagName = node.tagName,
		    binders = undefined,
		    b;
	
		// TODO Switch/case
		if (tagName == 'INPUT') {
			b = binders.input(node.type);
		} else if (tagName == 'TEXTAREA') {
			b = binders.textarea();
		} else if (tagName == 'SELECT') {
			b = binders.select(node.multiple);
		} else if (tagName == 'PROGRESS') {
			b = binders.progress();
		} else if (tagName == 'OUTPUT') {
			b = binders.output();
		}
	
		return b;
	}];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var triggerOne = __webpack_require__(8);
	
	var defineProp = __webpack_require__(6);
	
	// property modifier event regexp
	var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^change:|^beforechange:/;
	
	// adds simple event listener
	// used as core of event engine
	/*eslint no-shadow: ["error", { "allow": ["evt"] }]*/
	
	module.exports = addListener;
	function addListener(object, name, callback, context) {
		var info = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
		var _initMK = initMK(object);
	
		var allEvents = _initMK.events;
		var ctx = context || object;
		var events = allEvents[name];
		var evt = { callback: callback, context: context, ctx: ctx, name: name, info: info };
	
		// if there are events with the same name
		if (events) {
			// if there are events with the same data, return false
			for (var i = 0; i < events.length; i++) {
				var _evt = events[i];
				if ((_evt.callback === callback || _evt.callback === callback._callback) && _evt.context === context) {
					return false;
				}
			}
	
			// if the event isn't found add it to the event list
			events.push(evt);
		} else {
			// if there are no events with the same name, create array with only ebent
			allEvents[name] = [evt];
		}
	
		if (propModEventReg.test(name)) {
			// define needed accessors for KEY
			defineProp(object, name.replace(propModEventReg, ''));
		}
	
		if (name[0] !== '_') {
			triggerOne(object, 'addevent:' + name, evt);
			triggerOne(object, 'addevent', evt);
		}
	
		// if event is added return true
		return true;
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(9);
	
	var initMK = __webpack_require__(4);
	
	var getNodes = __webpack_require__(12);
	
	var removeListener = __webpack_require__(35);
	
	module.exports = unbindNode;
	function unbindNode(object, key, node, evt) {
		checkObjectType(object, 'unbindNode');
	
		if (key instanceof Array) {
			if (typeof key[0] === 'string') {
				for (var _target = key, _index = 0, itemKey, _l = _target.length; itemKey = _target[_index], _index < _l; _index++) {
					unbindNode(object, itemKey, node, evt)
				}
				/*
	    * this.unbindNode(['a', 'b', 'c'], node)
	    */
			} else {
				for (var _target2 = key, _index2 = 0, _ref, _l2 = _target2.length; _ref = _target2[_index2], _index2 < _l2; _index2++) {
					var itemKey = _ref.key;
					var itemNode = _ref.node;
	
					bindNode(object, itemKey, itemNode, node);
				}
				/*
	    * this.unbindNode([{key, node, binder, event}], { silent: true });
	    */
	
			}
	
			return object;
		}
	
		/*
	  * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	  */
		if (key && typeof key === 'object') {
			for (var _target3 = key, _keys = Object.keys(_target3), _i = 0, keyObjKey, keyObjValue, _l3 = _keys.length; (keyObjKey = _keys[_i], keyObjValue = _target3[keyObjKey]), _i < _l3; _i++) {
				unbindNode(object, keyObjKey, keyObjValue, node)
			}
	
			return object;
		}
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
	
		var propDef = props[key];
	
		if (!propDef) {
			return object;
		}
	
		var bindings = propDef.bindings;
	
	
		if (!bindings) {
			return object;
		}
	
		// TODO make sure to update $nodes for Matreshka instances
	
		if (key === null) {
			// TODO remove all bindings
	
			return object;
		}
	
		if (!node) {
			// TODO remove all bindings for given key
		}
	
		var $nodes = getNodes(object, node);
		var retainBindings = [];
	
		for (var _target5 = $nodes, _index4 = 0, nodesItem, _l5 = _target5.length; nodesItem = _target5[_index4], _index4 < _l5; _index4++) {
			for (var _target4 = bindings, _index3 = 0, binding, _l4 = _target4.length; binding = _target4[_index3], _index3 < _l4; _index3++) {
				var on = binding.on;
				var node = binding.node;
				var binder = binding.binder;
				var nodeHandler = binding.nodeHandler;
				var objectHandler = binding.objectHandler;
				var options = binding.options;
	
	
				if (node === nodesItem) {
					var destroy = binder.destroy;
	
	
					if (typeof on === 'function') {
						nodeHandler.disabled = true;
					} else {
						dom.$(node).off(on, nodeHandler);
					}
					removeListener(object, '_change:bindings:' + key, objectHandler);
	
					if (destroy) {
						destroy.call(node, options);
					}
				} else {
					retainBindings.push(binding);
				}
			}
			// TODO move to the top ?
	
		}
	
		propDef.bindings = retainBindings;
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var triggerOne = __webpack_require__(8);
	
	// removes simple event listener to an object
	/*eslint no-shadow: ["error", { "allow": ["name", "events"] }]*/
	module.exports = removeListener;
	function removeListener(object, name, callback, context, info) {
		var def = defs.get(object);
	
		// if no definition do nothing
		if (!def) return;
	
		var allEvents = def.events;
	
		var events = allEvents[name];
		var retain = [];
		var noTrigger = name ? name[0] === '_' : false;
	
		// if all events need to be removed
		if (typeof name === 'undefined') {
			if (!noTrigger) {
				for (var _target2 = allEvents, _keys = Object.keys(_target2), _i = 0, name, events, _l2 = _keys.length; (name = _keys[_i], events = _target2[name]), _i < _l2; _i++) {
					for (var _target = events, _index = 0, evt, _l = _target.length; evt = _target[_index], _index < _l; _index++) {
						var removeEvtData = {
							name: name,
							callback: evt.callback,
							context: evt.context
						};
	
						triggerOne(object, 'removeevent:' + name, removeEvtData);
						triggerOne(object, 'removeevent', removeEvtData);
					}
				}
			}
	
			// restore default value of "events"
			def.events = {};
		} else if (events) {
			for (var _target3 = events, _index2 = 0, evt, _l3 = _target3.length; evt = _target3[_index2], _index2 < _l3; _index2++) {
				if (callback && callback !== evt.callback && callback._callback !== evt.callback || context && context !== evt.context) {
					// keep event
					retain.push(evt);
				} else {
					var _removeEvtData = {
						name: name,
						callback: evt.callback,
						context: evt.context
					};
	
					if (!noTrigger) {
						triggerOne(object, 'removeevent:' + name, _removeEvtData);
						triggerOne(object, 'removeevent', _removeEvtData);
					}
				}
			}
			// if events with given name are found
	
	
			if (retain.length) {
				allEvents[name] = retain;
			} else {
				delete def.events[name];
			}
		}
	
		return;
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.fn.add', function () {
		it('adds once', function () {
			var el1 = document.createElement('div'),
			    el2 = document.createElement('div'),
			    el3 = document.createElement('div'),
			    el4 = document.createElement('div'),
			    el5 = document.createElement('div');
	
			expect([...$([el1, el2, el3]).add([el2, el3, el4, el5])]).toEqual([el1, el2, el3, el4, el5]);
		});
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.create', function () {
		it('creates element', function () {
			expect($.create('div').tagName).toEqual('DIV');
		});
	
		it('adds a property', function () {
			expect($.create('div', {
				className: 'foobar'
			}).className).toEqual('foobar');
		});
	
		it('creates childen', function () {
			expect($.create('div', {
				children: [{
					tagName: 'span'
				}]
			}).children[0].tagName).toEqual('SPAN');
		});
	
		it('adds attribute', function () {
			expect($.create('div', {
				attributes: {
					foo: 'bar'
				}
			}).getAttribute('foo')).toEqual('bar');
		});
	
		it('allows to pass object with tagName property', function () {
			expect($.create({
				tagName: 'div'
			}).tagName).toEqual('DIV');
		});
	
		xit('extends dataset object', function () {
			// TODO
		});
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(16);
	
	var simulateClick = __webpack_require__(39);
	
	describe('bQuery events', function () {
		var testSandbox = void 0,
		    child1 = void 0,
		    child2 = void 0,
		    grandchild1 = void 0,
		    handler = void 0;
	
		beforeEach(function () {
			testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t\t<div class="child1">\n\t\t\t\t<div class="grandchild1"></div>\n\t\t\t</div>\n\t\t\t<div class="child2"></div>\n\t\t';
	
			child1 = testSandbox.querySelector('.child1');
			child2 = testSandbox.querySelector('.child2');
			grandchild1 = testSandbox.querySelector('.grandchild1');
	
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		afterEach(function () {
			$([testSandbox, child1, child2, grandchild1]).off('click');
		});
	
		it('Adds event listener', function () {
			$(testSandbox).on('click', handler);
			simulateClick(testSandbox);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Removes event listener (listener is specified)', function () {
			$(testSandbox).on('click', handler).off('click', handler);
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes event listener (listener is not specified)', function () {
			$(testSandbox).on('click', handler).off('click');
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Adds namespaced listener', function () {
			$(testSandbox).on('click.yo', handler);
			simulateClick(testSandbox);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Removes namespaced listener (listener is specified)', function () {
			$(testSandbox).on('click.yo', handler).off('click.yo', handler);
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes namespaced listener (listener is not specified)', function () {
			$(testSandbox).on('click.yo', handler).off('click.yo');
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Adds bubbling event listener', function () {
			$(testSandbox).on('click', handler);
			simulateClick(grandchild1);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Adds delegated event listener', function () {
			$(testSandbox).on('click', '.child1', handler);
			simulateClick(child1);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Adds delegated event listener (click on grandchildren)', function () {
			$(testSandbox).on('click', '.child1', handler);
			simulateClick(grandchild1);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Doesn\t trigger when clicked on wrong child', function () {
			$(testSandbox).on('click', '.child2', handler);
			simulateClick(grandchild1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector and handler are specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click', '.child1', handler);
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector is specified, handler is not specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click', '.child1');
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector is not specified, handler is specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click', handler);
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector and handler are not specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click');
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Stops propagation', function () {
			$(testSandbox).on('click', handler);
			$(child1).on('click', function (evt) {
				return evt.stopPropagation();
			});
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	});

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	// simulates click on a node
	module.exports = simulateClick;
	function simulateClick(node) {
		var evt = document.createEvent('MouseEvent');
		evt.initMouseEvent('click', true);
		node.dispatchEvent(evt);
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.fn.find', function () {
		var testSandbox = void 0,
		    grandChild = void 0;
	
		beforeEach(function () {
			testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t\t<div class="child">\n\t\t\t\t<div class="grandchild"></div>\n\t\t\t</div>\n\t\t';
	
			grandChild = testSandbox.querySelector('.grandchild');
		});
	
		it('finds', function () {
			expect([...$(testSandbox).find('.grandchild')]).toEqual([grandChild]);
		});
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	// засунуть все создания новых элементов в beforeEach
	// рефакторить
	// написать комментарии (в том числе и к уже реализованным функциям)
	// после всего нужно включить линтер и проверить коверадж
	
	describe('bQuery initialization', function () {
		var testSandbox = void 0;
	
		beforeEach(function () {
			testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t\t<div class="test">\n\t\t\t\t<div class="test-1"></div>\n\t\t\t\t<div class="test-2"></div>\n\t\t\t\t<div class="test-3"></div>\n\t\t\t</div>\n\t\t';
		});
	
		it('accepts window', function () {
			var result = $(window);
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual(window);
		});
	
		it('accepts document', function () {
			var result = $(document);
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual(document);
		});
	
		it('parses HTML', function () {
			var result = $('<div></div><span></span>');
	
			expect(result.length).toEqual(2);
			expect(result[0].tagName).toEqual('DIV');
			expect(result[1].tagName).toEqual('SPAN');
		});
	
		it('converts array-like', function () {
			var children = testSandbox.querySelectorAll('*'),
			    result = $(children);
	
			expect(children.length).toEqual(result.length);
	
			for (var i = 0; i < children.length; i++) {
				expect(children[i]).toEqual(result[i]);
			}
		});
	
		it('Converts one element', function () {
			var element = document.querySelector('*'),
			    result = $(element);
	
			expect(result.length).toEqual(1);
			expect(element).toEqual(result[0]);
		});
	
		it('Uses context', function () {
			expect($('.test-1', testSandbox).length).toEqual(1);
		});
	
		it('Uses context', function () {
			expect($('.test-1', '.wrong-context').length).toEqual(0);
		});
	
		it('Allows to use null', function () {
			expect($(null).length).toEqual(0);
		});
	
		it('Allows to use undefined', function () {
			expect($().length).toEqual(0);
		});
	
		it('Allows to create plugins', function () {
			$.fn.bQueryPlugin = function bQueryPlugin() {
				expect(this.length).toEqual(testSandbox.querySelectorAll('*').length);
			};
	
			spyOn($.fn, 'bQueryPlugin');
	
			$('*', testSandbox).bQueryPlugin();
	
			expect($.fn.bQueryPlugin).toHaveBeenCalled();
		});
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.fn.not', function () {
		it('checks className', function () {
			var el = document.createElement('div');
			el.className = 'el';
	
			expect($(el).is('.el')).toEqual(true);
	
			expect($(el).is('.el2')).toEqual(false);
		});
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.fn.not', function () {
		it('excludes by selector', function () {
			var el1 = document.createElement('div'),
			    el2 = document.createElement('div'),
			    el3 = document.createElement('div');
	
			el2.className = 'el2';
	
			expect([...$([el1, el2, el3]).not('.el2')]).toEqual([el1, el3]);
		});
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.one', function () {
		it('finds', function () {
			var testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t<div class="child">\n\t\t\t<div class="grandchild"></div>\n\t\t</div>\n\t\t<div class="child2">\n\t\t\t<div class="grandchild2"></div>\n\t\t</div>\n\t\t';
	
			var child = testSandbox.querySelector('.child');
	
			expect($.one('*', testSandbox)).toEqual(child);
		});
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.parseHTML', function () {
		it('parses HTML', function () {
			var result = $.parseHTML('<div></div><span></span>');
	
			expect(result.length).toEqual(2);
			expect(result[0].tagName).toEqual('DIV');
			expect(result[1].tagName).toEqual('SPAN');
		});
	
		it('parses contextual elements', function () {
			var result = $.parseHTML('<td></td><td></td>');
	
			expect(result.length).toEqual(2);
			expect(result[0].tagName).toEqual('TD');
			expect(result[1].tagName).toEqual('TD');
		});
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(47);
	
	describe('Class function', function () {
		it('allows to inherit', function () {
			var A = Class({ a: true }),
			    B = Class({ b: true, extends: A }),
			    C = Class({ c: true, extends: B }),
			    inst = new C();
	
			expect(inst instanceof A).toBeTruthy();
			expect(inst instanceof B).toBeTruthy();
			expect(inst instanceof C).toBeTruthy();
	
			expect(inst.a).toBeTruthy();
			expect(inst.b).toBeTruthy();
			expect(inst.c).toBeTruthy();
		});
	
		it('allows to pass static props', function () {
			var A = Class({}, { staticProp: true });
			expect(A.staticProp).toBeTruthy();
		});
	
		it('if new Class({}) is called return its instance', function () {
			var inst = new Class({ a: true });
			expect(inst.a).toBeTruthy();
			expect(inst instanceof Class).toBeFalsy();
		});
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
	module.exports = Class;
	function Class(prototype, staticProps) {
		var Constructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},
	
		//extends is kept for backward compatibility
		Parent = prototype.extends || prototype.extend,
	
		//inherit proto from class parent or empty object
		proto = Object.create(Parent ? Parent.prototype : {});
	
		extend(proto, prototype);
	
		if (typeof staticProps === 'object') {
			extend(Constructor, staticProps);
		}
	
		// for backward compatibility
		proto.instanceOf = function instanceOf() {
			return this instanceof Constructor;
		};
	
		Constructor.prototype = proto;
	
		// if new Class({}) is called return its instance
		if (this instanceof Class) {
			return new Constructor();
		} else {
			return Constructor;
		}
	}

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	/*eslint-disable */
	xdescribe('Delegated events: delegateListener, undelegateListener (Matreshka.Object and Matreshka.Array)', function () {
		it('works with "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({});
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', {});
	
			magic.trigger(obj.x, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('removes "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({});
	
			magic._undelegateListener(obj, '*', 'someevent');
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes "*" events (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', {});
	
			magic._undelegateListener(obj, '*', 'someevent');
	
			magic.trigger(obj.x, 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes "*" events using callback (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false,
			    callback = function (evt) {
				return bool = true;
			};
	
			magic._delegateListener(obj, '*', 'someevent', callback);
	
			obj.push({});
	
			magic._undelegateListener(obj, '*', 'someevent', callback);
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes "*" events using callback (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false,
			    callback = function (evt) {
				return bool = true;
			};
	
			magic._delegateListener(obj, '*', 'someevent', callback);
	
			obj.jset('x', {});
	
			magic._undelegateListener(obj, '*', 'someevent', callback);
	
			magic.trigger(obj.x, 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('works with "*" events (MK.Array), go deeper (*.a)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({
				a: {}
			});
	
			magic.trigger(obj[0].a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object), go deeper (*.a)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', {
				a: {}
			});
	
			magic.trigger(obj.x.a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Array), go deeper (*.*)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push(new MK.Array({}));
	
			magic.trigger(obj[0][0], 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object), go deeper (*.*)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', new MK.Object({
				a: {}
			}));
	
			magic.trigger(obj.x.a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Array), go deeper (*.*.a)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push(new MK.Array({
				a: {}
			}));
	
			magic.trigger(obj[0][0].a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object), go deeper (*.*.a)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', new MK.Object({
				y: new MK.Object({
					a: {}
				})
			}));
	
			magic.trigger(obj.x.y.a, 'someevent');
	
			expect(bool).toBe(true);
		});
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(50);
	
	var undelegateListener = __webpack_require__(51);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(52);
	
	describe('Delegated events: delegateListener, undelegateListener (basic)', function test() {
		var _this = this;
	
		var ctx = void 0,
		    handler = void 0;
	
		beforeEach(function () {
			ctx = {};
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		it('fires (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b, reassign a)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a = makeObject('b');
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b, reassign b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a.b = {};
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b.c, reassign a)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a = makeObject('b.c');
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b.c, reassign b)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b = makeObject('c');
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b.c, reassign c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b.c = {};
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b, reassign a)', function () {
			var obj = makeObject('a.b'),
			    a = obj.a;
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a = makeObject('b');
			triggerOne(a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b, reassign b)', function () {
			var obj = makeObject('a.b'),
			    b = obj.a.b;
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a.b = {};
			triggerOne(b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b.c, reassign a)', function () {
			var obj = makeObject('a.b.c'),
			    a = obj.a;
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a = makeObject('b.c');
			triggerOne(a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b.c, reassign b)', function () {
			var obj = makeObject('a.b.c'),
			    b = obj.a.b;
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b = makeObject('c');
			triggerOne(b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b.c, reassign c)', function () {
			var obj = makeObject('a.b.c'),
			    c = obj.a.c;
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b.c = {};
			triggerOne(c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			undelegateListener(obj, 'a.b', 'someevent');
			triggerOne(obj.a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			undelegateListener(obj, 'a.b.c', 'someevent');
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('doesn\'t remove change event when undelegate (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', function () {});
			delegateListener(obj, 'a.b', 'change:c', handler);
			undelegateListener(obj, 'a.b.c', 'someevent');
			obj.a.b.c = 55;
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			undelegateListener(obj, 'a.b', 'someevent', handler);
			triggerOne(obj.a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			undelegateListener(obj, 'a.b.c', 'someevent', handler);
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback and context (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler, ctx);
			undelegateListener(obj, 'a.b', 'someevent', handler, ctx);
			triggerOne(obj.a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback and context (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler, ctx);
			undelegateListener(obj, 'a.b.c', 'someevent', handler, ctx);
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when callbacks are not same (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			undelegateListener(obj, 'a.b', 'someevent', function () {});
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when callbacks are not same (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			undelegateListener(obj, 'a.b.c', 'someevent', function () {});
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when contexts are not same (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler, {});
			undelegateListener(obj, 'a.b', 'someevent', handler, {});
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when contexts are not same (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler, {});
			undelegateListener(obj, 'a.b.c', 'someevent', handler, {});
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('uses correct context for delegated events', function () {
			var obj = makeObject('a.b.c');
			var bool = false;
	
			delegateListener(obj, 'a.b.c', 'someevent', function handle() {
				bool = this === ctx;
			}, ctx);
	
			triggerOne(obj.a.b.c, 'someevent');
			expect(bool).toBe(true);
		});
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var undelegateListener = __webpack_require__(51);
	
	var triggerOne = __webpack_require__(8);
	
	function changeHandler(_ref) {
		var previousValue = _ref.previousValue;
		var value = _ref.value;
	
		var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];
	
		var path = _ref2.path;
		var name = _ref2.name;
		var callback = _ref2.callback;
		var context = _ref2.context;
	
		if (value && typeof value === 'object') {
			delegateListener(value, path, name, callback, context);
		}
	
		if (previousValue && typeof previousValue === 'object') {
			undelegateListener(previousValue, path, name, callback, context);
		}
	} /*eslint no-use-before-define: ["error", { "functions": false }]*/
	
	
	module.exports = delegateListener;
	function delegateListener(object, path, name, callback, context) {
		// if typeof path is string and path is not empty string then split it
		path = typeof path === 'string' && path !== '' ? path.split('.') : path;
	
		if (!path || !path.length) {
			// if no path then add simple listener
			addListener(object, name, callback, context);
		} else {
			// else do all magic
			var key = path[0];
			var pathStr = void 0;
	
			if (path.length > 1) {
				var _source = path,
				    _l = _source.length,
				    _i = 1 || 0,
				    _end = null || _l,
				    _j = 0,
				    _result = Array(_end - _i);
	
				while (_i < _end) {
					_result[_j++] = _source[_i++];
				}
	
				path = _result;
				pathStr = path.join('.');
			} else {
				path = [];
				pathStr = path[0] || '';
			}
	
			var delegatedData = {
				path: path,
				name: name,
				callback: callback,
				context: context
			};
	
			// the event is triggered by "set"
			addListener(object, '_change:delegated:' + key, changeHandler, null, {
				delegatedData: delegatedData,
				pathStr: pathStr
			});
	
			// call handler manually
			changeHandler({
				value: object[key]
			}, delegatedData);
		}
	}
	
	/*
	define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/initmk',
		'matreshka_dir/core/var/map',
		'matreshka_dir/core/var/specialevtreg'
	], function(core, initMK, map, specialEvtReg) {
		"use strict";
		var _delegateListener = core._delegateListener = function(object,
		 path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var objectData = map.get(object),
				executed = /([^\.]+)\.(.*)/.exec(path),
				f,
				firstKey = executed ? executed[1] : path,
				changeKey,
				obj;

			path = executed ? executed[2] : '';

			evtData = evtData || {};

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						f = function(evt) {
							(evt && evt.added ? evt.added : object).forEach(function(item) {
								item && _delegateListener(item, path, name,
								callback, context, evtData);
							});
						};

						f._callback = callback;
						core._addListener(object, 'add', f, context, evtData);
						f();
					} else if (object.isMKObject) {
						f = function(evt) {
							var target = object[evt.key];

							if (target && evt && (evt.key in objectData.keys)) {
								_delegateListener(target, path, name, callback, context, evtData);
							}
						};

						object.each(function(item) {
							_delegateListener(item, path, name, callback, context, evtData);
						});

						f._callback = callback;

						core._addListener(object, 'change', f, context, evtData);
					}
				} else {
					f = function(evt) {
						if (evt && evt._silent) return;

						var target = object[firstKey],
							changeKey,
							triggerChange = true,
							i,
							changeEvents;

						evtData.path = path;

						evtData.previousValue = evt && evt.previousValue ||
						evtData.previousValue && evtData.previousValue[firstKey];

						if (evt && evt.previousValue && map.has(evt.previousValue)) {
							core._undelegateListener(evt.previousValue, path, name, callback, context, evtData);
						}

						if (typeof target == 'object' && target) {
							_delegateListener(target, path, name, callback, context, evtData);
						}

						if (specialEvtReg.test(name)) {
							changeKey = name.replace(specialEvtReg, '');

							if (!path && evtData.previousValue && evtData.previousValue[changeKey]
							!== target[changeKey]) {
								changeEvents = map.get(evtData.previousValue).events[name];
								if (changeEvents) {
									for (i = 0; i < changeEvents.length; i++) {
										if (changeEvents[i].path === path) {
											triggerChange = false;
										}
									}
								}

								if (triggerChange) {
									core.set(target, changeKey, target[changeKey], {
										force: true,
										previousValue: evtData.previousValue[changeKey],
										previousObject: evtData.previousValue,
										_silent: true
									});
								}
							}
						}
					};

					f._callback = callback;

					core._addListener(object, 'change:' + firstKey, f, context, evtData);

					f();
				}
			} else {
				core._addListener(object, name, callback, context, evtData);
			}
		};
	});
	*/

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var removeListener = __webpack_require__(35);
	
	// REFACTOR, DONT TRIGGER ADDEVENT, REMOVEEVENT
	module.exports = undelegateListener;
	function undelegateListener(object, path, name, callback, context) {
		var info = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
	
		var def = defs.get(object);
	
		// if no definition do nothing
		if (!def) return;
	
		var allEvents = def.events;
	
	
		path = typeof path === 'string' && path !== '' ? path.split('.') : path;
	
		if (!path || !path.length) {
			// if no path then remove listener
			removeListener(object, name, callback, context, info);
		} else {
			(function () {
				// else do all magic
				var key = path[0];
				var changeDelegatedEvtName = '_change:delegated:' + key;
				var events = allEvents[changeDelegatedEvtName];
				var pathStr = void 0;
	
				if (path.length > 1) {
					var _source = path,
					    _l = _source.length,
					    _i = 1 || 0,
					    _end = null || _l,
					    _j = 0,
					    _result = Array(_end - _i);
	
					while (_i < _end) {
						_result[_j++] = _source[_i++];
					}
	
					path = _result;
					pathStr = path.join('.');
				} else {
					path = [];
					pathStr = path[0] || '';
				}
	
				if (events) {
					(function () {
						var retain = [];
	
						for (var _target = events, _index = 0, event, _l2 = _target.length; event = _target[_index], _index < _l2; _index++) {
							if (event.info.pathStr !== pathStr) {
								retain.push(event);
							}
						}
	
						if (retain.length) {
							allEvents[changeDelegatedEvtName] = retain;
						} else {
							delete allEvents[changeDelegatedEvtName];
						}
					})();
				}
	
				if (typeof object[key] === 'object') {
					undelegateListener(object[key], path, name, callback, context, info);
				}
			})();
		}
	}
	
	/*
	define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map'
	], function(core, map) {
		"use strict";
		var _undelegateListener = core._undelegateListener =
		 function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var executed = /([^\.]+)\.(.*)/.exec(path),
				firstKey = executed ? executed[1] : path,
				p = path,
				objectData = map.get(object),
				events,
				i;

			path = executed ? executed[2] : '';

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						if (callback) {
							_undelegateListener(object, path, 'add', callback, context, evtData);
						} else {
							events = objectData.events.add || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {

									_undelegateListener(object, path, 'add', events[i].callback);
								}
							}
						}

						object.forEach(function(item) {
							item && _undelegateListener(item, path, name, callback, context);
						});
					} else if (object.isMKObject) {
						if (callback) {
							_undelegateListener(object, path, 'change', callback, context);
						} else {
							events = objectData.events.change || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {
									_undelegateListener(object, path, 'change', events[i].callback);
								}
							}
						}

						object.each(function(item) {
							item && _undelegateListener(item, path, name, callback, context);
						});
					}
				} else {
					if (callback) {
						core._removeListener(object, 'change:' + firstKey, callback, context, evtData);
					} else {
						events = objectData.events['change:' + firstKey] || [];
						for (i = 0; i < events.length; i++) {
							if (events[i].path == p) {
								core._removeListener(object, 'change:' + firstKey, events[i].callback);
							}
						}
					}
					if (typeof object[firstKey] == 'object') {
						_undelegateListener(object[firstKey], path, name, callback, context, evtData);
					}
				}
			} else {
				core._removeListener(object, name, callback, context, evtData);
			}
		};
	});

	*/

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	// creates nested object based on path and lastValue
	// example: makeObject('a.b.c', 42) -> {a: {b: {c; 42}}}
	module.exports = makeObject;
	function makeObject() {
		var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
		var lastValue = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		path = path ? path.split('.') : [];
		var result = {};
		var obj = result,
		    key = void 0;
	
		while (path.length > 1) {
			key = path.shift();
			obj = obj[key] = {};
		}
	
		obj[path.shift()] = lastValue;
	
		return result;
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var delegateListener = __webpack_require__(50);
	
	var undelegateListener = __webpack_require__(51);
	
	var removeListener = __webpack_require__(35);
	
	var makeObject = __webpack_require__(52);
	
	describe('Change event (simple and delegated)', function test() {
		var _this = this;
	
		var handler = void 0;
	
		beforeEach(function () {
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		it('fires simple', function () {
			var obj = { x: 1 };
	
			addListener(obj, 'change:x', handler);
			obj.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires (delegated, a.x)', function () {
			var obj = makeObject('a.x', 1);
	
			delegateListener(obj, 'a', 'change:x', handler);
			obj.a.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires (delegated, a.b.x)', function () {
			var obj = makeObject('a.b.x', 1);
	
			delegateListener(obj, 'a.b', 'change:x', handler);
			obj.a.b.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		it('removes simple', function () {
			var obj = { x: 1 };
	
			addListener(obj, 'change:x', handler);
			removeListener(obj, 'change:x', handler);
			obj.x = 2;
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes (delegated, a.x)', function () {
			var obj = makeObject('a.x', 1);
	
			delegateListener(obj, 'a', 'change:x', handler);
			undelegateListener(obj, 'a', 'change:x', handler);
			obj.a.x = 2;
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes (delegated, a.b.x)', function () {
			var obj = makeObject('a.b.x', 1);
	
			delegateListener(obj, 'a.b', 'change:x', handler);
			undelegateListener(obj, 'a.b', 'change:x', handler);
			obj.a.b.x = 2;
			expect(handler).not.toHaveBeenCalled();
		});
	
		/*eslint-disable */
		xit('fires (delegated, a.b.x)', function () {
			var obj = makeObject('a.b.x', 1);
	
			delegateListener(obj, 'a.b', 'change:x', handler);
			obj.a.b.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		xit('fires when delegated target is reassigned (a.b.c.x, reassign a)', function () {
			var obj = makeObject('a.b.c.x', 1);
	
			delegateListener(obj, 'a.b.c', 'change:x', handler);
			obj.a = makeObject('b.c.x', 2);
			expect(handler).toHaveBeenCalled();
		});
	
		xit('fires when delegated target is reassigned (a.b.c.x, reassign b)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;
	
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a.b = {
				c: {
					x: 2
				}
			};
	
			expect(bool).toBe(true);
		});
	
		xit('fires when delegated target is reassigned (a.b.c.x, reassign c)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;
	
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a.b.c = {
				x: 2
			};
	
			expect(bool).toBe(true);
		});
	
		xit('avoids conflicts', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    i = 0;
	
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e11;
			});
			magic._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e10;
			});
			magic._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e9;
			});
			magic._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e8;
			});
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e7;
			});
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e6;
			});
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e5;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e4;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e3;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e2;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e1;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e0;
			});
			obj.a = {
				b: {
					c: {
						x: 2
					}
				}
			};
			expect(i).toEqual(111111111111);
		});
	
		xit('accepts null target (a.b.c, reassign b)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;
	
			magic._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.a.b = null;
	
			expect(bool).toBe(false);
		});
		/*eslint-enable */
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var removeListener = __webpack_require__(35);
	
	var triggerOne = __webpack_require__(8);
	
	describe('Events core: addListener, removeListener, triggerOne', function test() {
		var _this = this;
	
		var obj = void 0,
		    ctx = void 0,
		    handler = void 0;
	
		beforeEach(function () {
			obj = {};
			ctx = {};
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		it('fires', function () {
			addListener(obj, 'someevent', handler);
			triggerOne(obj, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('avoids conflicts', function () {
			var i = 0;
			addListener(obj, 'someevent', function () {
				return i += 1e0;
			});
			addListener(obj, 'someevent', function () {
				return i += 1e1;
			});
			addListener(obj, 'someevent', function () {
				return i += 1e2;
			});
			triggerOne(obj, 'someevent');
	
			expect(i).toEqual(111);
		});
	
		it('removes (no args)', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj);
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by name', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj, 'someevent');
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by callback', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj, 'someevent', handler);
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by callback but keeps when callbacks are not same', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj, 'someevent', function () {});
			triggerOne(obj, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('removes by callback and context', function () {
			addListener(obj, 'someevent', handler, ctx);
			removeListener(obj, 'someevent', handler, ctx);
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by callback but keeps when contexts are not same', function () {
			addListener(obj, 'someevent', handler, ctx);
			removeListener(obj, 'someevent', handler, {});
			triggerOne(obj, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		xit('removes by howToRemove (not documented core feature)', function () {
			/*eslint-disable */
			var obj = {},
			    bool = false,
			    f = function (evt) {
				return bool = true;
			},
			    onData = {
				howToRemove: function (onData, offData) {
					return offData.x === 42;
				}
			};
	
			magic._addListener(obj, 'someevent1', f, null, onData);
			magic._removeListener(obj, 'someevent1', null, null, {
				x: 42
			});
	
			magic.trigger(obj, 'someevent1');
	
			expect(bool).toBe(false);
	
			magic._addListener(obj, 'someevent2', f, null, onData);
			magic._removeListener(obj, 'someevent2', null, null, {
				x: 43
			});
	
			magic.trigger(obj, 'someevent2');
	
			expect(bool).toBe(true);
			/*eslint-enable */
		});
	});

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	
	/*eslint-disable */
	
	xdescribe("Events core: _addDOMListener, _removeDOMListener", function () {
		var q = function (s, c) {
			var result = $(s, c)[0] || null;
			if (result) {
				result.click = result.click || function () {
					var ev = document.createEvent("MouseEvent");
					ev.initMouseEvent("click", true /* bubble */, true /* cancelable */
					, window, null, 0, 0, 0, 0, /* coordinates */
					false, false, false, false, /* modifier keys */
					0 /*left*/, null);
					result.dispatchEvent(ev);
				};
			}
			return result;
		};
	
		document.body.appendChild($.create({
			tagName: 'DIV',
			id: 'd-test',
			innerHTML: "\n\t\t\t<div id=\"d-test-1\">\n\t\t\t\t<div class=\"d-test-2\">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
		}));
	
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
	
			q('#d-test').click();
	
			expect(bool).toBe(true);
		});
	
		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click');
			magic.bindNode(obj, 'x', '#d-test');
	
			q('#d-test').click();
	
			expect(bool).toBe(false);
		});
	
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('adds (use selector) and removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(false);
		});
	
		it('adds (use selector) then binds then removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(false);
		});
	
		it('triggers DOM event', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			magic.trigger(obj, 'click::x', 1, 2);
	
			expect(bool).toBe(true);
		});
	
		it('triggers DOM event with specified selector', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			magic.trigger(obj, 'click::x(.d-test-2)', 1, 2);
	
			expect(bool).toBe(true);
		});
	
		it('triggers DOM event with specified selector (bubbling test)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			magic.trigger(obj, 'click::x(.d-test-2)', 1, 2);
	
			expect(bool).toBe(true);
		});
	
		it('removes delegated', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click', '.d-test-2');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(false);
		});
	
		it('removes delegated and doesn\'t remove events from other nodes', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click', '.blah');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('triggers event via "trigger" method', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
	
			magic.trigger(obj, 'click::x');
	
			expect(bool).toBe(true);
		});
	});

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";
	
	/*eslint-disable */
	xdescribe('Events summary (on, off)', function () {
		var q = function (s, c) {
			var result = $(s, c)[0] || null;
			if (result) {
				result.click = result.click || function () {
					var ev = document.createEvent("MouseEvent");
					ev.initMouseEvent("click", true /* bubble */, true /* cancelable */
					, window, null, 0, 0, 0, 0, /* coordinates */
					false, false, false, false, /* modifier keys */
					0 /*left*/, null);
					result.dispatchEvent(ev);
				};
			}
			return result;
		};
	
		var node = document.body.appendChild($.create({
			tagName: 'DIV',
			id: 's-test',
			innerHTML: "\n\t\t\t<div id=\"s-test-1\">\n\t\t\t\t<div class=\"s-test-2\">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
		}));
	
		node.click = node.click || function () {
			this.dispatchEvent(new MouseEvent('click'));
		};
	
		it('fires', function () {
			var obj = {},
			    bool = false;
			magic.on(obj, 'someevent', function (evt) {
				return bool = true;
			});
			magic.trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});
	
		it('fires on Matreshka instance', function () {
			var mk = new MK(),
			    bool = false;
			mk.on('someevent', function (evt) {
				return bool = true;
			});
			mk.trigger('someevent');
			expect(bool).toBe(true);
		});
	
		it('removes', function () {
			var obj = {},
			    bool = false,
			    f = function (evt) {
				return bool = true;
			};
	
			magic.on(obj, 'someevent', f);
			magic.off(obj, 'someevent');
			magic.trigger(obj, 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes on Matreshka instance', function () {
			var mk = new MK(),
			    bool = false,
			    f = function (evt) {
				return bool = true;
			};
	
			mk.on('someevent', f);
			mk.off('someevent');
			mk.trigger('someevent');
	
			expect(bool).toBe(false);
		});
	
		it('fires delegated', function () {
			var obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    bool = false;
	
			magic.on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});
			magic.trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(true);
		});
	
		it('removes delegated', function () {
			var obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    bool = false;
	
			magic.on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});
			magic.off(obj, 'a.b.c@someevent');
	
			magic.trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(false);
		});
	
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x', function (evt) {
				return bool = true;
			});
	
			q('#d-test').click();
	
			expect(bool).toBe(true);
		});
	
		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x', function (evt) {
				return bool = true;
			});
			magic.off(obj, 'click::x');
	
			q('#d-test').click();
	
			expect(bool).toBe(false);
		});
	
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic.on(obj, '@someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({});
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x', function (evt) {
				return bool = true;
			});
	
			q('#d-test').click();
	
			expect(bool).toBe(true);
		});
	
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('triggers once', function () {
			var obj = {},
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			magic.once(obj, 'someevent', f);
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
	
			expect(i).toBe(1);
		});
	
		it('allows to pass name-handler object to "once"', function () {
			var obj = {},
			    i = 0,
			    j = 0,
			    f1 = function (evt) {
				return i++;
			},
			    f2 = function (evt) {
				return j++;
			};
	
			magic.once(obj, {
				foo: f1,
				bar: f2
			});
	
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
	
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
	
			expect(i).toBe(1);
			expect(j).toBe(1);
		});
	
		it('triggers once on Matreshka instance', function () {
			var mk = new MK(),
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			mk.once('someevent', f);
			mk.trigger('someevent');
			mk.trigger('someevent');
			mk.trigger('someevent');
	
			expect(i).toBe(1);
		});
	
		it('onDebounce works', function (done) {
			var obj = {},
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			setTimeout(function () {
				expect(i).toBe(1);
				done();
			}, 200);
	
			magic.onDebounce(obj, 'someevent', f);
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
		});
	
		it('allows to pass name-handler object to "onDebounce"', function (done) {
			var obj = {},
			    i = 0,
			    j = 0,
			    f1 = function (evt) {
				return i++;
			},
			    f2 = function (evt) {
				return j++;
			};
	
			setTimeout(function () {
				expect(i).toBe(1);
				expect(j).toBe(1);
				done();
			}, 200);
	
			magic.onDebounce(obj, {
				foo: f1,
				bar: f2
			});
	
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
	
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
		});
	
		it('onDebounce works on Matreshka instance', function (done) {
			var mk = new MK(),
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			setTimeout(function () {
				expect(i).toBe(1);
				done();
			}, 800);
	
			mk.onDebounce('someevent', f);
			mk.trigger('someevent');
			mk.trigger('someevent');
			mk.trigger('someevent');
		});
	
		it('allows to pass name-handler object to "on" and "off"', function () {
			var obj = {},
			    bool = false,
			    i = 0,
			    handlers = {
				foo: function () {
					return i++;
				},
				bar: function () {
					return i++;
				}
			};
	
			MK.on(obj, handlers);
	
			MK.trigger(obj, 'foo');
			MK.trigger(obj, 'bar');
	
			expect(i).toBe(2);
	
			MK.off(obj, handlers);
	
			expect(i).toBe(2);
		});
	
		it('allows to flip context and triggerOnInit (on)', function () {
			var obj = {},
			    thisArg = {},
			    bool = false,
			    i = 0;
	
			MK.on(obj, 'foo', function () {
				expect(this).toEqual(thisArg);
				i++;
			}, true, thisArg);
	
			MK.on(obj, 'bar', function () {
				expect(this).toEqual(thisArg);
				i++;
			}, thisArg, true);
	
			expect(i).toBe(2);
		});
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 30,
		"./_bindings/defaultbinders.js": 32,
		"./_bindings/getnodes.js": 12,
		"./_bindings/lookforbinder.js": 31,
		"./_bindings/selectnodes.js": 13,
		"./_core/defineprop.js": 6,
		"./_core/defs.js": 5,
		"./_core/init.js": 4,
		"./_dom/default-dollar.js": 15,
		"./_dom/index.js": 14,
		"./_events/addlistener.js": 33,
		"./_events/delegatelistener.js": 50,
		"./_events/removelistener.js": 35,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 51,
		"./_util/checkobjecttype.js": 9,
		"./_util/is.js": 11,
		"./_util/matreshkaerror.js": 10,
		"./array.js": 58,
		"./binders.js": 59,
		"./bindnode.js": 3,
		"./bquery/_data.js": 24,
		"./bquery/_html2nodelist.js": 18,
		"./bquery/_init.js": 17,
		"./bquery/add.js": 27,
		"./bquery/create.js": 22,
		"./bquery/find.js": 29,
		"./bquery/index.js": 16,
		"./bquery/is.js": 25,
		"./bquery/not.js": 28,
		"./bquery/off.js": 26,
		"./bquery/on.js": 23,
		"./bquery/one.js": 21,
		"./bquery/parsehtml.js": 20,
		"./class.js": 47,
		"./extend.js": 19,
		"./get.js": 60,
		"./index.js": 61,
		"./magic.js": 64,
		"./matreshka/index.js": 62,
		"./object/index.js": 63,
		"./on.js": 65,
		"./set.js": 7,
		"./unbindnode.js": 34
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 57;


/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 60 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = get;
	function get(object, key) {
		return object[key];
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(62);
	
	var MatreshkaArray = __webpack_require__(58);
	
	var MatreshkaObject = __webpack_require__(63);
	
	var Class = __webpack_require__(47);
	
	var binders = __webpack_require__(59);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
	var Class = __webpack_require__(47);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjIwYzM3Mzk2YzA3NzEyMzY5MWEiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL21ha2VvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRyZXNoa2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFnaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7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QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHVEQUF1RDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O2tCQ3pEZSxFOzs7Ozs7OztrQkNBQSxFOzs7Ozs7OztrQkNBUztBQUFULFVBQVMsR0FBVCxDQUFhLE1BQWIsRUFBcUIsR0FBckIsRUFBMEI7QUFDeEMsU0FBTyxPQUFPLEdBQVAsQ0FBUCxDQUR3Qzs7Ozs7Ozs7O3FDQ0FuQjs7MENBQ0s7OzJDQUNDOztpQ0FDVjs7bUNBQ0U7O0FBRXBCLFdBQVUsS0FBVixHQUFrQixjQUFsQjtBQUNBLFdBQVUsTUFBVixHQUFtQixlQUFuQjtBQUNBLFdBQVUsS0FBVixHQUFrQixLQUFsQjtBQUNBLFdBQVUsT0FBVixHQUFvQixPQUFwQjs7a0JBRWUsVTs7Ozs7Ozs7a0NDWEk7O2lDQUNEOztrQkFFSCxNQUFNOzs7RUFBTixFQUdaOztBQUVGLGdCQUZFO0VBSFksRTs7Ozs7Ozs7a0JDSEEsRTs7Ozs7Ozs7a0JDQUEsRTs7Ozs7Ozs7OztrQkNHUztBQUFULFVBQVMsRUFBVCxHQUFjLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2MjBjMzczOTZjMDc3MTIzNjkxYVxuICoqLyIsIi8vIFRoaXMgZ2V0cyByZXBsYWNlZCBieSBrYXJtYSB3ZWJwYWNrIHdpdGggdGhlIHVwZGF0ZWQgZmlsZXMgb24gcmVidWlsZFxuY29uc3QgX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fID0gW107XG5cbi8vIHJlcXVpcmUgYWxsIG1vZHVsZXMgZW5kaW5nIGluIFwiX3Rlc3RcIiBmcm9tIHRoZVxuLy8gY3VycmVudCBkaXJlY3RvcnkgYW5kIGFsbCBzdWJkaXJlY3Rvcmllc1xuY29uc3QgdGVzdHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuL3NwZWMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5cbmZ1bmN0aW9uIGluTWFuaWZlc3QocGF0aCkge1xuXHRyZXR1cm4gX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fLmluZGV4T2YocGF0aCkgPj0gMDtcbn1cblxubGV0IHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKS5maWx0ZXIoaW5NYW5pZmVzdCk7XG5cbi8vIFJ1biBhbGwgdGVzdHMgaWYgd2UgZGlkbid0IGZpbmQgYW55IGNoYW5nZXNcbmlmICghcnVubmFibGUubGVuZ3RoKSB7XG5cdHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKTtcbn1cblxucnVubmFibGUuZm9yRWFjaCh0ZXN0c0NvbnRleHQpO1xuXG5cbmNvbnN0IGNvbXBvbmVudHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9zcmMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5jb21wb25lbnRzQ29udGV4dC5rZXlzKCkuZm9yRWFjaChjb21wb25lbnRzQ29udGV4dCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvaW5kZXguanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYnF1ZXJ5L2FkZF9zcGVjLmpzXCI6IDM2LFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXCI6IDM3LFxuXHRcIi4vYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXCI6IDM4LFxuXHRcIi4vYnF1ZXJ5L2ZpbmRfc3BlYy5qc1wiOiA0MCxcblx0XCIuL2JxdWVyeS9pbml0X3NwZWMuanNcIjogNDEsXG5cdFwiLi9icXVlcnkvaXNfc3BlYy5qc1wiOiA0Mixcblx0XCIuL2JxdWVyeS9ub3Rfc3BlYy5qc1wiOiA0Myxcblx0XCIuL2JxdWVyeS9vbmVfc3BlYy5qc1wiOiA0NCxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1wiOiA0NSxcblx0XCIuL2NsYXNzX3NwZWMuanNcIjogNDYsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1wiOiA0OCxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1wiOiA0OSxcblx0XCIuL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcIjogNTMsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1wiOiA1NCxcblx0XCIuL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcIjogNTUsXG5cdFwiLi9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1wiOiA1NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Rlc3Qvc3BlYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuXG4vKmltcG9ydCBtYWdpYyBmcm9tICdtYXRyZXNoa2EtbWFnaWMnO1xuaW1wb3J0IE1LIGZyb20gJ21hdHJlc2hrYSc7XG5pbXBvcnQgJCBmcm9tICdicXVlcnknO1xubGV0IHEgPSAocywgYykgPT4gJChzLCBjKVswXSB8fCBudWxsO1xuXG5sZXQgYmluZElucHV0ID0gKG9iaiwga2V5LCBldnQpID0+IHtcblx0bGV0IGlucHV0ID0gJC5jcmVhdGUoJ2lucHV0JyksXG5cdFx0YmluZGVyID0ge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMuX29ua2V5dXAgPSBjYmM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldFZhbHVlKHYpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHY7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRpZihvYmogaW5zdGFuY2VvZiBNSykge1xuXHRcdG9iai5iaW5kTm9kZShrZXksIGlucHV0LCBiaW5kZXIsIGV2dCk7XG5cdH0gZWxzZSB7XG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCBrZXksIGlucHV0LCBiaW5kZXIsIGV2dCk7XG5cdH1cblxuXG5cdHJldHVybiBpbnB1dDtcbn07Ki9cblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuXHRsZXQgb2JqO1xuXHRsZXQgbm9kZTtcblx0bGV0IG5vZGUyO1xuXHRsZXQgYmluZGVyO1xuXHRsZXQgc2ltdWxhdGVEb21FdmVudDtcblx0bGV0IGluaXRpYWxpemVDYWxsO1xuXHRsZXQgZGVzdHJveUNhbGw7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRub2RlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuXHRcdHRoaXMuaW5pdGlhbGl6ZUNhbGwgPSAoKSA9PiB7fTtcblx0XHR0aGlzLmRlc3Ryb3lDYWxsID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2luaXRpYWxpemVDYWxsJyk7XG5cdFx0c3B5T24odGhpcywgJ2Rlc3Ryb3lDYWxsJyk7XG5cdFx0aW5pdGlhbGl6ZUNhbGwgPSB0aGlzLmluaXRpYWxpemVDYWxsO1xuXHRcdGRlc3Ryb3lDYWxsID0gdGhpcy5kZXN0cm95Q2FsbDtcblxuXHRcdGJpbmRlciA9ICB7XG5cdFx0XHRvbihjYmMpIHtcblx0XHRcdFx0dGhpcy5vbmR1bW15ZXZlbnQgPSBjYmM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldFZhbHVlKHYpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHY7XG5cdFx0XHR9LFxuXHRcdFx0aW5pdGlhbGl6ZShvKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSAnJztcblx0XHRcdFx0aW5pdGlhbGl6ZUNhbGwoKTtcblx0XHRcdH0sXG5cdFx0XHRkZXN0cm95KCkge1xuXHRcdFx0XHR0aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuXHRcdFx0XHRkZXN0cm95Q2FsbCgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBhbmQgY2FsbCBpbml0aWFsaXplJywgKCkgPT4ge1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIpO1xuXHRcdG9iai54ID0gJ2Zvbyc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgdW5iaW5kIGFuZCBjYWxsIGRlc3Ryb3knLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG5cdFx0dW5iaW5kTm9kZShvYmosICd4Jywgbm9kZSk7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXonO1xuXHRcdG5vZGUub25kdW1teWV2ZW50KCk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRleHBlY3QoZGVzdHJveUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIpO1xuXHRcdG9iai54ID0gJ2Zvbyc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgdW5iaW5kIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIpO1xuXHRcdHVuYmluZE5vZGUob2JqLCB7IHg6IG5vZGUgfSk7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXonO1xuXHRcdG5vZGUub25kdW1teWV2ZW50KCk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRleHBlY3QoZGVzdHJveUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG5cdFx0YmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIpO1xuXHRcdG9iai54LnkueiA9ICdmb28nO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRub2RlLnZhbHVlID0gJ2Jhcic7XG5cdFx0bm9kZS5vbmR1bW15ZXZlbnQoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIHVuYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyKTtcblx0XHR1bmJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSk7XG5cdFx0b2JqLngueS56ID0gJ2Zvbyc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnZm9vJyk7XG5cdH0pO1xuXG5cdHhpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKTtcblxuXHRcdG9iai54ID0ge1xuXHRcdFx0eToge1xuXHRcdFx0XHR6OiAnZm9vJ1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0eGl0KCdzaG91bGQgcmVtb3ZlIGJpbmRpbmcgaWYgZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKSxcblx0XHRcdHggPSBvYmoueDtcblxuXHRcdG9iai54ID0ge1xuXHRcdFx0eToge1xuXHRcdFx0XHR6OiAnZm9vJ1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3QoeC55LnopLm5vdC50b0VxdWFsKCdiYXInKTtcblx0XHRleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcblxuXHRcdHgueS56ID0gJ2Jheic7XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3VzZXMgY3VzdG9tIHNlbGVjdG9ycyBvbiBjdXJyZW50IHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0gTUsudG8oe3g6IHt5OiAnZm9vJ319KSxcblx0XHQgXHRkaXYgPSAkLmNyZWF0ZSgnZGl2JyksXG5cdFx0XHRpbnB1dCA9IGRpdi5hcHBlbmRDaGlsZCgkLmNyZWF0ZSgnaW5wdXQnKSk7XG5cblx0XHRvYmouYmluZE5vZGUoJ3NhbmRib3gnLCBkaXYpO1xuXHRcdG9iai5iaW5kTm9kZSgneC55JywgJzpzYW5kYm94IGlucHV0Jywge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMuX29ua2V5dXAgPSBjYmM7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Rocm93cyBlcnJvciB3aGVuIG5vZGUgaXNuXFwndCB0aGVyZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRlcnJvciA9IGZhbHNlO1xuXG5cdFx0dHJ5IHtcblx0XHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdGVycm9yID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRleHBlY3QoZXJyb3IpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0eGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fTtcblxuXHRcdG1hZ2ljLmJpbmRPcHRpb25hbE5vZGUob2JqLCAneCcpO1xuXG5cdFx0ZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0eGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LO1xuXG5cdFx0bWsuYmluZE9wdGlvbmFsTm9kZSgneCcsIG51bGwpO1xuXG5cdFx0ZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0eGl0KCdyZXR1cm5zIGJvdW5kIG5vZGVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gnKTtcblxuXG5cdFx0ZXhwZWN0KGlucHV0KS50b0VxdWFsKG1hZ2ljLmJvdW5kKG9iaiwgJ3gnKSk7XG5cdFx0ZXhwZWN0KGlucHV0KS50b0VxdWFsKG1hZ2ljLiRib3VuZChvYmosICd4JylbMF0pO1xuXHR9KTtcblxuXG5cdHhpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c3Bhbj48L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YCk7XG5cblx0XHRleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdChvYmosICdzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2VsZWN0cyBub2RlcyB3aXRoIGN1c3RvbSBzZWxlY3RvcicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKS50YWdOYW1lKTtcblx0XHRleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdEFsbChvYmosICc6c2FuZGJveCBzcGFuJylbMF0udGFnTmFtZSk7XG5cdH0pO1xuXG5cdHhpdCgnY2FuY2VscyBkZWVwIGJpbmRpbmcgdmlhIGRlZXA6IGZhbHNlJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ2EuYicsIHtcblx0XHRcdFx0ZGVlcDogZmFsc2Vcblx0XHRcdH0pO1xuXG5cdFx0b2JqWydhLmInXSA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9ialsnYS5iJ10pLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnYWxsb3dzIHRvIGRlYm91bmNlIGhhbmRsZXInLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jywge1xuXHRcdFx0XHRkZWJvdW5jZTogdHJ1ZVxuXHRcdFx0fSk7XG5cblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH0pO1xuXG5cdHhpdCgnYWxsb3dzIHRvIGJpbmQgc2FuZGJveCB2aWEgYmluZFNhbmRib3gnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0ZGl2ID0gJC5jcmVhdGUoJ2RpdicpO1xuXG5cdFx0TUsuYmluZFNhbmRib3gob2JqLCBkaXYpO1xuXG5cdFx0ZXhwZWN0KE1LLmJvdW5kKG9iaiwgJ3NhbmRib3gnKSkudG9FcXVhbChkaXYpO1xuXHR9KTtcblxuXG5cdHhpdCgnYmluZFNhbmRib3ggdGhyb3dzIGFuIGVycm9yIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdHRyeSB7XG5cdFx0XHRNSy5iaW5kU2FuZGJveChvYmosIG51bGwpO1xuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0Ym9vbCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmVUcnV0aHkoKTtcblxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1xuICoqLyIsIi8vIFRPRE8gRGVib3VuY2VkIVxuaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgTWF0cmVzaGthRXJyb3IgZnJvbSAnLi9fdXRpbC9tYXRyZXNoa2FlcnJvcic7XG5pbXBvcnQgYmluZFNpbmdsZU5vZGUgZnJvbSAnLi9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnXG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIgPSB7fSwgZXZ0ID0ge30pIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBiaW5kZXI7XG4gICAgICAgIGJpbmRlciA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBrZXk7XG4gICAgICAgIGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdiaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHsgb3B0aW9uYWwsIGRlZXAgfSA9IGV2dDtcblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtleVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiBiaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGJpbmRlciwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkRXZlbnQgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgaXRlbUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjb21tb25FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlLCBiaW5kZXIpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCAkbm9kZXMgPSBnZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuXG4gICAgaWYgKCEkbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOm5vZGVfbWlzc2luZycsIHsga2V5LCBub2RlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcERlZiA9IGRlZmluZVByb3Aob2JqZWN0LCBrZXkpO1xuXG4gICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgIG9iamVjdC4kbm9kZXNba2V5XSA9IG9iamVjdC4kbm9kZXNba2V5XS5sZW5ndGhcbiAgICAgICAgICAgID8gb2JqZWN0LiRub2Rlc1trZXldLmFkZCgkbm9kZXMpXG4gICAgICAgICAgICA6ICRub2RlcztcbiAgICAgICAgb2JqZWN0Lm5vZGVzW2tleV0gPSBvYmplY3QuJG5vZGVzW2tleV1bMF07XG4gICAgfVxuXG4gICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICBpZiAoZGVlcCAhPT0gZmFsc2UgJiYgZGVlcFBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VIYW5kbGVyID0gKGV2dCA9IHt9KSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IG9iamVjdDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmluZE5vZGUodGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2dCk7XG5cbiAgICAgICAgICAgIGlmIChldnQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGhbZGVlcFBhdGgubGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoLmxlbmd0aCAtIDIpLmpvaW4oJy4nKSxcbiAgICAgICAgICAgICdjaGFuZ2U6JyArIGRlZXBQYXRoW2RlZXBQYXRoLmxlbmd0aCAtIDJdLCBjaGFuZ2VIYW5kbGVyKTtcblxuICAgICAgICBjaGFuZ2VIYW5kbGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgLypwYXRoID0ga2V5LnNwbGl0KCcuJyk7XG5cdFx0XHRjaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGV2dCA9IGV2dCAmJiBldnQub3JpZ2luYWxFdmVudDtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZXZ0ICYmIGV2dC52YWx1ZSxcblx0XHRcdFx0XHRpO1xuXHRcdFx0XHRpZiAoIXRhcmdldCkge1xuXHRcdFx0XHRcdHRhcmdldCA9IG9iamVjdDtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgcGF0aC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldFtwYXRoW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiaW5kTm9kZSh0YXJnZXQsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2dCwgb3B0aW9uYWwpO1xuXG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQucHJldmlvdXNWYWx1ZSkge1xuXHRcdFx0XHRcdGNvcmUudW5iaW5kTm9kZShldnQucHJldmlvdXNWYWx1ZSwgcGF0aFtwYXRoLmxlbmd0aCAtIDFdLCAkbm9kZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb3JlLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aC5zbGljZSgwLCBwYXRoLmxlbmd0aCAtIDIpLmpvaW4oJy4nKSxcblx0XHRcdFx0J2NoYW5nZTonICsgcGF0aFtwYXRoLmxlbmd0aCAtIDJdLCBjaGFuZ2VIYW5kbGVyKTtcblxuXHRcdFx0Y2hhbmdlSGFuZGxlcigpO1xuXG5cdFx0XHRyZXR1cm4gb2JqZWN0OyovXG4gICAgICAgIC8vIFRPRE9cbiAgICB9XG5cbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldnQsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuXG4gICAgLypcblxuICAgIGZvciAoaSA9IDA7IGkgPCAkbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaSwgYmluZGVyLCBldnQsIHNwZWNpYWwpO1xuICAgIH1cblxuICAgIGlmICghZXZ0LnNpbGVudCkge1xuICAgICAgICBfZXZ0ID0ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAkbm9kZXM6ICRub2RlcyxcbiAgICAgICAgICAgIG5vZGU6ICRub2Rlc1swXSB8fCBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgX2V2dFtpXSA9IGV2dFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcmUuX2Zhc3RUcmlnZ2VyKG9iamVjdCwgJ2JpbmQ6JyArIGtleSwgX2V2dCk7XG4gICAgICAgIGNvcmUuX2Zhc3RUcmlnZ2VyKG9iamVjdCwgJ2JpbmQnLCBfZXZ0KTtcbiAgICB9Ki9cblxuXG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9tYXAnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL2luaXRtaycsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdXRpbC9jb21tb24nXG5dLCBmdW5jdGlvbihjb3JlLCBtYXAsIGluaXRNSywgdXRpbCkge1xuXG5cdHZhciBiaW5kTm9kZSA9IGNvcmUuYmluZE5vZGUgPSBmdW5jdGlvbihvYmplY3QsIGtleSwgbm9kZSwgYmluZGVyLCBldnQsIG9wdGlvbmFsKSB7XG5cdFx0LyogaXN0YW5idWwgaWdub3JlIGlmICAqXG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGlmKGtleSA9PSAnc2FuZGJveCcpIHtcblx0XHRcdHJldHVybiBiaW5kU2FuZGJveChvYmplY3QsIG5vZGUsIGV2dCwgb3B0aW9uYWwpO1xuXHRcdH1cblxuXG5cdFx0aW5pdE1LKG9iamVjdCk7XG5cblxuXHRcdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdFx0d2luID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IG51bGwsXG5cdFx0XHQkbm9kZXMsXG5cdFx0XHRrZXlzLFxuXHRcdFx0aSxcblx0XHRcdHNwZWNpYWwsXG5cdFx0XHRwYXRoLFxuXHRcdFx0bGlzdGVuS2V5LFxuXHRcdFx0Y2hhbmdlSGFuZGxlcixcblx0XHRcdF9ldnQ7XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoW1sna2V5JywgJCgpLCB7b246J2V2dCd9XSwgW3trZXk6ICQoKSwge29uOiAnZXZ0J319XV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0aWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5W2ldWzBdLCBrZXlbaV1bMV0sIGtleVtpXVsyXSB8fCBldnQsIG5vZGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSgna2V5MSBrZXkyJywgbm9kZSwgYmluZGVyLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHQgKlxuXHRcdGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmIH5rZXkuaW5kZXhPZignICcpKSB7XG5cdFx0XHRrZXlzID0ga2V5LnNwbGl0KC9cXHMrLyk7XG5cdFx0XHRpZiAoa2V5cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0YmluZE5vZGUob2JqZWN0LCBrZXlzW2ldLCBub2RlLCBiaW5kZXIsIGV2dCwgb3B0aW9uYWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0Zm9yIChpIGluIGtleSkge1xuXHRcdFx0XHRpZiAoa2V5Lmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0YmluZE5vZGUob2JqZWN0LCBpLCBrZXlbaV0sIG5vZGUsIGJpbmRlciwgZXZ0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSgna2V5JywgWyBub2RlLCBiaW5kZXIgXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHQvLyBub2RlICE9PSB3aW4gaXMgdGhlIG1vc3QgdW5jb21tb24gYnVnZml4IGV2ZXIuIERvbid0IGFzayB3aGF0IGRvZXMgaXQgbWVhbi5cblx0XHQvLyBUaGlzIGlzIGFib3V0IGlmcmFtZXMsIENPUlMgYW5kIGRlcHJlY2F0ZWQgRE9NIEFQSS5cblx0XHRpZiAobm9kZSAmJiBub2RlLmxlbmd0aCA9PSAyICYmIG5vZGUgIT09IHdpbiAmJiAhbm9kZVsxXS5ub2RlTmFtZVxuXHRcdFx0XHQmJiAobm9kZVsxXS5zZXRWYWx1ZSB8fCBub2RlWzFdLmdldFZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlWzBdLCBub2RlWzFdLCBiaW5kZXIsIG9wdGlvbmFsKTtcblx0XHR9XG5cblx0XHQkbm9kZXMgPSBjb3JlLl9nZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuXG5cdFx0aWYgKCEkbm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRpZiAob3B0aW9uYWwpIHtcblx0XHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IEVycm9yKCdCaW5kaW5nIGVycm9yOiBub2RlIGlzIG1pc3NpbmcgZm9yIFwiJyArIGtleSArICdcIi4nICsgKHR5cGVvZiBub2RlID09ICdzdHJpbmcnID8gJyBUaGUgc2VsZWN0b3IgaXMgXCInICsgbm9kZSArICdcIicgOiAnJykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgoIWV2dCB8fCBldnQuZGVlcCAhPT0gZmFsc2UpICYmIH5rZXkuaW5kZXhPZignLicpKSB7XG5cdFx0XHRwYXRoID0ga2V5LnNwbGl0KCcuJyk7XG5cdFx0XHRjaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGV2dCA9IGV2dCAmJiBldnQub3JpZ2luYWxFdmVudDtcblxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZXZ0ICYmIGV2dC52YWx1ZSxcblx0XHRcdFx0XHRpO1xuXHRcdFx0XHRpZiAoIXRhcmdldCkge1xuXHRcdFx0XHRcdHRhcmdldCA9IG9iamVjdDtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgcGF0aC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldFtwYXRoW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiaW5kTm9kZSh0YXJnZXQsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2dCwgb3B0aW9uYWwpO1xuXG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQucHJldmlvdXNWYWx1ZSkge1xuXHRcdFx0XHRcdGNvcmUudW5iaW5kTm9kZShldnQucHJldmlvdXNWYWx1ZSwgcGF0aFtwYXRoLmxlbmd0aCAtIDFdLCAkbm9kZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb3JlLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aC5zbGljZSgwLCBwYXRoLmxlbmd0aCAtIDIpLmpvaW4oJy4nKSxcblx0XHRcdFx0J2NoYW5nZTonICsgcGF0aFtwYXRoLmxlbmd0aCAtIDJdLCBjaGFuZ2VIYW5kbGVyKTtcblxuXHRcdFx0Y2hhbmdlSGFuZGxlcigpO1xuXG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdH1cblxuXHRcdGV2dCA9IGV2dCB8fCB7fTtcblxuXHRcdHNwZWNpYWwgPSBjb3JlLl9kZWZpbmVTcGVjaWFsKG9iamVjdCwga2V5KTtcblxuXHRcdHNwZWNpYWwuJG5vZGVzID0gc3BlY2lhbC4kbm9kZXMubGVuZ3RoID8gc3BlY2lhbC4kbm9kZXMuYWRkKCRub2RlcykgOiAkbm9kZXM7XG5cblx0XHRpZiAob2JqZWN0LmlzTUspIHtcblx0XHRcdG9iamVjdC4kbm9kZXNba2V5XSA9IHNwZWNpYWwuJG5vZGVzO1xuXHRcdFx0b2JqZWN0Lm5vZGVzW2tleV0gPSBzcGVjaWFsLiRub2Rlc1swXTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgJG5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpbml0QmluZGluZyhvYmplY3QsIG9iamVjdERhdGEsIGtleSwgJG5vZGVzLCBpLCBiaW5kZXIsIGV2dCwgc3BlY2lhbCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFldnQuc2lsZW50KSB7XG5cdFx0XHRfZXZ0ID0ge1xuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0JG5vZGVzOiAkbm9kZXMsXG5cdFx0XHRcdG5vZGU6ICRub2Rlc1swXSB8fCBudWxsXG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGkgaW4gZXZ0KSB7XG5cdFx0XHRcdF9ldnRbaV0gPSBldnRbaV07XG5cdFx0XHR9XG5cblx0XHRcdGNvcmUuX2Zhc3RUcmlnZ2VyKG9iamVjdCwgJ2JpbmQ6JyArIGtleSwgX2V2dCk7XG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kJywgX2V2dCk7XG5cdFx0fVxuXG5cblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH07XG5cblx0ZnVuY3Rpb24gaW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaW5kZXgsIGJpbmRlciwgZXZ0LCBzcGVjaWFsKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSB7XG5cdFx0XHRcdHNlbGY6IG9iamVjdCxcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0XHRub2RlOiBub2RlXG5cdFx0XHR9LFxuXHRcdFx0bm9kZSA9ICRub2Rlc1tpbmRleF0sXG5cdFx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiBzcGVjaWFsLnZhbHVlID09ICd1bmRlZmluZWQnLFxuXHRcdFx0X2JpbmRlcixcblx0XHRcdF9ldnQsXG5cdFx0XHRmb3VuZEJpbmRlcixcblx0XHRcdF9vcHRpb25zLFxuXHRcdFx0aSxcblx0XHRcdGRvbUV2dCxcblx0XHRcdG1rSGFuZGxlcixcblx0XHRcdHZhbDtcblxuXG5cblxuXHRcdGlmIChiaW5kZXIgPT09IG51bGwpIHtcblx0XHRcdF9iaW5kZXIgPSB7fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0XHRpZiAoZm91bmRCaW5kZXIpIHtcblx0XHRcdFx0aWYgKGJpbmRlcikge1xuXHRcdFx0XHRcdGZvciAoaSBpbiBiaW5kZXIpIHtcblx0XHRcdFx0XHRcdGZvdW5kQmluZGVyW2ldID0gYmluZGVyW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9iaW5kZXIgPSBmb3VuZEJpbmRlcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF9iaW5kZXIgPSBiaW5kZXIgfHwge307XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKF9iaW5kZXIuaW5pdGlhbGl6ZSkge1xuXHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdHZhbHVlOiBzcGVjaWFsLnZhbHVlXG5cdFx0XHR9O1xuXHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0X29wdGlvbnNbaV0gPSBvcHRpb25zW2ldO1xuXHRcdFx0fVxuXHRcdFx0X2JpbmRlci5pbml0aWFsaXplLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmIChfYmluZGVyLmdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBldnQuYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBldnQuYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuXG5cdFx0XHRfZXZ0ID0ge1xuXHRcdFx0XHRmcm9tTm9kZTogdHJ1ZVxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdFx0fVxuXG5cdFx0XHR2YWwgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWwgPT0gJ3VuZGVmaW5lZCc7XG5cblx0XHRcdGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWwsIF9ldnQpO1xuXHRcdH1cblxuXG5cdFx0aWYgKF9iaW5kZXIuc2V0VmFsdWUpIHtcblx0XHRcdG1rSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0dmFyIHYgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XS52YWx1ZSxcblx0XHRcdFx0XHQvLyBkaXJ0eSBoYWNrIGZvciB0aGlzIG9uZSBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuXHRcdFx0XHRcdF92ID0gZXZ0ICYmIHR5cGVvZiBldnQub25DaGFuZ2VWYWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdiA9PSAnbnVtYmVyJyA/IHYgKyAnJyA6IHYsXG5cdFx0XHRcdFx0aTtcblxuXHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5jaGFuZ2VkTm9kZSA9PSBub2RlICYmIGV2dC5vbkNoYW5nZVZhbHVlID09IF92KSByZXR1cm47XG5cblx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0dmFsdWU6IHZcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRmb3IgKGkgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9iaW5kZXIuc2V0VmFsdWUuY2FsbChub2RlLCB2LCBfb3B0aW9ucyk7XG5cdFx0XHR9O1xuXG5cdFx0XHRpZihldnQuZGVib3VuY2UpIHtcblx0XHRcdFx0bWtIYW5kbGVyID0gdXRpbC5kZWJvdW5jZShta0hhbmRsZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb3JlLl9mYXN0QWRkTGlzdGVuZXIob2JqZWN0LCAnX3J1bmJpbmRpbmdzOicgKyBrZXksIG1rSGFuZGxlciwgbnVsbCwge25vZGU6IG5vZGV9KTtcblxuXHRcdFx0IWlzVW5kZWZpbmVkICYmIG1rSGFuZGxlcigpO1xuXHRcdH1cblxuXG5cblxuXHRcdGlmIChfYmluZGVyLmdldFZhbHVlICYmIF9iaW5kZXIub24pIHtcblx0XHRcdGRvbUV2dCA9IHtcblx0XHRcdFx0bm9kZTogbm9kZSxcblx0XHRcdFx0b246IF9iaW5kZXIub24sXG5cdFx0XHRcdGluc3RhbmNlOiBvYmplY3QsXG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHRta0hhbmRsZXI6IG1rSGFuZGxlcixcblx0XHRcdFx0aGFuZGxlcjogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0aWYgKGRvbUV2dC5yZW1vdmVkKSByZXR1cm47XG5cdFx0XHRcdFx0dmFyIG9sZHZhbHVlID0gb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0XHRcdGosXG5cdFx0XHRcdFx0XHRfb3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdFx0dmFsdWU6IG9sZHZhbHVlLFxuXHRcdFx0XHRcdFx0XHRkb21FdmVudDogZXZ0LFxuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbEV2ZW50OiBldnQub3JpZ2luYWxFdmVudCB8fCBldnQsXG5cdFx0XHRcdFx0XHRcdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHdoaWNoOiBldnQud2hpY2gsXG5cdFx0XHRcdFx0XHRcdHRhcmdldDogZXZ0LnRhcmdldFxuXHRcdFx0XHRcdFx0fTtcblxuXG5cdFx0XHRcdFx0Ly8gaGFzT3duUHJvcGVydHkgaXMgbm90IHJlcXVpcmVkIHRoZXJlXG5cdFx0XHRcdFx0Zm9yIChqIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRcdF9vcHRpb25zW2pdID0gb3B0aW9uc1tqXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YWx1ZSA9IF9iaW5kZXIuZ2V0VmFsdWUuY2FsbChub2RlLCBfb3B0aW9ucyk7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUgIT09IG9sZHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcblx0XHRcdFx0XHRcdFx0ZnJvbU5vZGU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGNoYW5nZWROb2RlOiBub2RlLFxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZVZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb3JlLmRvbUV2ZW50cy5hZGQoZG9tRXZ0KTtcblx0XHR9XG5cdH1cbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcblxuLy8gdGhpcyBpcyBjb21tb24gZnVuY3Rpb24gd2hpY2ggYXNzb2NpYXRlcyBhbiBvYmplY3Qgd2l0aCBpdHMgTWF0cmVzaGthIGRlZmluaXRpb25cbmZ1bmN0aW9uIGNvbW1vbkluaXQob2JqZWN0KSB7XG5cdGxldCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXHRpZiAoIWRlZikge1xuXHRcdGRlZiA9IHtcblx0XHRcdC8vIGEgcHJvcGVydHkgbmFtZSBvZiBcImV2ZW50c1wiIG9iamVjdCBpcyBhbiBldmVudCBuYW1lXG5cdFx0XHQvLyBhbmQgYSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuXHRcdFx0ZXZlbnRzOiB7XG5cdFx0XHRcdC8qZXhhbXBsZToge1xuXHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbixcblx0XHRcdFx0XHRjdHg6IG9iamVjdCxcblx0XHRcdFx0XHRjb250ZXh0OiBvYmplY3QyLFxuXHRcdFx0XHRcdG5hbWU6IFwiZXhhbXBsZVwiXG5cdFx0XHRcdH0gKi9cblx0XHRcdH0sXG5cdFx0XHQvLyBcInByb3BzXCIgY29udGFpbnMgc3BlY2lhbCBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzIChnZXR0ZXJzLCBzZXR0ZXJzIGV0Yylcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdC8qZXhhbXBsZToge1xuXHRcdFx0XHRcdD8gbm9kZXM6IGNvcmUuJCgpLFxuXHRcdFx0XHRcdHZhbHVlOiBvYmplY3Rba2V5XSxcblx0XHRcdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0XHRcdG1lZGlhdG9yOiBudWxsLFxuXHRcdFx0XHRcdC8vP2Rlc3Ryb3llcnM6IE1hcCxcblx0XHRcdFx0XHRiaW5kaW5nczogW3tcblx0XHRcdFx0XHRcdG5vZGUsXG5cdFx0XHRcdFx0XHRiaW5kZXIsXG5cdFx0XHRcdFx0XHRub2RlSGFuZGxlcixcblx0XHRcdFx0XHRcdG9iamVjdEhhbmRsZXJcblx0XHRcdFx0XHR9XVxuXHRcdFx0XHR9Ki9cblx0XHRcdH0sXG5cdFx0XHRpZDogYG1rJHtNYXRoLnJhbmRvbSgpfWBcblx0XHR9O1xuXG5cdFx0ZGVmcy5zZXQob2JqZWN0LCBkZWYpO1xuXHR9XG5cblx0cmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdE1LKG9iamVjdCkge1xuXHRjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcblx0aWYgKCFvYmplY3QgfHwgdHlwZSAhPT0gJ29iamVjdCcpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGV9IGNhbm5vdCBiZSB1c2VkIGluIHRoaXMgbWV0aG9kYCk7XG5cdH1cblxuXHQvLyBpZiBvYmplY3QgaGFzIF9pbml0TUsgbWV0aG9kLCBydW4gaXRcblx0Ly8gZWxzZSBydW4gY29tbW9uSW5pdFxuXHQvLyBldmVyeSBfaW5pdE1LIGltcGxlbWVudGF0aW9uIGhhdmUgdG8gcnVuIGNvbW1vbkluaXQgb3IgcGFyZW50J3MgX2luaXRNS1xuXHRyZXR1cm4gb2JqZWN0Ll9pbml0TUsgPyBvYmplY3QuX2luaXRNSygpIDogY29tbW9uSW5pdChvYmplY3QpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvaW5pdC5qc1xuICoqLyIsImZ1bmN0aW9uIFBzZXVkb01hcCgpIHt9XG5cbi8vIFBzZXVkb01hcCBzaW11bGF0ZXMgV2Vha01hcCBiZWhhdmlvciB3aXRoIE8oMSkgc2VhcmNoIGNvbXBsZXhpdHlcbi8vIGl0J3MgbmVlZGVkIGZvciBASUU5IGFuZCBASUUxMFxubm9mbi5hc3NpZ24oUHNldWRvTWFwLnByb3RvdHlwZSwge1xuXHRnZXQob2JqKSB7XG5cdFx0cmV0dXJuIG9iai5tYXRyZXNoa2FEYXRhO1xuXHR9LFxuXHRzZXQob2JqLCBkYXRhKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21hdHJlc2hrYURhdGEnLCB7XG5cdFx0XHR2YWx1ZTogZGF0YSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXHR9LFxuXHRoYXMob2JqKSB7XG5cdFx0cmV0dXJuICdtYXRyZXNoa2FEYXRhJyBpbiBvYmo7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyBuZXcgUHNldWRvTWFwKCkgOiBuZXcgV2Vha01hcCgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5lUHJvcChvYmplY3QsIGtleSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGlmICghZGVmLnByb3BzW2tleV0pIHtcblx0XHRjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzW2tleV0gPSB7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdGJpbmRpbmdzOiBudWxsXG5cdFx0fTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0KHYpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BEZWYuc2V0dGVyID8gcHJvcERlZi5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBkZWYucHJvcHNba2V5XTtcbn1cblxuXG4vKmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9tYXAnXG5dLCBmdW5jdGlvbihjb3JlLCBtYXApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGNvcmUuX2RlZmluZVNwZWNpYWwgPSBmdW5jdGlvbihvYmplY3QsIGtleSwgbm9BY2Nlc3NvcnMpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnIHx8ICFtYXAuaGFzKG9iamVjdCkpIHJldHVybiBvYmplY3Q7XG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHNwZWNpYWxQcm9wcyA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldO1xuXG5cdFx0aWYgKCFzcGVjaWFsUHJvcHMpIHtcblx0XHRcdHNwZWNpYWxQcm9wcyA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldID0ge1xuXHRcdFx0XHQkbm9kZXM6IGNvcmUuJCgpLFxuXHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdGdldHRlcjogbnVsbCxcblx0XHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0XHRtZWRpYXRvcjogbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFub0FjY2Vzc29ycyAmJiBrZXkgIT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3BlY2lhbFByb3BzLmdldHRlciA/IHNwZWNpYWxQcm9wcy5nZXR0ZXIuY2FsbChvYmplY3QpIDogc3BlY2lhbFByb3BzLnZhbHVlO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsUHJvcHMuc2V0dGVyID8gc3BlY2lhbFByb3BzLnNldHRlci5jYWxsKG9iamVjdCwgdikgOiBjb3JlLnNldChvYmplY3QsIGtleSwgdiwge1xuXHRcdFx0XHRcdFx0XHRmcm9tU2V0dGVyOiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzcGVjaWFsUHJvcHM7XG5cdH07XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX3V0aWwvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCA9IHt9KSB7XG4gICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuXG4gICAgLy8gaWYgbm8ga2V5IG9yIGZhbHN5IGtleSBpcyBnaXZlblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcbiAgICBpZiAoIWRlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG5cdGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmO1xuXHRjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIC8vIGFsbG93IHRvIHVzZSBrZXktdmFsdWUgb2JqZWN0IGFzIGFub3RoZXIgdmFyaWF0aW9uXG5cdGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG5cdFx0bm9mbi5mb3JPd24oa2V5LCAob2JqVmFsLCBvYmpLZXkpID0+IHNldChvYmplY3QsIG9iaktleSwgb2JqVmFsLCB2YWx1ZSkpO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuICAgIC8vIGlmIG5vIHByb3BlcnR5IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG5cdGlmICghcHJvcERlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG5cdGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3Ncblx0Y29uc3Qge1xuICAgICAgICBza2lwTWVkaWF0b3IsXG4gICAgICAgIGZyb21NZWRpYXRvcixcbiAgICAgICAgZm9yY2UsXG4gICAgICAgIGZvcmNlSFRNTCxcbiAgICAgICAgc2lsZW50LFxuICAgICAgICBzaWxlbnRIVE1MLFxuICAgICAgICBza2lwTGlua3NcbiAgICB9ID0gZXZ0O1xuXG5cdGxldCBuZXdWYWx1ZTtcblxuXHRpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcblx0XHQvLyBUT0RPXG5cdFx0bmV3VmFsdWUgPSBzcGVjaWFsLm1lZGlhdG9yKHYsIHByZXZWYWwsIGtleSwgb2JqZWN0KTtcblx0fSBlbHNlIHtcblx0XHRuZXdWYWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcblx0Y29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG5cdFx0dmFsdWU6IG5ld1ZhbHVlLFxuXHRcdHNlbGY6IG9iamVjdCxcblx0XHRwcmV2aW91c1ZhbHVlLFxuXHRcdGtleSxcblx0XHRpc0NoYW5nZWRcblx0fSwgZXZ0KTtcblxuXHRjb25zdCB0cmlnZ2VyQ2hhbmdlID0gKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNpbGVudDtcblxuICAgIC8vIHRyaWdnZXIgYmVmb3JlY2hhbmdlOktFWSBhbmQgYmVmb3JlY2hhbmdlIGV2ZW50c1xuXHRpZiAodHJpZ2dlckNoYW5nZSkge1xuXHRcdGNvbnN0IGJlZm9yZWNoYW5nZVN0ciA9ICdiZWZvcmVjaGFuZ2UnO1xuICAgICAgICBjb25zdCBiZWZvcmVjaGFuZ2VFdnROYW1lID0gYCR7YmVmb3JlY2hhbmdlU3RyfToke2tleX1gO1xuXG5cdFx0aWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cblxuXHRcdGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VTdHJdKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvcERlZi52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgLy8gdHJpZ2VyIGJpbmRpbmdzXG5cdGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcblx0XHRpZihldmVudHNbY2hhbmdlQmluZGluZ3NFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cdH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuXHRcdGlmKGV2ZW50c1tjaGFuZ2VFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXG5cdFx0aWYoZXZlbnRzW2NoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICAvLyB0cmlnZ2VyIGRlcGVuZGVuY2llcyAobWFkZSB3aXRoIGxpbmtQcm9wcylcblx0aWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG5cdFx0aWYoZXZlbnRzW2NoYW5nZURlcHNFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlcHNFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcblx0XHR9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmlnZ2VyT25lKG9iamVjdCwgbmFtZSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgZXZlbnRzID0gZGVmLmV2ZW50c1tuYW1lXTtcblxuXHRpZiAoZXZlbnRzKSB7XG5cdFx0Y29uc3QgYXJncyA9IG5vZm4uc2xpY2UoYXJndW1lbnRzLCAyKSxcblx0XHRcdGwgPSBldmVudHMubGVuZ3RoLFxuXHRcdFx0W2ExLCBhMiwgYTNdID0gYXJncztcblxuXHRcdGxldCBpID0gMCxcblx0XHRcdGV2O1xuXG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDE6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMjpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMzpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRkZWZhdWx0OlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cbn1cblxudHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IHtcblx0aW5mbzoge30sXG5cdG5hbWU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthRXJyb3IgZnJvbSAnLi9tYXRyZXNoa2FlcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgbWV0aG9kKSB7XG5cdGNvbnN0IHR5cGVvZk9iamVjdCA9IG9iamVjdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBvYmplY3Q7XG5cbiAgICBpZih0eXBlb2ZPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdjb21tb246b2JqZWN0X3R5cGUnLCB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlb2ZPYmplY3QsXG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzXG4gKiovIiwiY29uc3QgYmluZGluZ0Vycm9yUHJlZml4ID0gJ0JpbmRpbmcgZXJyb3I6JztcbmNvbnN0IGVycm9ycyA9IHtcblx0J2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcblx0XHRjb25zdCBzZWxlY3RvckluZm8gPSB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBgIFRoZSBzZWxlY3RvciBpcyAke25vZGV9YCA6ICcnO1xuXHRcdHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWBcblx0fSxcblx0J2JpbmRpbmc6ZmFsc3lfa2V5JzogKCkgPT4gJ0JpbmRpbmcgZXJyb3I6IFwia2V5XCIgYXJnIGNhbm5vdCBiZSBmYWxzeScsXG5cdCdjb21tb246b2JqZWN0X3R5cGUnOiAoeyB0eXBlLCBtZXRob2QgfSkgPT4ge1xuXHRcdHJldHVybiBgTWV0aG9kIFwiJHttZXRob2R9XCIgZG9lcyBub3QgYWNjZXB0ICR7dHlwZX0gYXMgdGFyZ2V0IG9iamVjdGA7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG5cdGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG5cdGlmKCFnZXRFcnJvcikge1xuXHRcdHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcblx0fVxuXG5cdHJldHVybiBuZXcgRXJyb3IoZXJyb3JzW2tleV0oZGF0YSkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcbiAqKi8iLCIvLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuXHRsZXQgbm9kZXM7XG5cdGlmKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhLzwvLnRlc3Qoc2VsZWN0b3IpICYmIC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcilcblx0fSBlbHNle1xuXHRcdG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuXHR9XG5cdHJldHVybiBub2Rlcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZ2V0bm9kZXMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9ycykge1xuXHRcblx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0JCA9IGNvcmUuJCxcblx0XHRyZXN1bHQgPSAkKCksXG5cdFx0ZXhlY1Jlc3VsdCxcblx0XHQkYm91bmQsXG5cdFx0bm9kZSxcblx0XHRzZWxlY3Rvcixcblx0XHRpLCBqLFxuXHRcdHJhbmRvbSxcblx0XHRzdWJTZWxlY3Rvcixcblx0XHRrZXksXG5cdFx0c2VsZWN0ZWQ7XG5cblx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhb2JqZWN0RGF0YSkgcmV0dXJuIHJlc3VsdDtcblxuXHQvLyByZXBsYWNpbmcgOnNhbmRib3ggdG8gOmJvdW5kKHNhbmRib3gpXG5cdHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5zcGxpdCgnLCcpO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRzZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcblxuXHRcdGlmIChleGVjUmVzdWx0ID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLy5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0a2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcblx0XHRcdHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG5cblx0XHRcdC8vIGdldHRpbmcgS0VZIGZyb20gOmJvdW5kKEtFWSlcblx0XHRcdCRib3VuZCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldICYmIG9iamVjdERhdGEuc3BlY2lhbFtrZXldLiRub2Rlcztcblx0XHRcdGlmKCEkYm91bmQgfHwgISRib3VuZC5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuXHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuXHRcdFx0aWYgKHN1YlNlbGVjdG9yKSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuXHRcdFx0XHQvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcblx0XHRcdFx0aWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIHNlbGVjdGluZyBjaGlsZHJlblxuXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCAkYm91bmQubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdG5vZGUgPSAkYm91bmRbal07XG5cdFx0XHRcdFx0XHRyYW5kb20gPSAnbScgKyBjb3JlLnJhbmRvbVN0cmluZygpO1xuXHRcdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tLCByYW5kb20pO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgcmFuZG9tICsgJz1cIicgKyByYW5kb20gKyAnXCJdJyArIHN1YlNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQodXRpbC50b0FycmF5KHNlbGVjdGVkKSk7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKCRib3VuZC5maW5kKHN1YlNlbGVjdG9yKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmdcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3Jcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcblx0JDogZGVmYXVsdERvbGxhclxufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9pbmRleC5qc1xuICoqLyIsIi8qZ2xvYmFsICQqL1xuaW1wb3J0IGJRdWVyeSBmcm9tICcuLi9icXVlcnknO1xuXG5jb25zdCBuZWVkZWRNZXRob2RzID0gJ29uIG9mZiBpcyBhZGQgbm90IGZpbmQnLnNwbGl0KC9cXHMvKTtcblxuY29uc3QgZ2xvYmFsRG9sbGFyID0gdHlwZW9mICQgPT09ICdmdW5jdGlvbicgPyAkIDogbnVsbDtcbmxldCB1c2VHbG9iYWxEb2xsYXIgPSB0cnVlO1xuXG5pZiAoZ2xvYmFsRG9sbGFyKSB7XG5cdGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcblx0XHRcdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFnbG9iYWxEb2xsYXIucGFyc2VIVE1MKSB7XG5cdFx0Z2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG5cdH1cbn0gZWxzZSB7XG5cdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VHbG9iYWxEb2xsYXIgPyBnbG9iYWxEb2xsYXIgOiBiUXVlcnk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG4vLyB0aW55IGpRdWVyeSByZXBsYWNlbWVudCBmb3IgTWF0cmVzaGthXG4vLyBiUXVlcnkgaXMgcmV3cml0dGVuIHZlcnNpb24gb2YgYmFsYWxhaWthLmpzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiUXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0cmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG5cdGZuOiBJbml0LnByb3RvdHlwZSxcblx0ZXh0ZW5kLFxuXHRwYXJzZUhUTUwsXG5cdG9uZSxcblx0Y3JlYXRlXG59KTtcblxubm9mbi5hc3NpZ24oYlF1ZXJ5LmZuLCB7XG5cdG9uLFxuXHRvZmYsXG5cdGlzLFxuXHRhZGQsXG5cdG5vdCxcblx0ZmluZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcblxuLy8gZnVuY3Rpb24tY29uc3RydWN0b3Igb2YgYlF1ZXJ5IGxpYnJhcnlcbi8vIGFjY2VwdHMgbWFueSBraW5kcyBvZiBhcmd1bWVudHMgKHNlbGVjdG9yLCBodG1sLCBmdW5jdGlvbilcbmZ1bmN0aW9uIEJRdWVyeUluaXQoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0bGV0IHJlc3VsdDtcblxuXHRpZiAoc2VsZWN0b3IpIHtcblx0XHRpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuXHRcdFx0cmVzdWx0ID0gW3NlbGVjdG9yXTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmICgvPC8udGVzdChzZWxlY3RvcikpIHtcblx0XHRcdFx0cmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG5cdFx0XHRcdFx0aWYgKG5ld0NvbnRleHQpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7IC8vIHR5cGVvZiBub2RlTGlzdCByZXR1cm5zIFwiZnVuY3Rpb25cIiBpbiBvbGQgV2ViS2l0XG5cdFx0XHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuXHRpZiAobGVuZ3RoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKHJlc3VsdFtpXSk7XG5cdFx0fVxuXHR9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChodG1sKSB7XG5cdC8vIHdyYXBNYXAgaXMgdGFrZW4gZnJvbSBqUXVlcnlcblx0Y29uc3Qgd3JhcE1hcCA9IHtcblx0XHRvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuXHRcdGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG5cdFx0dGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuXHRcdHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcblx0XHR0ZDogWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0Y29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcblx0XHRhcmVhOiBbMSwgJzxtYXA+JywgJzwvbWFwPiddLFxuXHRcdF86IFswLCAnJywgJyddXG5cdH07XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRpO1xuXG5cdGh0bWwgPSBodG1sLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcblxuXHR3cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cdHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG5cdHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cdGNvbnN0IGV4ID0gLzwoW1xcdzpdKykvLmV4ZWMoaHRtbCksXG5cdFx0d3JhcHBlciA9IGV4ICYmIHdyYXBNYXBbZXhbMV1dIHx8IHdyYXBNYXAuXztcblxuXHRub2RlLmlubmVySFRNTCA9IHdyYXBwZXJbMV0gKyBodG1sICsgd3JhcHBlclsyXTtcblxuXHRpID0gd3JhcHBlclswXTtcblxuXHR3aGlsZSAoaS0tKSB7XG5cdFx0bm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG5cdH1cblxuXHRyZXR1cm4gbm9kZS5jaGlsZE5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXG4gKiovIiwiLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZnlsbCBpcyB0YWtlbiB0aGVyZTpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24jUG9seWZpbGxcbi8vIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlXG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG5cdH1cblxuXHRjb25zdCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcblx0Zm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgbmV4dEtleSBpbiBzb3VyY2UpIHtcblx0XHRcdFx0aWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuXHRcdFx0XHRcdG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuXHRyZXR1cm4gbmV3IEluaXQoaHRtbDJub2RlTGlzdChodG1sKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbWF0Y2hlZCBzZXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uZShzLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzLCBjb250ZXh0KVswXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCIvLyBjcmVhdGVzIEhUTUwgZWxlbWVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG5cdGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ29iamVjdCcpIHtcblx0XHRwcm9wcyA9IHRhZ05hbWU7XG5cdFx0dGFnTmFtZSA9IHByb3BzLnRhZ05hbWU7XG5cdH1cblxuXHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cblx0aWYgKHByb3BzKSB7XG5cdFx0bm9mbi5mb3JPd24ocHJvcHMsICh2YWx1ZSwga2V5KSA9PiB7XG5cdFx0XHRpZiAoa2V5ID09PSAnYXR0cmlidXRlcycgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRub2ZuLmZvck93bih2YWx1ZSwgKGF0dHJWYWx1ZSwgYXR0ck5hbWUpID0+IHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgPT09ICdjaGlsZHJlbicgJiYgdmFsdWUpIHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZWxba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgIT09ICd0YWdOYW1lJykge1xuXHRcdFx0XHRlbFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0Y29uc3QgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkucmVwbGFjZSgnMC4nLCAneCcpLFxuXHRcdHNjb3BlU2VsZWN0b3IgPSBgWyR7cmFuZG9tSUR9PVwiJHtyYW5kb21JRH1cIl0gYCxcblx0XHRzcGxpdHRlZFNlbGVjdG9yID0gc2VsZWN0b3Iuc3BsaXQoJywnKTtcblxuXHRsZXQgbWF0Y2hpbmcgPSAnJztcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzZWwgPSBzcGxpdHRlZFNlbGVjdG9yW2ldO1xuXHRcdG1hdGNoaW5nICs9IGAke2kgPT09IDAgPyAnJyA6ICcsJ30ke3Njb3BlU2VsZWN0b3J9JHtzZWx9LCR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0gKmA7XG5cdH1cblxuXG5cdHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cblx0aWYgKGlzLmNhbGwoW2V2dC50YXJnZXRdLCBtYXRjaGluZykpIHtcblx0XHRoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcblx0fVxuXG5cdHRoaXMucmVtb3ZlQXR0cmlidXRlKHJhbmRvbUlEKTtcbn1cblxuLy8gYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNldCBvZiBlbGVtbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0bGV0IGRlbGVnYXRlO1xuXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XG5cdFx0c2VsZWN0b3IgPSBudWxsO1xuXHR9XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0ZGVsZWdhdGUgPSBmdW5jdGlvbiB1bmlxdWVEZWxlZ2F0ZUhhbmRsZXIoZXZ0KSB7XG5cdFx0XHRkZWxlZ2F0ZUhhbmRsZXIuY2FsbCh0aGlzLCBldnQsIHNlbGVjdG9yLCBoYW5kbGVyKTtcblx0XHR9O1xuXHR9XG5cblx0bmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcblx0XHRjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuXHRcdG5hbWUgPSBuYW1lWzBdO1xuXG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gdGhpc1tqXSxcblx0XHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleCxcblx0XHRcdFx0ZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuXHRcdFx0bGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0Y29uc3QgZXZlbnQgPSBldmVudHNba107XG5cblx0XHRcdFx0aWYgKGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0ZXhpc3QgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZXhpc3QpIHtcblx0XHRcdFx0ZXZlbnRzLnB1c2goe1xuXHRcdFx0XHRcdGRlbGVnYXRlLFxuXHRcdFx0XHRcdGhhbmRsZXIsXG5cdFx0XHRcdFx0bmFtZXNwYWNlLFxuXHRcdFx0XHRcdHNlbGVjdG9yXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb24uanNcbiAqKi8iLCIvLyBzaGFyZSBkYXRhIGJldHdlZW4gYXMgYW4gb2JqZWN0IG1vZHVsZXMgYmVjYXVzZSB3ZSB1c2Vcbi8vIHNpbXBsaWZpZWQgZXMgbW9kdWxlcyB0aGVyZSBhbmQgY2Fubm90IGltcG9ydCBhbmQgc2hhcmUgYSBudW1iZXJcbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9kZUluZGV4OiAwLFxuXHRhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG5cdGNvbnN0IG5vZGUgPSB0aGlzWzBdO1xuXHRyZXR1cm4gbm9kZVxuXHRcdD8gKG5vZGUubWF0Y2hlc1xuXHRcdFx0fHwgbm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUubW96TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgcykgOiBmYWxzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pcy5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyByZW1vdmVzIGV2ZW50IGhhbmRsZXIgZnJvbSBhIHNldCBvZiBlbGVtZW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2ZmKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuXHRcdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdCghaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5oYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmRlbGVnYXRlKVxuXHRcdFx0XHRcdFx0JiYgKCFuYW1lc3BhY2UgfHwgbmFtZXNwYWNlID09PSBldmVudC5uYW1lc3BhY2UpXG5cdFx0XHRcdFx0XHQmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3Rvcilcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcblx0XHRcdFx0XHRcdGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghbmFtZXNwYWNlICYmICFzZWxlY3Rvcikge1xuXHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIGFkZHMgdW5pcXVlIG5vZGVzIHRvIGJRdWVyeSBjb2xsZWN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGQoc2VsZWN0b3IpIHtcblx0Y29uc3QgaWRNYXAgPSB7fTtcblxuXHRsZXQgcmVzdWx0LFxuXHRcdG5vZGVJRCxcblx0XHRub2RlLFxuXHRcdGk7XG5cblx0c2VsZWN0b3IgPSBuZXcgSW5pdChzZWxlY3Rvcik7XG5cblx0aWYgKHRoaXMubGVuZ3RoKSB7XG5cdFx0cmVzdWx0ID0gbmV3IEluaXQodGhpcyk7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bm9kZSA9IHJlc3VsdFtpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZE1hcFtub2RlSURdID0gMTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSBzZWxlY3RvcltpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZiAoIWlkTWFwW25vZGVJRF0pIHtcblx0XHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvYWRkLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGV4Y2x1ZGVzIGVsZW1lbnRzIGZyb20gY3VycmVudCBzZXQgYnkgZ2l2ZW4gc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdChzZWxlY3Rvcikge1xuXHRjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRyZXN1bHQucHVzaCh0aGlzW2ldKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L25vdC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBnZXQgdGhlIGRlc2NlbmRhbnRzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgY3VycmVudCBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50cyxcbi8vIGZpbHRlcmVkIGJ5IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcblx0bGV0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cblx0bm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcblx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblx0fSk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9maW5kLmpzXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG5mdW5jdGlvbiBydW5NYXRyZXNoa2FIYW5kbGVyKG5vZGUsIHByb3BEZWYsIGJpbmRlciwgb3B0aW9ucywgZXZ0KSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCB7IG9uQ2hhbmdlVmFsdWUsIGNoYW5nZWROb2RlLCBiaW5kZXI6IGV2dEJpbmRlciB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgc2V0VmFsdWUgfSA9IGJpbmRlcjtcblx0Ly8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0Y29uc3QgZGlydHlIYWNrVmFsdWUgPSBvbkNoYW5nZVZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgKyAnJyA6IHZhbHVlO1xuXG4gICAgaWYgKGNoYW5nZWROb2RlID09PSBub2RlICYmIG9uQ2hhbmdlVmFsdWUgPT09IGRpcnR5SGFja1ZhbHVlICYmIGV2dEJpbmRlciA9PT0gYmluZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZS5jYWxsKG5vZGUsIHZhbHVlLCBub2ZuLmFzc2lnbih7IHZhbHVlIH0sIG9wdGlvbnMpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuXHRiaW5kZXI6IGdpdmVuQmluZGVyLFxuXHRrZXksXG5cdCRub2Rlcyxcblx0bm9kZSxcblx0ZXZ0LFxuXHRwcm9wRGVmXG59KSB7XG5cdGNvbnN0IHsgYXNzaWduRGVmYXVsdFZhbHVlLCBkZWJvdW5jZSB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0c2VsZjogb2JqZWN0LFxuXHRcdGtleSxcbiAgICAgICAgdmFsdWUsXG5cdFx0JG5vZGVzLFxuXHRcdG5vZGVcblx0fTtcbiAgICBjb25zdCBiaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzIHx8IFtdO1xuXHRsZXQgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCc7XG5cdGxldCBiaW5kZXI7XG5cdGxldCBvYmplY3RIYW5kbGVyO1xuXG5cdGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdGlmIChmb3VuZEJpbmRlcikge1xuXHRcdFx0aWYgKGdpdmVuQmluZGVyKSB7XG5cdFx0XHRcdG5vZm4uYXNzaWduKGZvdW5kQmluZGVyLCBnaXZlbkJpbmRlcik7XG5cdFx0XHR9XG5cblx0XHRcdGJpbmRlciA9IGZvdW5kQmluZGVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRiaW5kZXIgPSBnaXZlbkJpbmRlcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCB7IGdldFZhbHVlLCBzZXRWYWx1ZSwgb24sIGluaXRpYWxpemUgfSA9IGJpbmRlcjtcblxuXHRpZiAoaW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplLmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgfVxuXG5cdGlmIChnZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBhc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcblxuXHRcdHNldChvYmplY3QsIGtleSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgZnJvbU5vZGU6IHRydWUgfSwgZXZ0KSk7XG5cdH1cblxuXHRpZiAoc2V0VmFsdWUpIHtcblx0XHRvYmplY3RIYW5kbGVyID0gKCkgPT4gcnVuTWF0cmVzaGthSGFuZGxlcihub2RlLCBwcm9wRGVmLCBiaW5kZXIsIG9wdGlvbnMsIGV2dCk7XG5cblx0XHRpZihkZWJvdW5jZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuXHRcdFx0b2JqZWN0SGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHR9XG5cblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG5cdFx0aWYoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgaWYoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgLy8gVE9ETyB1c2UgQ3VzdG9tRXZlbnQgaW5zdGFuY2UgaW5zdGVhZCBvZiBhbiBvYmplY3QgYXMgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAvLyBUT0RPIG1vdmUgaXQgdG8gdG9wXG4gICAgICAgIGNvbnN0IG5vZGVIYW5kbGVyID0gKGRvbUV2ZW50ID0ge30pID0+IHtcbiAgICAgICAgICAgIC8vIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZSBpcyBzZXQgaW4gdW5iaW5kTm9kZVxuICAgICAgICAgICAgLy8gd2UgY2Fubm90IFwidHVybiBvZmZcIiBiaW5kZXIub24gd2hlbiBpdHMgdmFsdWUgaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGRldmVsb3BlciBuZWVkcyB0byBjbGVhbiBtZW1vcnkgKHR1cm4gb2ZmIGNhbGxiYWNrKSBtYW51YWx5IGluIGJpbmRlci5kZXN0cm95XG4gICAgICAgICAgICBpZihub2RlSGFuZGxlci5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcHJvcERlZi52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHsgd2hpY2gsIHRhcmdldCB9ID0gZG9tRXZlbnQ7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgbm9mbi5hc3NpZ24oe1xuXHRcdFx0XHRwcmV2aW91c1ZhbHVlLFxuXHRcdFx0XHRkb21FdmVudCxcblx0XHRcdFx0b3JpZ2luYWxFdmVudDogZG9tRXZlbnQub3JpZ2luYWxFdmVudCB8fCBkb21FdmVudCwgLy8galF1ZXJ5IHRoaW5nXG5cdFx0XHRcdHByZXZlbnREZWZhdWx0OiAoKSA9PiBkb21FdmVudC5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG5cdFx0XHRcdHdoaWNoLFxuXHRcdFx0XHR0YXJnZXRcblx0XHRcdH0sIG9wdGlvbnMpKTtcblxuICAgICAgICAgICAgaWYgKCFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCBjaGFuZ2VkTm9kZSwgb25DaGFuZ2VWYWx1ZSwgYmluZGVyP1xuXHRcdFx0XHRzZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0ZnJvbU5vZGU6IHRydWUsXG5cdFx0XHRcdFx0Y2hhbmdlZE5vZGU6IG5vZGUsXG5cdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0YmluZGVyXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuICAgICAgICB9O1xuXG4gICAgICAgIGJpbmRpbmdzLnB1c2goe1xuICAgICAgICAgICAgb24sXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgb2JqZWN0SGFuZGxlcixcbiAgICAgICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcblxuICAgICAgICBpZih0eXBlb2Ygb24gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb24uY2FsbChub2RlLCBub2RlSGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uJChub2RlKS5vbihvbiwgbm9kZUhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuLypcbmZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdHNlbGY6IG9iamVjdCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0JG5vZGVzOiAkbm9kZXMsXG5cdFx0XHRub2RlOiBub2RlXG5cdFx0fSxcblx0XHRub2RlID0gJG5vZGVzW2luZGV4XSxcblx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiBzcGVjaWFsLnZhbHVlID09ICd1bmRlZmluZWQnLFxuXHRcdF9iaW5kZXIsXG5cdFx0X2V2dCxcblx0XHRmb3VuZEJpbmRlcixcblx0XHRfb3B0aW9ucyxcblx0XHRpLFxuXHRcdGRvbUV2dCxcblx0XHRta0hhbmRsZXIsXG5cdFx0dmFsO1xuXG5cblxuXG5cdGlmIChiaW5kZXIgPT09IG51bGwpIHtcblx0XHRfYmluZGVyID0ge307XG5cdH0gZWxzZSB7XG5cdFx0Zm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoYmluZGVyKSB7XG5cdFx0XHRcdGZvciAoaSBpbiBiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9iaW5kZXIgPSBiaW5kZXIgfHwge307XG5cdFx0fVxuXHR9XG5cblx0aWYgKF9iaW5kZXIuaW5pdGlhbGl6ZSkge1xuXHRcdF9vcHRpb25zID0ge1xuXHRcdFx0dmFsdWU6IHNwZWNpYWwudmFsdWVcblx0XHR9O1xuXHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0fVxuXHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0fVxuXG5cdGlmIChfYmluZGVyLmdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBldnQuYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBldnQuYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuXG5cdFx0X2V2dCA9IHtcblx0XHRcdGZyb21Ob2RlOiB0cnVlXG5cdFx0fTtcblxuXHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdF9ldnRbaV0gPSBldnRbaV07XG5cdFx0fVxuXG5cdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbCA9PSAndW5kZWZpbmVkJztcblxuXHRcdGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWwsIF9ldnQpO1xuXHR9XG5cblxuXHRpZiAoX2JpbmRlci5zZXRWYWx1ZSkge1xuXHRcdG1rSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdC8vIGRpcnR5IGhhY2sgZm9yIHRoaXMgb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG5cdFx0XHRcdF92ID0gZXZ0ICYmIHR5cGVvZiBldnQub25DaGFuZ2VWYWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdiA9PSAnbnVtYmVyJyA/IHYgKyAnJyA6IHYsXG5cdFx0XHRcdGk7XG5cblx0XHRcdGlmIChldnQgJiYgZXZ0LmNoYW5nZWROb2RlID09IG5vZGUgJiYgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gX3YpIHJldHVybjtcblxuXHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGkgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHR9XG5cblx0XHRcdF9iaW5kZXIuc2V0VmFsdWUuY2FsbChub2RlLCB2LCBfb3B0aW9ucyk7XG5cdFx0fTtcblxuXHRcdGlmKGV2dC5kZWJvdW5jZSkge1xuXHRcdFx0bWtIYW5kbGVyID0gdXRpbC5kZWJvdW5jZShta0hhbmRsZXIpO1xuXHRcdH1cblxuXHRcdGNvcmUuX2Zhc3RBZGRMaXN0ZW5lcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgbWtIYW5kbGVyLCBudWxsLCB7bm9kZTogbm9kZX0pO1xuXG5cdFx0IWlzVW5kZWZpbmVkICYmIG1rSGFuZGxlcigpO1xuXHR9XG5cblxuXG5cblx0aWYgKF9iaW5kZXIuZ2V0VmFsdWUgJiYgX2JpbmRlci5vbikge1xuXHRcdGRvbUV2dCA9IHtcblx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRvbjogX2JpbmRlci5vbixcblx0XHRcdGluc3RhbmNlOiBvYmplY3QsXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG1rSGFuZGxlcjogbWtIYW5kbGVyLFxuXHRcdFx0aGFuZGxlcjogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHR2YXIgb2xkdmFsdWUgPSBvYmplY3Rba2V5XSxcblx0XHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0dmFsdWU6IG9sZHZhbHVlLFxuXHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2dC5vcmlnaW5hbEV2ZW50IHx8IGV2dCxcblx0XHRcdFx0XHRcdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHdoaWNoOiBldnQud2hpY2gsXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHR9O1xuXG5cblx0XHRcdFx0Ly8gaGFzT3duUHJvcGVydHkgaXMgbm90IHJlcXVpcmVkIHRoZXJlXG5cdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0X29wdGlvbnNbal0gPSBvcHRpb25zW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSAhPT0gb2xkdmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcblx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0Y2hhbmdlZE5vZGU6IG5vZGUsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZVZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGNvcmUuZG9tRXZlbnRzLmFkZChkb21FdnQpO1xuXHR9XG59Ki9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0QmluZGVycyBmcm9tICcuL2RlZmF1bHRiaW5kZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciByZXN1bHQsXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGVmYXVsdEJpbmRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9IGRlZmF1bHRCaW5kZXJzW2ldLmNhbGwobm9kZSwgbm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvbG9va2ZvcmJpbmRlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IFtub2RlID0+IHtcblx0dmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWUsXG5cdFx0YmluZGVycyA9IHVuZGVmaW5lZCxcblx0XHRiO1xuXG5cdC8vIFRPRE8gU3dpdGNoL2Nhc2Vcblx0aWYgKHRhZ05hbWUgPT0gJ0lOUFVUJykge1xuXHRcdGIgPSBiaW5kZXJzLmlucHV0KG5vZGUudHlwZSk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnVEVYVEFSRUEnKSB7XG5cdFx0YiA9IGJpbmRlcnMudGV4dGFyZWEoKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdTRUxFQ1QnKSB7XG5cdFx0YiA9IGJpbmRlcnMuc2VsZWN0KG5vZGUubXVsdGlwbGUpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1BST0dSRVNTJykge1xuXHRcdGIgPSBiaW5kZXJzLnByb2dyZXNzKCk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnT1VUUFVUJykge1xuXHRcdGIgPSBiaW5kZXJzLm91dHB1dCgpO1xuXHR9XG5cblx0cmV0dXJuIGI7XG59XTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcImV2dFwiXSB9XSovXG5cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5cbi8vIHByb3BlcnR5IG1vZGlmaWVyIGV2ZW50IHJlZ2V4cFxuY29uc3QgcHJvcE1vZEV2ZW50UmVnXG5cdD0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KSxcblx0XHRjdHggPSBjb250ZXh0IHx8IG9iamVjdCxcblx0XHRldmVudHMgPSBhbGxFdmVudHNbbmFtZV0sXG5cdFx0ZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuXHQvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZVxuXHRpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBldnQgPSBldmVudHNbaV07XG5cdFx0XHRpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG5cdFx0XHRcdFx0JiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3Rcblx0XHRldmVudHMucHVzaChldnQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG5cdFx0YWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG5cdH1cblxuXHRpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcblx0XHQvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG5cdFx0ZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG5cdH1cblxuXHRpZiAobmFtZVswXSAhPT0gJ18nKSB7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcblx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcblx0fVxuXG5cdC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBldnQpIHtcblx0Y2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3VuYmluZE5vZGUnKTtcblxuXG5cblx0aWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBub2RlLCBldnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoW3trZXksIG5vZGUsIGJpbmRlciwgZXZlbnR9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChrZXlPYmpWYWx1ZSwga2V5T2JqS2V5KSA9PiB1bmJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXHRjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcblx0Y29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cblx0aWYoIXByb3BEZWYpIHtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Y29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuXHRpZighYmluZGluZ3MpIHtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Ly8gVE9ETyBtYWtlIHN1cmUgdG8gdXBkYXRlICRub2RlcyBmb3IgTWF0cmVzaGthIGluc3RhbmNlc1xuXG5cdGlmKGtleSA9PT0gbnVsbCkge1xuXHRcdC8vIFRPRE8gcmVtb3ZlIGFsbCBiaW5kaW5nc1xuXG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG5cdGlmKCFub2RlKSB7XG5cdFx0Ly8gVE9ETyByZW1vdmUgYWxsIGJpbmRpbmdzIGZvciBnaXZlbiBrZXlcblx0fVxuXG5cdGNvbnN0ICRub2RlcyA9IGdldE5vZGVzKG9iamVjdCwgbm9kZSk7XG5cdGNvbnN0IHJldGFpbkJpbmRpbmdzID0gW107XG5cblx0bm9mbi5mb3JFYWNoKCRub2Rlcywgbm9kZXNJdGVtID0+IHtcblx0XHQvLyBUT0RPIG1vdmUgdG8gdGhlIHRvcCA/XG5cdFx0bm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcblx0XHRcdGNvbnN0IHtcblx0XHRcdFx0b24sXG5cdFx0XHRcdG5vZGUsXG5cdFx0XHRcdGJpbmRlcixcblx0XHRcdFx0bm9kZUhhbmRsZXIsXG5cdFx0XHRcdG9iamVjdEhhbmRsZXIsXG5cdFx0XHRcdG9wdGlvbnNcblx0XHRcdH0gPSBiaW5kaW5nO1xuXG5cdFx0XHRpZihub2RlID09PSBub2Rlc0l0ZW0pIHtcblx0XHRcdFx0Y29uc3QgeyBkZXN0cm95IH0gPSBiaW5kZXI7XG5cblx0XHRcdFx0aWYodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0bm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdCAgICAgICAgICAgIGRvbS4kKG5vZGUpLm9mZihvbiwgbm9kZUhhbmRsZXIpO1xuXHRcdCAgICAgICAgfVxuXHRcdFx0XHRyZW1vdmVMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG5cdFx0XHRcdGlmKGRlc3Ryb3kpIHtcblx0XHRcdFx0XHRkZXN0cm95LmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0YWluQmluZGluZ3MucHVzaChiaW5kaW5nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0cHJvcERlZi5iaW5kaW5ncyA9IHJldGFpbkJpbmRpbmdzO1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91bmJpbmRub2RlLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wibmFtZVwiLCBcImV2ZW50c1wiXSB9XSovXG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5cbi8vIHJlbW92ZXMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyIHRvIGFuIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbykge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcblx0Y29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuXHRjb25zdCByZXRhaW4gPSBbXTtcblx0Y29uc3Qgbm9UcmlnZ2VyID0gbmFtZSA/IG5hbWVbMF0gPT09ICdfJyA6IGZhbHNlO1xuXG5cdC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG5cdGlmICh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRpZiAoIW5vVHJpZ2dlcikge1xuXHRcdFx0bm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIHJlc3RvcmUgZGVmYXVsdCB2YWx1ZSBvZiBcImV2ZW50c1wiXG5cdFx0ZGVmLmV2ZW50cyA9IHt9O1xuXHR9IGVsc2UgaWYgKGV2ZW50cykge1xuXHRcdC8vIGlmIGV2ZW50cyB3aXRoIGdpdmVuIG5hbWUgYXJlIGZvdW5kXG5cdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdGlmIChjYWxsYmFjayAmJiAoY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjayAmJiBjYWxsYmFjay5fY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjaylcblx0XHRcdFx0fHwgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZ0LmNvbnRleHQpKSB7XG5cdFx0XHRcdC8vIGtlZXAgZXZlbnRcblx0XHRcdFx0cmV0YWluLnB1c2goZXZ0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGV2dC5jb250ZXh0XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKCFub1RyaWdnZXIpIHtcblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChyZXRhaW4ubGVuZ3RoKSB7XG5cdFx0XHRhbGxFdmVudHNbbmFtZV0gPSByZXRhaW47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybjtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5hZGQnLCAoKSA9PiB7XG5cdGl0KCdhZGRzIG9uY2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWw0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuXHRcdF0pLnRvRXF1YWwoW2VsMSwgZWwyLCBlbDMsIGVsNCwgZWw1XSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5jcmVhdGUnLCAoKSA9PiB7XG5cdGl0KCdjcmVhdGVzIGVsZW1lbnQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ0RJVicpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2Zvb2Jhcidcblx0XHRcdH0pLmNsYXNzTmFtZVxuXHRcdCkudG9FcXVhbCgnZm9vYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0Y2hpbGRyZW46IFt7XG5cdFx0XHRcdFx0dGFnTmFtZTogJ3NwYW4nXG5cdFx0XHRcdH1dXG5cdFx0XHR9KS5jaGlsZHJlblswXS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIGF0dHJpYnV0ZScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdFx0Zm9vOiAnYmFyJ1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5nZXRBdHRyaWJ1dGUoJ2ZvbycpXG5cdFx0KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG9iamVjdCB3aXRoIHRhZ05hbWUgcHJvcGVydHknLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoe1xuXHRcdFx0XHR0YWdOYW1lOiAnZGl2J1xuXHRcdFx0fSkudGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xuXG5cdHhpdCgnZXh0ZW5kcyBkYXRhc2V0IG9iamVjdCcsICgpID0+IHtcblx0XHQvLyBUT0RPXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2xpYi9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoJ2JRdWVyeSBldmVudHMnLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveCxcblx0XHRjaGlsZDEsXG5cdFx0Y2hpbGQyLFxuXHRcdGdyYW5kY2hpbGQxLFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQxXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj48L2Rpdj5cblx0XHRgO1xuXG5cdFx0Y2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuXHRcdGNoaWxkMiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDInKTtcblx0XHRncmFuZGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkMScpO1xuXG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRhZnRlckVhY2goKCkgPT4ge1xuXHRcdCQoW3Rlc3RTYW5kYm94LCBjaGlsZDEsIGNoaWxkMiwgZ3JhbmRjaGlsZDFdKS5vZmYoJ2NsaWNrJyk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgbmFtZXNwYWNlZCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBidWJibGluZyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChjbGljayBvbiBncmFuZGNoaWxkcmVuKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdEb2VzblxcdCB0cmlnZ2VyIHdoZW4gY2xpY2tlZCBvbiB3cm9uZyBjaGlsZCcsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIHNwZWNpZmllZCwgaGFuZGxlciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdTdG9wcyBwcm9wYWdhdGlvbicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHQkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXG4gKiovIiwiLy8gc2ltdWxhdGVzIGNsaWNrIG9uIGEgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2ltdWxhdGVDbGljayhub2RlKSB7XG5cdGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG5cdGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlKTtcblx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL3NpbXVsYXRlY2xpY2suanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3gsXG5cdFx0Z3JhbmRDaGlsZDtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0Z3JhbmRDaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkJyk7XG5cdH0pO1xuXG5cdGl0KCdmaW5kcycsICgpID0+IHtcblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuXHRcdF0pLnRvRXF1YWwoW2dyYW5kQ2hpbGRdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5Jztcbi8vINC30LDRgdGD0L3Rg9GC0Ywg0LLRgdC1INGB0L7Qt9C00LDQvdC40Y8g0L3QvtCy0YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0LIgYmVmb3JlRWFjaFxuLy8g0YDQtdGE0LDQutGC0L7RgNC40YLRjFxuLy8g0L3QsNC/0LjRgdCw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4ICjQsiDRgtC+0Lwg0YfQuNGB0LvQtSDQuCDQuiDRg9C20LUg0YDQtdCw0LvQuNC30L7QstCw0L3QvdGL0Lwg0YTRg9C90LrRhtC40Y/QvClcbi8vINC/0L7RgdC70LUg0LLRgdC10LPQviDQvdGD0LbQvdC+INCy0LrQu9GO0YfQuNGC0Ywg0LvQuNC90YLQtdGAINC4INC/0YDQvtCy0LXRgNC40YLRjCDQutC+0LLQtdGA0LDQtNC2XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveDtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInRlc3RcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0yXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTNcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH0pO1xuXG5cdGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKHdpbmRvdyk7XG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKGRvY3VtZW50KTtcblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKGRvY3VtZW50KTtcblx0fSk7XG5cblx0aXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgY2hpbGRyZW4gPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGNoaWxkcmVuKTtcblxuXHRcdGV4cGVjdChjaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwocmVzdWx0Lmxlbmd0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcblx0XHR9XG5cdH0pO1xuXG5cdGl0KCdDb252ZXJ0cyBvbmUgZWxlbWVudCcsICgpID0+IHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpLFxuXHRcdFx0cmVzdWx0ID0gJChlbGVtZW50KTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChlbGVtZW50KS50b0VxdWFsKHJlc3VsdFswXSk7XG5cdH0pO1xuXG5cdGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMSk7XG5cdH0pO1xuXG5cdGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byB1c2UgbnVsbCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKG51bGwpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byB1c2UgdW5kZWZpbmVkJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gY3JlYXRlIHBsdWdpbnMnLCAoKSA9PiB7XG5cdFx0JC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG5cdFx0XHRleHBlY3QoXG5cdFx0XHRcdHRoaXMubGVuZ3RoXG5cdFx0XHQpLnRvRXF1YWwoXG5cdFx0XHRcdHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5sZW5ndGhcblx0XHRcdCk7XG5cdFx0fTtcblxuXHRcdHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuXHRcdCQoJyonLCB0ZXN0U2FuZGJveCkuYlF1ZXJ5UGx1Z2luKCk7XG5cblx0XHRleHBlY3QoJC5mbi5iUXVlcnlQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG5cdGl0KCdjaGVja3MgY2xhc3NOYW1lJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuXHRcdGV4cGVjdChcblx0XHRcdCQoZWwpLmlzKCcuZWwnKVxuXHRcdCkudG9FcXVhbCh0cnVlKTtcblxuXHRcdGV4cGVjdChcblx0XHRcdCQoZWwpLmlzKCcuZWwyJylcblx0XHQpLnRvRXF1YWwoZmFsc2UpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG5cdGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcblx0XHRjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJChbZWwxLCBlbDIsIGVsM10pLm5vdCgnLmVsMicpXG5cdFx0XSkudG9FcXVhbChbZWwxLCBlbDNdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5Lm9uZScsICgpID0+IHtcblx0aXQoJ2ZpbmRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5vbmUoJyonLCB0ZXN0U2FuZGJveClcblx0XHQpLnRvRXF1YWwoY2hpbGQpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkucGFyc2VIVE1MJywgKCkgPT4ge1xuXHRpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8dGQ+PC90ZD48dGQ+PC90ZD4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuXHRpdCgnYWxsb3dzIHRvIGluaGVyaXQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcblx0XHRcdEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG5cdFx0XHRDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuXHRcdFx0aW5zdCA9IG5ldyBDO1xuXG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBCKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cblx0XHRleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYikudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3Moe30sIHsgc3RhdGljUHJvcDogdHJ1ZSB9KTtcblx0XHRleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG5cdH0pO1xuXG5cdGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGluc3QgPSBuZXcgQ2xhc3MoeyBhOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuXHRjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0XG5cdFx0XHQ/IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxuXHRcdFx0OiBmdW5jdGlvbiBFbXB0eUNvbnN0cnVjdG9yKCkge30sXG5cdFx0Ly9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0XHRQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuXHRcdC8vaW5oZXJpdCBwcm90byBmcm9tIGNsYXNzIHBhcmVudCBvciBlbXB0eSBvYmplY3Rcblx0XHRwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuXHRleHRlbmQocHJvdG8sIHByb3RvdHlwZSk7XG5cblx0aWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcblx0XHRleHRlbmQoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0fVxuXG5cdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cdHByb3RvLmluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuXHRcdHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG5cdH07XG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cblx0Ly8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuXHRpZiAodGhpcyBpbnN0YW5jZW9mIENsYXNzKSB7XG5cdFx0cmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3MuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge1xuXHRcdFx0YToge31cblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe30pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdGE6IHt9XG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXVswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG5cdFx0XHR5OiBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdFx0YToge31cblx0XHRcdH0pXG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC55LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgY3R4LFxuXHRcdGhhbmRsZXI7XG5cblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRjdHggPSB7fTtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpLFxuXHRcdFx0YSA9IG9iai5hO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG5cdFx0dHJpZ2dlck9uZShhLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpLFxuXHRcdFx0YiA9IG9iai5hLmI7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0ge307XG5cdFx0dHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG5cdFx0dHJpZ2dlck9uZShhLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YiA9IG9iai5hLmI7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShiLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGMgPSBvYmouYS5jO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLmMgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZG9lc25cXCd0IHJlbW92ZSBjaGFuZ2UgZXZlbnQgd2hlbiB1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdG9iai5hLmIuYyA9IDU1O1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cdFx0bGV0IGJvb2wgPSBmYWxzZTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuXHRcdFx0Ym9vbCA9IHRoaXMgPT09IGN0eDtcblx0XHR9LCBjdHgpO1xuXG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBbXCJlcnJvclwiLCB7IFwiZnVuY3Rpb25zXCI6IGZhbHNlIH1dKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL2FkZGxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG5cdHByZXZpb3VzVmFsdWUsXG5cdHZhbHVlXG59LCB7XG5cdHBhdGgsXG5cdG5hbWUsXG5cdGNhbGxiYWNrLFxuXHRjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cblxuXHRpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuXHQvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gYWRkIHNpbXBsZSBsaXN0ZW5lclxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuXHRcdFx0cGF0aCxcblx0XHRcdG5hbWUsXG5cdFx0XHRjYWxsYmFjayxcblx0XHRcdGNvbnRleHRcblx0XHR9O1xuXG5cdFx0Ly8gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZCBieSBcInNldFwiXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuXHRcdFx0ZGVsZWdhdGVkRGF0YSxcblx0XHRcdHBhdGhTdHJcblx0XHR9KTtcblxuXHRcdC8vIGNhbGwgaGFuZGxlciBtYW51YWxseVxuXHRcdGNoYW5nZUhhbmRsZXIoe1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldXG5cdFx0fSwgZGVsZWdhdGVkRGF0YSk7XG5cdH1cbn1cblxuLypcbmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL2luaXRtaycsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCcsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL3NwZWNpYWxldnRyZWcnXG5dLCBmdW5jdGlvbihjb3JlLCBpbml0TUssIG1hcCwgc3BlY2lhbEV2dFJlZykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIF9kZWxlZ2F0ZUxpc3RlbmVyID0gY29yZS5fZGVsZWdhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uKG9iamVjdCxcblx0IHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zixcblx0XHRcdGZpcnN0S2V5ID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsxXSA6IHBhdGgsXG5cdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRvYmo7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0ZXZ0RGF0YSA9IGV2dERhdGEgfHwge307XG5cblx0XHRpZiAoZmlyc3RLZXkpIHtcblx0XHRcdGlmIChmaXJzdEtleSA9PSAnKicpIHtcblx0XHRcdFx0aWYgKG9iamVjdC5pc01LQXJyYXkpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHQoZXZ0ICYmIGV2dC5hZGRlZCA/IGV2dC5hZGRlZCA6IG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0gJiYgX2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSxcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGYuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnYWRkJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0ZigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9iamVjdC5pc01LT2JqZWN0KSB7XG5cdFx0XHRcdFx0ZiA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtldnQua2V5XTtcblxuXHRcdFx0XHRcdFx0aWYgKHRhcmdldCAmJiBldnQgJiYgKGV2dC5rZXkgaW4gb2JqZWN0RGF0YS5rZXlzKSkge1xuXHRcdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcih0YXJnZXQsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0b2JqZWN0LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZScsIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0aWYgKGV2dCAmJiBldnQuX3NpbGVudCkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtmaXJzdEtleV0sXG5cdFx0XHRcdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRcdFx0XHR0cmlnZ2VyQ2hhbmdlID0gdHJ1ZSxcblx0XHRcdFx0XHRcdGksXG5cdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHM7XG5cblx0XHRcdFx0XHRldnREYXRhLnBhdGggPSBwYXRoO1xuXG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlID0gZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlIHx8XG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZVtmaXJzdEtleV07XG5cblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlICYmIG1hcC5oYXMoZXZ0LnByZXZpb3VzVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRjb3JlLl91bmRlbGVnYXRlTGlzdGVuZXIoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldCA9PSAnb2JqZWN0JyAmJiB0YXJnZXQpIHtcblx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzcGVjaWFsRXZ0UmVnLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0XHRcdGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZShzcGVjaWFsRXZ0UmVnLCAnJyk7XG5cblx0XHRcdFx0XHRcdGlmICghcGF0aCAmJiBldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2NoYW5nZUtleV1cblx0XHRcdFx0XHRcdCE9PSB0YXJnZXRbY2hhbmdlS2V5XSkge1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHMgPSBtYXAuZ2V0KGV2dERhdGEucHJldmlvdXNWYWx1ZSkuZXZlbnRzW25hbWVdO1xuXHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNoYW5nZUV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNoYW5nZUV2ZW50c1tpXS5wYXRoID09PSBwYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAodHJpZ2dlckNoYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvcmUuc2V0KHRhcmdldCwgY2hhbmdlS2V5LCB0YXJnZXRbY2hhbmdlS2V5XSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yY2U6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzT2JqZWN0OiBldnREYXRhLnByZXZpb3VzVmFsdWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBmLCBjb250ZXh0LCBldnREYXRhKTtcblxuXHRcdFx0XHRmKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vcmVtb3ZlbGlzdGVuZXInO1xuLy8gUkVGQUNUT1IsIERPTlQgVFJJR0dFUiBBRERFVkVOVCwgUkVNT1ZFRVZFTlRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cblx0cGF0aCA9IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBwYXRoICE9PSAnJyA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGg7XG5cblx0aWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuXHRcdC8vIGlmIG5vIHBhdGggdGhlbiByZW1vdmUgbGlzdGVuZXJcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcblx0fSBlbHNlIHtcblx0XHQvLyBlbHNlIGRvIGFsbCBtYWdpY1xuXHRcdGNvbnN0IGtleSA9IHBhdGhbMF07XG5cdFx0Y29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuXHRcdGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRjb25zdCByZXRhaW4gPSBbXTtcblx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcblx0XHRcdFx0aWYgKGV2ZW50LmluZm8ucGF0aFN0ciAhPT0gcGF0aFN0cikge1xuXHRcdFx0XHRcdHJldGFpbi5wdXNoKGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXRhaW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3Rba2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuXHRcdH1cblx0fVxufVxuXG4vKlxuZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIF91bmRlbGVnYXRlTGlzdGVuZXIgPSBjb3JlLl91bmRlbGVnYXRlTGlzdGVuZXIgPVxuXHQgZnVuY3Rpb24ob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSkge1xuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHR2YXIgZXhlY3V0ZWQgPSAvKFteXFwuXSspXFwuKC4qKS8uZXhlYyhwYXRoKSxcblx0XHRcdGZpcnN0S2V5ID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsxXSA6IHBhdGgsXG5cdFx0XHRwID0gcGF0aCxcblx0XHRcdG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRldmVudHMsXG5cdFx0XHRpO1xuXG5cdFx0cGF0aCA9IGV4ZWN1dGVkID8gZXhlY3V0ZWRbMl0gOiAnJztcblxuXHRcdGlmIChmaXJzdEtleSkge1xuXHRcdFx0aWYgKGZpcnN0S2V5ID09ICcqJykge1xuXHRcdFx0XHRpZiAob2JqZWN0LmlzTUtBcnJheSkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmFkZCB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblxuXHRcdFx0XHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCAnYWRkJywgZXZlbnRzW2ldLmNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG9iamVjdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdGl0ZW0gJiYgX3VuZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2JqZWN0LmlzTUtPYmplY3QpIHtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCAnY2hhbmdlJywgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRldmVudHMgPSBvYmplY3REYXRhLmV2ZW50cy5jaGFuZ2UgfHwgW107XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y29yZS5fcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlOicgKyBmaXJzdEtleSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzWydjaGFuZ2U6JyArIGZpcnN0S2V5XSB8fCBbXTtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXHRcdFx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mIG9iamVjdFtmaXJzdEtleV0gPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtmaXJzdEtleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHR9XG5cdH07XG59KTtcblxuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBuZXN0ZWQgb2JqZWN0IGJhc2VkIG9uIHBhdGggYW5kIGxhc3RWYWx1ZVxuLy8gZXhhbXBsZTogbWFrZU9iamVjdCgnYS5iLmMnLCA0MikgLT4ge2E6IHtiOiB7YzsgNDJ9fX1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VPYmplY3QocGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuXHRwYXRoID0gcGF0aCA/IHBhdGguc3BsaXQoJy4nKSA6IFtdO1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0bGV0IG9iaiA9IHJlc3VsdCxcblx0XHRrZXk7XG5cblxuXHR3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0a2V5ID0gcGF0aC5zaGlmdCgpO1xuXHRcdG9iaiA9IG9ialtrZXldID0ge307XG5cdH1cblxuXHRvYmpbcGF0aC5zaGlmdCgpXSA9IGxhc3RWYWx1ZTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcblxuZGVzY3JpYmUoJ0NoYW5nZSBldmVudCAoc2ltcGxlIGFuZCBkZWxlZ2F0ZWQpJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgc2ltcGxlJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgc2ltcGxlJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0Lyplc2xpbnQtZGlzYWJsZSAqL1xuXHR4aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jLngnLCAyKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIgPSB7XG5cdFx0XHRjOiB7XG5cdFx0XHRcdHg6IDJcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0b2JqLmEuYi5jID0ge1xuXHRcdFx0eDogMlxuXHRcdH07XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0eGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpID0gMDtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTExKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTEwKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTkpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGV2dCA9PiBpICs9IDFlOCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTcpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU2KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlNCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMyk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMCk7XG5cdFx0b2JqLmEgPSB7XG5cdFx0XHRiOiB7XG5cdFx0XHRcdGM6IHtcblx0XHRcdFx0XHR4OiAyXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMTExMTExMTExMSk7XG5cdH0pO1xuXG5cdHhpdCgnYWNjZXB0cyBudWxsIHRhcmdldCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmEuYiA9IG51bGw7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXHQvKmVzbGludC1lbmFibGUgKi9cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5cbmRlc2NyaWJlKCdFdmVudHMgY29yZTogYWRkTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyLCB0cmlnZ2VyT25lJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IG9iaixcblx0XHRjdHgsXG5cdFx0aGFuZGxlcjtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRvYmogPSB7fTtcblx0XHRjdHggPSB7fTtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcycsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuXHRcdGxldCBpID0gMDtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTApKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTEpKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTIpKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvRXF1YWwoMTExKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKG5vIGFyZ3MpJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgbmFtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjaycsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0JywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHR4aXQoJ3JlbW92ZXMgYnkgaG93VG9SZW1vdmUgKG5vdCBkb2N1bWVudGVkIGNvcmUgZmVhdHVyZSknLCAoKSA9PiB7XG5cdFx0Lyplc2xpbnQtZGlzYWJsZSAqL1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWUsXG5cdFx0XHRvbkRhdGEgPSB7XG5cdFx0XHRcdGhvd1RvUmVtb3ZlKG9uRGF0YSwgb2ZmRGF0YSkge1xuXHRcdFx0XHRcdHJldHVybiBvZmZEYXRhLnggPT09IDQyO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0bWFnaWMuX2FkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDEnLCBmLCBudWxsLCBvbkRhdGEpO1xuXHRcdG1hZ2ljLl9yZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgbnVsbCwgbnVsbCwge1xuXHRcdFx0eDogNDJcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50MScpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXG5cdFx0bWFnaWMuX2FkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDInLCBmLCBudWxsLCBvbkRhdGEpO1xuXHRcdG1hZ2ljLl9yZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgbnVsbCwgbnVsbCwge1xuXHRcdFx0eDogNDNcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50MicpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdFx0Lyplc2xpbnQtZW5hYmxlICovXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cblxueGRlc2NyaWJlKFwiRXZlbnRzIGNvcmU6IF9hZGRET01MaXN0ZW5lciwgX3JlbW92ZURPTUxpc3RlbmVyXCIsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ2QtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwiZC10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImQtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXG5cdGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIGFuZCByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSB0aGVuIGJpbmRzIHRoZW4gcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIERPTSBldmVudCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4JywgMSwgMik7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvcicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvciAoYnViYmxpbmcgdGVzdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGRlbGVnYXRlZCBhbmQgZG9lc25cXCd0IHJlbW92ZSBldmVudHMgZnJvbSBvdGhlciBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ibGFoJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3RyaWdnZXJzIGV2ZW50IHZpYSBcInRyaWdnZXJcIiBtZXRob2QnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRXZlbnRzIHN1bW1hcnkgKG9uLCBvZmYpJywgKCkgPT4ge1xuXHRsZXQgcSA9IChzLCBjKSA9PiB7XG5cdFx0bGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcblx0XHRcdFx0bGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXHRcdFx0XHRldi5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRcImNsaWNrXCIsXG5cdFx0XHRcdFx0dHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuXHRcdFx0XHRcdHdpbmRvdywgbnVsbCxcblx0XHRcdFx0XHQwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG5cdFx0XHRcdFx0MCAvKmxlZnQqLyAsIG51bGxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRsZXQgbm9kZSA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuXHRcdHRhZ05hbWU6ICdESVYnLFxuXHRcdGlkOiAncy10ZXN0Jyxcblx0XHRpbm5lckhUTUw6IGBcblx0XHRcdDxkaXYgaWQ9XCJzLXRlc3QtMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicy10ZXN0LTJcIj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGBcblx0fSkpO1xuXG5cdG5vZGUuY2xpY2sgPSBub2RlLmNsaWNrIHx8IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snKSk7XG5cdH1cblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXHRcdG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHRpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtay5vbignc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0ZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0ZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1rLm9uKCdzb21lZXZlbnQnLCBmKTtcblx0XHRtay5vZmYoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXG5cdGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdhLmIuY0Bzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMub2ZmKG9iaiwgJ2NsaWNrOjp4Jyk7XG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0bWFnaWMub25jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGogPSAwLFxuXHRcdFx0ZjEgPSBldnQgPT4gaSsrLFxuXHRcdFx0ZjIgPSBldnQgPT4gaisrO1xuXG5cdFx0bWFnaWMub25jZShvYmosIHtcblx0XHRcdGZvbzogZjEsXG5cdFx0XHRiYXI6IGYyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBvbmNlIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0bWsub25jZSgnc29tZWV2ZW50JywgZik7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblxuXHRpdCgnb25EZWJvdW5jZSB3b3JrcycsIGRvbmUgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDIwMCk7XG5cblx0XHRtYWdpYy5vbkRlYm91bmNlKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRleHBlY3QoaikudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosIHtcblx0XHRcdGZvbzogZjEsXG5cdFx0XHRiYXI6IGYyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnb25EZWJvdW5jZSB3b3JrcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCBkb25lID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCA4MDApO1xuXG5cdFx0bWsub25EZWJvdW5jZSgnc29tZWV2ZW50JywgZik7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvblwiIGFuZCBcIm9mZlwiJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aGFuZGxlcnMgPSB7XG5cdFx0XHRcdGZvbzogKCkgPT4gaSsrLFxuXHRcdFx0XHRiYXI6ICgpID0+IGkrK1xuXHRcdFx0fTtcblxuXHRcdE1LLm9uKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0TUsudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRNSy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cblx0XHRNSy5vZmYob2JqLCBoYW5kbGVycyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgyKTtcblx0fSk7XG5cblxuXHRpdCgnYWxsb3dzIHRvIGZsaXAgY29udGV4dCBhbmQgdHJpZ2dlck9uSW5pdCAob24pJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdHRoaXNBcmcgPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0TUsub24ob2JqLCAnZm9vJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcblx0XHRcdGkrKztcblx0XHR9LCB0cnVlLCB0aGlzQXJnKTtcblxuXHRcdE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdGhpc0FyZywgdHJ1ZSk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgyKTtcblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXCI6IDMwLFxuXHRcIi4vX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXCI6IDMyLFxuXHRcIi4vX2JpbmRpbmdzL2dldG5vZGVzLmpzXCI6IDEyLFxuXHRcIi4vX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcIjogMzEsXG5cdFwiLi9fYmluZGluZ3Mvc2VsZWN0bm9kZXMuanNcIjogMTMsXG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDYsXG5cdFwiLi9fY29yZS9kZWZzLmpzXCI6IDUsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDQsXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDE1LFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAxNCxcblx0XCIuL19ldmVudHMvYWRkbGlzdGVuZXIuanNcIjogMzMsXG5cdFwiLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcIjogNTAsXG5cdFwiLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXCI6IDM1LFxuXHRcIi4vX2V2ZW50cy90cmlnZ2Vyb25lLmpzXCI6IDgsXG5cdFwiLi9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA1MSxcblx0XCIuL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiA5LFxuXHRcIi4vX3V0aWwvaXMuanNcIjogMTEsXG5cdFwiLi9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1wiOiAxMCxcblx0XCIuL2FycmF5LmpzXCI6IDU4LFxuXHRcIi4vYmluZGVycy5qc1wiOiA1OSxcblx0XCIuL2JpbmRub2RlLmpzXCI6IDMsXG5cdFwiLi9icXVlcnkvX2RhdGEuanNcIjogMjQsXG5cdFwiLi9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcIjogMTgsXG5cdFwiLi9icXVlcnkvX2luaXQuanNcIjogMTcsXG5cdFwiLi9icXVlcnkvYWRkLmpzXCI6IDI3LFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZS5qc1wiOiAyMixcblx0XCIuL2JxdWVyeS9maW5kLmpzXCI6IDI5LFxuXHRcIi4vYnF1ZXJ5L2luZGV4LmpzXCI6IDE2LFxuXHRcIi4vYnF1ZXJ5L2lzLmpzXCI6IDI1LFxuXHRcIi4vYnF1ZXJ5L25vdC5qc1wiOiAyOCxcblx0XCIuL2JxdWVyeS9vZmYuanNcIjogMjYsXG5cdFwiLi9icXVlcnkvb24uanNcIjogMjMsXG5cdFwiLi9icXVlcnkvb25lLmpzXCI6IDIxLFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbC5qc1wiOiAyMCxcblx0XCIuL2NsYXNzLmpzXCI6IDQ3LFxuXHRcIi4vZXh0ZW5kLmpzXCI6IDE5LFxuXHRcIi4vZ2V0LmpzXCI6IDYwLFxuXHRcIi4vaW5kZXguanNcIjogNjEsXG5cdFwiLi9tYWdpYy5qc1wiOiA2NCxcblx0XCIuL21hdHJlc2hrYS9pbmRleC5qc1wiOiA2Mixcblx0XCIuL29iamVjdC9pbmRleC5qc1wiOiA2Myxcblx0XCIuL29uLmpzXCI6IDY1LFxuXHRcIi4vc2V0LmpzXCI6IDcsXG5cdFwiLi91bmJpbmRub2RlLmpzXCI6IDM0XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDU3O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldChvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gb2JqZWN0W2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9nZXQuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG5NYXRyZXNoa2EuYmluZGVycyA9IGJpbmRlcnM7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJlc2hrYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3Moe1xuXHQvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuXHQvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXHRleHRlbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29iamVjdC9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWdpYy5qc1xuICoqLyIsIlxuLy8gL14oKFteQF0rKUApPygoLis/KSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8pPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKCkge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=