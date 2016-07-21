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
	
	var bindNode = __webpack_require__(3);
	
	var unbindNode = __webpack_require__(34);
	
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
	
		beforeEach(function () {
			obj = {};
			node = document.createElement('span');
			node2 = document.createElement('span');
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
				},
				destroy: function () {
					this.ondummyevent = function () {};
				}
			};
		});
	
		it('should bind', function () {
			bindNode(obj, 'x', node, binder);
			obj.x = 'foo';
			expect(node.value).toEqual('foo');
			node.value = 'bar';
			node.ondummyevent();
			expect(obj.x).toEqual('bar');
		});
	
		xit('should bind and call initialize', function () {
			// TODO MERGE WITH PREVIOUS TEST
			var obj = {},
			    input = $.create('input'),
			    bool = false;
	
			MK.bindNode(obj, 'x', input, {
				initialize: function () {
					bool = true;
				}
			});
	
			expect(bool).toEqual(true);
		});
	
		it('should unbind', function () {
			// TODO ADD SESTROY
			bindNode(obj, 'x', node, binder);
			bindNode(obj, 'y', node2, binder);
			unbindNode(obj, ['x', 'y'], [node, node2]);
	
			obj.x = 'foo';
			obj.y = 'bar';
			expect(node.value).toEqual('');
			expect(node2.value).toEqual('');
			node.value = 'baz';
			node2.value = 'qux';
			node.ondummyevent();
			node2.ondummyevent();
			expect(obj.x).toEqual('foo');
			expect(obj.y).toEqual('bar');
		});
	
		xit('should unbind using key-node object', function () {
			var obj = {},
			    input1 = bindInput(obj, 'x'),
			    input2 = bindInput(obj, 'y');
	
			magic.unbindNode(obj, {
				x: input1,
				y: input2
			});
	
			obj.x = 'foo';
			obj.y = 'bar';
			expect(input1.value).toEqual('');
			expect(input2.value).toEqual('');
			input1.value = 'baz';
			input2.value = 'qux';
			input1._onkeyup({});
			input2._onkeyup({});
			expect(obj.x).toEqual('foo');
			expect(obj.y).toEqual('bar');
		});
	
		xit('should bind via Matreshka instance method', function () {
			var mk = new MK(),
			    input = bindInput(mk, 'x');
	
			mk.x = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(mk.x).toEqual('bar');
		});
	
		xit('should unbind via Matreshka instance method', function () {
			var mk = new MK(),
			    input1 = bindInput(mk, 'x'),
			    input2 = bindInput(mk, 'y');
	
			mk.unbindNode('x y', [input1, input2]);
	
			mk.x = 'foo';
			mk.y = 'bar';
			expect(input1.value).toEqual('');
			expect(input2.value).toEqual('');
			input1.value = 'baz';
			input2.value = 'qux';
			input1._onkeyup({});
			input2._onkeyup({});
			expect(mk.x).toEqual('foo');
			expect(mk.y).toEqual('bar');
		});
	
		xit('should bind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');
	
			obj.x.y.z = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y.z).toEqual('bar');
		});
	
		xit('should unbind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');
	
			magic.unbindNode(obj, 'x.y.z', input);
	
			obj.x.y.z = 'foo';
			expect(input.value).toEqual('');
			input.value = 'bar';
			input._onkeyup({});
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
	
	// TODO Debounced!
	module.exports = bindNode;
	function bindNode(object, key, node) {
		var binder = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
		var evt = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
		checkObjectType(object, 'bindNode');
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
		var optional = evt.optional;
	
	
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
			nofn.each(key, function (keyObjValue, keyObjKey) {
				return bindNode(object, keyObjKey, keyObjValue, node, binder);
			});
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
	
		if ((!evt || evt.deep !== false) && ~key.indexOf('.')) {
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
	
		for (var _target3 = $nodes, _index3 = 0, node, _l7 = _target3.length; node = _target3[_index3], _index3 < _l7; _index3++) {
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
			nofn.each(key, function (keyObjValue, keyObjKey) {
				return unbindNode(object, keyObjKey, keyObjValue, node);
			});
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
	
		for (var _target4 = $nodes, _index4 = 0, nodesItem, _l4 = _target4.length; nodesItem = _target4[_index4], _index4 < _l4; _index4++) {
			for (var _target3 = bindings, _index3 = 0, binding, _l3 = _target3.length; binding = _target3[_index3], _index3 < _l3; _index3++) {
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
		"./object.js": 63,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTk5ZjMwMmQyZjU5ZDc3Y2YyYWEiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL21ha2VvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRyZXNoa2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFnaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QkFGRTtFQUhZLEU7Ozs7Ozs7O2tCQ0hBLEU7Ozs7Ozs7O2tCQ0FBLEU7Ozs7Ozs7Ozs7a0JDR1M7QUFBVCxVQUFTLEVBQVQsR0FBYyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNTk5ZjMwMmQyZjU5ZDc3Y2YyYWFcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiAzNixcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiAzNyxcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiAzOCxcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogNDAsXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDQxLFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNDIsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNDMsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNDQsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNDUsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDQ2LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogNDgsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogNDksXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDUzLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNTQsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDU1LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNTZcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJ3NyYy91bmJpbmRub2RlJztcblxuLyppbXBvcnQgbWFnaWMgZnJvbSAnbWF0cmVzaGthLW1hZ2ljJztcbmltcG9ydCBNSyBmcm9tICdtYXRyZXNoa2EnO1xuaW1wb3J0ICQgZnJvbSAnYnF1ZXJ5JztcbmxldCBxID0gKHMsIGMpID0+ICQocywgYylbMF0gfHwgbnVsbDtcblxubGV0IGJpbmRJbnB1dCA9IChvYmosIGtleSwgZXZ0KSA9PiB7XG5cdGxldCBpbnB1dCA9ICQuY3JlYXRlKCdpbnB1dCcpLFxuXHRcdGJpbmRlciA9IHtcblx0XHRcdG9uKGNiYykge1xuXHRcdFx0XHR0aGlzLl9vbmtleXVwID0gY2JjO1xuXHRcdFx0fSxcblx0XHRcdGdldFZhbHVlKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXRWYWx1ZSh2KSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2O1xuXHRcdFx0fVxuXHRcdH07XG5cblx0aWYob2JqIGluc3RhbmNlb2YgTUspIHtcblx0XHRvYmouYmluZE5vZGUoa2V5LCBpbnB1dCwgYmluZGVyLCBldnQpO1xuXHR9IGVsc2Uge1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwga2V5LCBpbnB1dCwgYmluZGVyLCBldnQpO1xuXHR9XG5cblxuXHRyZXR1cm4gaW5wdXQ7XG59OyovXG5cbmRlc2NyaWJlKCdCaW5kaW5ncycsICgpID0+IHtcblx0bGV0IG9iajtcblx0bGV0IG5vZGU7XG5cdGxldCBub2RlMjtcblx0bGV0IGJpbmRlcjtcblx0bGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRub2RlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRiaW5kZXIgPSAge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMub25kdW1teWV2ZW50ID0gY2JjO1xuXHRcdFx0fSxcblx0XHRcdGdldFZhbHVlKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXRWYWx1ZSh2KSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2O1xuXHRcdFx0fSxcblx0XHRcdGluaXRpYWxpemUobykge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gJyc7XG5cdFx0XHR9LFxuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0dGhpcy5vbmR1bW15ZXZlbnQgPSAoKSA9PiB7fTtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQnLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXInO1xuXHRcdG5vZGUub25kdW1teWV2ZW50KCk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0eGl0KCdzaG91bGQgYmluZCBhbmQgY2FsbCBpbml0aWFsaXplJywgKCkgPT4ge1xuXHRcdC8vIFRPRE8gTUVSR0UgV0lUSCBQUkVWSU9VUyBURVNUXG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSAkLmNyZWF0ZSgnaW5wdXQnKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdE1LLmJpbmROb2RlKG9iaiwgJ3gnLCBpbnB1dCwge1xuXHRcdFx0aW5pdGlhbGl6ZSgpIHtcblx0XHRcdFx0Ym9vbCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdGV4cGVjdChib29sKS50b0VxdWFsKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCdzaG91bGQgdW5iaW5kJywgKCkgPT4ge1xuXHRcdC8vIFRPRE8gQUREIFNFU1RST1lcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyKTtcblx0XHRiaW5kTm9kZShvYmosICd5Jywgbm9kZTIsIGJpbmRlcik7XG5cdFx0dW5iaW5kTm9kZShvYmosIFsneCcsICd5J10sIFtub2RlLCBub2RlMl0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRvYmoueSA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcblx0XHRleHBlY3Qobm9kZTIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmF6Jztcblx0XHRub2RlMi52YWx1ZSA9ICdxdXgnO1xuXHRcdG5vZGUub25kdW1teWV2ZW50KCk7XG5cdFx0bm9kZTIub25kdW1teWV2ZW50KCk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRleHBlY3Qob2JqLnkpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQxID0gYmluZElucHV0KG9iaiwgJ3gnKSxcblx0XHRcdGlucHV0MiA9IGJpbmRJbnB1dChvYmosICd5Jyk7XG5cblx0XHRtYWdpYy51bmJpbmROb2RlKG9iaiwge1xuXHRcdFx0eDogaW5wdXQxLFxuXHRcdFx0eTogaW5wdXQyXG5cdFx0fSk7XG5cblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdG9iai55ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0MS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0ZXhwZWN0KGlucHV0Mi52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0aW5wdXQxLnZhbHVlID0gJ2Jheic7XG5cdFx0aW5wdXQyLnZhbHVlID0gJ3F1eCc7XG5cdFx0aW5wdXQxLl9vbmtleXVwKHt9KTtcblx0XHRpbnB1dDIuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG9iai55KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCBiaW5kIHZpYSBNYXRyZXNoa2EgaW5zdGFuY2UgbWV0aG9kJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG1rLCAneCcpO1xuXG5cdFx0bWsueCA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG1rLngpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCB2aWEgTWF0cmVzaGthIGluc3RhbmNlIG1ldGhvZCcsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpbnB1dDEgPSBiaW5kSW5wdXQobWssICd4JyksXG5cdFx0XHRpbnB1dDIgPSBiaW5kSW5wdXQobWssICd5Jyk7XG5cblx0XHRtay51bmJpbmROb2RlKCd4IHknLCBbaW5wdXQxLCBpbnB1dDJdKTtcblxuXHRcdG1rLnggPSAnZm9vJztcblx0XHRtay55ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0MS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0ZXhwZWN0KGlucHV0Mi52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0aW5wdXQxLnZhbHVlID0gJ2Jheic7XG5cdFx0aW5wdXQyLnZhbHVlID0gJ3F1eCc7XG5cdFx0aW5wdXQxLl9vbmtleXVwKHt9KTtcblx0XHRpbnB1dDIuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChtay54KS50b0VxdWFsKCdmb28nKTtcblx0XHRleHBlY3QobWsueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCdzaG91bGQgYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKTtcblxuXHRcdG9iai54LnkueiA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCdzaG91bGQgdW5iaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0eDoge1xuXHRcdFx0XHRcdHk6IHt9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4LnkueicpO1xuXG5cdFx0bWFnaWMudW5iaW5kTm9kZShvYmosICd4LnkueicsIGlucHV0KTtcblxuXHRcdG9iai54LnkueiA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnZm9vJyk7XG5cdH0pO1xuXG5cdHhpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKTtcblxuXHRcdG9iai54ID0ge1xuXHRcdFx0eToge1xuXHRcdFx0XHR6OiAnZm9vJ1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0eGl0KCdzaG91bGQgcmVtb3ZlIGJpbmRpbmcgaWYgZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKSxcblx0XHRcdHggPSBvYmoueDtcblxuXHRcdG9iai54ID0ge1xuXHRcdFx0eToge1xuXHRcdFx0XHR6OiAnZm9vJ1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3QoeC55LnopLm5vdC50b0VxdWFsKCdiYXInKTtcblx0XHRleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcblxuXHRcdHgueS56ID0gJ2Jheic7XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3VzZXMgY3VzdG9tIHNlbGVjdG9ycyBvbiBjdXJyZW50IHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0gTUsudG8oe3g6IHt5OiAnZm9vJ319KSxcblx0XHQgXHRkaXYgPSAkLmNyZWF0ZSgnZGl2JyksXG5cdFx0XHRpbnB1dCA9IGRpdi5hcHBlbmRDaGlsZCgkLmNyZWF0ZSgnaW5wdXQnKSk7XG5cblx0XHRvYmouYmluZE5vZGUoJ3NhbmRib3gnLCBkaXYpO1xuXHRcdG9iai5iaW5kTm9kZSgneC55JywgJzpzYW5kYm94IGlucHV0Jywge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMuX29ua2V5dXAgPSBjYmM7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Rocm93cyBlcnJvciB3aGVuIG5vZGUgaXNuXFwndCB0aGVyZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRlcnJvciA9IGZhbHNlO1xuXG5cdFx0dHJ5IHtcblx0XHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdGVycm9yID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRleHBlY3QoZXJyb3IpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0eGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fTtcblxuXHRcdG1hZ2ljLmJpbmRPcHRpb25hbE5vZGUob2JqLCAneCcpO1xuXG5cdFx0ZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0eGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LO1xuXG5cdFx0bWsuYmluZE9wdGlvbmFsTm9kZSgneCcsIG51bGwpO1xuXG5cdFx0ZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0eGl0KCdyZXR1cm5zIGJvdW5kIG5vZGVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gnKTtcblxuXG5cdFx0ZXhwZWN0KGlucHV0KS50b0VxdWFsKG1hZ2ljLmJvdW5kKG9iaiwgJ3gnKSk7XG5cdFx0ZXhwZWN0KGlucHV0KS50b0VxdWFsKG1hZ2ljLiRib3VuZChvYmosICd4JylbMF0pO1xuXHR9KTtcblxuXG5cdHhpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c3Bhbj48L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YCk7XG5cblx0XHRleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdChvYmosICdzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2VsZWN0cyBub2RlcyB3aXRoIGN1c3RvbSBzZWxlY3RvcicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKS50YWdOYW1lKTtcblx0XHRleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdEFsbChvYmosICc6c2FuZGJveCBzcGFuJylbMF0udGFnTmFtZSk7XG5cdH0pO1xuXG5cdHhpdCgnY2FuY2VscyBkZWVwIGJpbmRpbmcgdmlhIGRlZXA6IGZhbHNlJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ2EuYicsIHtcblx0XHRcdFx0ZGVlcDogZmFsc2Vcblx0XHRcdH0pO1xuXG5cdFx0b2JqWydhLmInXSA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9ialsnYS5iJ10pLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnYWxsb3dzIHRvIGRlYm91bmNlIGhhbmRsZXInLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jywge1xuXHRcdFx0XHRkZWJvdW5jZTogdHJ1ZVxuXHRcdFx0fSk7XG5cblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH0pO1xuXG5cdHhpdCgnYWxsb3dzIHRvIGJpbmQgc2FuZGJveCB2aWEgYmluZFNhbmRib3gnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0ZGl2ID0gJC5jcmVhdGUoJ2RpdicpO1xuXG5cdFx0TUsuYmluZFNhbmRib3gob2JqLCBkaXYpO1xuXG5cdFx0ZXhwZWN0KE1LLmJvdW5kKG9iaiwgJ3NhbmRib3gnKSkudG9FcXVhbChkaXYpO1xuXHR9KTtcblxuXG5cdHhpdCgnYmluZFNhbmRib3ggdGhyb3dzIGFuIGVycm9yIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdHRyeSB7XG5cdFx0XHRNSy5iaW5kU2FuZGJveChvYmosIG51bGwpO1xuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0Ym9vbCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmVUcnV0aHkoKTtcblxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1xuICoqLyIsIi8vIFRPRE8gRGVib3VuY2VkIVxuaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgTWF0cmVzaGthRXJyb3IgZnJvbSAnLi9fdXRpbC9tYXRyZXNoa2FlcnJvcic7XG5pbXBvcnQgYmluZFNpbmdsZU5vZGUgZnJvbSAnLi9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIgPSB7fSwgZXZ0ID0ge30pIHtcbiAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnYmluZE5vZGUnKTtcblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHsgb3B0aW9uYWwgfSA9IGV2dDtcblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtleVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiBiaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGJpbmRlciwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkRXZlbnQgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgaXRlbUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjb21tb25FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5lYWNoKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIGlmICghJG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpub2RlX21pc3NpbmcnLCB7IGtleSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICBvYmplY3QuJG5vZGVzW2tleV0gPSBvYmplY3QuJG5vZGVzW2tleV0ubGVuZ3RoXG4gICAgICAgICAgICA/IG9iamVjdC4kbm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG4gICAgICAgIG9iamVjdC5ub2Rlc1trZXldID0gb2JqZWN0LiRub2Rlc1trZXldWzBdO1xuICAgIH1cblxuXG5cbiAgICBpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZ0LFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cblxuICAgIC8qXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgJG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGksIGJpbmRlciwgZXZ0LCBzcGVjaWFsKTtcbiAgICB9XG5cbiAgICBpZiAoIWV2dC5zaWxlbnQpIHtcbiAgICAgICAgX2V2dCA9IHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgJG5vZGVzOiAkbm9kZXMsXG4gICAgICAgICAgICBub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgIF9ldnRbaV0gPSBldnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kJywgX2V2dCk7XG4gICAgfSovXG5cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9pbml0bWsnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3V0aWwvY29tbW9uJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwLCBpbml0TUssIHV0aWwpIHtcblxuXHR2YXIgYmluZE5vZGUgPSBjb3JlLmJpbmROb2RlID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZ0LCBvcHRpb25hbCkge1xuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKlxuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHRpZihrZXkgPT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRyZXR1cm4gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQsIG9wdGlvbmFsKTtcblx0XHR9XG5cblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLFxuXHRcdFx0JG5vZGVzLFxuXHRcdFx0a2V5cyxcblx0XHRcdGksXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0cGF0aCxcblx0XHRcdGxpc3RlbktleSxcblx0XHRcdGNoYW5nZUhhbmRsZXIsXG5cdFx0XHRfZXZ0O1xuXG5cdFx0Lypcblx0XHQgKiB0aGlzLmJpbmROb2RlKFtbJ2tleScsICQoKSwge29uOidldnQnfV0sIFt7a2V5OiAkKCksIHtvbjogJ2V2dCd9fV1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHQgKlxuXHRcdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRiaW5kTm9kZShvYmplY3QsIGtleVtpXVswXSwga2V5W2ldWzFdLCBrZXlbaV1bMl0gfHwgZXZ0LCBub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleTEga2V5MicsIG5vZGUsIGJpbmRlciwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiB+a2V5LmluZGV4T2YoJyAnKSkge1xuXHRcdFx0a2V5cyA9IGtleS5zcGxpdCgvXFxzKy8pO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5c1tpXSwgbm9kZSwgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBrZXkpIHtcblx0XHRcdFx0aWYgKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwgaSwga2V5W2ldLCBub2RlLCBiaW5kZXIsIGV2dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleScsIFsgbm9kZSwgYmluZGVyIF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0Ly8gbm9kZSAhPT0gd2luIGlzIHRoZSBtb3N0IHVuY29tbW9uIGJ1Z2ZpeCBldmVyLiBEb24ndCBhc2sgd2hhdCBkb2VzIGl0IG1lYW4uXG5cdFx0Ly8gVGhpcyBpcyBhYm91dCBpZnJhbWVzLCBDT1JTIGFuZCBkZXByZWNhdGVkIERPTSBBUEkuXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5sZW5ndGggPT0gMiAmJiBub2RlICE9PSB3aW4gJiYgIW5vZGVbMV0ubm9kZU5hbWVcblx0XHRcdFx0JiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcblx0XHRcdHJldHVybiBiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZVswXSwgbm9kZVsxXSwgYmluZGVyLCBvcHRpb25hbCk7XG5cdFx0fVxuXG5cdFx0JG5vZGVzID0gY29yZS5fZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuXHRcdGlmICghJG5vZGVzLmxlbmd0aCkge1xuXHRcdFx0aWYgKG9wdGlvbmFsKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignQmluZGluZyBlcnJvcjogbm9kZSBpcyBtaXNzaW5nIGZvciBcIicgKyBrZXkgKyAnXCIuJyArICh0eXBlb2Ygbm9kZSA9PSAnc3RyaW5nJyA/ICcgVGhlIHNlbGVjdG9yIGlzIFwiJyArIG5vZGUgKyAnXCInIDogJycpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuXHRcdFx0cGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRcdFx0Y2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRldnQgPSBldnQgJiYgZXZ0Lm9yaWdpbmFsRXZlbnQ7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2dCAmJiBldnQudmFsdWUsXG5cdFx0XHRcdFx0aTtcblx0XHRcdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBvYmplY3Q7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXRbcGF0aFtpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmluZE5vZGUodGFyZ2V0LCBwYXRoW3BhdGgubGVuZ3RoIC0gMV0sICRub2RlcywgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblxuXG5cdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnVuYmluZE5vZGUoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5fZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGguc2xpY2UoMCwgcGF0aC5sZW5ndGggLSAyKS5qb2luKCcuJyksXG5cdFx0XHRcdCdjaGFuZ2U6JyArIHBhdGhbcGF0aC5sZW5ndGggLSAyXSwgY2hhbmdlSGFuZGxlcik7XG5cblx0XHRcdGNoYW5nZUhhbmRsZXIoKTtcblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHRldnQgPSBldnQgfHwge307XG5cblx0XHRzcGVjaWFsID0gY29yZS5fZGVmaW5lU3BlY2lhbChvYmplY3QsIGtleSk7XG5cblx0XHRzcGVjaWFsLiRub2RlcyA9IHNwZWNpYWwuJG5vZGVzLmxlbmd0aCA/IHNwZWNpYWwuJG5vZGVzLmFkZCgkbm9kZXMpIDogJG5vZGVzO1xuXG5cdFx0aWYgKG9iamVjdC5pc01LKSB7XG5cdFx0XHRvYmplY3QuJG5vZGVzW2tleV0gPSBzcGVjaWFsLiRub2Rlcztcblx0XHRcdG9iamVjdC5ub2Rlc1trZXldID0gc3BlY2lhbC4kbm9kZXNbMF07XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8ICRub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaSwgYmluZGVyLCBldnQsIHNwZWNpYWwpO1xuXHRcdH1cblxuXHRcdGlmICghZXZ0LnNpbGVudCkge1xuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0XHRub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuXHRcdFx0Y29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmluZCcsIF9ldnQpO1xuXHRcdH1cblxuXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHQkbm9kZXM6ICRub2Rlcyxcblx0XHRcdFx0bm9kZTogbm9kZVxuXHRcdFx0fSxcblx0XHRcdG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2Ygc3BlY2lhbC52YWx1ZSA9PSAndW5kZWZpbmVkJyxcblx0XHRcdF9iaW5kZXIsXG5cdFx0XHRfZXZ0LFxuXHRcdFx0Zm91bmRCaW5kZXIsXG5cdFx0XHRfb3B0aW9ucyxcblx0XHRcdGksXG5cdFx0XHRkb21FdnQsXG5cdFx0XHRta0hhbmRsZXIsXG5cdFx0XHR2YWw7XG5cblxuXG5cblx0XHRpZiAoYmluZGVyID09PSBudWxsKSB7XG5cdFx0XHRfYmluZGVyID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRcdGlmIChiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3IgKGkgaW4gYmluZGVyKSB7XG5cdFx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfYmluZGVyID0gYmluZGVyIHx8IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfYmluZGVyLmluaXRpYWxpemUpIHtcblx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHR2YWx1ZTogc3BlY2lhbC52YWx1ZVxuXHRcdFx0fTtcblx0XHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdH1cblx0XHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblxuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IGV2dFtpXTtcblx0XHRcdH1cblxuXHRcdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsLCBfZXZ0KTtcblx0XHR9XG5cblxuXHRcdGlmIChfYmluZGVyLnNldFZhbHVlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdFx0Ly8gZGlydHkgaGFjayBmb3IgdGhpcyBvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0XHRcdFx0XHRfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHRcdFx0XHRcdGk7XG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG5cdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRcdG1rSGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHRcdH1cblxuXHRcdFx0Y29yZS5fZmFzdEFkZExpc3RlbmVyKG9iamVjdCwgJ19ydW5iaW5kaW5nczonICsga2V5LCBta0hhbmRsZXIsIG51bGwsIHtub2RlOiBub2RlfSk7XG5cblx0XHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0XHR9XG5cblxuXG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiBfYmluZGVyLm9uKSB7XG5cdFx0XHRkb21FdnQgPSB7XG5cdFx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRcdG9uOiBfYmluZGVyLm9uLFxuXHRcdFx0XHRpbnN0YW5jZTogb2JqZWN0LFxuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0bWtIYW5kbGVyOiBta0hhbmRsZXIsXG5cdFx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHRcdHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBvbGR2YWx1ZSxcblx0XHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR3aGljaDogZXZ0LndoaWNoLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHRcdC8vIGhhc093blByb3BlcnR5IGlzIG5vdCByZXF1aXJlZCB0aGVyZVxuXHRcdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRfb3B0aW9uc1tqXSA9IG9wdGlvbnNbal07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSBvbGR2YWx1ZSkge1xuXHRcdFx0XHRcdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkTm9kZTogbm9kZSxcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5kb21FdmVudHMuYWRkKGRvbUV2dCk7XG5cdFx0fVxuXHR9XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9ICovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQ/IG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdFx0XHQvLz9kZXN0cm95ZXJzOiBNYXAsXG5cdFx0XHRcdFx0YmluZGluZ3M6IFt7XG5cdFx0XHRcdFx0XHRub2RlLFxuXHRcdFx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRcdFx0bm9kZUhhbmRsZXIsXG5cdFx0XHRcdFx0XHRvYmplY3RIYW5kbGVyXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSovXG5cdFx0XHR9LFxuXHRcdFx0aWQ6IGBtayR7TWF0aC5yYW5kb20oKX1gXG5cdFx0fTtcblxuXHRcdGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcblx0fVxuXG5cdHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG5cdGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuXHR9XG5cblx0Ly8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG5cdC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcblx0Ly8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0cmV0dXJuIG9iamVjdC5faW5pdE1LID8gb2JqZWN0Ll9pbml0TUsoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcblx0Z2V0KG9iaikge1xuXHRcdHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcblx0fSxcblx0c2V0KG9iaiwgZGF0YSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuXHRcdFx0dmFsdWU6IGRhdGEsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0XHR9KTtcblx0fSxcblx0aGFzKG9iaikge1xuXHRcdHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRpZiAoIWRlZi5wcm9wc1trZXldKSB7XG5cdFx0Y29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRiaW5kaW5nczogbnVsbFxuXHRcdH07XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcERlZi5nZXR0ZXIgPyBwcm9wRGVmLmdldHRlci5jYWxsKG9iamVjdCkgOiBwcm9wRGVmLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldCh2KSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuXHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZGVmLnByb3BzW2tleV07XG59XG5cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRjb3JlLl9kZWZpbmVTcGVjaWFsID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vQWNjZXNzb3JzKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhbWFwLmhhcyhvYmplY3QpKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XTtcblxuXHRcdGlmICghc3BlY2lhbFByb3BzKSB7XG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XSA9IHtcblx0XHRcdFx0JG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0bWVkaWF0b3I6IG51bGxcblx0XHRcdH07XG5cblx0XHRcdGlmICghbm9BY2Nlc3NvcnMgJiYga2V5ICE9ICdzYW5kYm94Jykge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNwZWNpYWxQcm9wcy5nZXR0ZXIgPyBzcGVjaWFsUHJvcHMuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHNwZWNpYWxQcm9wcy52YWx1ZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24odikge1xuXHRcdFx0XHRcdFx0c3BlY2lhbFByb3BzLnNldHRlciA/IHNwZWNpYWxQcm9wcy5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogY29yZS5zZXQob2JqZWN0LCBrZXksIHYsIHtcblx0XHRcdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3BlY2lhbFByb3BzO1xuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpcyBmcm9tICcuL191dGlsL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIHNldHMgbmV3IHZhbHVlIGZvciBhIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZXQnKTtcblxuICAgIC8vIGlmIG5vIGtleSBvciBmYWxzeSBrZXkgaXMgZ2l2ZW5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFkZWYpIHtcblx0XHRvYmplY3Rba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IHByb3BzLCBldmVudHMgfSA9IGRlZjtcblx0Y29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuXHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xuXHRcdG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuXHRpZiAoIXByb3BEZWYpIHtcblx0XHRvYmplY3Rba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IHZhbHVlOiBwcmV2aW91c1ZhbHVlLCBtZWRpYXRvciB9ID0gcHJvcERlZjtcblxuICAgIC8vIHBvc3NpYmxlIGZsYWdzXG5cdGNvbnN0IHtcbiAgICAgICAgc2tpcE1lZGlhdG9yLFxuICAgICAgICBmcm9tTWVkaWF0b3IsXG4gICAgICAgIGZvcmNlLFxuICAgICAgICBmb3JjZUhUTUwsXG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgc2lsZW50SFRNTCxcbiAgICAgICAgc2tpcExpbmtzXG4gICAgfSA9IGV2dDtcblxuXHRsZXQgbmV3VmFsdWU7XG5cblx0aWYgKG1lZGlhdG9yICYmICFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkgJiYgIXNraXBNZWRpYXRvciAmJiAhZnJvbU1lZGlhdG9yKSB7XG5cdFx0Ly8gVE9ET1xuXHRcdG5ld1ZhbHVlID0gc3BlY2lhbC5tZWRpYXRvcih2LCBwcmV2VmFsLCBrZXksIG9iamVjdCk7XG5cdH0gZWxzZSB7XG5cdFx0bmV3VmFsdWUgPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0IGlzQ2hhbmdlZCA9ICFpcyhuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cbiAgICAvLyBhZGQgdG8gZXZ0IG9iamVjdCBzb21lIHVzZWZ1bCBwcm9wZXJ0aWVzXG5cdGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuXHRcdHZhbHVlOiBuZXdWYWx1ZSxcblx0XHRzZWxmOiBvYmplY3QsXG5cdFx0cHJldmlvdXNWYWx1ZSxcblx0XHRrZXksXG5cdFx0aXNDaGFuZ2VkXG5cdH0sIGV2dCk7XG5cblx0Y29uc3QgdHJpZ2dlckNoYW5nZSA9IChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFzaWxlbnQ7XG5cbiAgICAvLyB0cmlnZ2VyIGJlZm9yZWNoYW5nZTpLRVkgYW5kIGJlZm9yZWNoYW5nZSBldmVudHNcblx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRjb25zdCBiZWZvcmVjaGFuZ2VTdHIgPSAnYmVmb3JlY2hhbmdlJztcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlRXZ0TmFtZSA9IGAke2JlZm9yZWNoYW5nZVN0cn06JHtrZXl9YDtcblxuXHRcdGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VFdnROYW1lXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcblx0XHR9XG5cblx0XHRpZihldmVudHNbYmVmb3JlY2hhbmdlU3RyXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cblx0fVxuXG5cdHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuXHRpZiAoIXNpbGVudEhUTUwgJiYgKGlzQ2hhbmdlZCB8fCBmb3JjZSB8fCBmb3JjZUhUTUwpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSA9IGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWA7XG5cdFx0aWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICAvLyB0cmlnZ2VyIGNoYW5nZTpLRVkgYW5kIGNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VTdHIgPSAnY2hhbmdlJztcbiAgICAgICAgY29uc3QgY2hhbmdlRXZ0TmFtZSA9IGAke2NoYW5nZVN0cn06JHtrZXl9YDtcblx0XHRpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuXHRcdGlmKGV2ZW50c1tjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG5cdGlmICgoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2tpcExpbmtzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlcHNFdnROYW1lID0gYF9jaGFuZ2U6ZGVwczoke2tleX1gO1xuXHRcdGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cdH1cblxuICAgIC8vIHRyaWdnZXIgZGVsZWdhdGVkIGV2ZW50cyBsb2dpY1xuICAgIGlmKGlzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGlmIChldmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0pIHtcblx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lLCBleHRlbmRlZEV2dCk7XG5cdFx0fVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZShvYmplY3QsIG5hbWUpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IGV2ZW50cyA9IGRlZi5ldmVudHNbbmFtZV07XG5cblx0aWYgKGV2ZW50cykge1xuXHRcdGNvbnN0IGFyZ3MgPSBub2ZuLnNsaWNlKGFyZ3VtZW50cywgMiksXG5cdFx0XHRsID0gZXZlbnRzLmxlbmd0aCxcblx0XHRcdFthMSwgYTIsIGEzXSA9IGFyZ3M7XG5cblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRldjtcblxuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAxOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDI6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDM6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG59XG5cbnRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSB7XG5cdGluZm86IHt9LFxuXHRuYW1lOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy90cmlnZ2Vyb25lLmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4vbWF0cmVzaGthZXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIG1ldGhvZCkge1xuXHRjb25zdCB0eXBlb2ZPYmplY3QgPSBvYmplY3QgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygb2JqZWN0O1xuXG4gICAgaWYodHlwZW9mT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignY29tbW9uOm9iamVjdF90eXBlJywge1xuICAgICAgICAgICAgdHlwZTogdHlwZW9mT2JqZWN0LFxuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1xuICoqLyIsImNvbnN0IGJpbmRpbmdFcnJvclByZWZpeCA9ICdCaW5kaW5nIGVycm9yOic7XG5jb25zdCBlcnJvcnMgPSB7XG5cdCdiaW5kaW5nOm5vZGVfbWlzc2luZyc6ICh7IGtleSwgbm9kZSB9KSA9PiB7XG5cdFx0Y29uc3Qgc2VsZWN0b3JJbmZvID0gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gYCBUaGUgc2VsZWN0b3IgaXMgJHtub2RlfWAgOiAnJztcblx0XHRyZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBub2RlIGlzIG1pc3NpbmcgZm9yICR7a2V5fS4ke3NlbGVjdG9ySW5mb31gXG5cdH0sXG5cdCdiaW5kaW5nOmZhbHN5X2tleSc6ICgpID0+ICdCaW5kaW5nIGVycm9yOiBcImtleVwiIGFyZyBjYW5ub3QgYmUgZmFsc3knLFxuXHQnY29tbW9uOm9iamVjdF90eXBlJzogKHsgdHlwZSwgbWV0aG9kIH0pID0+IHtcblx0XHRyZXR1cm4gYE1ldGhvZCBcIiR7bWV0aG9kfVwiIGRvZXMgbm90IGFjY2VwdCAke3R5cGV9IGFzIHRhcmdldCBvYmplY3RgO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hdHJlc2hrYUVycm9yKGtleSwgZGF0YSkge1xuXHRjb25zdCBnZXRFcnJvciA9IGVycm9yc1trZXldO1xuXHRpZighZ2V0RXJyb3IpIHtcblx0XHR0aHJvdyBFcnJvcihgVW5rbm93biBlcnJvciBcIiR7a2V5fVwiYCk7XG5cdH1cblxuXHRyZXR1cm4gbmV3IEVycm9yKGVycm9yc1trZXldKGRhdGEpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzXG4gKiovIiwiLy8gZGV0ZXJtaW5lcyB3aGV0aGVyIHR3byB2YWx1ZXMgYXJlIHRoZSBzYW1lIHZhbHVlXG5jb25zdCBpc1BvbHlmaWxsID0gKHYxLCB2MikgPT5cbiAgICB2MSA9PT0gMCAmJiB2MiA9PT0gMCA/IDEgLyB2MSA9PT0gMSAvIHYyIDogdjEgIT09IHYxICYmIHYyICE9PSB2MiB8fCB2MSA9PT0gdjI7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5pcyB8fCBpc1BvbHlmaWxsO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvaXMuanNcbiAqKi8iLCJpbXBvcnQgc2VsZWN0Tm9kZXMgZnJvbSAnLi9zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpIHtcblx0bGV0IG5vZGVzO1xuXHRpZih0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgJiYgIS88Ly50ZXN0KHNlbGVjdG9yKSAmJiAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS8udGVzdChzZWxlY3RvcikpIHtcblx0XHRub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpXG5cdH0gZWxzZXtcblx0XHRub2RlcyA9IGRvbS4kKHNlbGVjdG9yKTtcblx0fVxuXHRyZXR1cm4gbm9kZXM7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2dldG5vZGVzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3RvcnMpIHtcblx0XG5cdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdCQgPSBjb3JlLiQsXG5cdFx0cmVzdWx0ID0gJCgpLFxuXHRcdGV4ZWNSZXN1bHQsXG5cdFx0JGJvdW5kLFxuXHRcdG5vZGUsXG5cdFx0c2VsZWN0b3IsXG5cdFx0aSwgaixcblx0XHRyYW5kb20sXG5cdFx0c3ViU2VsZWN0b3IsXG5cdFx0a2V5LFxuXHRcdHNlbGVjdGVkO1xuXG5cdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcgfHwgIW9iamVjdERhdGEpIHJldHVybiByZXN1bHQ7XG5cblx0Ly8gcmVwbGFjaW5nIDpzYW5kYm94IHRvIDpib3VuZChzYW5kYm94KVxuXHRzZWxlY3RvcnMgPSBzZWxlY3RvcnMuc3BsaXQoJywnKTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0c2VsZWN0b3IgPSBzZWxlY3RvcnNbaV07XG5cblx0XHRpZiAoZXhlY1Jlc3VsdCA9IC9cXHMqOmJvdW5kXFwoKFteKF0qKVxcKVxccyooW1xcU1xcc10qKVxccyp8XFxzKjpzYW5kYm94XFxzKihbXFxTXFxzXSopXFxzKi8uZXhlYyhzZWxlY3RvcikpIHtcblx0XHRcdGtleSA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/ICdzYW5kYm94JyA6IGV4ZWNSZXN1bHRbMV07XG5cdFx0XHRzdWJTZWxlY3RvciA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/IGV4ZWNSZXN1bHRbM10gOiBleGVjUmVzdWx0WzJdO1xuXG5cdFx0XHQvLyBnZXR0aW5nIEtFWSBmcm9tIDpib3VuZChLRVkpXG5cdFx0XHQkYm91bmQgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XSAmJiBvYmplY3REYXRhLnNwZWNpYWxba2V5XS4kbm9kZXM7XG5cdFx0XHRpZighJGJvdW5kIHx8ICEkYm91bmQubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgcGFzc2VkIGFmdGVyIDpib3VuZChLRVkpIGlzIG5vdCBlbXB0eSBzdHJpbmdcblx0XHRcdC8vIGZvciBleGFtcGxlIFwiOmJvdW5kKEtFWSkgLm15LXNlbGVjdG9yXCJcblx0XHRcdGlmIChzdWJTZWxlY3Rvcikge1xuXHRcdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgY29udGFpbnMgY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSA+IC5teS1zZWxlY3RvclwiXG5cdFx0XHRcdGlmIChzdWJTZWxlY3Rvci5pbmRleE9mKCc+JykgPT09IDApIHtcblx0XHRcdFx0XHQvLyBzZWxlY3RpbmcgY2hpbGRyZW5cblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgJGJvdW5kLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gJGJvdW5kW2pdO1xuXHRcdFx0XHRcdFx0cmFuZG9tID0gJ20nICsgY29yZS5yYW5kb21TdHJpbmcoKTtcblx0XHRcdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKHJhbmRvbSwgcmFuZG9tKTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbJyArIHJhbmRvbSArICc9XCInICsgcmFuZG9tICsgJ1wiXScgKyBzdWJTZWxlY3Rvcik7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKHV0aWwudG9BcnJheShzZWxlY3RlZCkpO1xuXHRcdFx0XHRcdFx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgZG9lc24ndCBjb250YWluIGNoaWxkcmVuIHNlbGVjdG9yXG5cdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQuZmluZChzdWJTZWxlY3RvcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgaXMgZW1wdHkgc3RyaW5nXG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQoJGJvdW5kKTtcblx0XHRcdH1cblx0XHRcdC8vIGlmIGl0J3MgbmF0aXZlIHNlbGVjdG9yXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQoc2VsZWN0b3IpO1xuXHRcdH1cblx0fVxuXG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0RG9sbGFyIGZyb20gJy4vZGVmYXVsdC1kb2xsYXInO1xuXG5jb25zdCBkb20gPSB7XG5cdCQ6IGRlZmF1bHREb2xsYXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vaW5kZXguanNcbiAqKi8iLCIvKmdsb2JhbCAkKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuXHRjb25zdCBmbiA9IGdsb2JhbERvbGxhci5mbiB8fCBnbG9iYWxEb2xsYXIucHJvdG90eXBlO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRlZE1ldGhvZHMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoIWZuW25lZWRlZE1ldGhvZHNbaV1dKSB7XG5cdFx0XHR1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmICghZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCkge1xuXHRcdGdsb2JhbERvbGxhci5wYXJzZUhUTUwgPSBiUXVlcnkucGFyc2VIVE1MO1xuXHR9XG59IGVsc2Uge1xuXHR1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzZWxlY3RvciwgY29udGV4dCk7XG59XG5cbm5vZm4uYXNzaWduKGJRdWVyeSwge1xuXHRmbjogSW5pdC5wcm90b3R5cGUsXG5cdGV4dGVuZCxcblx0cGFyc2VIVE1MLFxuXHRvbmUsXG5cdGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuXHRvbixcblx0b2ZmLFxuXHRpcyxcblx0YWRkLFxuXHRub3QsXG5cdGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdGxldCByZXN1bHQ7XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHNlbGVjdG9yID09PSB3aW5kb3cpIHtcblx0XHRcdHJlc3VsdCA9IFtzZWxlY3Rvcl07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdHJlc3VsdCA9IGh0bWwybm9kZUxpc3Qoc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGNvbnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCBuZXdDb250ZXh0ID0gKG5ldyBCUXVlcnlJbml0KGNvbnRleHQpKVswXTtcblxuXHRcdFx0XHRcdGlmIChuZXdDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikgeyAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuXHRcdFx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGVuZ3RoID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGg7XG5cblx0aWYgKGxlbmd0aCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChyZXN1bHRbaV0pO1xuXHRcdH1cblx0fVxufVxuXG5CUXVlcnlJbml0LnByb3RvdHlwZSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBCUXVlcnlJbml0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19pbml0LmpzXG4gKiovIiwiLy8gY29udmVydHMgSFRNTCBzdHJpbmcgdG8gTm9kZUxpc3QgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwybm9kZUxpc3QoaHRtbCkge1xuXHQvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG5cdGNvbnN0IHdyYXBNYXAgPSB7XG5cdFx0b3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcblx0XHRsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuXHRcdHRoZWFkOiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcblx0XHR0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0dGQ6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuXHRcdGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J10sXG5cdFx0YXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcblx0XHRfOiBbMCwgJycsICcnXVxuXHR9O1xuXG5cdGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0aTtcblxuXHRodG1sID0gaHRtbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG5cblx0d3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXHR3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuXHR3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXHRjb25zdCBleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpLFxuXHRcdHdyYXBwZXIgPSBleCAmJiB3cmFwTWFwW2V4WzFdXSB8fCB3cmFwTWFwLl87XG5cblx0bm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cblx0aSA9IHdyYXBwZXJbMF07XG5cblx0d2hpbGUgKGktLSkge1xuXHRcdG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuXHR9XG5cblx0cmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuXHR9XG5cblx0Y29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG5cdGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKGNvbnN0IG5leHRLZXkgaW4gc291cmNlKSB7XG5cdFx0XHRcdGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcblx0XHRcdFx0XHRvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXh0ZW5kLmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5pbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcGFyc2VzIGdpdmVuIEhUTUwgYW5kIHJldHVybnMgYlF1ZXJ5IChCUXVlcnlJbml0KSBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcblx0cmV0dXJuIG5ldyBJbml0KGh0bWwybm9kZUxpc3QoaHRtbCkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyByZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIG1hdGNoZWQgc2V0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbmUocywgY29udGV4dCkge1xuXHRyZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZSh0YWdOYW1lLCBwcm9wcykge1xuXHRpZiAodHlwZW9mIHRhZ05hbWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cHJvcHMgPSB0YWdOYW1lO1xuXHRcdHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuXHR9XG5cblx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG5cdGlmIChwcm9wcykge1xuXHRcdG5vZm4uZm9yT3duKHByb3BzLCAodmFsdWUsIGtleSkgPT4ge1xuXHRcdFx0aWYgKGtleSA9PT0gJ2F0dHJpYnV0ZXMnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaCh2YWx1ZSwgKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChlbFtrZXldICYmIHR5cGVvZiBlbFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdG5vZm4uYXNzaWduKGVsW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5ICE9PSAndGFnTmFtZScpIHtcblx0XHRcdFx0ZWxba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGVsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuaW1wb3J0IGlzIGZyb20gJy4vaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIGEgc2VsZWN0b3IgaXMgZ2l2ZW5cbmZ1bmN0aW9uIGRlbGVnYXRlSGFuZGxlcihldnQsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGNvbnN0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoJzAuJywgJ3gnKSxcblx0XHRzY29wZVNlbGVjdG9yID0gYFske3JhbmRvbUlEfT1cIiR7cmFuZG9tSUR9XCJdIGAsXG5cdFx0c3BsaXR0ZWRTZWxlY3RvciA9IHNlbGVjdG9yLnNwbGl0KCcsJyk7XG5cblx0bGV0IG1hdGNoaW5nID0gJyc7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHRlZFNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcblx0XHRtYXRjaGluZyArPSBgJHtpID09PSAwID8gJycgOiAnLCd9JHtzY29wZVNlbGVjdG9yfSR7c2VsfSwke3Njb3BlU2VsZWN0b3J9JHtzZWx9ICpgO1xuXHR9XG5cblxuXHR0aGlzLnNldEF0dHJpYnV0ZShyYW5kb21JRCwgcmFuZG9tSUQpO1xuXG5cdGlmIChpcy5jYWxsKFtldnQudGFyZ2V0XSwgbWF0Y2hpbmcpKSB7XG5cdFx0aGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG5cdH1cblxuXHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGxldCBkZWxlZ2F0ZTtcblxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdGlmIChzZWxlY3Rvcikge1xuXHRcdGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuXHRcdFx0ZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG5cdFx0fTtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXgsXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gfHwgW107XG5cblx0XHRcdGxldCBleGlzdCA9IGZhbHNlO1xuXG5cblx0XHRcdGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXG5cdFx0XHRcdGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdGV4aXN0ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWV4aXN0KSB7XG5cdFx0XHRcdGV2ZW50cy5wdXNoKHtcblx0XHRcdFx0XHRkZWxlZ2F0ZSxcblx0XHRcdFx0XHRoYW5kbGVyLFxuXHRcdFx0XHRcdG5hbWVzcGFjZSxcblx0XHRcdFx0XHRzZWxlY3RvclxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZGVsZWdhdGUgfHwgaGFuZGxlciwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uLmpzXG4gKiovIiwiLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIGFzIGFuIG9iamVjdCBtb2R1bGVzIGJlY2F1c2Ugd2UgdXNlXG4vLyBzaW1wbGlmaWVkIGVzIG1vZHVsZXMgdGhlcmUgYW5kIGNhbm5vdCBpbXBvcnQgYW5kIHNoYXJlIGEgbnVtYmVyXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5vZGVJbmRleDogMCxcblx0YWxsRXZlbnRzOiB7fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9fZGF0YS5qc1xuICoqLyIsIi8vIGNoZWNrIHRoZSBmaXJzdCBlbGVtZW50IGZyb20gZ2l2ZW4gc2V0IGFnYWluc3QgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXMocykge1xuXHRjb25zdCBub2RlID0gdGhpc1swXTtcblx0cmV0dXJuIG5vZGVcblx0XHQ/IChub2RlLm1hdGNoZXNcblx0XHRcdHx8IG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1vek1hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHMpIDogZmFsc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaXMuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gcmVtb3ZlcyBldmVudCBoYW5kbGVyIGZyb20gYSBzZXQgb2YgZWxlbWVudHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9mZihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRzZWxlY3RvciA9IG51bGw7XG5cdH1cblxuXHRuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMvKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IG5hbWUgPSBuYW1lc1tpXS5zcGxpdCgvXFwuKC4rKS8pO1xuXHRcdGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG5cdFx0bmFtZSA9IG5hbWVbMF07XG5cblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IG5vZGUgPSB0aGlzW2pdLFxuXHRcdFx0XHRldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cblx0XHRcdGlmIChldmVudHMpIHtcblx0XHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5kZWxlZ2F0ZSlcblx0XHRcdFx0XHRcdCYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gZXZlbnQubmFtZXNwYWNlKVxuXHRcdFx0XHRcdFx0JiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnQuZGVsZWdhdGUgfHwgZXZlbnQuaGFuZGxlcik7XG5cdFx0XHRcdFx0XHRldmVudHMuc3BsaWNlKGstLSwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIW5hbWVzcGFjZSAmJiAhc2VsZWN0b3IpIHtcblx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG5cdGNvbnN0IGlkTWFwID0ge307XG5cblx0bGV0IHJlc3VsdCxcblx0XHRub2RlSUQsXG5cdFx0bm9kZSxcblx0XHRpO1xuXG5cdHNlbGVjdG9yID0gbmV3IEluaXQoc2VsZWN0b3IpO1xuXG5cdGlmICh0aGlzLmxlbmd0aCkge1xuXHRcdHJlc3VsdCA9IG5ldyBJbml0KHRoaXMpO1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSByZXN1bHRbaV07XG5cdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuXHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRub2RlID0gc2VsZWN0b3JbaV07XG5cdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuXHRcdFx0aWYgKCFpZE1hcFtub2RlSURdKSB7XG5cdFx0XHRcdGlkTWFwW25vZGVJRF0gPSAxO1xuXHRcdFx0XHRyZXN1bHQucHVzaChub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcblx0Y29uc3QgcmVzdWx0ID0gbmV3IEluaXQoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoIW5ldyBJbml0KHRoaXNbaV0pLmlzKHNlbGVjdG9yKSkge1xuXHRcdFx0cmVzdWx0LnB1c2godGhpc1tpXSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9ub3QuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZ2V0IHRoZSBkZXNjZW5kYW50cyBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIG1hdGNoZWQgZWxlbWVudHMsXG4vLyBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG5cdGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdG5vZm4uZm9yRWFjaCh0aGlzLCBlbCA9PiB7XG5cdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cdH0pO1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvZmluZC5qc1xuICoqLyIsImltcG9ydCBsb29rRm9yQmluZGVyIGZyb20gJy4vbG9va2ZvcmJpbmRlcic7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi4vX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJztcblxuZnVuY3Rpb24gcnVuTWF0cmVzaGthSGFuZGxlcihub2RlLCBwcm9wRGVmLCBiaW5kZXIsIG9wdGlvbnMsIGV2dCkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgY29uc3QgeyBvbkNoYW5nZVZhbHVlLCBjaGFuZ2VkTm9kZSwgYmluZGVyOiBldnRCaW5kZXIgfSA9IGV2dDtcbiAgICBjb25zdCB7IHNldFZhbHVlIH0gPSBiaW5kZXI7XG5cdC8vIGRpcnR5IGhhY2sgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG5cdGNvbnN0IGRpcnR5SGFja1ZhbHVlID0gb25DaGFuZ2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlICsgJycgOiB2YWx1ZTtcblxuICAgIGlmIChjaGFuZ2VkTm9kZSA9PT0gbm9kZSAmJiBvbkNoYW5nZVZhbHVlID09PSBkaXJ0eUhhY2tWYWx1ZSAmJiBldnRCaW5kZXIgPT09IGJpbmRlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0VmFsdWUuY2FsbChub2RlLCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyB2YWx1ZSB9LCBvcHRpb25zKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcblx0YmluZGVyOiBnaXZlbkJpbmRlcixcblx0a2V5LFxuXHQkbm9kZXMsXG5cdG5vZGUsXG5cdGV2dCxcblx0cHJvcERlZlxufSkge1xuXHRjb25zdCB7IGFzc2lnbkRlZmF1bHRWYWx1ZSwgZGVib3VuY2UgfSA9IGV2dDtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdHNlbGY6IG9iamVjdCxcblx0XHRrZXksXG4gICAgICAgIHZhbHVlLFxuXHRcdCRub2Rlcyxcblx0XHRub2RlXG5cdH07XG4gICAgY29uc3QgYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyB8fCBbXTtcblx0bGV0IGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnO1xuXHRsZXQgYmluZGVyO1xuXHRsZXQgb2JqZWN0SGFuZGxlcjtcblxuXHRpZiAoZ2l2ZW5CaW5kZXIgIT09IG51bGwpIHtcblx0XHRjb25zdCBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cblx0XHRpZiAoZm91bmRCaW5kZXIpIHtcblx0XHRcdGlmIChnaXZlbkJpbmRlcikge1xuXHRcdFx0XHRub2ZuLmFzc2lnbihmb3VuZEJpbmRlciwgZ2l2ZW5CaW5kZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRiaW5kZXIgPSBmb3VuZEJpbmRlcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmluZGVyID0gZ2l2ZW5CaW5kZXI7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgeyBnZXRWYWx1ZSwgc2V0VmFsdWUsIG9uLCBpbml0aWFsaXplIH0gPSBiaW5kZXI7XG5cblx0aWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuXHRpZiAoZ2V0VmFsdWUgJiYgKGlzVW5kZWZpbmVkICYmIGFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBvcHRpb25zKTtcblx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG5cblx0XHRzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBub2ZuLmFzc2lnbih7IGZyb21Ob2RlOiB0cnVlIH0sIGV2dCkpO1xuXHR9XG5cblx0aWYgKHNldFZhbHVlKSB7XG5cdFx0b2JqZWN0SGFuZGxlciA9ICgpID0+IHJ1bk1hdHJlc2hrYUhhbmRsZXIobm9kZSwgcHJvcERlZiwgYmluZGVyLCBvcHRpb25zLCBldnQpO1xuXG5cdFx0aWYoZGVib3VuY2UpIHtcbiAgICAgICAgICAgIC8vIFRPRE9cblx0XHRcdG9iamVjdEhhbmRsZXIgPSB1dGlsLmRlYm91bmNlKG1rSGFuZGxlcik7XG5cdFx0fVxuXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gLCBvYmplY3RIYW5kbGVyKTtcblxuXHRcdGlmKCFpc1VuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlcigpO1xuICAgICAgICB9XG5cdH1cblxuICAgIGlmKGdldFZhbHVlICYmIG9uKSB7XG4gICAgICAgIC8vIFRPRE8gdXNlIEN1c3RvbUV2ZW50IGluc3RhbmNlIGluc3RlYWQgb2YgYW4gb2JqZWN0IGFzIGRlZmF1bHQgdmFsdWVcbiAgICAgICAgLy8gVE9ETyBtb3ZlIGl0IHRvIHRvcFxuICAgICAgICBjb25zdCBub2RlSGFuZGxlciA9IChkb21FdmVudCA9IHt9KSA9PiB7XG4gICAgICAgICAgICAvLyBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWUgaXMgc2V0IGluIHVuYmluZE5vZGVcbiAgICAgICAgICAgIC8vIHdlIGNhbm5vdCBcInR1cm4gb2ZmXCIgYmluZGVyLm9uIHdoZW4gaXRzIHZhbHVlIGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBkZXZlbG9wZXIgbmVlZHMgdG8gY2xlYW4gbWVtb3J5ICh0dXJuIG9mZiBjYWxsYmFjaykgbWFudWFseSBpbiBiaW5kZXIuZGVzdHJveVxuICAgICAgICAgICAgaWYobm9kZUhhbmRsZXIuZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgICAgICAgICBjb25zdCB7IHdoaWNoLCB0YXJnZXQgfSA9IGRvbUV2ZW50O1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcblx0XHRcdFx0cHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0ZG9tRXZlbnQsXG5cdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuXHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb246ICgpID0+IGRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLFxuXHRcdFx0XHR3aGljaCxcblx0XHRcdFx0dGFyZ2V0XG5cdFx0XHR9LCBvcHRpb25zKSk7XG5cbiAgICAgICAgICAgIGlmICghaXModmFsdWUsIHByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBhZGQgZGVzY3JpcHRpb24gb2YgYSBoYWNrXG4gICAgICAgICAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cblx0XHRcdFx0c2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuXHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdGNoYW5nZWROb2RlOiBub2RlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdGJpbmRlclxuXHRcdFx0XHR9KTtcblx0XHRcdH1cbiAgICAgICAgfTtcblxuICAgICAgICBiaW5kaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIG9uLFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIsXG4gICAgICAgICAgICBub2RlSGFuZGxlcixcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodHlwZW9mIG9uID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9uLmNhbGwobm9kZSwgbm9kZUhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLiQobm9kZSkub24ob24sIG5vZGVIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qXG5mdW5jdGlvbiBpbml0QmluZGluZyhvYmplY3QsIG9iamVjdERhdGEsIGtleSwgJG5vZGVzLCBpbmRleCwgYmluZGVyLCBldnQsIHNwZWNpYWwpIHtcblx0dmFyIG9wdGlvbnMgPSB7XG5cdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0bm9kZTogbm9kZVxuXHRcdH0sXG5cdFx0bm9kZSA9ICRub2Rlc1tpbmRleF0sXG5cdFx0aXNVbmRlZmluZWQgPSB0eXBlb2Ygc3BlY2lhbC52YWx1ZSA9PSAndW5kZWZpbmVkJyxcblx0XHRfYmluZGVyLFxuXHRcdF9ldnQsXG5cdFx0Zm91bmRCaW5kZXIsXG5cdFx0X29wdGlvbnMsXG5cdFx0aSxcblx0XHRkb21FdnQsXG5cdFx0bWtIYW5kbGVyLFxuXHRcdHZhbDtcblxuXG5cblxuXHRpZiAoYmluZGVyID09PSBudWxsKSB7XG5cdFx0X2JpbmRlciA9IHt9O1xuXHR9IGVsc2Uge1xuXHRcdGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdGlmIChmb3VuZEJpbmRlcikge1xuXHRcdFx0aWYgKGJpbmRlcikge1xuXHRcdFx0XHRmb3IgKGkgaW4gYmluZGVyKSB7XG5cdFx0XHRcdFx0Zm91bmRCaW5kZXJbaV0gPSBiaW5kZXJbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0X2JpbmRlciA9IGZvdW5kQmluZGVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfYmluZGVyID0gYmluZGVyIHx8IHt9O1xuXHRcdH1cblx0fVxuXG5cdGlmIChfYmluZGVyLmluaXRpYWxpemUpIHtcblx0XHRfb3B0aW9ucyA9IHtcblx0XHRcdHZhbHVlOiBzcGVjaWFsLnZhbHVlXG5cdFx0fTtcblx0XHRmb3IgKGkgaW4gb3B0aW9ucykge1xuXHRcdFx0X29wdGlvbnNbaV0gPSBvcHRpb25zW2ldO1xuXHRcdH1cblx0XHRfYmluZGVyLmluaXRpYWxpemUuY2FsbChub2RlLCBfb3B0aW9ucyk7XG5cdH1cblxuXHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblxuXHRcdF9ldnQgPSB7XG5cdFx0XHRmcm9tTm9kZTogdHJ1ZVxuXHRcdH07XG5cblx0XHRmb3IgKGkgaW4gZXZ0KSB7XG5cdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdH1cblxuXHRcdHZhbCA9IF9iaW5kZXIuZ2V0VmFsdWUuY2FsbChub2RlLCBvcHRpb25zKTtcblx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWwgPT0gJ3VuZGVmaW5lZCc7XG5cblx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsLCBfZXZ0KTtcblx0fVxuXG5cblx0aWYgKF9iaW5kZXIuc2V0VmFsdWUpIHtcblx0XHRta0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHR2YXIgdiA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldLnZhbHVlLFxuXHRcdFx0XHQvLyBkaXJ0eSBoYWNrIGZvciB0aGlzIG9uZSBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuXHRcdFx0XHRfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHRcdFx0XHRpO1xuXG5cdFx0XHRpZiAoZXZ0ICYmIGV2dC5jaGFuZ2VkTm9kZSA9PSBub2RlICYmIGV2dC5vbkNoYW5nZVZhbHVlID09IF92KSByZXR1cm47XG5cblx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHR2YWx1ZTogdlxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0X29wdGlvbnNbaV0gPSBvcHRpb25zW2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRfYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xuXHRcdH07XG5cblx0XHRpZihldnQuZGVib3VuY2UpIHtcblx0XHRcdG1rSGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHR9XG5cblx0XHRjb3JlLl9mYXN0QWRkTGlzdGVuZXIob2JqZWN0LCAnX3J1bmJpbmRpbmdzOicgKyBrZXksIG1rSGFuZGxlciwgbnVsbCwge25vZGU6IG5vZGV9KTtcblxuXHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0fVxuXG5cblxuXG5cdGlmIChfYmluZGVyLmdldFZhbHVlICYmIF9iaW5kZXIub24pIHtcblx0XHRkb21FdnQgPSB7XG5cdFx0XHRub2RlOiBub2RlLFxuXHRcdFx0b246IF9iaW5kZXIub24sXG5cdFx0XHRpbnN0YW5jZTogb2JqZWN0LFxuXHRcdFx0a2V5OiBrZXksXG5cdFx0XHRta0hhbmRsZXI6IG1rSGFuZGxlcixcblx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRpZiAoZG9tRXZ0LnJlbW92ZWQpIHJldHVybjtcblx0XHRcdFx0dmFyIG9sZHZhbHVlID0gb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0aixcblx0XHRcdFx0XHRfb3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdHZhbHVlOiBvbGR2YWx1ZSxcblx0XHRcdFx0XHRcdGRvbUV2ZW50OiBldnQsXG5cdFx0XHRcdFx0XHRvcmlnaW5hbEV2ZW50OiBldnQub3JpZ2luYWxFdmVudCB8fCBldnQsXG5cdFx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR3aGljaDogZXZ0LndoaWNoLFxuXHRcdFx0XHRcdFx0dGFyZ2V0OiBldnQudGFyZ2V0XG5cdFx0XHRcdFx0fTtcblxuXG5cdFx0XHRcdC8vIGhhc093blByb3BlcnR5IGlzIG5vdCByZXF1aXJlZCB0aGVyZVxuXHRcdFx0XHRmb3IgKGogaW4gb3B0aW9ucykge1xuXHRcdFx0XHRcdF9vcHRpb25zW2pdID0gb3B0aW9uc1tqXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhbHVlID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgIT09IG9sZHZhbHVlKSB7XG5cdFx0XHRcdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0XHRmcm9tTm9kZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGNoYW5nZWROb2RlOiBub2RlLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRjb3JlLmRvbUV2ZW50cy5hZGQoZG9tRXZ0KTtcblx0fVxufSovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdEJpbmRlcnMgZnJvbSAnLi9kZWZhdWx0YmluZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0LFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGRlZmF1bHRCaW5kZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyZXN1bHQgPSBkZWZhdWx0QmluZGVyc1tpXS5jYWxsKG5vZGUsIG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBbbm9kZSA9PiB7XG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lLFxuXHRcdGJpbmRlcnMgPSB1bmRlZmluZWQsXG5cdFx0YjtcblxuXHQvLyBUT0RPIFN3aXRjaC9jYXNlXG5cdGlmICh0YWdOYW1lID09ICdJTlBVVCcpIHtcblx0XHRiID0gYmluZGVycy5pbnB1dChub2RlLnR5cGUpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1RFWFRBUkVBJykge1xuXHRcdGIgPSBiaW5kZXJzLnRleHRhcmVhKCk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnU0VMRUNUJykge1xuXHRcdGIgPSBiaW5kZXJzLnNlbGVjdChub2RlLm11bHRpcGxlKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdQUk9HUkVTUycpIHtcblx0XHRiID0gYmluZGVycy5wcm9ncmVzcygpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ09VVFBVVCcpIHtcblx0XHRiID0gYmluZGVycy5vdXRwdXQoKTtcblx0fVxuXG5cdHJldHVybiBiO1xufV07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJldnRcIl0gfV0qL1xuXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuXHQ9IC9eX2NoYW5nZTpkZXBzOnxeX2NoYW5nZTpiaW5kaW5nczp8Xl9jaGFuZ2U6ZGVsZWdhdGVkOnxeY2hhbmdlOnxeYmVmb3JlY2hhbmdlOi87XG5cbi8vIGFkZHMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyXG4vLyB1c2VkIGFzIGNvcmUgb2YgZXZlbnQgZW5naW5lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gaW5pdE1LKG9iamVjdCksXG5cdFx0Y3R4ID0gY29udGV4dCB8fCBvYmplY3QsXG5cdFx0ZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdLFxuXHRcdGV2dCA9IHsgY2FsbGJhY2ssIGNvbnRleHQsIGN0eCwgbmFtZSwgaW5mbyB9O1xuXG5cblx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWVcblx0aWYgKGV2ZW50cykge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBkYXRhLCByZXR1cm4gZmFsc2Vcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgZXZ0ID0gZXZlbnRzW2ldO1xuXHRcdFx0aWYgKChldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrIHx8IGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2suX2NhbGxiYWNrKVxuXHRcdFx0XHRcdCYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgZXZlbnQgaXNuJ3QgZm91bmQgYWRkIGl0IHRvIHRoZSBldmVudCBsaXN0XG5cdFx0ZXZlbnRzLnB1c2goZXZ0KTtcblx0fSBlbHNlIHtcblx0XHQvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZSwgY3JlYXRlIGFycmF5IHdpdGggb25seSBlYmVudFxuXHRcdGFsbEV2ZW50c1tuYW1lXSA9IFtldnRdO1xuXHR9XG5cblx0aWYgKHByb3BNb2RFdmVudFJlZy50ZXN0KG5hbWUpKSB7XG5cdFx0Ly8gZGVmaW5lIG5lZWRlZCBhY2Nlc3NvcnMgZm9yIEtFWVxuXHRcdGRlZmluZVByb3Aob2JqZWN0LCBuYW1lLnJlcGxhY2UocHJvcE1vZEV2ZW50UmVnLCAnJykpO1xuXHR9XG5cblx0aWYgKG5hbWVbMF0gIT09ICdfJykge1xuXHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgYWRkZXZlbnQ6JHtuYW1lfWAsIGV2dCk7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsICdhZGRldmVudCcsIGV2dCk7XG5cdH1cblxuXHQvLyBpZiBldmVudCBpcyBhZGRlZCByZXR1cm4gdHJ1ZVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpbml0TUsgZnJvbSAnLi9fY29yZS9pbml0JztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZSwgZXZ0KSB7XG5cdGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICd1bmJpbmROb2RlJyk7XG5cblxuXG5cdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbJ2EnLCAnYicsICdjJ10sIG5vZGUpXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiB1bmJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFt7a2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50fV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5lYWNoKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IHVuYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG5cdGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuXHRjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuXHRpZighcHJvcERlZikge1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG5cdGlmKCFiaW5kaW5ncykge1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHQvLyBUT0RPIG1ha2Ugc3VyZSB0byB1cGRhdGUgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VzXG5cblx0aWYoa2V5ID09PSBudWxsKSB7XG5cdFx0Ly8gVE9ETyByZW1vdmUgYWxsIGJpbmRpbmdzXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0aWYoIW5vZGUpIHtcblx0XHQvLyBUT0RPIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuXHR9XG5cblx0Y29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblx0Y29uc3QgcmV0YWluQmluZGluZ3MgPSBbXTtcblxuXHRub2ZuLmZvckVhY2goJG5vZGVzLCBub2Rlc0l0ZW0gPT4ge1xuXHRcdC8vIFRPRE8gbW92ZSB0byB0aGUgdG9wID9cblx0XHRub2ZuLmZvckVhY2goYmluZGluZ3MsIGJpbmRpbmcgPT4ge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRvbixcblx0XHRcdFx0bm9kZSxcblx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRub2RlSGFuZGxlcixcblx0XHRcdFx0b2JqZWN0SGFuZGxlcixcblx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0fSA9IGJpbmRpbmc7XG5cblx0XHRcdGlmKG5vZGUgPT09IG5vZGVzSXRlbSkge1xuXHRcdFx0XHRjb25zdCB7IGRlc3Ryb3kgfSA9IGJpbmRlcjtcblxuXHRcdFx0XHRpZih0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0ICAgICAgICAgICAgZG9tLiQobm9kZSkub2ZmKG9uLCBub2RlSGFuZGxlcik7XG5cdFx0ICAgICAgICB9XG5cdFx0XHRcdHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cblx0XHRcdFx0aWYoZGVzdHJveSkge1xuXHRcdFx0XHRcdGRlc3Ryb3kuY2FsbChub2RlLCBvcHRpb25zKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXRhaW5CaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXHRjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG5cdGNvbnN0IHJldGFpbiA9IFtdO1xuXHRjb25zdCBub1RyaWdnZXIgPSBuYW1lID8gbmFtZVswXSA9PT0gJ18nIDogZmFsc2U7XG5cblx0Ly8gaWYgYWxsIGV2ZW50cyBuZWVkIHRvIGJlIHJlbW92ZWRcblx0aWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuXHRcdGlmICghbm9UcmlnZ2VyKSB7XG5cdFx0XHRub2ZuLmZvck93bihhbGxFdmVudHMsIChldmVudHMsIG5hbWUpID0+IHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdFx0XHRjb25zdCByZW1vdmVFdnREYXRhID0ge1xuXHRcdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRcdGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG5cdFx0XHRcdFx0XHRjb250ZXh0OiBldnQuY29udGV4dFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gcmVzdG9yZSBkZWZhdWx0IHZhbHVlIG9mIFwiZXZlbnRzXCJcblx0XHRkZWYuZXZlbnRzID0ge307XG5cdH0gZWxzZSBpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcblx0XHRub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuXHRcdFx0aWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuXHRcdFx0XHR8fCAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldnQuY29udGV4dCkpIHtcblx0XHRcdFx0Ly8ga2VlcCBldmVudFxuXHRcdFx0XHRyZXRhaW4ucHVzaChldnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG5cdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIW5vVHJpZ2dlcikge1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmFkZCcsICgpID0+IHtcblx0aXQoJ2FkZHMgb25jZScsICgpID0+IHtcblx0XHRjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5hZGQoW2VsMiwgZWwzLCBlbDQsIGVsNV0pXG5cdFx0XSkudG9FcXVhbChbZWwxLCBlbDIsIGVsMywgZWw0LCBlbDVdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsICgpID0+IHtcblx0aXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2JykudGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIGEgcHJvcGVydHknLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZm9vYmFyJ1xuXHRcdFx0fSkuY2xhc3NOYW1lXG5cdFx0KS50b0VxdWFsKCdmb29iYXInKTtcblx0fSk7XG5cblx0aXQoJ2NyZWF0ZXMgY2hpbGRlbicsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRjaGlsZHJlbjogW3tcblx0XHRcdFx0XHR0YWdOYW1lOiAnc3Bhbidcblx0XHRcdFx0fV1cblx0XHRcdH0pLmNoaWxkcmVuWzBdLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0XHRmb286ICdiYXInXG5cdFx0XHRcdH1cblx0XHRcdH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcblx0XHQpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSh7XG5cdFx0XHRcdHRhZ05hbWU6ICdkaXYnXG5cdFx0XHR9KS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdESVYnKTtcblx0fSk7XG5cblx0eGl0KCdleHRlbmRzIGRhdGFzZXQgb2JqZWN0JywgKCkgPT4ge1xuXHRcdC8vIFRPRE9cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vbGliL3NpbXVsYXRlY2xpY2snO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGV2ZW50cycsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94LFxuXHRcdGNoaWxkMSxcblx0XHRjaGlsZDIsXG5cdFx0Z3JhbmRjaGlsZDEsXG5cdFx0aGFuZGxlcjtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDFcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkMlwiPjwvZGl2PlxuXHRcdGA7XG5cblx0XHRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQxJyk7XG5cdFx0Y2hpbGQyID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMicpO1xuXHRcdGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGFmdGVyRWFjaCgoKSA9PiB7XG5cdFx0JChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQyJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1N0b3BzIHByb3BhZ2F0aW9uJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdCQoY2hpbGQxKS5vbignY2xpY2snLCBldnQgPT4gZXZ0LnN0b3BQcm9wYWdhdGlvbigpKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanNcbiAqKi8iLCIvLyBzaW11bGF0ZXMgY2xpY2sgb24gYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW11bGF0ZUNsaWNrKG5vZGUpIHtcblx0Y29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcblx0ZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuXHRub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmZpbmQnLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveCxcblx0XHRncmFuZENoaWxkO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcblx0fSk7XG5cblx0aXQoJ2ZpbmRzJywgKCkgPT4ge1xuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKHRlc3RTYW5kYm94KS5maW5kKCcuZ3JhbmRjaGlsZCcpXG5cdFx0XSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuLy8g0LfQsNGB0YPQvdGD0YLRjCDQstGB0LUg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLRi9GFINGN0LvQtdC80LXQvdGC0L7QsiDQsiBiZWZvcmVFYWNoXG4vLyDRgNC10YTQsNC60YLQvtGA0LjRgtGMXG4vLyDQvdCw0L/QuNGB0LDRgtGMINC60L7QvNC80LXQvdGC0LDRgNC40LggKNCyINGC0L7QvCDRh9C40YHQu9C1INC4INC6INGD0LbQtSDRgNC10LDQu9C40LfQvtCy0LDQvdC90YvQvCDRhNGD0L3QutGG0LjRj9C8KVxuLy8g0L/QvtGB0LvQtSDQstGB0LXQs9C+INC90YPQttC90L4g0LLQutC70Y7Rh9C40YLRjCDQu9C40L3RgtC10YAg0Lgg0L/RgNC+0LLQtdGA0LjRgtGMINC60L7QstC10YDQsNC00LZcblxuZGVzY3JpYmUoJ2JRdWVyeSBpbml0aWFsaXphdGlvbicsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94O1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0xXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtM1wiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fSk7XG5cblx0aXQoJ2FjY2VwdHMgd2luZG93JywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQod2luZG93KTtcblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKHdpbmRvdyk7XG5cdH0pO1xuXG5cdGl0KCdhY2NlcHRzIGRvY3VtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoZG9jdW1lbnQpO1xuXHR9KTtcblxuXHRpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgnY29udmVydHMgYXJyYXktbGlrZScsICgpID0+IHtcblx0XHRjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSxcblx0XHRcdHJlc3VsdCA9ICQoY2hpbGRyZW4pO1xuXG5cdFx0ZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuXHRcdH1cblx0fSk7XG5cblx0aXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KGVsZW1lbnQpLnRvRXF1YWwocmVzdWx0WzBdKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgxKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQobnVsbCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcblx0XHQkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uIGJRdWVyeVBsdWdpbigpIHtcblx0XHRcdGV4cGVjdChcblx0XHRcdFx0dGhpcy5sZW5ndGhcblx0XHRcdCkudG9FcXVhbChcblx0XHRcdFx0dGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLmxlbmd0aFxuXHRcdFx0KTtcblx0XHR9O1xuXG5cdFx0c3B5T24oJC5mbiwgJ2JRdWVyeVBsdWdpbicpO1xuXG5cdFx0JCgnKicsIHRlc3RTYW5kYm94KS5iUXVlcnlQbHVnaW4oKTtcblxuXHRcdGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcblx0aXQoJ2NoZWNrcyBjbGFzc05hbWUnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbC5jbGFzc05hbWUgPSAnZWwnO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChlbCkuaXMoJy5lbCcpXG5cdFx0KS50b0VxdWFsKHRydWUpO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChlbCkuaXMoJy5lbDInKVxuXHRcdCkudG9FcXVhbChmYWxzZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcblx0aXQoJ2V4Y2x1ZGVzIGJ5IHNlbGVjdG9yJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGVsMi5jbGFzc05hbWUgPSAnZWwyJztcblxuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKFtlbDEsIGVsMiwgZWwzXSkubm90KCcuZWwyJylcblx0XHRdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuXHRpdCgnZmluZHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdGNvbnN0IGNoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkJyk7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkLm9uZSgnKicsIHRlc3RTYW5kYm94KVxuXHRcdCkudG9FcXVhbChjaGlsZCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG5cdGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgncGFyc2VzIGNvbnRleHR1YWwgZWxlbWVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzx0ZD48L3RkPjx0ZD48L3RkPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG5cdGl0KCdhbGxvd3MgdG8gaW5oZXJpdCcsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuXHRcdFx0QiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcblx0XHRcdEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG5cdFx0XHRpbnN0ID0gbmV3IEM7XG5cblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEIpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdC5iKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3Mgc3RhdGljIHByb3BzJywgKCkgPT4ge1xuXHRcdGNvbnN0IEEgPSBDbGFzcyh7fSwgeyBzdGF0aWNQcm9wOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2lmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgaW5zdCA9IG5ldyBDbGFzcyh7IGE6IHRydWUgfSk7XG5cdFx0ZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQ2xhc3MpLnRvQmVGYWxzeSgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG5cdGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBPYmplY3Rcblx0XHRcdD8gcHJvdG90eXBlLmNvbnN0cnVjdG9yXG5cdFx0XHQ6IGZ1bmN0aW9uIEVtcHR5Q29uc3RydWN0b3IoKSB7fSxcblx0XHQvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRcdFBhcmVudCA9IHByb3RvdHlwZS5leHRlbmRzIHx8IHByb3RvdHlwZS5leHRlbmQsXG5cdFx0Ly9pbmhlcml0IHByb3RvIGZyb20gY2xhc3MgcGFyZW50IG9yIGVtcHR5IG9iamVjdFxuXHRcdHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG5cdGV4dGVuZChwcm90bywgcHJvdG90eXBlKTtcblxuXHRpZiAodHlwZW9mIHN0YXRpY1Byb3BzID09PSAnb2JqZWN0Jykge1xuXHRcdGV4dGVuZChDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHR9XG5cblx0Ly8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0cHJvdG8uaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcjtcblx0fTtcblxuXHRDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90bztcblxuXHQvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG5cdGlmICh0aGlzIGluc3RhbmNlb2YgQ2xhc3MpIHtcblx0XHRyZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzcy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChNYXRyZXNoa2EuT2JqZWN0IGFuZCBNYXRyZXNoa2EuQXJyYXkpJywgZnVuY3Rpb24oKSB7XG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHtcblx0XHRcdGE6IHt9XG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF1bMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdHk6IG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0XHRhOiB7fVxuXHRcdFx0fSlcblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsImltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKGJhc2ljKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBjdHgsXG5cdFx0aGFuZGxlcjtcblxuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdGN0eCA9IHt9O1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblxuXHRpdCgnZmlyZXMgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi5jID0ge307XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGEgPSBvYmouYTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcblx0XHR0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YyA9IG9iai5hLmM7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUoYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG5cdFx0b2JqLmEuYi5jID0gNTU7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBjb3JyZWN0IGNvbnRleHQgZm9yIGRlbGVnYXRlZCBldmVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblx0XHRsZXQgYm9vbCA9IGZhbHNlO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRib29sID0gdGhpcyA9PT0gY3R4O1xuXHRcdH0sIGN0eCk7XG5cblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFtcImVycm9yXCIsIHsgXCJmdW5jdGlvbnNcIjogZmFsc2UgfV0qL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vYWRkbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcblx0cHJldmlvdXNWYWx1ZSxcblx0dmFsdWVcbn0sIHtcblx0cGF0aCxcblx0bmFtZSxcblx0Y2FsbGJhY2ssXG5cdGNvbnRleHRcbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0fVxuXG5cdGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihwcmV2aW91c1ZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcblx0cGF0aCA9IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBwYXRoICE9PSAnJyA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGg7XG5cblx0aWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuXHRcdC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG5cdFx0XHRwYXRoLFxuXHRcdFx0bmFtZSxcblx0XHRcdGNhbGxiYWNrLFxuXHRcdFx0Y29udGV4dFxuXHRcdH07XG5cblx0XHQvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG5cdFx0XHRkZWxlZ2F0ZWREYXRhLFxuXHRcdFx0cGF0aFN0clxuXHRcdH0pO1xuXG5cdFx0Ly8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG5cdFx0Y2hhbmdlSGFuZGxlcih7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV1cblx0XHR9LCBkZWxlZ2F0ZWREYXRhKTtcblx0fVxufVxuXG4vKlxuZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvaW5pdG1rJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvc3BlY2lhbGV2dHJlZydcbl0sIGZ1bmN0aW9uKGNvcmUsIGluaXRNSywgbWFwLCBzcGVjaWFsRXZ0UmVnKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX2RlbGVnYXRlTGlzdGVuZXIgPSBjb3JlLl9kZWxlZ2F0ZUxpc3RlbmVyID0gZnVuY3Rpb24ob2JqZWN0LFxuXHQgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0aW5pdE1LKG9iamVjdCk7XG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV4ZWN1dGVkID0gLyhbXlxcLl0rKVxcLiguKikvLmV4ZWMocGF0aCksXG5cdFx0XHRmLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdGNoYW5nZUtleSxcblx0XHRcdG9iajtcblxuXHRcdHBhdGggPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzJdIDogJyc7XG5cblx0XHRldnREYXRhID0gZXZ0RGF0YSB8fCB7fTtcblxuXHRcdGlmIChmaXJzdEtleSkge1xuXHRcdFx0aWYgKGZpcnN0S2V5ID09ICcqJykge1xuXHRcdFx0XHRpZiAob2JqZWN0LmlzTUtBcnJheSkge1xuXHRcdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRcdChldnQgJiYgZXZ0LmFkZGVkID8gZXZ0LmFkZGVkIDogb2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdFx0aXRlbSAmJiBfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLFxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdhZGQnLCBmLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRmKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2JqZWN0LmlzTUtPYmplY3QpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2V2dC5rZXldO1xuXG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0ICYmIGV2dCAmJiAoZXZ0LmtleSBpbiBvYmplY3REYXRhLmtleXMpKSB7XG5cdFx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5fc2lsZW50KSByZXR1cm47XG5cblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2ZpcnN0S2V5XSxcblx0XHRcdFx0XHRcdGNoYW5nZUtleSxcblx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSB0cnVlLFxuXHRcdFx0XHRcdFx0aSxcblx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cztcblxuXHRcdFx0XHRcdGV2dERhdGEucGF0aCA9IHBhdGg7XG5cblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgPSBldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgfHxcblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2ZpcnN0S2V5XTtcblxuXHRcdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgJiYgbWFwLmhhcyhldnQucHJldmlvdXNWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lcihldnQucHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0ID09ICdvYmplY3QnICYmIHRhcmdldCkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIodGFyZ2V0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHNwZWNpYWxFdnRSZWcudGVzdChuYW1lKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlS2V5ID0gbmFtZS5yZXBsYWNlKHNwZWNpYWxFdnRSZWcsICcnKTtcblxuXHRcdFx0XHRcdFx0aWYgKCFwYXRoICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZSAmJiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XVxuXHRcdFx0XHRcdFx0IT09IHRhcmdldFtjaGFuZ2VLZXldKSB7XG5cdFx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cyA9IG1hcC5nZXQoZXZ0RGF0YS5wcmV2aW91c1ZhbHVlKS5ldmVudHNbbmFtZV07XG5cdFx0XHRcdFx0XHRcdGlmIChjaGFuZ2VFdmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hhbmdlRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzW2ldLnBhdGggPT09IHBhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJpZ2dlckNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29yZS5zZXQodGFyZ2V0LCBjaGFuZ2VLZXksIHRhcmdldFtjaGFuZ2VLZXldLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3JjZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzVmFsdWU6IGV2dERhdGEucHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuXHRcdFx0XHRcdFx0XHRcdFx0cHJldmlvdXNPYmplY3Q6IGV2dERhdGEucHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9zaWxlbnQ6IHRydWVcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXG5cdFx0XHRcdGYoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0fVxuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9yZW1vdmVsaXN0ZW5lcic7XG4vLyBSRUZBQ1RPUiwgRE9OVCBUUklHR0VSIEFEREVWRU5ULCBSRU1PVkVFVkVOVFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcblxuXHRwYXRoID0gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHBhdGggIT09ICcnID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aDtcblxuXHRpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG5cdFx0Ly8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuXHRcdHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG5cdFx0Y29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGlmIChldmVudHMpIHtcblx0XHRcdGNvbnN0IHJldGFpbiA9IFtdO1xuXHRcdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQuaW5mby5wYXRoU3RyICE9PSBwYXRoU3RyKSB7XG5cdFx0XHRcdFx0cmV0YWluLnB1c2goZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdFx0YWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdID0gcmV0YWluO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX3VuZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lciA9XG5cdCBmdW5jdGlvbihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdHAgPSBwYXRoLFxuXHRcdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV2ZW50cyxcblx0XHRcdGk7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuYWRkIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmNoYW5nZSB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHNbJ2NoYW5nZTonICsgZmlyc3RLZXldIHx8IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygb2JqZWN0W2ZpcnN0S2V5XSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2ZpcnN0S2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvLyBjcmVhdGVzIG5lc3RlZCBvYmplY3QgYmFzZWQgb24gcGF0aCBhbmQgbGFzdFZhbHVlXG4vLyBleGFtcGxlOiBtYWtlT2JqZWN0KCdhLmIuYycsIDQyKSAtPiB7YToge2I6IHtjOyA0Mn19fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU9iamVjdChwYXRoID0gJycsIGxhc3RWYWx1ZSA9IHt9KSB7XG5cdHBhdGggPSBwYXRoID8gcGF0aC5zcGxpdCgnLicpIDogW107XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRsZXQgb2JqID0gcmVzdWx0LFxuXHRcdGtleTtcblxuXG5cdHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cdFx0b2JqID0gb2JqW2tleV0gPSB7fTtcblx0fVxuXG5cdG9ialtwYXRoLnNoaWZ0KCldID0gbGFzdFZhbHVlO1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL21ha2VvYmplY3QuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuXG5kZXNjcmliZSgnQ2hhbmdlIGV2ZW50IChzaW1wbGUgYW5kIGRlbGVnYXRlZCknLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgaGFuZGxlcjtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyBzaW1wbGUnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0geyB4OiAxIH07XG5cblx0XHRhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBzaW1wbGUnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0geyB4OiAxIH07XG5cblx0XHRhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHQvKmVzbGludC1kaXNhYmxlICovXG5cdHhpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYy54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMueCcsIDIpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0b2JqLmEuYiA9IHtcblx0XHRcdGM6IHtcblx0XHRcdFx0eDogMlxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRvYmouYS5iLmMgPSB7XG5cdFx0XHR4OiAyXG5cdFx0fTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHR4aXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMTEpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGV2dCA9PiBpICs9IDFlMTApO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGV2dCA9PiBpICs9IDFlOSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU4KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNyk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTYpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU1KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWU0KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUzKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUyKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUwKTtcblx0XHRvYmouYSA9IHtcblx0XHRcdGI6IHtcblx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdHg6IDJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0ZXhwZWN0KGkpLnRvRXF1YWwoMTExMTExMTExMTExKTtcblx0fSk7XG5cblx0eGl0KCdhY2NlcHRzIG51bGwgdGFyZ2V0IChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouYS5iID0gbnVsbDtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cdC8qZXNsaW50LWVuYWJsZSAqL1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvX2V2ZW50cy90cmlnZ2Vyb25lJztcblxuZGVzY3JpYmUoJ0V2ZW50cyBjb3JlOiBhZGRMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXIsIHRyaWdnZXJPbmUnLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgb2JqLFxuXHRcdGN0eCxcblx0XHRoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdGN0eCA9IHt9O1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMCkpO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMSkpO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMikpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTEpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gYXJncyknLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBuYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdHhpdCgncmVtb3ZlcyBieSBob3dUb1JlbW92ZSAobm90IGRvY3VtZW50ZWQgY29yZSBmZWF0dXJlKScsICgpID0+IHtcblx0XHQvKmVzbGludC1kaXNhYmxlICovXG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0ZiA9IGV2dCA9PiBib29sID0gdHJ1ZSxcblx0XHRcdG9uRGF0YSA9IHtcblx0XHRcdFx0aG93VG9SZW1vdmUob25EYXRhLCBvZmZEYXRhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9mZkRhdGEueCA9PT0gNDI7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRtYWdpYy5fYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIGYsIG51bGwsIG9uRGF0YSk7XG5cdFx0bWFnaWMuX3JlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDEnLCBudWxsLCBudWxsLCB7XG5cdFx0XHR4OiA0MlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQxJyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cblx0XHRtYWdpYy5fYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIGYsIG51bGwsIG9uRGF0YSk7XG5cdFx0bWFnaWMuX3JlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDInLCBudWxsLCBudWxsLCB7XG5cdFx0XHR4OiA0M1xuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQyJyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0XHQvKmVzbGludC1lbmFibGUgKi9cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG54ZGVzY3JpYmUoXCJFdmVudHMgY29yZTogX2FkZERPTUxpc3RlbmVyLCBfcmVtb3ZlRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuXHRsZXQgcSA9IChzLCBjKSA9PiB7XG5cdFx0bGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcblx0XHRcdFx0bGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXHRcdFx0XHRldi5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRcImNsaWNrXCIsXG5cdFx0XHRcdFx0dHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuXHRcdFx0XHRcdHdpbmRvdywgbnVsbCxcblx0XHRcdFx0XHQwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG5cdFx0XHRcdFx0MCAvKmxlZnQqLyAsIG51bGxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuXHRcdHRhZ05hbWU6ICdESVYnLFxuXHRcdGlkOiAnZC10ZXN0Jyxcblx0XHRpbm5lckhUTUw6IGBcblx0XHRcdDxkaXYgaWQ9XCJkLXRlc3QtMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZC10ZXN0LTJcIj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGBcblx0fSkpO1xuXG5cblxuXHRpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgYW5kIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIHRoZW4gYmluZHMgdGhlbiByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgRE9NIGV2ZW50JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnLCAxLCAyKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yIChidWJibGluZyB0ZXN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkIGFuZCBkb2VzblxcJ3QgcmVtb3ZlIGV2ZW50cyBmcm9tIG90aGVyIG5vZGVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmJsYWgnKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHRpdCgndHJpZ2dlcnMgZXZlbnQgdmlhIFwidHJpZ2dlclwiIG1ldGhvZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdFdmVudHMgc3VtbWFyeSAob24sIG9mZiknLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGxldCBub2RlID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdzLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cInMtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblx0bm9kZS5jbGljayA9IG5vZGUuY2xpY2sgfHwgZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KCdjbGljaycpKTtcblx0fVxuXG5cdGl0KCdmaXJlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCdmaXJlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXHRcdG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMub2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLm9mZignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMub2ZmKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBvbmNlJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRtYWdpYy5vbmNlKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25jZVwiJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRtYWdpYy5vbmNlKG9iaiwge1xuXHRcdFx0Zm9vOiBmMSxcblx0XHRcdGJhcjogZjJcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRleHBlY3QoaikudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2Ugb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRtay5vbmNlKCdzb21lZXZlbnQnLCBmKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHR9KTtcblxuXG5cdGl0KCdvbkRlYm91bmNlIHdvcmtzJywgZG9uZSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25EZWJvdW5jZVwiJywgKGRvbmUpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGogPSAwLFxuXHRcdFx0ZjEgPSBldnQgPT4gaSsrLFxuXHRcdFx0ZjIgPSBldnQgPT4gaisrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDIwMCk7XG5cblx0XHRtYWdpYy5vbkRlYm91bmNlKG9iaiwge1xuXHRcdFx0Zm9vOiBmMSxcblx0XHRcdGJhcjogZjJcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdvbkRlYm91bmNlIHdvcmtzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsIGRvbmUgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDgwMCk7XG5cblx0XHRtay5vbkRlYm91bmNlKCdzb21lZXZlbnQnLCBmKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0fSk7XG5cblxuXHRpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uXCIgYW5kIFwib2ZmXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRoYW5kbGVycyA9IHtcblx0XHRcdFx0Zm9vOiAoKSA9PiBpKyssXG5cdFx0XHRcdGJhcjogKCkgPT4gaSsrXG5cdFx0XHR9O1xuXG5cdFx0TUsub24ob2JqLCBoYW5kbGVycyk7XG5cblx0XHRNSy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdE1LLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgyKTtcblxuXHRcdE1LLm9mZihvYmosIGhhbmRsZXJzKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0dGhpc0FyZyA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRNSy5vbihvYmosICdmb28nLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRydWUsIHRoaXNBcmcpO1xuXG5cdFx0TUsub24ob2JqLCAnYmFyJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcblx0XHRcdGkrKztcblx0XHR9LCB0aGlzQXJnLCB0cnVlKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1xuICoqLyIsInZhciBtYXAgPSB7XG5cdFwiLi9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanNcIjogMzAsXG5cdFwiLi9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanNcIjogMzIsXG5cdFwiLi9fYmluZGluZ3MvZ2V0bm9kZXMuanNcIjogMTIsXG5cdFwiLi9fYmluZGluZ3MvbG9va2ZvcmJpbmRlci5qc1wiOiAzMSxcblx0XCIuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1wiOiAxMyxcblx0XCIuL19jb3JlL2RlZmluZXByb3AuanNcIjogNixcblx0XCIuL19jb3JlL2RlZnMuanNcIjogNSxcblx0XCIuL19jb3JlL2luaXQuanNcIjogNCxcblx0XCIuL19kb20vZGVmYXVsdC1kb2xsYXIuanNcIjogMTUsXG5cdFwiLi9fZG9tL2luZGV4LmpzXCI6IDE0LFxuXHRcIi4vX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1wiOiAzMyxcblx0XCIuL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA1MCxcblx0XCIuL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanNcIjogMzUsXG5cdFwiLi9fZXZlbnRzL3RyaWdnZXJvbmUuanNcIjogOCxcblx0XCIuL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDUxLFxuXHRcIi4vX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzXCI6IDksXG5cdFwiLi9fdXRpbC9pcy5qc1wiOiAxMSxcblx0XCIuL191dGlsL21hdHJlc2hrYWVycm9yLmpzXCI6IDEwLFxuXHRcIi4vYXJyYXkuanNcIjogNTgsXG5cdFwiLi9iaW5kZXJzLmpzXCI6IDU5LFxuXHRcIi4vYmluZG5vZGUuanNcIjogMyxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAxNyxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogMjcsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDIyLFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogMjksXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMTYsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMjUsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDI4LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAyNixcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAyMyxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMjEsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDIwLFxuXHRcIi4vY2xhc3MuanNcIjogNDcsXG5cdFwiLi9leHRlbmQuanNcIjogMTksXG5cdFwiLi9nZXQuanNcIjogNjAsXG5cdFwiLi9pbmRleC5qc1wiOiA2MSxcblx0XCIuL21hZ2ljLmpzXCI6IDY0LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDYyLFxuXHRcIi4vb2JqZWN0LmpzXCI6IDYzLFxuXHRcIi4vb24uanNcIjogNjUsXG5cdFwiLi9zZXQuanNcIjogNyxcblx0XCIuL3VuYmluZG5vZGUuanNcIjogMzRcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNTc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0KG9iamVjdCwga2V5KSB7XG5cdHJldHVybiBvYmplY3Rba2V5XTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2dldC5qc1xuICoqLyIsImltcG9ydCBNYXRyZXNoa2EgZnJvbSAnLi9tYXRyZXNoa2EnO1xuaW1wb3J0IE1hdHJlc2hrYUFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IE1hdHJlc2hrYU9iamVjdCBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9jbGFzcyc7XG5pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbk1hdHJlc2hrYS5iaW5kZXJzID0gYmluZGVycztcblxuZXhwb3J0IGRlZmF1bHQgTWF0cmVzaGthO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi4vY2xhc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBDbGFzcyh7XG5cdC8vIGluc3RhbmNlIHByb3BlcmllcyBhbmQgbWV0aG9kc1xuXG59LCB7XG5cdC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG5cdGV4dGVuZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXRyZXNoa2EvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2JqZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hZ2ljLmpzXG4gKiovIiwiXG4vLyAvXigoW15AXSspQCk/KCguKz8pKDo6KFteXFwoXFwpXSspPyhcXCgoLiopXFwpKT8pPyk/JC9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24oKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==