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
	
	var componentsContext = __webpack_require__(55);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 33,
		"./bquery/create_spec.js": 34,
		"./bquery/events_spec.js": 35,
		"./bquery/find_spec.js": 37,
		"./bquery/init_spec.js": 38,
		"./bquery/is_spec.js": 39,
		"./bquery/not_spec.js": 40,
		"./bquery/one_spec.js": 41,
		"./bquery/parsehtml_spec.js": 42,
		"./class_spec.js": 43,
		"./events/delegated_collection_spec.js": 45,
		"./events/delegated_spec.js": 46,
		"./events/events_change_spec.js": 51,
		"./events/events_core_spec.js": 52,
		"./events/events_dom_spec.js": 53,
		"./events/events_summary_spec.js": 54
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
		var binder = void 0;
		var simulateDomEvent = void 0;
	
		beforeEach(function () {
			obj = {};
			node = document.createElement('div');
			binder = {
				on: function (cbc) {
					simulateDomEvent = cbc;
				},
				getValue: function () {
					return node.value;
				},
				setValue: function (v) {
					node.value = v;
				}
			};
		});
	
		it('should bind', function () {
			bindNode(obj, 'x', node, binder);
			obj.x = 'foo';
			expect(node.value).toEqual('foo');
			node.value = 'bar';
			simulateDomEvent();
			expect(obj.x).toEqual('bar');
		});
	
		xit('should bind and call initialize', function () {
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
	
		xit('should unbind', function () {
			var obj = {},
			    input1 = bindInput(obj, 'x'),
			    input2 = bindInput(obj, 'y');
	
			magic.unbindNode(obj, 'x y', [input1, input2]);
	
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
	
	var getNodes = __webpack_require__(11);
	
	var MatreshkaError = __webpack_require__(10);
	
	var bindSingleNode = __webpack_require__(29);
	
	module.exports = bindNode;
	function bindNode(object, key, node) {
		var binder = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
		var evt = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
		var optional = evt.optional;
	
	
		if (!key) {
			throw MatreshkaError('binding:falsy_key');
		}
	
		/*
	  * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
	  */
		if (key instanceof Array) {
			for (i = 0; i < key.length; i++) {
				bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
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
	
		/*
	  * this.bindNode('key', [ node, binder ], { silent: true });
	  */
		// node !== win is the most uncommon bugfix ever
		// this is about iframes, CORS and deprecated DOM API.
		if (node && node.length == 2 && node !== win && !node[1].nodeName && (node[1].setValue || node[1].getValue)) {
			return bindNode(object, key, node[0], node[1], binder);
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
	
		for (var _target = $nodes, _index = 0, node, _l = _target.length; node = _target[_index], _index < _l; _index++) {
			return bindSingleNode(object, {
				$nodes: $nodes,
				node: node,
				key: key,
				evt: evt,
				binder: binder,
				propDef: propDef
			});
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
	// Debounced!

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
	    }
	    */
				},
				// "props" contains special information about properties (getters, setters etc)
				props: {
					/*example: {
	    	//?nodes: core.$(),
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
		if (!def) return;
	
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
	
		return def;
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
	
	// we need to compare values correctly
	var isPolyfill = function (v1, v2) {
				return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};
	var is = Object.is || isPolyfill;
	
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
										return set(object, objKey, objVal, value);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(12);
	
	var dom = __webpack_require__(13);
	
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(14);
	
	var dom = {
		$: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(15);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(16);
	
	var extend = __webpack_require__(18);
	
	var parseHTML = __webpack_require__(19);
	
	var one = __webpack_require__(20);
	
	var create = __webpack_require__(21);
	
	var on = __webpack_require__(22);
	
	var off = __webpack_require__(25);
	
	var is = __webpack_require__(24);
	
	var add = __webpack_require__(26);
	
	var not = __webpack_require__(27);
	
	var find = __webpack_require__(28);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(17);
	
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(17);
	
	var Init = __webpack_require__(16);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
		return new Init(html2nodeList(html));
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(16);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
		return new Init(s, context)[0];
	}

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(23);
	
	var is = __webpack_require__(24);
	
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
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
		nodeIndex: 0,
		allEvents: {}
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
		var node = this[0];
		return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(23);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(16);
	
	var data = __webpack_require__(23);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(16);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(16);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(30);
	
	var set = __webpack_require__(7);
	
	var addListener = __webpack_require__(32);
	
	function runMatreshkaHandler(node, propDef, binder, options, evt) {
		var v = propDef.value,
	
		// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
		_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
		    i;
	
		if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;
	
		var _options = {
			value: v
		};
	
		for (i in options) {
			_options[i] = options[i];
		}
	
		binder.setValue.call(node, v, _options);
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
	
		var options = {
			self: object,
			key: key,
			$nodes: $nodes,
			node: node
		};
		var isUndefined = typeof propDef.value == 'undefined';
		var binder = void 0;
		var mkHandler = void 0;
	
		if (givenBinder !== null) {
			var foundBinder = lookForBinder(node);
	
			if (foundBinder) {
				if (givenBinder) {
					var _result = foundBinder;
	
					for (var _source2 = givenBinder, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
						_key2 = _keys2[_i2];
						_result[_key2] = _source2[_key2];
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
	
		/* TODO if (binder.initialize) { ... }*/
	
		if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
			var value = getValue.call(node, options);
			isUndefined = typeof val == 'undefined';
	
			var _result2 = {
				fromNode: true
			};
	
			for (var _source4 = evt, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
				_key4 = _keys4[_i4];
				_result2[_key4] = _source4[_key4];
			}
	
			set(object, key, value, _result2);
		}
	
		if (setValue) {
			mkHandler = function () {
				return runMatreshkaHandler(node, propDef, binder, options, evt);
			};
	
			if (evt.debounce) {
				mkHandler = util.debounce(mkHandler);
			}
			console.log(1);
			addListener(object, '_change:bindings:' + key, mkHandler, null, { node: node });
	
			!isUndefined && mkHandler();
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(31);
	
	module.exports = function (node) {
	    var result, i;
	
	    for (i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(15);
	
	var simulateClick = __webpack_require__(36);
	
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
	describe('bQuery.fn.not', function () {
		it('checks className', function () {
			var el = document.createElement('div');
			el.className = 'el';
	
			expect($(el).is('.el')).toEqual(true);
	
			expect($(el).is('.el2')).toEqual(false);
		});
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
	describe('bQuery.one', function () {
		it('finds', function () {
			var testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t<div class="child">\n\t\t\t<div class="grandchild"></div>\n\t\t</div>\n\t\t<div class="child2">\n\t\t\t<div class="grandchild2"></div>\n\t\t</div>\n\t\t';
	
			var child = testSandbox.querySelector('.child');
	
			expect($.one('*', testSandbox)).toEqual(child);
		});
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(15);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(44);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(18);
	
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(47);
	
	var undelegateListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(50);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(32);
	
	var undelegateListener = __webpack_require__(48);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var removeListener = __webpack_require__(49);
	
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(32);
	
	var delegateListener = __webpack_require__(47);
	
	var undelegateListener = __webpack_require__(48);
	
	var removeListener = __webpack_require__(49);
	
	var makeObject = __webpack_require__(50);
	
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(32);
	
	var removeListener = __webpack_require__(49);
	
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
/* 53 */
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
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 29,
		"./_bindings/defaultbinders.js": 31,
		"./_bindings/getnodes.js": 11,
		"./_bindings/lookforbinder.js": 30,
		"./_bindings/selectnodes.js": 12,
		"./_core/defineprop.js": 6,
		"./_core/defs.js": 5,
		"./_core/init.js": 4,
		"./_dom/default-dollar.js": 14,
		"./_dom/index.js": 13,
		"./_events/addlistener.js": 32,
		"./_events/delegatelistener.js": 47,
		"./_events/removelistener.js": 49,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 48,
		"./_util/checkobjecttype.js": 9,
		"./_util/matreshkaerror.js": 10,
		"./array.js": 56,
		"./binders.js": 57,
		"./bindnode.js": 3,
		"./bquery/_data.js": 23,
		"./bquery/_html2nodelist.js": 17,
		"./bquery/_init.js": 16,
		"./bquery/add.js": 26,
		"./bquery/create.js": 21,
		"./bquery/find.js": 28,
		"./bquery/index.js": 15,
		"./bquery/is.js": 24,
		"./bquery/not.js": 27,
		"./bquery/off.js": 25,
		"./bquery/on.js": 22,
		"./bquery/one.js": 20,
		"./bquery/parsehtml.js": 19,
		"./class.js": 44,
		"./extend.js": 18,
		"./get.js": 58,
		"./index.js": 59,
		"./magic.js": 62,
		"./matreshka/index.js": 60,
		"./object.js": 61,
		"./on.js": 63,
		"./set.js": 7
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
	webpackContext.id = 55;


/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = get;
	function get(object, key) {
		return object[key];
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(60);
	
	var MatreshkaArray = __webpack_require__(56);
	
	var MatreshkaObject = __webpack_require__(61);
	
	var Class = __webpack_require__(44);
	
	var binders = __webpack_require__(57);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(18);
	
	var Class = __webpack_require__(44);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDI4ZjAxMjEzOGUwMGEzOTQ4MTQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL2dldG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3Mvc2VsZWN0bm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29mZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L25vdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvbWFrZW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYyAuKlxcLmpzJCIsIndlYnBhY2s6Ly8vLi9zcmMvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QU4sQ0FBcEQsQ0FoVTJDO0VBQU4sQ0FBdEMsQzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHVEQUF1RDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O2tCQ3ZEZSxFOzs7Ozs7OztrQkNBQSxFOzs7Ozs7OztrQkNBUztBQUFULFVBQVMsR0FBVCxDQUFhLE1BQWIsRUFBcUIsR0FBckIsRUFBMEI7QUFDeEMsU0FBTyxPQUFPLEdBQVAsQ0FBUCxDQUR3Qzs7Ozs7Ozs7O3FDQ0FuQjs7MENBQ0s7OzJDQUNDOztpQ0FDVjs7bUNBQ0U7O0FBRXBCLFdBQVUsS0FBVixHQUFrQixjQUFsQjtBQUNBLFdBQVUsTUFBVixHQUFtQixlQUFuQjtBQUNBLFdBQVUsS0FBVixHQUFrQixLQUFsQjtBQUNBLFdBQVUsT0FBVixHQUFvQixPQUFwQjs7a0JBRWUsVTs7Ozs7Ozs7a0NDWEk7O2lDQUNEOztrQkFFSCxNQUFNOzs7RUFBTixFQUdaOztBQUVGLGdCQUZFO0VBSFksRTs7Ozs7Ozs7a0JDSEEsRTs7Ozs7Ozs7a0JDQUEsRTs7Ozs7Ozs7OztrQkNHUztBQUFULFVBQVMsRUFBVCxHQUFjLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0MjhmMDEyMTM4ZTAwYTM5NDgxNFxuICoqLyIsIi8vIFRoaXMgZ2V0cyByZXBsYWNlZCBieSBrYXJtYSB3ZWJwYWNrIHdpdGggdGhlIHVwZGF0ZWQgZmlsZXMgb24gcmVidWlsZFxuY29uc3QgX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fID0gW107XG5cbi8vIHJlcXVpcmUgYWxsIG1vZHVsZXMgZW5kaW5nIGluIFwiX3Rlc3RcIiBmcm9tIHRoZVxuLy8gY3VycmVudCBkaXJlY3RvcnkgYW5kIGFsbCBzdWJkaXJlY3Rvcmllc1xuY29uc3QgdGVzdHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuL3NwZWMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5cbmZ1bmN0aW9uIGluTWFuaWZlc3QocGF0aCkge1xuXHRyZXR1cm4gX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fLmluZGV4T2YocGF0aCkgPj0gMDtcbn1cblxubGV0IHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKS5maWx0ZXIoaW5NYW5pZmVzdCk7XG5cbi8vIFJ1biBhbGwgdGVzdHMgaWYgd2UgZGlkbid0IGZpbmQgYW55IGNoYW5nZXNcbmlmICghcnVubmFibGUubGVuZ3RoKSB7XG5cdHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKTtcbn1cblxucnVubmFibGUuZm9yRWFjaCh0ZXN0c0NvbnRleHQpO1xuXG5cbmNvbnN0IGNvbXBvbmVudHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9zcmMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5jb21wb25lbnRzQ29udGV4dC5rZXlzKCkuZm9yRWFjaChjb21wb25lbnRzQ29udGV4dCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvaW5kZXguanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYnF1ZXJ5L2FkZF9zcGVjLmpzXCI6IDMzLFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXCI6IDM0LFxuXHRcIi4vYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXCI6IDM1LFxuXHRcIi4vYnF1ZXJ5L2ZpbmRfc3BlYy5qc1wiOiAzNyxcblx0XCIuL2JxdWVyeS9pbml0X3NwZWMuanNcIjogMzgsXG5cdFwiLi9icXVlcnkvaXNfc3BlYy5qc1wiOiAzOSxcblx0XCIuL2JxdWVyeS9ub3Rfc3BlYy5qc1wiOiA0MCxcblx0XCIuL2JxdWVyeS9vbmVfc3BlYy5qc1wiOiA0MSxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1wiOiA0Mixcblx0XCIuL2NsYXNzX3NwZWMuanNcIjogNDMsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1wiOiA0NSxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1wiOiA0Nixcblx0XCIuL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcIjogNTEsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1wiOiA1Mixcblx0XCIuL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcIjogNTMsXG5cdFwiLi9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1wiOiA1NFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Rlc3Qvc3BlYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG4vKmltcG9ydCBtYWdpYyBmcm9tICdtYXRyZXNoa2EtbWFnaWMnO1xuaW1wb3J0IE1LIGZyb20gJ21hdHJlc2hrYSc7XG5pbXBvcnQgJCBmcm9tICdicXVlcnknO1xubGV0IHEgPSAocywgYykgPT4gJChzLCBjKVswXSB8fCBudWxsO1xuXG5sZXQgYmluZElucHV0ID0gKG9iaiwga2V5LCBldnQpID0+IHtcblx0bGV0IGlucHV0ID0gJC5jcmVhdGUoJ2lucHV0JyksXG5cdFx0YmluZGVyID0ge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMuX29ua2V5dXAgPSBjYmM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldFZhbHVlKHYpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHY7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRpZihvYmogaW5zdGFuY2VvZiBNSykge1xuXHRcdG9iai5iaW5kTm9kZShrZXksIGlucHV0LCBiaW5kZXIsIGV2dCk7XG5cdH0gZWxzZSB7XG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCBrZXksIGlucHV0LCBiaW5kZXIsIGV2dCk7XG5cdH1cblxuXG5cdHJldHVybiBpbnB1dDtcbn07Ki9cblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuXHRsZXQgb2JqO1xuXHRsZXQgbm9kZTtcblx0bGV0IGJpbmRlcjtcblx0bGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGJpbmRlciA9ICB7XG5cdFx0XHRvbihjYmMpIHtcblx0XHRcdFx0c2ltdWxhdGVEb21FdmVudCA9IGNiYztcblx0XHRcdH0sXG5cdFx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdFx0cmV0dXJuIG5vZGUudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0VmFsdWUodikge1xuXHRcdFx0XHRub2RlLnZhbHVlID0gdjtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQnLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXInO1xuXHRcdHNpbXVsYXRlRG9tRXZlbnQoKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCBiaW5kIGFuZCBjYWxsIGluaXRpYWxpemUnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSAkLmNyZWF0ZSgnaW5wdXQnKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdE1LLmJpbmROb2RlKG9iaiwgJ3gnLCBpbnB1dCwge1xuXHRcdFx0aW5pdGlhbGl6ZSgpIHtcblx0XHRcdFx0Ym9vbCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdGV4cGVjdChib29sKS50b0VxdWFsKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dDEgPSBiaW5kSW5wdXQob2JqLCAneCcpLFxuXHRcdFx0aW5wdXQyID0gYmluZElucHV0KG9iaiwgJ3knKTtcblxuXHRcdG1hZ2ljLnVuYmluZE5vZGUob2JqLCAneCB5JywgW2lucHV0MSwgaW5wdXQyXSk7XG5cblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdG9iai55ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0MS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0ZXhwZWN0KGlucHV0Mi52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0aW5wdXQxLnZhbHVlID0gJ2Jheic7XG5cdFx0aW5wdXQyLnZhbHVlID0gJ3F1eCc7XG5cdFx0aW5wdXQxLl9vbmtleXVwKHt9KTtcblx0XHRpbnB1dDIuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG9iai55KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0MSA9IGJpbmRJbnB1dChvYmosICd4JyksXG5cdFx0XHRpbnB1dDIgPSBiaW5kSW5wdXQob2JqLCAneScpO1xuXG5cdFx0bWFnaWMudW5iaW5kTm9kZShvYmosIHtcblx0XHRcdHg6IGlucHV0MSxcblx0XHRcdHk6IGlucHV0MlxuXHRcdH0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRvYmoueSA9ICdiYXInO1xuXHRcdGV4cGVjdChpbnB1dDEudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGV4cGVjdChpbnB1dDIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0MS52YWx1ZSA9ICdiYXonO1xuXHRcdGlucHV0Mi52YWx1ZSA9ICdxdXgnO1xuXHRcdGlucHV0MS5fb25rZXl1cCh7fSk7XG5cdFx0aW5wdXQyLl9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGV4cGVjdChvYmoueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCdzaG91bGQgYmluZCB2aWEgTWF0cmVzaGthIGluc3RhbmNlIG1ldGhvZCcsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChtaywgJ3gnKTtcblxuXHRcdG1rLnggPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChtay54KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgdmlhIE1hdHJlc2hrYSBpbnN0YW5jZSBtZXRob2QnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aW5wdXQxID0gYmluZElucHV0KG1rLCAneCcpLFxuXHRcdFx0aW5wdXQyID0gYmluZElucHV0KG1rLCAneScpO1xuXG5cdFx0bWsudW5iaW5kTm9kZSgneCB5JywgW2lucHV0MSwgaW5wdXQyXSk7XG5cblx0XHRtay54ID0gJ2Zvbyc7XG5cdFx0bWsueSA9ICdiYXInO1xuXHRcdGV4cGVjdChpbnB1dDEudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGV4cGVjdChpbnB1dDIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0MS52YWx1ZSA9ICdiYXonO1xuXHRcdGlucHV0Mi52YWx1ZSA9ICdxdXgnO1xuXHRcdGlucHV0MS5fb25rZXl1cCh7fSk7XG5cdFx0aW5wdXQyLl9vbmtleXVwKHt9KTtcblx0XHRleHBlY3QobWsueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG1rLnkpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIGJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56Jyk7XG5cblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKTtcblxuXHRcdG1hZ2ljLnVuYmluZE5vZGUob2JqLCAneC55LnonLCBpbnB1dCk7XG5cblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2ZvbycpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56Jyk7XG5cblx0XHRvYmoueCA9IHtcblx0XHRcdHk6IHtcblx0XHRcdFx0ejogJ2Zvbydcblx0XHRcdH1cblx0XHR9O1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdHhpdCgnc2hvdWxkIHJlbW92ZSBiaW5kaW5nIGlmIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56JyksXG5cdFx0XHR4ID0gb2JqLng7XG5cblx0XHRvYmoueCA9IHtcblx0XHRcdHk6IHtcblx0XHRcdFx0ejogJ2Zvbydcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cblx0XHR4LnkueiA9ICdiYXonO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd1c2VzIGN1c3RvbSBzZWxlY3RvcnMgb24gY3VycmVudCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IE1LLnRvKHt4OiB7eTogJ2Zvbyd9fSksXG5cdFx0IFx0ZGl2ID0gJC5jcmVhdGUoJ2RpdicpLFxuXHRcdFx0aW5wdXQgPSBkaXYuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoJ2lucHV0JykpO1xuXG5cdFx0b2JqLmJpbmROb2RlKCdzYW5kYm94JywgZGl2KTtcblx0XHRvYmouYmluZE5vZGUoJ3gueScsICc6c2FuZGJveCBpbnB1dCcsIHtcblx0XHRcdG9uKGNiYykge1xuXHRcdFx0XHR0aGlzLl9vbmtleXVwID0gY2JjO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzblxcJ3QgdGhlcmUnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0ZXJyb3IgPSBmYWxzZTtcblxuXHRcdHRyeSB7XG5cdFx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4Jyk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRlcnJvciA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZXhwZWN0KGVycm9yKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kT3B0aW9uYWxOb2RlKG9iaiwgJ3gnKTtcblxuXHRcdGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSztcblxuXHRcdG1rLmJpbmRPcHRpb25hbE5vZGUoJ3gnLCBudWxsKTtcblxuXHRcdGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgncmV0dXJucyBib3VuZCBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jyk7XG5cblxuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy5ib3VuZChvYmosICd4JykpO1xuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy4kYm91bmQob2JqLCAneCcpWzBdKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnc3BhbicpLnRhZ05hbWUpO1xuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS50YWdOYW1lKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxzcGFuPjwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXHR4aXQoJ2NhbmNlbHMgZGVlcCBiaW5kaW5nIHZpYSBkZWVwOiBmYWxzZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICdhLmInLCB7XG5cdFx0XHRcdGRlZXA6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdG9ialsnYS5iJ10gPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmpbJ2EuYiddKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ2FsbG93cyB0byBkZWJvdW5jZSBoYW5kbGVyJywgZG9uZSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneCcsIHtcblx0XHRcdFx0ZGVib3VuY2U6IHRydWVcblx0XHRcdH0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCcnKTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCA0MDApO1xuXHR9KTtcblxuXHR4aXQoJ2FsbG93cyB0byBiaW5kIHNhbmRib3ggdmlhIGJpbmRTYW5kYm94JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGRpdiA9ICQuY3JlYXRlKCdkaXYnKTtcblxuXHRcdE1LLmJpbmRTYW5kYm94KG9iaiwgZGl2KTtcblxuXHRcdGV4cGVjdChNSy5ib3VuZChvYmosICdzYW5kYm94JykpLnRvRXF1YWwoZGl2KTtcblx0fSk7XG5cblxuXHR4aXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHR0cnkge1xuXHRcdFx0TUsuYmluZFNhbmRib3gob2JqLCBudWxsKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdGJvb2wgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGV4cGVjdChib29sKS50b0JlVHJ1dGh5KCk7XG5cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCIvLyBEZWJvdW5jZWQhXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIgPSB7fSwgZXZ0ID0ge30pIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7IG9wdGlvbmFsIH0gPSBldnQ7XG5cbiAgICBpZigha2V5KSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmZhbHN5X2tleScpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogdGhpcy5iaW5kTm9kZShbWydrZXknLCAkKCksIHtvbjonZXZ0J31dLCBbe2tleTogJCgpLCB7b246ICdldnQnfX1dXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwga2V5W2ldWzBdLCBrZXlbaV1bMV0sIGtleVtpXVsyXSB8fCBldnQsIG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5lYWNoKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiB0aGlzLmJpbmROb2RlKCdrZXknLCBbIG5vZGUsIGJpbmRlciBdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICAvLyBub2RlICE9PSB3aW4gaXMgdGhlIG1vc3QgdW5jb21tb24gYnVnZml4IGV2ZXJcbiAgICAvLyB0aGlzIGlzIGFib3V0IGlmcmFtZXMsIENPUlMgYW5kIGRlcHJlY2F0ZWQgRE9NIEFQSS5cbiAgICBpZiAobm9kZSAmJiBub2RlLmxlbmd0aCA9PSAyICYmIG5vZGUgIT09IHdpbiAmJiAhbm9kZVsxXS5ub2RlTmFtZVxuICAgICAgICAgICAgJiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlWzBdLCBub2RlWzFdLCBiaW5kZXIpO1xuICAgIH1cblxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIGlmICghJG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpub2RlX21pc3NpbmcnLCB7IGtleSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICBvYmplY3QuJG5vZGVzW2tleV0gPSBvYmplY3QuJG5vZGVzW2tleV0ubGVuZ3RoXG4gICAgICAgICAgICA/IG9iamVjdC4kbm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG4gICAgICAgIG9iamVjdC5ub2Rlc1trZXldID0gb2JqZWN0LiRub2Rlc1trZXldWzBdO1xuICAgIH1cblxuXG5cbiAgICBpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZ0LFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cblxuICAgIC8qXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgJG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGksIGJpbmRlciwgZXZ0LCBzcGVjaWFsKTtcbiAgICB9XG5cbiAgICBpZiAoIWV2dC5zaWxlbnQpIHtcbiAgICAgICAgX2V2dCA9IHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgJG5vZGVzOiAkbm9kZXMsXG4gICAgICAgICAgICBub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgIF9ldnRbaV0gPSBldnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kJywgX2V2dCk7XG4gICAgfSovXG5cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9pbml0bWsnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3V0aWwvY29tbW9uJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwLCBpbml0TUssIHV0aWwpIHtcblxuXHR2YXIgYmluZE5vZGUgPSBjb3JlLmJpbmROb2RlID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZ0LCBvcHRpb25hbCkge1xuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKlxuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHRpZihrZXkgPT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRyZXR1cm4gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQsIG9wdGlvbmFsKTtcblx0XHR9XG5cblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLFxuXHRcdFx0JG5vZGVzLFxuXHRcdFx0a2V5cyxcblx0XHRcdGksXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0cGF0aCxcblx0XHRcdGxpc3RlbktleSxcblx0XHRcdGNoYW5nZUhhbmRsZXIsXG5cdFx0XHRfZXZ0O1xuXG5cdFx0Lypcblx0XHQgKiB0aGlzLmJpbmROb2RlKFtbJ2tleScsICQoKSwge29uOidldnQnfV0sIFt7a2V5OiAkKCksIHtvbjogJ2V2dCd9fV1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHQgKlxuXHRcdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRiaW5kTm9kZShvYmplY3QsIGtleVtpXVswXSwga2V5W2ldWzFdLCBrZXlbaV1bMl0gfHwgZXZ0LCBub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleTEga2V5MicsIG5vZGUsIGJpbmRlciwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiB+a2V5LmluZGV4T2YoJyAnKSkge1xuXHRcdFx0a2V5cyA9IGtleS5zcGxpdCgvXFxzKy8pO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5c1tpXSwgbm9kZSwgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBrZXkpIHtcblx0XHRcdFx0aWYgKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwgaSwga2V5W2ldLCBub2RlLCBiaW5kZXIsIGV2dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleScsIFsgbm9kZSwgYmluZGVyIF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0Ly8gbm9kZSAhPT0gd2luIGlzIHRoZSBtb3N0IHVuY29tbW9uIGJ1Z2ZpeCBldmVyLiBEb24ndCBhc2sgd2hhdCBkb2VzIGl0IG1lYW4uXG5cdFx0Ly8gVGhpcyBpcyBhYm91dCBpZnJhbWVzLCBDT1JTIGFuZCBkZXByZWNhdGVkIERPTSBBUEkuXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5sZW5ndGggPT0gMiAmJiBub2RlICE9PSB3aW4gJiYgIW5vZGVbMV0ubm9kZU5hbWVcblx0XHRcdFx0JiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcblx0XHRcdHJldHVybiBiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZVswXSwgbm9kZVsxXSwgYmluZGVyLCBvcHRpb25hbCk7XG5cdFx0fVxuXG5cdFx0JG5vZGVzID0gY29yZS5fZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuXHRcdGlmICghJG5vZGVzLmxlbmd0aCkge1xuXHRcdFx0aWYgKG9wdGlvbmFsKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignQmluZGluZyBlcnJvcjogbm9kZSBpcyBtaXNzaW5nIGZvciBcIicgKyBrZXkgKyAnXCIuJyArICh0eXBlb2Ygbm9kZSA9PSAnc3RyaW5nJyA/ICcgVGhlIHNlbGVjdG9yIGlzIFwiJyArIG5vZGUgKyAnXCInIDogJycpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuXHRcdFx0cGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRcdFx0Y2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRldnQgPSBldnQgJiYgZXZ0Lm9yaWdpbmFsRXZlbnQ7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2dCAmJiBldnQudmFsdWUsXG5cdFx0XHRcdFx0aTtcblx0XHRcdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBvYmplY3Q7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXRbcGF0aFtpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmluZE5vZGUodGFyZ2V0LCBwYXRoW3BhdGgubGVuZ3RoIC0gMV0sICRub2RlcywgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblxuXG5cdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnVuYmluZE5vZGUoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5fZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGguc2xpY2UoMCwgcGF0aC5sZW5ndGggLSAyKS5qb2luKCcuJyksXG5cdFx0XHRcdCdjaGFuZ2U6JyArIHBhdGhbcGF0aC5sZW5ndGggLSAyXSwgY2hhbmdlSGFuZGxlcik7XG5cblx0XHRcdGNoYW5nZUhhbmRsZXIoKTtcblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHRldnQgPSBldnQgfHwge307XG5cblx0XHRzcGVjaWFsID0gY29yZS5fZGVmaW5lU3BlY2lhbChvYmplY3QsIGtleSk7XG5cblx0XHRzcGVjaWFsLiRub2RlcyA9IHNwZWNpYWwuJG5vZGVzLmxlbmd0aCA/IHNwZWNpYWwuJG5vZGVzLmFkZCgkbm9kZXMpIDogJG5vZGVzO1xuXG5cdFx0aWYgKG9iamVjdC5pc01LKSB7XG5cdFx0XHRvYmplY3QuJG5vZGVzW2tleV0gPSBzcGVjaWFsLiRub2Rlcztcblx0XHRcdG9iamVjdC5ub2Rlc1trZXldID0gc3BlY2lhbC4kbm9kZXNbMF07XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8ICRub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaSwgYmluZGVyLCBldnQsIHNwZWNpYWwpO1xuXHRcdH1cblxuXHRcdGlmICghZXZ0LnNpbGVudCkge1xuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0XHRub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuXHRcdFx0Y29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmluZCcsIF9ldnQpO1xuXHRcdH1cblxuXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHQkbm9kZXM6ICRub2Rlcyxcblx0XHRcdFx0bm9kZTogbm9kZVxuXHRcdFx0fSxcblx0XHRcdG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2Ygc3BlY2lhbC52YWx1ZSA9PSAndW5kZWZpbmVkJyxcblx0XHRcdF9iaW5kZXIsXG5cdFx0XHRfZXZ0LFxuXHRcdFx0Zm91bmRCaW5kZXIsXG5cdFx0XHRfb3B0aW9ucyxcblx0XHRcdGksXG5cdFx0XHRkb21FdnQsXG5cdFx0XHRta0hhbmRsZXIsXG5cdFx0XHR2YWw7XG5cblxuXG5cblx0XHRpZiAoYmluZGVyID09PSBudWxsKSB7XG5cdFx0XHRfYmluZGVyID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRcdGlmIChiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3IgKGkgaW4gYmluZGVyKSB7XG5cdFx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfYmluZGVyID0gYmluZGVyIHx8IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfYmluZGVyLmluaXRpYWxpemUpIHtcblx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHR2YWx1ZTogc3BlY2lhbC52YWx1ZVxuXHRcdFx0fTtcblx0XHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdH1cblx0XHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblxuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IGV2dFtpXTtcblx0XHRcdH1cblxuXHRcdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsLCBfZXZ0KTtcblx0XHR9XG5cblxuXHRcdGlmIChfYmluZGVyLnNldFZhbHVlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdFx0Ly8gZGlydHkgaGFjayBmb3IgdGhpcyBvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0XHRcdFx0XHRfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHRcdFx0XHRcdGk7XG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG5cdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRcdG1rSGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHRcdH1cblxuXHRcdFx0Y29yZS5fZmFzdEFkZExpc3RlbmVyKG9iamVjdCwgJ19ydW5iaW5kaW5nczonICsga2V5LCBta0hhbmRsZXIsIG51bGwsIHtub2RlOiBub2RlfSk7XG5cblx0XHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0XHR9XG5cblxuXG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiBfYmluZGVyLm9uKSB7XG5cdFx0XHRkb21FdnQgPSB7XG5cdFx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRcdG9uOiBfYmluZGVyLm9uLFxuXHRcdFx0XHRpbnN0YW5jZTogb2JqZWN0LFxuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0bWtIYW5kbGVyOiBta0hhbmRsZXIsXG5cdFx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHRcdHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBvbGR2YWx1ZSxcblx0XHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR3aGljaDogZXZ0LndoaWNoLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHRcdC8vIGhhc093blByb3BlcnR5IGlzIG5vdCByZXF1aXJlZCB0aGVyZVxuXHRcdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRfb3B0aW9uc1tqXSA9IG9wdGlvbnNbal07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSBvbGR2YWx1ZSkge1xuXHRcdFx0XHRcdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkTm9kZTogbm9kZSxcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5kb21FdmVudHMuYWRkKGRvbUV2dCk7XG5cdFx0fVxuXHR9XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQvLz9ub2RlczogY29yZS4kKCksXG5cdFx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdGdldHRlcjogbnVsbCxcblx0XHRcdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRcdFx0Ly8/ZGVzdHJveWVyczogTWFwLFxuXHRcdFx0XHRcdGJpbmRpbmdzOiBbe1xuXHRcdFx0XHRcdFx0bm9kZSxcblx0XHRcdFx0XHRcdGJpbmRlcixcblx0XHRcdFx0XHRcdG5vZGVIYW5kbGVyLFxuXHRcdFx0XHRcdFx0b2JqZWN0SGFuZGxlclxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0qL1xuXHRcdFx0fSxcblx0XHRcdGlkOiBgbWske01hdGgucmFuZG9tKCl9YFxuXHRcdH07XG5cblx0XHRkZWZzLnNldChvYmplY3QsIGRlZik7XG5cdH1cblxuXHRyZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG5cdGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xuXHRpZiAoIW9iamVjdCB8fCB0eXBlICE9PSAnb2JqZWN0Jykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZX0gY2Fubm90IGJlIHVzZWQgaW4gdGhpcyBtZXRob2RgKTtcblx0fVxuXG5cdC8vIGlmIG9iamVjdCBoYXMgX2luaXRNSyBtZXRob2QsIHJ1biBpdFxuXHQvLyBlbHNlIHJ1biBjb21tb25Jbml0XG5cdC8vIGV2ZXJ5IF9pbml0TUsgaW1wbGVtZW50YXRpb24gaGF2ZSB0byBydW4gY29tbW9uSW5pdCBvciBwYXJlbnQncyBfaW5pdE1LXG5cdHJldHVybiBvYmplY3QuX2luaXRNSyA/IG9iamVjdC5faW5pdE1LKCkgOiBjb21tb25Jbml0KG9iamVjdCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9pbml0LmpzXG4gKiovIiwiZnVuY3Rpb24gUHNldWRvTWFwKCkge31cblxuLy8gUHNldWRvTWFwIHNpbXVsYXRlcyBXZWFrTWFwIGJlaGF2aW9yIHdpdGggTygxKSBzZWFyY2ggY29tcGxleGl0eVxuLy8gaXQncyBuZWVkZWQgZm9yIEBJRTkgYW5kIEBJRTEwXG5ub2ZuLmFzc2lnbihQc2V1ZG9NYXAucHJvdG90eXBlLCB7XG5cdGdldChvYmopIHtcblx0XHRyZXR1cm4gb2JqLm1hdHJlc2hrYURhdGE7XG5cdH0sXG5cdHNldChvYmosIGRhdGEpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbWF0cmVzaGthRGF0YScsIHtcblx0XHRcdHZhbHVlOiBkYXRhLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdFx0fSk7XG5cdH0sXG5cdGhhcyhvYmopIHtcblx0XHRyZXR1cm4gJ21hdHJlc2hrYURhdGEnIGluIG9iajtcblx0fVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IG5ldyBQc2V1ZG9NYXAoKSA6IG5ldyBXZWFrTWFwKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVQcm9wKG9iamVjdCwga2V5KSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gZG8gbm90aGluZ1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGlmICghZGVmLnByb3BzW2tleV0pIHtcblx0XHRjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzW2tleV0gPSB7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdGJpbmRpbmdzOiBudWxsXG5cdFx0fTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0KHYpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BEZWYuc2V0dGVyID8gcHJvcERlZi5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBkZWY7XG59XG5cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRjb3JlLl9kZWZpbmVTcGVjaWFsID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vQWNjZXNzb3JzKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhbWFwLmhhcyhvYmplY3QpKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XTtcblxuXHRcdGlmICghc3BlY2lhbFByb3BzKSB7XG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XSA9IHtcblx0XHRcdFx0JG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0bWVkaWF0b3I6IG51bGxcblx0XHRcdH07XG5cblx0XHRcdGlmICghbm9BY2Nlc3NvcnMgJiYga2V5ICE9ICdzYW5kYm94Jykge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNwZWNpYWxQcm9wcy5nZXR0ZXIgPyBzcGVjaWFsUHJvcHMuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHNwZWNpYWxQcm9wcy52YWx1ZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24odikge1xuXHRcdFx0XHRcdFx0c3BlY2lhbFByb3BzLnNldHRlciA/IHNwZWNpYWxQcm9wcy5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogY29yZS5zZXQob2JqZWN0LCBrZXksIHYsIHtcblx0XHRcdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3BlY2lhbFByb3BzO1xuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuLy8gd2UgbmVlZCB0byBjb21wYXJlIHZhbHVlcyBjb3JyZWN0bHlcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcbmNvbnN0IGlzID0gT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cbi8vIHRoZSBmdW5jdGlvbiBzZXRzIG5ldyB2YWx1ZSBmb3IgYSBwcm9wZXJ0eVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgZXZ0ID0ge30pIHtcbiAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnc2V0Jyk7XG5cbiAgICAvLyBpZiBubyBrZXkgb3IgZmFsc3kga2V5IGlzIGdpdmVuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghZGVmKSB7XG5cdFx0b2JqZWN0W2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Y29uc3QgeyBwcm9wcywgZXZlbnRzIH0gPSBkZWY7XG5cdGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgLy8gYWxsb3cgdG8gdXNlIGtleS12YWx1ZSBvYmplY3QgYXMgYW5vdGhlciB2YXJpYXRpb25cblx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcblx0XHRub2ZuLmZvck93bihrZXksIChvYmpWYWwsIG9iaktleSkgPT4gc2V0KG9iamVjdCwgb2JqS2V5LCBvYmpWYWwsIHZhbHVlKSk7XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG4gICAgLy8gaWYgbm8gcHJvcGVydHkgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcblx0aWYgKCFwcm9wRGVmKSB7XG5cdFx0b2JqZWN0W2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Y29uc3QgeyB2YWx1ZTogcHJldmlvdXNWYWx1ZSwgbWVkaWF0b3IgfSA9IHByb3BEZWY7XG5cbiAgICAvLyBwb3NzaWJsZSBmbGFnc1xuXHRjb25zdCB7XG4gICAgICAgIHNraXBNZWRpYXRvcixcbiAgICAgICAgZnJvbU1lZGlhdG9yLFxuICAgICAgICBmb3JjZSxcbiAgICAgICAgZm9yY2VIVE1MLFxuICAgICAgICBzaWxlbnQsXG4gICAgICAgIHNpbGVudEhUTUwsXG4gICAgICAgIHNraXBMaW5rc1xuICAgIH0gPSBldnQ7XG5cblx0bGV0IG5ld1ZhbHVlO1xuXG5cdGlmIChtZWRpYXRvciAmJiAhaXModmFsdWUsIHByZXZpb3VzVmFsdWUpICYmICFza2lwTWVkaWF0b3IgJiYgIWZyb21NZWRpYXRvcikge1xuXHRcdC8vIFRPRE9cblx0XHRuZXdWYWx1ZSA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuXHR9IGVsc2Uge1xuXHRcdG5ld1ZhbHVlID0gdmFsdWU7XG5cdH1cblxuXHRjb25zdCBpc0NoYW5nZWQgPSAhaXMobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpO1xuXG4gICAgLy8gYWRkIHRvIGV2dCBvYmplY3Qgc29tZSB1c2VmdWwgcHJvcGVydGllc1xuXHRjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcblx0XHR2YWx1ZTogbmV3VmFsdWUsXG5cdFx0c2VsZjogb2JqZWN0LFxuXHRcdHByZXZpb3VzVmFsdWUsXG5cdFx0a2V5LFxuXHRcdGlzQ2hhbmdlZFxuXHR9LCBldnQpO1xuXG5cdGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2lsZW50O1xuXG4gICAgLy8gdHJpZ2dlciBiZWZvcmVjaGFuZ2U6S0VZIGFuZCBiZWZvcmVjaGFuZ2UgZXZlbnRzXG5cdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0Y29uc3QgYmVmb3JlY2hhbmdlU3RyID0gJ2JlZm9yZWNoYW5nZSc7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZUV2dE5hbWUgPSBgJHtiZWZvcmVjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cblx0XHRpZihldmVudHNbYmVmb3JlY2hhbmdlRXZ0TmFtZV0pIHtcblx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG5cdFx0fVxuXG5cdFx0aWYoZXZlbnRzW2JlZm9yZWNoYW5nZVN0cl0pIHtcblx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcblx0XHR9XG5cdH1cblxuXHRwcm9wRGVmLnZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAvLyB0cmlnZXIgYmluZGluZ3Ncblx0aWYgKCFzaWxlbnRIVE1MICYmIChpc0NoYW5nZWQgfHwgZm9yY2UgfHwgZm9yY2VIVE1MKSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUgPSBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gO1xuXHRcdGlmKGV2ZW50c1tjaGFuZ2VCaW5kaW5nc0V2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlQmluZGluZ3NFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gdHJpZ2dlciBjaGFuZ2U6S0VZIGFuZCBjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlU3RyID0gJ2NoYW5nZSc7XG4gICAgICAgIGNvbnN0IGNoYW5nZUV2dE5hbWUgPSBgJHtjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cdFx0aWYoZXZlbnRzW2NoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cblx0XHRpZihldmVudHNbY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cdH1cblxuICAgIC8vIHRyaWdnZXIgZGVwZW5kZW5jaWVzIChtYWRlIHdpdGggbGlua1Byb3BzKVxuXHRpZiAoKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNraXBMaW5rcykge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZXBzRXZ0TmFtZSA9IGBfY2hhbmdlOmRlcHM6JHtrZXl9YDtcblx0XHRpZihldmVudHNbY2hhbmdlRGVwc0V2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVwc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICAvLyB0cmlnZ2VyIGRlbGVnYXRlZCBldmVudHMgbG9naWNcbiAgICBpZihpc0NoYW5nZWQpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBpZiAoZXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2V0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG5cdGlmIChldmVudHMpIHtcblx0XHRjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpLFxuXHRcdFx0bCA9IGV2ZW50cy5sZW5ndGgsXG5cdFx0XHRbYTEsIGEyLCBhM10gPSBhcmdzO1xuXG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0ZXY7XG5cblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMTpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAyOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAzOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuXHRpbmZvOiB7fSxcblx0bmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL21hdHJlc2hrYWVycm9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0LCBtZXRob2QpIHtcblx0Y29uc3QgdHlwZW9mT2JqZWN0ID0gb2JqZWN0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIG9iamVjdDtcblxuICAgIGlmKHR5cGVvZk9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2NvbW1vbjpvYmplY3RfdHlwZScsIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZk9iamVjdCxcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcbiAqKi8iLCJjb25zdCBiaW5kaW5nRXJyb3JQcmVmaXggPSAnQmluZGluZyBlcnJvcjonO1xuY29uc3QgZXJyb3JzID0ge1xuXHQnYmluZGluZzpub2RlX21pc3NpbmcnOiAoeyBrZXksIG5vZGUgfSkgPT4ge1xuXHRcdGNvbnN0IHNlbGVjdG9ySW5mbyA9IHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyA/IGAgVGhlIHNlbGVjdG9yIGlzICR7bm9kZX1gIDogJyc7XG5cdFx0cmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gbm9kZSBpcyBtaXNzaW5nIGZvciAke2tleX0uJHtzZWxlY3RvckluZm99YFxuXHR9LFxuXHQnYmluZGluZzpmYWxzeV9rZXknOiAoKSA9PiAnQmluZGluZyBlcnJvcjogXCJrZXlcIiBhcmcgY2Fubm90IGJlIGZhbHN5Jyxcblx0J2NvbW1vbjpvYmplY3RfdHlwZSc6ICh7IHR5cGUsIG1ldGhvZCB9KSA9PiB7XG5cdFx0cmV0dXJuIGBNZXRob2QgXCIke21ldGhvZH1cIiBkb2VzIG5vdCBhY2NlcHQgJHt0eXBlfSBhcyB0YXJnZXQgb2JqZWN0YDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYXRyZXNoa2FFcnJvcihrZXksIGRhdGEpIHtcblx0Y29uc3QgZ2V0RXJyb3IgPSBlcnJvcnNba2V5XTtcblx0aWYoIWdldEVycm9yKSB7XG5cdFx0dGhyb3cgRXJyb3IoYFVua25vd24gZXJyb3IgXCIke2tleX1cImApO1xuXHR9XG5cblx0cmV0dXJuIG5ldyBFcnJvcihlcnJvcnNba2V5XShkYXRhKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuXHRsZXQgbm9kZXM7XG5cdGlmKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhLzwvLnRlc3Qoc2VsZWN0b3IpICYmIC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcilcblx0fSBlbHNle1xuXHRcdG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuXHR9XG5cdHJldHVybiBub2Rlcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZ2V0bm9kZXMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9ycykge1xuXHRcblx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0JCA9IGNvcmUuJCxcblx0XHRyZXN1bHQgPSAkKCksXG5cdFx0ZXhlY1Jlc3VsdCxcblx0XHQkYm91bmQsXG5cdFx0bm9kZSxcblx0XHRzZWxlY3Rvcixcblx0XHRpLCBqLFxuXHRcdHJhbmRvbSxcblx0XHRzdWJTZWxlY3Rvcixcblx0XHRrZXksXG5cdFx0c2VsZWN0ZWQ7XG5cblx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhb2JqZWN0RGF0YSkgcmV0dXJuIHJlc3VsdDtcblxuXHQvLyByZXBsYWNpbmcgOnNhbmRib3ggdG8gOmJvdW5kKHNhbmRib3gpXG5cdHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5zcGxpdCgnLCcpO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRzZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcblxuXHRcdGlmIChleGVjUmVzdWx0ID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLy5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0a2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcblx0XHRcdHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG5cblx0XHRcdC8vIGdldHRpbmcgS0VZIGZyb20gOmJvdW5kKEtFWSlcblx0XHRcdCRib3VuZCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldICYmIG9iamVjdERhdGEuc3BlY2lhbFtrZXldLiRub2Rlcztcblx0XHRcdGlmKCEkYm91bmQgfHwgISRib3VuZC5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuXHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuXHRcdFx0aWYgKHN1YlNlbGVjdG9yKSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuXHRcdFx0XHQvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcblx0XHRcdFx0aWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIHNlbGVjdGluZyBjaGlsZHJlblxuXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCAkYm91bmQubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdG5vZGUgPSAkYm91bmRbal07XG5cdFx0XHRcdFx0XHRyYW5kb20gPSAnbScgKyBjb3JlLnJhbmRvbVN0cmluZygpO1xuXHRcdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tLCByYW5kb20pO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgcmFuZG9tICsgJz1cIicgKyByYW5kb20gKyAnXCJdJyArIHN1YlNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQodXRpbC50b0FycmF5KHNlbGVjdGVkKSk7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKCRib3VuZC5maW5kKHN1YlNlbGVjdG9yKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmdcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3Jcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcblx0JDogZGVmYXVsdERvbGxhclxufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9pbmRleC5qc1xuICoqLyIsIi8qZ2xvYmFsICQqL1xuaW1wb3J0IGJRdWVyeSBmcm9tICcuLi9icXVlcnknO1xuXG5jb25zdCBuZWVkZWRNZXRob2RzID0gJ29uIG9mZiBpcyBhZGQgbm90IGZpbmQnLnNwbGl0KC9cXHMvKTtcblxuY29uc3QgZ2xvYmFsRG9sbGFyID0gdHlwZW9mICQgPT09ICdmdW5jdGlvbicgPyAkIDogbnVsbDtcbmxldCB1c2VHbG9iYWxEb2xsYXIgPSB0cnVlO1xuXG5pZiAoZ2xvYmFsRG9sbGFyKSB7XG5cdGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcblx0XHRcdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFnbG9iYWxEb2xsYXIucGFyc2VIVE1MKSB7XG5cdFx0Z2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG5cdH1cbn0gZWxzZSB7XG5cdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VHbG9iYWxEb2xsYXIgPyBnbG9iYWxEb2xsYXIgOiBiUXVlcnk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG4vLyB0aW55IGpRdWVyeSByZXBsYWNlbWVudCBmb3IgTWF0cmVzaGthXG4vLyBiUXVlcnkgaXMgcmV3cml0dGVuIHZlcnNpb24gb2YgYmFsYWxhaWthLmpzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiUXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0cmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG5cdGZuOiBJbml0LnByb3RvdHlwZSxcblx0ZXh0ZW5kLFxuXHRwYXJzZUhUTUwsXG5cdG9uZSxcblx0Y3JlYXRlXG59KTtcblxubm9mbi5hc3NpZ24oYlF1ZXJ5LmZuLCB7XG5cdG9uLFxuXHRvZmYsXG5cdGlzLFxuXHRhZGQsXG5cdG5vdCxcblx0ZmluZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcblxuLy8gZnVuY3Rpb24tY29uc3RydWN0b3Igb2YgYlF1ZXJ5IGxpYnJhcnlcbi8vIGFjY2VwdHMgbWFueSBraW5kcyBvZiBhcmd1bWVudHMgKHNlbGVjdG9yLCBodG1sLCBmdW5jdGlvbilcbmZ1bmN0aW9uIEJRdWVyeUluaXQoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0bGV0IHJlc3VsdDtcblxuXHRpZiAoc2VsZWN0b3IpIHtcblx0XHRpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuXHRcdFx0cmVzdWx0ID0gW3NlbGVjdG9yXTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmICgvPC8udGVzdChzZWxlY3RvcikpIHtcblx0XHRcdFx0cmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG5cdFx0XHRcdFx0aWYgKG5ld0NvbnRleHQpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7IC8vIHR5cGVvZiBub2RlTGlzdCByZXR1cm5zIFwiZnVuY3Rpb25cIiBpbiBvbGQgV2ViS2l0XG5cdFx0XHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuXHRpZiAobGVuZ3RoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKHJlc3VsdFtpXSk7XG5cdFx0fVxuXHR9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChodG1sKSB7XG5cdC8vIHdyYXBNYXAgaXMgdGFrZW4gZnJvbSBqUXVlcnlcblx0Y29uc3Qgd3JhcE1hcCA9IHtcblx0XHRvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuXHRcdGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG5cdFx0dGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuXHRcdHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcblx0XHR0ZDogWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0Y29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcblx0XHRhcmVhOiBbMSwgJzxtYXA+JywgJzwvbWFwPiddLFxuXHRcdF86IFswLCAnJywgJyddXG5cdH07XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRpO1xuXG5cdGh0bWwgPSBodG1sLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcblxuXHR3cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cdHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG5cdHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cdGNvbnN0IGV4ID0gLzwoW1xcdzpdKykvLmV4ZWMoaHRtbCksXG5cdFx0d3JhcHBlciA9IGV4ICYmIHdyYXBNYXBbZXhbMV1dIHx8IHdyYXBNYXAuXztcblxuXHRub2RlLmlubmVySFRNTCA9IHdyYXBwZXJbMV0gKyBodG1sICsgd3JhcHBlclsyXTtcblxuXHRpID0gd3JhcHBlclswXTtcblxuXHR3aGlsZSAoaS0tKSB7XG5cdFx0bm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG5cdH1cblxuXHRyZXR1cm4gbm9kZS5jaGlsZE5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXG4gKiovIiwiLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZnlsbCBpcyB0YWtlbiB0aGVyZTpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24jUG9seWZpbGxcbi8vIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlXG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG5cdH1cblxuXHRjb25zdCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcblx0Zm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgbmV4dEtleSBpbiBzb3VyY2UpIHtcblx0XHRcdFx0aWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuXHRcdFx0XHRcdG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuXHRyZXR1cm4gbmV3IEluaXQoaHRtbDJub2RlTGlzdChodG1sKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbWF0Y2hlZCBzZXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uZShzLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzLCBjb250ZXh0KVswXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCIvLyBjcmVhdGVzIEhUTUwgZWxlbWVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG5cdGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ29iamVjdCcpIHtcblx0XHRwcm9wcyA9IHRhZ05hbWU7XG5cdFx0dGFnTmFtZSA9IHByb3BzLnRhZ05hbWU7XG5cdH1cblxuXHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cblx0aWYgKHByb3BzKSB7XG5cdFx0bm9mbi5mb3JPd24ocHJvcHMsICh2YWx1ZSwga2V5KSA9PiB7XG5cdFx0XHRpZiAoa2V5ID09PSAnYXR0cmlidXRlcycgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRub2ZuLmZvck93bih2YWx1ZSwgKGF0dHJWYWx1ZSwgYXR0ck5hbWUpID0+IHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgPT09ICdjaGlsZHJlbicgJiYgdmFsdWUpIHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZWxba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgIT09ICd0YWdOYW1lJykge1xuXHRcdFx0XHRlbFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0Y29uc3QgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkucmVwbGFjZSgnMC4nLCAneCcpLFxuXHRcdHNjb3BlU2VsZWN0b3IgPSBgWyR7cmFuZG9tSUR9PVwiJHtyYW5kb21JRH1cIl0gYCxcblx0XHRzcGxpdHRlZFNlbGVjdG9yID0gc2VsZWN0b3Iuc3BsaXQoJywnKTtcblxuXHRsZXQgbWF0Y2hpbmcgPSAnJztcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzZWwgPSBzcGxpdHRlZFNlbGVjdG9yW2ldO1xuXHRcdG1hdGNoaW5nICs9IGAke2kgPT09IDAgPyAnJyA6ICcsJ30ke3Njb3BlU2VsZWN0b3J9JHtzZWx9LCR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0gKmA7XG5cdH1cblxuXG5cdHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cblx0aWYgKGlzLmNhbGwoW2V2dC50YXJnZXRdLCBtYXRjaGluZykpIHtcblx0XHRoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcblx0fVxuXG5cdHRoaXMucmVtb3ZlQXR0cmlidXRlKHJhbmRvbUlEKTtcbn1cblxuLy8gYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNldCBvZiBlbGVtbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0bGV0IGRlbGVnYXRlO1xuXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XG5cdFx0c2VsZWN0b3IgPSBudWxsO1xuXHR9XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0ZGVsZWdhdGUgPSBmdW5jdGlvbiB1bmlxdWVEZWxlZ2F0ZUhhbmRsZXIoZXZ0KSB7XG5cdFx0XHRkZWxlZ2F0ZUhhbmRsZXIuY2FsbCh0aGlzLCBldnQsIHNlbGVjdG9yLCBoYW5kbGVyKTtcblx0XHR9O1xuXHR9XG5cblx0bmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcblx0XHRjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuXHRcdG5hbWUgPSBuYW1lWzBdO1xuXG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gdGhpc1tqXSxcblx0XHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleCxcblx0XHRcdFx0ZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuXHRcdFx0bGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0Y29uc3QgZXZlbnQgPSBldmVudHNba107XG5cblx0XHRcdFx0aWYgKGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0ZXhpc3QgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZXhpc3QpIHtcblx0XHRcdFx0ZXZlbnRzLnB1c2goe1xuXHRcdFx0XHRcdGRlbGVnYXRlLFxuXHRcdFx0XHRcdGhhbmRsZXIsXG5cdFx0XHRcdFx0bmFtZXNwYWNlLFxuXHRcdFx0XHRcdHNlbGVjdG9yXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb24uanNcbiAqKi8iLCIvLyBzaGFyZSBkYXRhIGJldHdlZW4gYXMgYW4gb2JqZWN0IG1vZHVsZXMgYmVjYXVzZSB3ZSB1c2Vcbi8vIHNpbXBsaWZpZWQgZXMgbW9kdWxlcyB0aGVyZSBhbmQgY2Fubm90IGltcG9ydCBhbmQgc2hhcmUgYSBudW1iZXJcbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9kZUluZGV4OiAwLFxuXHRhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG5cdGNvbnN0IG5vZGUgPSB0aGlzWzBdO1xuXHRyZXR1cm4gbm9kZVxuXHRcdD8gKG5vZGUubWF0Y2hlc1xuXHRcdFx0fHwgbm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUubW96TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgcykgOiBmYWxzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pcy5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyByZW1vdmVzIGV2ZW50IGhhbmRsZXIgZnJvbSBhIHNldCBvZiBlbGVtZW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2ZmKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuXHRcdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdCghaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5oYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmRlbGVnYXRlKVxuXHRcdFx0XHRcdFx0JiYgKCFuYW1lc3BhY2UgfHwgbmFtZXNwYWNlID09PSBldmVudC5uYW1lc3BhY2UpXG5cdFx0XHRcdFx0XHQmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3Rvcilcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcblx0XHRcdFx0XHRcdGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghbmFtZXNwYWNlICYmICFzZWxlY3Rvcikge1xuXHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIGFkZHMgdW5pcXVlIG5vZGVzIHRvIGJRdWVyeSBjb2xsZWN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGQoc2VsZWN0b3IpIHtcblx0Y29uc3QgaWRNYXAgPSB7fTtcblxuXHRsZXQgcmVzdWx0LFxuXHRcdG5vZGVJRCxcblx0XHRub2RlLFxuXHRcdGk7XG5cblx0c2VsZWN0b3IgPSBuZXcgSW5pdChzZWxlY3Rvcik7XG5cblx0aWYgKHRoaXMubGVuZ3RoKSB7XG5cdFx0cmVzdWx0ID0gbmV3IEluaXQodGhpcyk7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bm9kZSA9IHJlc3VsdFtpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZE1hcFtub2RlSURdID0gMTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSBzZWxlY3RvcltpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZiAoIWlkTWFwW25vZGVJRF0pIHtcblx0XHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvYWRkLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGV4Y2x1ZGVzIGVsZW1lbnRzIGZyb20gY3VycmVudCBzZXQgYnkgZ2l2ZW4gc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdChzZWxlY3Rvcikge1xuXHRjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRyZXN1bHQucHVzaCh0aGlzW2ldKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L25vdC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBnZXQgdGhlIGRlc2NlbmRhbnRzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgY3VycmVudCBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50cyxcbi8vIGZpbHRlcmVkIGJ5IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcblx0bGV0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cblx0bm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcblx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblx0fSk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9maW5kLmpzXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL2FkZGxpc3RlbmVyJztcblxuZnVuY3Rpb24gcnVuTWF0cmVzaGthSGFuZGxlcihub2RlLCBwcm9wRGVmLCBiaW5kZXIsIG9wdGlvbnMsIGV2dCkge1xuICAgdmFyIHYgPSBwcm9wRGVmLnZhbHVlLFxuXHQgICAvLyBkaXJ0eSBoYWNrIGZvciB0aGlzIG9uZSBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuXHQgICBfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHQgICBpO1xuXG4gICBpZiAoZXZ0ICYmIGV2dC5jaGFuZ2VkTm9kZSA9PSBub2RlICYmIGV2dC5vbkNoYW5nZVZhbHVlID09IF92KSByZXR1cm47XG5cbiAgIHZhciBfb3B0aW9ucyA9IHtcblx0ICAgdmFsdWU6IHZcbiAgIH07XG5cbiAgIGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdCAgIF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcbiAgIH1cblxuICAgYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG5cdGJpbmRlcjogZ2l2ZW5CaW5kZXIsXG5cdGtleSxcblx0JG5vZGVzLFxuXHRub2RlLFxuXHRldnQsXG5cdHByb3BEZWZcbn0pIHtcblx0Y29uc3QgeyBhc3NpZ25EZWZhdWx0VmFsdWUgfSA9IGV2dDtcblx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRzZWxmOiBvYmplY3QsXG5cdFx0a2V5LFxuXHRcdCRub2Rlcyxcblx0XHRub2RlXG5cdH07XG5cdGxldCBpc1VuZGVmaW5lZCA9IHR5cGVvZiBwcm9wRGVmLnZhbHVlID09ICd1bmRlZmluZWQnO1xuXHRsZXQgYmluZGVyO1xuXHRsZXQgbWtIYW5kbGVyO1xuXG5cdGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdGlmIChmb3VuZEJpbmRlcikge1xuXHRcdFx0aWYgKGdpdmVuQmluZGVyKSB7XG5cdFx0XHRcdG5vZm4uYXNzaWduKGZvdW5kQmluZGVyLCBnaXZlbkJpbmRlcik7XG5cdFx0XHR9XG5cblx0XHRcdGJpbmRlciA9IGZvdW5kQmluZGVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRiaW5kZXIgPSBnaXZlbkJpbmRlcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCB7IGdldFZhbHVlLCBzZXRWYWx1ZSwgb24sIGluaXRpYWxpemUgfSA9IGJpbmRlcjtcblxuXHQvKiBUT0RPIGlmIChiaW5kZXIuaW5pdGlhbGl6ZSkgeyAuLi4gfSovXG5cblx0aWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0c2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oe1xuXHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHR9LCBldnQpKTtcblx0fVxuXG5cdGlmIChzZXRWYWx1ZSkge1xuXHRcdG1rSGFuZGxlciA9ICgpID0+IHJ1bk1hdHJlc2hrYUhhbmRsZXIobm9kZSwgcHJvcERlZiwgYmluZGVyLCBvcHRpb25zLCBldnQpO1xuXG5cdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSB1dGlsLmRlYm91bmNlKG1rSGFuZGxlcik7XG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKDEpO1xuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgJ19jaGFuZ2U6YmluZGluZ3M6JyArIGtleSwgbWtIYW5kbGVyLCBudWxsLCB7bm9kZTogbm9kZX0pO1xuXG5cdFx0IWlzVW5kZWZpbmVkICYmIG1rSGFuZGxlcigpO1xuXHR9XG59XG4vKlxuZnVuY3Rpb24gaW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaW5kZXgsIGJpbmRlciwgZXZ0LCBzcGVjaWFsKSB7XG5cdHZhciBvcHRpb25zID0ge1xuXHRcdFx0c2VsZjogb2JqZWN0LFxuXHRcdFx0a2V5OiBrZXksXG5cdFx0XHQkbm9kZXM6ICRub2Rlcyxcblx0XHRcdG5vZGU6IG5vZGVcblx0XHR9LFxuXHRcdG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuXHRcdGlzVW5kZWZpbmVkID0gdHlwZW9mIHNwZWNpYWwudmFsdWUgPT0gJ3VuZGVmaW5lZCcsXG5cdFx0X2JpbmRlcixcblx0XHRfZXZ0LFxuXHRcdGZvdW5kQmluZGVyLFxuXHRcdF9vcHRpb25zLFxuXHRcdGksXG5cdFx0ZG9tRXZ0LFxuXHRcdG1rSGFuZGxlcixcblx0XHR2YWw7XG5cblxuXG5cblx0aWYgKGJpbmRlciA9PT0gbnVsbCkge1xuXHRcdF9iaW5kZXIgPSB7fTtcblx0fSBlbHNlIHtcblx0XHRmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cblx0XHRpZiAoZm91bmRCaW5kZXIpIHtcblx0XHRcdGlmIChiaW5kZXIpIHtcblx0XHRcdFx0Zm9yIChpIGluIGJpbmRlcikge1xuXHRcdFx0XHRcdGZvdW5kQmluZGVyW2ldID0gYmluZGVyW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdF9iaW5kZXIgPSBmb3VuZEJpbmRlcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0X2JpbmRlciA9IGJpbmRlciB8fCB7fTtcblx0XHR9XG5cdH1cblxuXHRpZiAoX2JpbmRlci5pbml0aWFsaXplKSB7XG5cdFx0X29wdGlvbnMgPSB7XG5cdFx0XHR2YWx1ZTogc3BlY2lhbC52YWx1ZVxuXHRcdH07XG5cdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHR9XG5cdFx0X2JpbmRlci5pbml0aWFsaXplLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXHR9XG5cblx0aWYgKF9iaW5kZXIuZ2V0VmFsdWUgJiYgKGlzVW5kZWZpbmVkICYmIGV2dC5hc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGV2dC5hc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG5cblx0XHRfZXZ0ID0ge1xuXHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHR9O1xuXG5cdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0X2V2dFtpXSA9IGV2dFtpXTtcblx0XHR9XG5cblx0XHR2YWwgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbCwgX2V2dCk7XG5cdH1cblxuXG5cdGlmIChfYmluZGVyLnNldFZhbHVlKSB7XG5cdFx0bWtIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0dmFyIHYgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XS52YWx1ZSxcblx0XHRcdFx0Ly8gZGlydHkgaGFjayBmb3IgdGhpcyBvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0XHRcdFx0X3YgPSBldnQgJiYgdHlwZW9mIGV2dC5vbkNoYW5nZVZhbHVlID09ICdzdHJpbmcnICYmIHR5cGVvZiB2ID09ICdudW1iZXInID8gdiArICcnIDogdixcblx0XHRcdFx0aTtcblxuXHRcdFx0aWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG5cdFx0XHRfb3B0aW9ucyA9IHtcblx0XHRcdFx0dmFsdWU6IHZcblx0XHRcdH07XG5cblx0XHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdH1cblxuXHRcdFx0X2JpbmRlci5zZXRWYWx1ZS5jYWxsKG5vZGUsIHYsIF9vcHRpb25zKTtcblx0XHR9O1xuXG5cdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSB1dGlsLmRlYm91bmNlKG1rSGFuZGxlcik7XG5cdFx0fVxuXG5cdFx0Y29yZS5fZmFzdEFkZExpc3RlbmVyKG9iamVjdCwgJ19ydW5iaW5kaW5nczonICsga2V5LCBta0hhbmRsZXIsIG51bGwsIHtub2RlOiBub2RlfSk7XG5cblx0XHQhaXNVbmRlZmluZWQgJiYgbWtIYW5kbGVyKCk7XG5cdH1cblxuXG5cblxuXHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiBfYmluZGVyLm9uKSB7XG5cdFx0ZG9tRXZ0ID0ge1xuXHRcdFx0bm9kZTogbm9kZSxcblx0XHRcdG9uOiBfYmluZGVyLm9uLFxuXHRcdFx0aW5zdGFuY2U6IG9iamVjdCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0bWtIYW5kbGVyOiBta0hhbmRsZXIsXG5cdFx0XHRoYW5kbGVyOiBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0aWYgKGRvbUV2dC5yZW1vdmVkKSByZXR1cm47XG5cdFx0XHRcdHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRcdGosXG5cdFx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogb2xkdmFsdWUsXG5cdFx0XHRcdFx0XHRkb21FdmVudDogZXZ0LFxuXHRcdFx0XHRcdFx0b3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuXHRcdFx0XHRcdFx0cHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0d2hpY2g6IGV2dC53aGljaCxcblx0XHRcdFx0XHRcdHRhcmdldDogZXZ0LnRhcmdldFxuXHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHQvLyBoYXNPd25Qcm9wZXJ0eSBpcyBub3QgcmVxdWlyZWQgdGhlcmVcblx0XHRcdFx0Zm9yIChqIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRfb3B0aW9uc1tqXSA9IG9wdGlvbnNbal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YWx1ZSA9IF9iaW5kZXIuZ2V0VmFsdWUuY2FsbChub2RlLCBfb3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKHZhbHVlICE9PSBvbGR2YWx1ZSkge1xuXHRcdFx0XHRcdGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuXHRcdFx0XHRcdFx0ZnJvbU5vZGU6IHRydWUsXG5cdFx0XHRcdFx0XHRjaGFuZ2VkTm9kZTogbm9kZSxcblx0XHRcdFx0XHRcdG9uQ2hhbmdlVmFsdWU6IHZhbHVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29yZS5kb21FdmVudHMuYWRkKGRvbUV2dCk7XG5cdH1cbn0qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHRCaW5kZXJzIGZyb20gJy4vZGVmYXVsdGJpbmRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIHJlc3VsdCxcbiAgICAgICAgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBkZWZhdWx0QmluZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0ID0gZGVmYXVsdEJpbmRlcnNbaV0uY2FsbChub2RlLCBub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgW25vZGUgPT4ge1xuXHR2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZSxcblx0XHRiaW5kZXJzID0gdW5kZWZpbmVkLFxuXHRcdGI7XG5cblx0Ly8gVE9ETyBTd2l0Y2gvY2FzZVxuXHRpZiAodGFnTmFtZSA9PSAnSU5QVVQnKSB7XG5cdFx0YiA9IGJpbmRlcnMuaW5wdXQobm9kZS50eXBlKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdURVhUQVJFQScpIHtcblx0XHRiID0gYmluZGVycy50ZXh0YXJlYSgpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1NFTEVDVCcpIHtcblx0XHRiID0gYmluZGVycy5zZWxlY3Qobm9kZS5tdWx0aXBsZSk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnUFJPR1JFU1MnKSB7XG5cdFx0YiA9IGJpbmRlcnMucHJvZ3Jlc3MoKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdPVVRQVVQnKSB7XG5cdFx0YiA9IGJpbmRlcnMub3V0cHV0KCk7XG5cdH1cblxuXHRyZXR1cm4gYjtcbn1dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiZXZ0XCJdIH1dKi9cblxuaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcblxuLy8gcHJvcGVydHkgbW9kaWZpZXIgZXZlbnQgcmVnZXhwXG5jb25zdCBwcm9wTW9kRXZlbnRSZWdcblx0PSAvXl9jaGFuZ2U6ZGVwczp8Xl9jaGFuZ2U6YmluZGluZ3M6fF5fY2hhbmdlOmRlbGVnYXRlZDp8XmNoYW5nZTp8XmJlZm9yZWNoYW5nZTovO1xuXG4vLyBhZGRzIHNpbXBsZSBldmVudCBsaXN0ZW5lclxuLy8gdXNlZCBhcyBjb3JlIG9mIGV2ZW50IGVuZ2luZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG5cdGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGluaXRNSyhvYmplY3QpLFxuXHRcdGN0eCA9IGNvbnRleHQgfHwgb2JqZWN0LFxuXHRcdGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXSxcblx0XHRldnQgPSB7IGNhbGxiYWNrLCBjb250ZXh0LCBjdHgsIG5hbWUsIGluZm8gfTtcblxuXG5cdC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lXG5cdGlmIChldmVudHMpIHtcblx0XHQvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgZGF0YSwgcmV0dXJuIGZhbHNlXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGV2dCA9IGV2ZW50c1tpXTtcblx0XHRcdGlmICgoZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjayB8fCBldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrLl9jYWxsYmFjaylcblx0XHRcdFx0XHQmJiBldnQuY29udGV4dCA9PT0gY29udGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhlIGV2ZW50IGlzbid0IGZvdW5kIGFkZCBpdCB0byB0aGUgZXZlbnQgbGlzdFxuXHRcdGV2ZW50cy5wdXNoKGV2dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUsIGNyZWF0ZSBhcnJheSB3aXRoIG9ubHkgZWJlbnRcblx0XHRhbGxFdmVudHNbbmFtZV0gPSBbZXZ0XTtcblx0fVxuXG5cdGlmIChwcm9wTW9kRXZlbnRSZWcudGVzdChuYW1lKSkge1xuXHRcdC8vIGRlZmluZSBuZWVkZWQgYWNjZXNzb3JzIGZvciBLRVlcblx0XHRkZWZpbmVQcm9wKG9iamVjdCwgbmFtZS5yZXBsYWNlKHByb3BNb2RFdmVudFJlZywgJycpKTtcblx0fVxuXG5cdGlmIChuYW1lWzBdICE9PSAnXycpIHtcblx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYGFkZGV2ZW50OiR7bmFtZX1gLCBldnQpO1xuXHRcdHRyaWdnZXJPbmUob2JqZWN0LCAnYWRkZXZlbnQnLCBldnQpO1xuXHR9XG5cblx0Ly8gaWYgZXZlbnQgaXMgYWRkZWQgcmV0dXJuIHRydWVcblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uYWRkJywgKCkgPT4ge1xuXHRpdCgnYWRkcyBvbmNlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWw1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJChbZWwxLCBlbDIsIGVsM10pLmFkZChbZWwyLCBlbDMsIGVsNCwgZWw1XSlcblx0XHRdKS50b0VxdWFsKFtlbDEsIGVsMiwgZWwzLCBlbDQsIGVsNV0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuY3JlYXRlJywgKCkgPT4ge1xuXHRpdCgnY3JlYXRlcyBlbGVtZW50JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnKS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdESVYnKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgYSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRjbGFzc05hbWU6ICdmb29iYXInXG5cdFx0XHR9KS5jbGFzc05hbWVcblx0XHQpLnRvRXF1YWwoJ2Zvb2JhcicpO1xuXHR9KTtcblxuXHRpdCgnY3JlYXRlcyBjaGlsZGVuJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGNoaWxkcmVuOiBbe1xuXHRcdFx0XHRcdHRhZ05hbWU6ICdzcGFuJ1xuXHRcdFx0XHR9XVxuXHRcdFx0fSkuY2hpbGRyZW5bMF0udGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBhdHRyaWJ1dGUnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRcdGZvbzogJ2Jhcidcblx0XHRcdFx0fVxuXHRcdFx0fSkuZ2V0QXR0cmlidXRlKCdmb28nKVxuXHRcdCkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBvYmplY3Qgd2l0aCB0YWdOYW1lIHByb3BlcnR5JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKHtcblx0XHRcdFx0dGFnTmFtZTogJ2Rpdidcblx0XHRcdH0pLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ0RJVicpO1xuXHR9KTtcblxuXHR4aXQoJ2V4dGVuZHMgZGF0YXNldCBvYmplY3QnLCAoKSA9PiB7XG5cdFx0Ly8gVE9ET1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5pbXBvcnQgc2ltdWxhdGVDbGljayBmcm9tICcuLi8uLi9saWIvc2ltdWxhdGVjbGljayc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgZXZlbnRzJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3gsXG5cdFx0Y2hpbGQxLFxuXHRcdGNoaWxkMixcblx0XHRncmFuZGNoaWxkMSxcblx0XHRoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGQxXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMVwiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+PC9kaXY+XG5cdFx0YDtcblxuXHRcdGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDEnKTtcblx0XHRjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyk7XG5cdFx0Z3JhbmRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZDEnKTtcblxuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0YWZ0ZXJFYWNoKCgpID0+IHtcblx0XHQkKFt0ZXN0U2FuZGJveCwgY2hpbGQxLCBjaGlsZDIsIGdyYW5kY2hpbGQxXSkub2ZmKCdjbGljaycpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIG5hbWVzcGFjZWQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgYnViYmxpbmcgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoY2xpY2sgb24gZ3JhbmRjaGlsZHJlbiknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnRG9lc25cXHQgdHJpZ2dlciB3aGVuIGNsaWNrZWQgb24gd3JvbmcgY2hpbGQnLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDInLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgbm90IHNwZWNpZmllZCwgaGFuZGxlciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0JChjaGlsZDEpLm9uKCdjbGljaycsIGV2dCA9PiBldnQuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsIi8vIHNpbXVsYXRlcyBjbGljayBvbiBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuXHRjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuXHRldnQuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSk7XG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uZmluZCcsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94LFxuXHRcdGdyYW5kQ2hpbGQ7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdGdyYW5kQ2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuXHR9KTtcblxuXHRpdCgnZmluZHMnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQodGVzdFNhbmRib3gpLmZpbmQoJy5ncmFuZGNoaWxkJylcblx0XHRdKS50b0VxdWFsKFtncmFuZENoaWxkXSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG4vLyDQt9Cw0YHRg9C90YPRgtGMINCy0YHQtSDRgdC+0LfQtNCw0L3QuNGPINC90L7QstGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyINCyIGJlZm9yZUVhY2hcbi8vINGA0LXRhNCw0LrRgtC+0YDQuNGC0Yxcbi8vINC90LDQv9C40YHQsNGC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuCAo0LIg0YLQvtC8INGH0LjRgdC70LUg0Lgg0Log0YPQttC1INGA0LXQsNC70LjQt9C+0LLQsNC90L3Ri9C8INGE0YPQvdC60YbQuNGP0LwpXG4vLyDQv9C+0YHQu9C1INCy0YHQtdCz0L4g0L3Rg9C20L3QviDQstC60LvRjtGH0LjRgtGMINC70LjQvdGC0LXRgCDQuCDQv9GA0L7QstC10YDQuNGC0Ywg0LrQvtCy0LXRgNCw0LTQtlxuXG5kZXNjcmliZSgnYlF1ZXJ5IGluaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3g7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTFcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtMlwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyB3aW5kb3cnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwod2luZG93KTtcblx0fSk7XG5cblx0aXQoJ2FjY2VwdHMgZG9jdW1lbnQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJChkb2N1bWVudCk7XG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbChkb2N1bWVudCk7XG5cdH0pO1xuXG5cdGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG5cdFx0ZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdjb252ZXJ0cyBhcnJheS1saWtlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGNoaWxkcmVuID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLFxuXHRcdFx0cmVzdWx0ID0gJChjaGlsZHJlbik7XG5cblx0XHRleHBlY3QoY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKHJlc3VsdC5sZW5ndGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZXhwZWN0KGNoaWxkcmVuW2ldKS50b0VxdWFsKHJlc3VsdFtpXSk7XG5cdFx0fVxuXHR9KTtcblxuXHRpdCgnQ29udmVydHMgb25lIGVsZW1lbnQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKSxcblx0XHRcdHJlc3VsdCA9ICQoZWxlbWVudCk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QoZWxlbWVudCkudG9FcXVhbChyZXN1bHRbMF0pO1xuXHR9KTtcblxuXHRpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoJy50ZXN0LTEnLCB0ZXN0U2FuZGJveCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDEpO1xuXHR9KTtcblxuXHRpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoJy50ZXN0LTEnLCAnLndyb25nLWNvbnRleHQnKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gdXNlIG51bGwnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChudWxsKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gdXNlIHVuZGVmaW5lZCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIGNyZWF0ZSBwbHVnaW5zJywgKCkgPT4ge1xuXHRcdCQuZm4uYlF1ZXJ5UGx1Z2luID0gZnVuY3Rpb24gYlF1ZXJ5UGx1Z2luKCkge1xuXHRcdFx0ZXhwZWN0KFxuXHRcdFx0XHR0aGlzLmxlbmd0aFxuXHRcdFx0KS50b0VxdWFsKFxuXHRcdFx0XHR0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG5cdFx0XHQpO1xuXHRcdH07XG5cblx0XHRzcHlPbigkLmZuLCAnYlF1ZXJ5UGx1Z2luJyk7XG5cblx0XHQkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG5cdFx0ZXhwZWN0KCQuZm4uYlF1ZXJ5UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuXHRpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcblx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGVsLmNsYXNzTmFtZSA9ICdlbCc7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkKGVsKS5pcygnLmVsJylcblx0XHQpLnRvRXF1YWwodHJ1ZSk7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkKGVsKS5pcygnLmVsMicpXG5cdFx0KS50b0VxdWFsKGZhbHNlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuXHRpdCgnZXhjbHVkZXMgYnkgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0ZWwyLmNsYXNzTmFtZSA9ICdlbDInO1xuXG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuXHRcdF0pLnRvRXF1YWwoW2VsMSwgZWwzXSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5vbmUnLCAoKSA9PiB7XG5cdGl0KCdmaW5kcycsICgpID0+IHtcblx0XHRjb25zdCB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDJcIj48L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0Y29uc3QgY2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQnKTtcblxuXHRcdGV4cGVjdChcblx0XHRcdCQub25lKCcqJywgdGVzdFNhbmRib3gpXG5cdFx0KS50b0VxdWFsKGNoaWxkKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LnBhcnNlSFRNTCcsICgpID0+IHtcblx0aXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG5cdFx0ZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdwYXJzZXMgY29udGV4dHVhbCBlbGVtZW50cycsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG5cdFx0ZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IENsYXNzIGZyb20gJ3NyYy9jbGFzcyc7XG5cbmRlc2NyaWJlKCdDbGFzcyBmdW5jdGlvbicsICgpID0+IHtcblx0aXQoJ2FsbG93cyB0byBpbmhlcml0JywgKCkgPT4ge1xuXHRcdGNvbnN0IEEgPSBDbGFzcyh7IGE6IHRydWUgfSksXG5cdFx0XHRCID0gQ2xhc3MoeyBiOiB0cnVlLCBleHRlbmRzOiBBIH0pLFxuXHRcdFx0QyA9IENsYXNzKHsgYzogdHJ1ZSwgZXh0ZW5kczogQiB9KSxcblx0XHRcdGluc3QgPSBuZXcgQztcblxuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQikudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQykudG9CZVRydXRoeSgpO1xuXG5cdFx0ZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0LmIpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdC5jKS50b0JlVHJ1dGh5KCk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBzdGF0aWMgcHJvcHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgQSA9IENsYXNzKHt9LCB7IHN0YXRpY1Byb3A6IHRydWUgfSk7XG5cdFx0ZXhwZWN0KEEuc3RhdGljUHJvcCkudG9CZVRydXRoeSgpO1xuXHR9KTtcblxuXHRpdCgnaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZScsICgpID0+IHtcblx0XHRjb25zdCBpbnN0ID0gbmV3IENsYXNzKHsgYTogdHJ1ZSB9KTtcblx0XHRleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDbGFzcykudG9CZUZhbHN5KCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jbGFzc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuL2V4dGVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENsYXNzKHByb3RvdHlwZSwgc3RhdGljUHJvcHMpIHtcblx0Y29uc3QgQ29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3IgIT09IE9iamVjdFxuXHRcdFx0PyBwcm90b3R5cGUuY29uc3RydWN0b3Jcblx0XHRcdDogZnVuY3Rpb24gRW1wdHlDb25zdHJ1Y3RvcigpIHt9LFxuXHRcdC8vZXh0ZW5kcyBpcyBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cdFx0UGFyZW50ID0gcHJvdG90eXBlLmV4dGVuZHMgfHwgcHJvdG90eXBlLmV4dGVuZCxcblx0XHQvL2luaGVyaXQgcHJvdG8gZnJvbSBjbGFzcyBwYXJlbnQgb3IgZW1wdHkgb2JqZWN0XG5cdFx0cHJvdG8gPSBPYmplY3QuY3JlYXRlKFBhcmVudCA/IFBhcmVudC5wcm90b3R5cGUgOiB7fSk7XG5cblx0ZXh0ZW5kKHByb3RvLCBwcm90b3R5cGUpO1xuXG5cdGlmICh0eXBlb2Ygc3RhdGljUHJvcHMgPT09ICdvYmplY3QnKSB7XG5cdFx0ZXh0ZW5kKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdH1cblxuXHQvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRwcm90by5pbnN0YW5jZU9mID0gZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcblx0XHRyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yO1xuXHR9O1xuXG5cdENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuXG5cdC8vIGlmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2Vcblx0aWYgKHRoaXMgaW5zdGFuY2VvZiBDbGFzcykge1xuXHRcdHJldHVybiBuZXcgQ29uc3RydWN0b3IoKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKE1hdHJlc2hrYS5PYmplY3QgYW5kIE1hdHJlc2hrYS5BcnJheSknLCBmdW5jdGlvbigpIHtcblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe1xuXHRcdFx0YToge31cblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHtcblx0XHRcdGE6IHt9XG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2gobmV3IE1LLkFycmF5KHt9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXVswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2gobmV3IE1LLkFycmF5KHtcblx0XHRcdGE6IHt9XG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0eTogbmV3IE1LLk9iamVjdCh7XG5cdFx0XHRcdGE6IHt9XG5cdFx0XHR9KVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngueS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcblxuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoYmFzaWMpJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IGN0eCxcblx0XHRoYW5kbGVyO1xuXG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0Y3R4ID0ge307XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXG5cdGl0KCdmaXJlcyAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0ge307XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLmMgPSB7fTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKSxcblx0XHRcdGEgPSBvYmouYTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuXHRcdHRyaWdnZXJPbmUoYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKSxcblx0XHRcdGIgPSBvYmouYS5iO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IHt9O1xuXHRcdHRyaWdnZXJPbmUoYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YSA9IG9iai5hO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuXHRcdHRyaWdnZXJPbmUoYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGIgPSBvYmouYS5iO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuXHRcdHRyaWdnZXJPbmUoYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRjID0gb2JqLmEuYztcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi5jID0ge307XG5cdFx0dHJpZ2dlck9uZShjLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2RvZXNuXFwndCByZW1vdmUgY2hhbmdlIGV2ZW50IHdoZW4gdW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcblx0XHRvYmouYS5iLmMgPSA1NTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1c2VzIGNvcnJlY3QgY29udGV4dCBmb3IgZGVsZWdhdGVkIGV2ZW50cycsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXHRcdGxldCBib29sID0gZmFsc2U7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcblx0XHRcdGJvb2wgPSB0aGlzID09PSBjdHg7XG5cdFx0fSwgY3R4KTtcblxuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludCBuby11c2UtYmVmb3JlLWRlZmluZTogW1wiZXJyb3JcIiwgeyBcImZ1bmN0aW9uc1wiOiBmYWxzZSB9XSovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5cbmZ1bmN0aW9uIGNoYW5nZUhhbmRsZXIoe1xuXHRwcmV2aW91c1ZhbHVlLFxuXHR2YWx1ZVxufSwge1xuXHRwYXRoLFxuXHRuYW1lLFxuXHRjYWxsYmFjayxcblx0Y29udGV4dFxufSA9IHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQuaW5mby5kZWxlZ2F0ZWREYXRhKSB7XG5cdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcih2YWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9XG5cblx0aWYgKHByZXZpb3VzVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKHByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcblx0Ly8gaWYgdHlwZW9mIHBhdGggaXMgc3RyaW5nIGFuZCBwYXRoIGlzIG5vdCBlbXB0eSBzdHJpbmcgdGhlbiBzcGxpdCBpdFxuXHRwYXRoID0gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHBhdGggIT09ICcnID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aDtcblxuXHRpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG5cdFx0Ly8gaWYgbm8gcGF0aCB0aGVuIGFkZCBzaW1wbGUgbGlzdGVuZXJcblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0fSBlbHNlIHtcblx0XHQvLyBlbHNlIGRvIGFsbCBtYWdpY1xuXHRcdGNvbnN0IGtleSA9IHBhdGhbMF07XG5cdFx0bGV0IHBhdGhTdHI7XG5cblx0XHRpZiAocGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0XHRwYXRoID0gbm9mbi5zbGljZShwYXRoLCAxKTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoLmpvaW4oJy4nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGF0aCA9IFtdO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVsZWdhdGVkRGF0YSA9IHtcblx0XHRcdHBhdGgsXG5cdFx0XHRuYW1lLFxuXHRcdFx0Y2FsbGJhY2ssXG5cdFx0XHRjb250ZXh0XG5cdFx0fTtcblxuXHRcdC8vIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgXCJzZXRcIlxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWAsIGNoYW5nZUhhbmRsZXIsIG51bGwsIHtcblx0XHRcdGRlbGVnYXRlZERhdGEsXG5cdFx0XHRwYXRoU3RyXG5cdFx0fSk7XG5cblx0XHQvLyBjYWxsIGhhbmRsZXIgbWFudWFsbHlcblx0XHRjaGFuZ2VIYW5kbGVyKHtcblx0XHRcdHZhbHVlOiBvYmplY3Rba2V5XVxuXHRcdH0sIGRlbGVnYXRlZERhdGEpO1xuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9pbml0bWsnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9tYXAnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9zcGVjaWFsZXZ0cmVnJ1xuXSwgZnVuY3Rpb24oY29yZSwgaW5pdE1LLCBtYXAsIHNwZWNpYWxFdnRSZWcpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBfZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX2RlbGVnYXRlTGlzdGVuZXIgPSBmdW5jdGlvbihvYmplY3QsXG5cdCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSkge1xuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHRpbml0TUsob2JqZWN0KTtcblxuXHRcdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdFx0ZXhlY3V0ZWQgPSAvKFteXFwuXSspXFwuKC4qKS8uZXhlYyhwYXRoKSxcblx0XHRcdGYsXG5cdFx0XHRmaXJzdEtleSA9IGV4ZWN1dGVkID8gZXhlY3V0ZWRbMV0gOiBwYXRoLFxuXHRcdFx0Y2hhbmdlS2V5LFxuXHRcdFx0b2JqO1xuXG5cdFx0cGF0aCA9IGV4ZWN1dGVkID8gZXhlY3V0ZWRbMl0gOiAnJztcblxuXHRcdGV2dERhdGEgPSBldnREYXRhIHx8IHt9O1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0ZiA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdFx0KGV2dCAmJiBldnQuYWRkZWQgPyBldnQuYWRkZWQgOiBvYmplY3QpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0XHRpdGVtICYmIF9kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2FkZCcsIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdGYoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRcdHZhciB0YXJnZXQgPSBvYmplY3RbZXZ0LmtleV07XG5cblx0XHRcdFx0XHRcdGlmICh0YXJnZXQgJiYgZXZ0ICYmIChldnQua2V5IGluIG9iamVjdERhdGEua2V5cykpIHtcblx0XHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIodGFyZ2V0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdG9iamVjdC5lYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGYuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2UnLCBmLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZiA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdGlmIChldnQgJiYgZXZ0Ll9zaWxlbnQpIHJldHVybjtcblxuXHRcdFx0XHRcdHZhciB0YXJnZXQgPSBvYmplY3RbZmlyc3RLZXldLFxuXHRcdFx0XHRcdFx0Y2hhbmdlS2V5LFxuXHRcdFx0XHRcdFx0dHJpZ2dlckNoYW5nZSA9IHRydWUsXG5cdFx0XHRcdFx0XHRpLFxuXHRcdFx0XHRcdFx0Y2hhbmdlRXZlbnRzO1xuXG5cdFx0XHRcdFx0ZXZ0RGF0YS5wYXRoID0gcGF0aDtcblxuXHRcdFx0XHRcdGV2dERhdGEucHJldmlvdXNWYWx1ZSA9IGV2dCAmJiBldnQucHJldmlvdXNWYWx1ZSB8fFxuXHRcdFx0XHRcdGV2dERhdGEucHJldmlvdXNWYWx1ZSAmJiBldnREYXRhLnByZXZpb3VzVmFsdWVbZmlyc3RLZXldO1xuXG5cdFx0XHRcdFx0aWYgKGV2dCAmJiBldnQucHJldmlvdXNWYWx1ZSAmJiBtYXAuaGFzKGV2dC5wcmV2aW91c1ZhbHVlKSkge1xuXHRcdFx0XHRcdFx0Y29yZS5fdW5kZWxlZ2F0ZUxpc3RlbmVyKGV2dC5wcmV2aW91c1ZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXQgPT0gJ29iamVjdCcgJiYgdGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcih0YXJnZXQsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc3BlY2lhbEV2dFJlZy50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdFx0XHRjaGFuZ2VLZXkgPSBuYW1lLnJlcGxhY2Uoc3BlY2lhbEV2dFJlZywgJycpO1xuXG5cdFx0XHRcdFx0XHRpZiAoIXBhdGggJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldXG5cdFx0XHRcdFx0XHQhPT0gdGFyZ2V0W2NoYW5nZUtleV0pIHtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlRXZlbnRzID0gbWFwLmdldChldnREYXRhLnByZXZpb3VzVmFsdWUpLmV2ZW50c1tuYW1lXTtcblx0XHRcdFx0XHRcdFx0aWYgKGNoYW5nZUV2ZW50cykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjaGFuZ2VFdmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjaGFuZ2VFdmVudHNbaV0ucGF0aCA9PT0gcGF0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0cmlnZ2VyQ2hhbmdlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRcdFx0XHRcdFx0XHRjb3JlLnNldCh0YXJnZXQsIGNoYW5nZUtleSwgdGFyZ2V0W2NoYW5nZUtleV0sIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvcmNlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0cHJldmlvdXNWYWx1ZTogZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2NoYW5nZUtleV0sXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmV2aW91c09iamVjdDogZXZ0RGF0YS5wcmV2aW91c1ZhbHVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0X3NpbGVudDogdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGYuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlOicgKyBmaXJzdEtleSwgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cblx0XHRcdFx0ZigpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHR9XG5cdH07XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL3JlbW92ZWxpc3RlbmVyJztcbi8vIFJFRkFDVE9SLCBET05UIFRSSUdHRVIgQURERVZFTlQsIFJFTU9WRUVWRU5UXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gcmVtb3ZlIGxpc3RlbmVyXG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdO1xuXHRcdGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcblx0XHRjb25zdCBldmVudHMgPSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG5cdFx0bGV0IHBhdGhTdHI7XG5cblx0XHRpZiAocGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0XHRwYXRoID0gbm9mbi5zbGljZShwYXRoLCAxKTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoLmpvaW4oJy4nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGF0aCA9IFtdO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0Y29uc3QgcmV0YWluID0gW107XG5cdFx0XHRub2ZuLmZvckVhY2goZXZlbnRzLCBldmVudCA9PiB7XG5cdFx0XHRcdGlmIChldmVudC5pbmZvLnBhdGhTdHIgIT09IHBhdGhTdHIpIHtcblx0XHRcdFx0XHRyZXRhaW4ucHVzaChldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAocmV0YWluLmxlbmd0aCkge1xuXHRcdFx0XHRhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0gPSByZXRhaW47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2tleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcblx0XHR9XG5cdH1cbn1cblxuLypcbmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9tYXAnXG5dLCBmdW5jdGlvbihjb3JlLCBtYXApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBfdW5kZWxlZ2F0ZUxpc3RlbmVyID0gY29yZS5fdW5kZWxlZ2F0ZUxpc3RlbmVyID1cblx0IGZ1bmN0aW9uKG9iamVjdCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIGV4ZWN1dGVkID0gLyhbXlxcLl0rKVxcLiguKikvLmV4ZWMocGF0aCksXG5cdFx0XHRmaXJzdEtleSA9IGV4ZWN1dGVkID8gZXhlY3V0ZWRbMV0gOiBwYXRoLFxuXHRcdFx0cCA9IHBhdGgsXG5cdFx0XHRvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdFx0ZXZlbnRzLFxuXHRcdFx0aTtcblxuXHRcdHBhdGggPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzJdIDogJyc7XG5cblx0XHRpZiAoZmlyc3RLZXkpIHtcblx0XHRcdGlmIChmaXJzdEtleSA9PSAnKicpIHtcblx0XHRcdFx0aWYgKG9iamVjdC5pc01LQXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCAnYWRkJywgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRldmVudHMgPSBvYmplY3REYXRhLmV2ZW50cy5hZGQgfHwgW107XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9iamVjdC5pc01LT2JqZWN0KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuY2hhbmdlIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXHRcdFx0XHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCAnY2hhbmdlJywgZXZlbnRzW2ldLmNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG9iamVjdC5lYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdGl0ZW0gJiYgX3VuZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRldmVudHMgPSBvYmplY3REYXRhLmV2ZW50c1snY2hhbmdlOicgKyBmaXJzdEtleV0gfHwgW107XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0Y29yZS5fcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlOicgKyBmaXJzdEtleSwgZXZlbnRzW2ldLmNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHR5cGVvZiBvYmplY3RbZmlyc3RLZXldID09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3RbZmlyc3RLZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29yZS5fcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0fVxuXHR9O1xufSk7XG5cbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG4vLyByZW1vdmVzIHNpbXBsZSBldmVudCBsaXN0ZW5lciB0byBhbiBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cdGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcblx0Y29uc3QgcmV0YWluID0gW107XG5cdGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuXHQvLyBpZiBhbGwgZXZlbnRzIG5lZWQgdG8gYmUgcmVtb3ZlZFxuXHRpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKCFub1RyaWdnZXIpIHtcblx0XHRcdG5vZm4uZm9yT3duKGFsbEV2ZW50cywgKGV2ZW50cywgbmFtZSkgPT4ge1xuXHRcdFx0XHRub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG5cdFx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGV2dC5jYWxsYmFjayxcblx0XHRcdFx0XHRcdGNvbnRleHQ6IGV2dC5jb250ZXh0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuXHRcdGRlZi5ldmVudHMgPSB7fTtcblx0fSBlbHNlIGlmIChldmVudHMpIHtcblx0XHQvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGFyZSBmb3VuZFxuXHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG5cdFx0XHRpZiAoY2FsbGJhY2sgJiYgKGNhbGxiYWNrICE9PSBldnQuY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrICE9PSBldnQuY2FsbGJhY2spXG5cdFx0XHRcdHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuXHRcdFx0XHQvLyBrZWVwIGV2ZW50XG5cdFx0XHRcdHJldGFpbi5wdXNoKGV2dCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCByZW1vdmVFdnREYXRhID0ge1xuXHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGV2dC5jYWxsYmFjayxcblx0XHRcdFx0XHRjb250ZXh0OiBldnQuY29udGV4dFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICghbm9UcmlnZ2VyKSB7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAocmV0YWluLmxlbmd0aCkge1xuXHRcdFx0YWxsRXZlbnRzW25hbWVdID0gcmV0YWluO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgZGVmLmV2ZW50c1tuYW1lXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm47XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBuZXN0ZWQgb2JqZWN0IGJhc2VkIG9uIHBhdGggYW5kIGxhc3RWYWx1ZVxuLy8gZXhhbXBsZTogbWFrZU9iamVjdCgnYS5iLmMnLCA0MikgLT4ge2E6IHtiOiB7YzsgNDJ9fX1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VPYmplY3QocGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuXHRwYXRoID0gcGF0aCA/IHBhdGguc3BsaXQoJy4nKSA6IFtdO1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0bGV0IG9iaiA9IHJlc3VsdCxcblx0XHRrZXk7XG5cblxuXHR3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0a2V5ID0gcGF0aC5zaGlmdCgpO1xuXHRcdG9iaiA9IG9ialtrZXldID0ge307XG5cdH1cblxuXHRvYmpbcGF0aC5zaGlmdCgpXSA9IGxhc3RWYWx1ZTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcblxuZGVzY3JpYmUoJ0NoYW5nZSBldmVudCAoc2ltcGxlIGFuZCBkZWxlZ2F0ZWQpJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgc2ltcGxlJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgc2ltcGxlJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0Lyplc2xpbnQtZGlzYWJsZSAqL1xuXHR4aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jLngnLCAyKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIgPSB7XG5cdFx0XHRjOiB7XG5cdFx0XHRcdHg6IDJcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0b2JqLmEuYi5jID0ge1xuXHRcdFx0eDogMlxuXHRcdH07XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0eGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpID0gMDtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTExKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTEwKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTkpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGV2dCA9PiBpICs9IDFlOCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTcpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU2KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlNCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMyk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMCk7XG5cdFx0b2JqLmEgPSB7XG5cdFx0XHRiOiB7XG5cdFx0XHRcdGM6IHtcblx0XHRcdFx0XHR4OiAyXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMTExMTExMTExMSk7XG5cdH0pO1xuXG5cdHhpdCgnYWNjZXB0cyBudWxsIHRhcmdldCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmEuYiA9IG51bGw7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXHQvKmVzbGludC1lbmFibGUgKi9cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5cbmRlc2NyaWJlKCdFdmVudHMgY29yZTogYWRkTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyLCB0cmlnZ2VyT25lJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IG9iaixcblx0XHRjdHgsXG5cdFx0aGFuZGxlcjtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRvYmogPSB7fTtcblx0XHRjdHggPSB7fTtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcycsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuXHRcdGxldCBpID0gMDtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTApKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTEpKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTIpKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvRXF1YWwoMTExKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKG5vIGFyZ3MpJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgbmFtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjaycsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0JywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHR4aXQoJ3JlbW92ZXMgYnkgaG93VG9SZW1vdmUgKG5vdCBkb2N1bWVudGVkIGNvcmUgZmVhdHVyZSknLCAoKSA9PiB7XG5cdFx0Lyplc2xpbnQtZGlzYWJsZSAqL1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWUsXG5cdFx0XHRvbkRhdGEgPSB7XG5cdFx0XHRcdGhvd1RvUmVtb3ZlKG9uRGF0YSwgb2ZmRGF0YSkge1xuXHRcdFx0XHRcdHJldHVybiBvZmZEYXRhLnggPT09IDQyO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0bWFnaWMuX2FkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDEnLCBmLCBudWxsLCBvbkRhdGEpO1xuXHRcdG1hZ2ljLl9yZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgbnVsbCwgbnVsbCwge1xuXHRcdFx0eDogNDJcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50MScpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXG5cdFx0bWFnaWMuX2FkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDInLCBmLCBudWxsLCBvbkRhdGEpO1xuXHRcdG1hZ2ljLl9yZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgbnVsbCwgbnVsbCwge1xuXHRcdFx0eDogNDNcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50MicpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdFx0Lyplc2xpbnQtZW5hYmxlICovXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cblxueGRlc2NyaWJlKFwiRXZlbnRzIGNvcmU6IF9hZGRET01MaXN0ZW5lciwgX3JlbW92ZURPTUxpc3RlbmVyXCIsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ2QtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwiZC10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImQtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXG5cdGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIGFuZCByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSB0aGVuIGJpbmRzIHRoZW4gcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIERPTSBldmVudCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4JywgMSwgMik7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvcicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvciAoYnViYmxpbmcgdGVzdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGRlbGVnYXRlZCBhbmQgZG9lc25cXCd0IHJlbW92ZSBldmVudHMgZnJvbSBvdGhlciBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ibGFoJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3RyaWdnZXJzIGV2ZW50IHZpYSBcInRyaWdnZXJcIiBtZXRob2QnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRXZlbnRzIHN1bW1hcnkgKG9uLCBvZmYpJywgKCkgPT4ge1xuXHRsZXQgcSA9IChzLCBjKSA9PiB7XG5cdFx0bGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcblx0XHRcdFx0bGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXHRcdFx0XHRldi5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRcImNsaWNrXCIsXG5cdFx0XHRcdFx0dHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuXHRcdFx0XHRcdHdpbmRvdywgbnVsbCxcblx0XHRcdFx0XHQwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG5cdFx0XHRcdFx0MCAvKmxlZnQqLyAsIG51bGxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRsZXQgbm9kZSA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuXHRcdHRhZ05hbWU6ICdESVYnLFxuXHRcdGlkOiAncy10ZXN0Jyxcblx0XHRpbm5lckhUTUw6IGBcblx0XHRcdDxkaXYgaWQ9XCJzLXRlc3QtMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicy10ZXN0LTJcIj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGBcblx0fSkpO1xuXG5cdG5vZGUuY2xpY2sgPSBub2RlLmNsaWNrIHx8IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snKSk7XG5cdH1cblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXHRcdG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHRpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtay5vbignc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0ZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0ZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1rLm9uKCdzb21lZXZlbnQnLCBmKTtcblx0XHRtay5vZmYoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXG5cdGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdhLmIuY0Bzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMub2ZmKG9iaiwgJ2NsaWNrOjp4Jyk7XG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0bWFnaWMub25jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGogPSAwLFxuXHRcdFx0ZjEgPSBldnQgPT4gaSsrLFxuXHRcdFx0ZjIgPSBldnQgPT4gaisrO1xuXG5cdFx0bWFnaWMub25jZShvYmosIHtcblx0XHRcdGZvbzogZjEsXG5cdFx0XHRiYXI6IGYyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBvbmNlIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0bWsub25jZSgnc29tZWV2ZW50JywgZik7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblxuXHRpdCgnb25EZWJvdW5jZSB3b3JrcycsIGRvbmUgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDIwMCk7XG5cblx0XHRtYWdpYy5vbkRlYm91bmNlKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRleHBlY3QoaikudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosIHtcblx0XHRcdGZvbzogZjEsXG5cdFx0XHRiYXI6IGYyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnb25EZWJvdW5jZSB3b3JrcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCBkb25lID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCA4MDApO1xuXG5cdFx0bWsub25EZWJvdW5jZSgnc29tZWV2ZW50JywgZik7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvblwiIGFuZCBcIm9mZlwiJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aGFuZGxlcnMgPSB7XG5cdFx0XHRcdGZvbzogKCkgPT4gaSsrLFxuXHRcdFx0XHRiYXI6ICgpID0+IGkrK1xuXHRcdFx0fTtcblxuXHRcdE1LLm9uKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0TUsudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRNSy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cblx0XHRNSy5vZmYob2JqLCBoYW5kbGVycyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgyKTtcblx0fSk7XG5cblxuXHRpdCgnYWxsb3dzIHRvIGZsaXAgY29udGV4dCBhbmQgdHJpZ2dlck9uSW5pdCAob24pJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdHRoaXNBcmcgPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0TUsub24ob2JqLCAnZm9vJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcblx0XHRcdGkrKztcblx0XHR9LCB0cnVlLCB0aGlzQXJnKTtcblxuXHRcdE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdGhpc0FyZywgdHJ1ZSk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgyKTtcblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXCI6IDI5LFxuXHRcIi4vX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXCI6IDMxLFxuXHRcIi4vX2JpbmRpbmdzL2dldG5vZGVzLmpzXCI6IDExLFxuXHRcIi4vX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcIjogMzAsXG5cdFwiLi9fYmluZGluZ3Mvc2VsZWN0bm9kZXMuanNcIjogMTIsXG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDYsXG5cdFwiLi9fY29yZS9kZWZzLmpzXCI6IDUsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDQsXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDE0LFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAxMyxcblx0XCIuL19ldmVudHMvYWRkbGlzdGVuZXIuanNcIjogMzIsXG5cdFwiLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcIjogNDcsXG5cdFwiLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXCI6IDQ5LFxuXHRcIi4vX2V2ZW50cy90cmlnZ2Vyb25lLmpzXCI6IDgsXG5cdFwiLi9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA0OCxcblx0XCIuL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiA5LFxuXHRcIi4vX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcIjogMTAsXG5cdFwiLi9hcnJheS5qc1wiOiA1Nixcblx0XCIuL2JpbmRlcnMuanNcIjogNTcsXG5cdFwiLi9iaW5kbm9kZS5qc1wiOiAzLFxuXHRcIi4vYnF1ZXJ5L19kYXRhLmpzXCI6IDIzLFxuXHRcIi4vYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXCI6IDE3LFxuXHRcIi4vYnF1ZXJ5L19pbml0LmpzXCI6IDE2LFxuXHRcIi4vYnF1ZXJ5L2FkZC5qc1wiOiAyNixcblx0XCIuL2JxdWVyeS9jcmVhdGUuanNcIjogMjEsXG5cdFwiLi9icXVlcnkvZmluZC5qc1wiOiAyOCxcblx0XCIuL2JxdWVyeS9pbmRleC5qc1wiOiAxNSxcblx0XCIuL2JxdWVyeS9pcy5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9ub3QuanNcIjogMjcsXG5cdFwiLi9icXVlcnkvb2ZmLmpzXCI6IDI1LFxuXHRcIi4vYnF1ZXJ5L29uLmpzXCI6IDIyLFxuXHRcIi4vYnF1ZXJ5L29uZS5qc1wiOiAyMCxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWwuanNcIjogMTksXG5cdFwiLi9jbGFzcy5qc1wiOiA0NCxcblx0XCIuL2V4dGVuZC5qc1wiOiAxOCxcblx0XCIuL2dldC5qc1wiOiA1OCxcblx0XCIuL2luZGV4LmpzXCI6IDU5LFxuXHRcIi4vbWFnaWMuanNcIjogNjIsXG5cdFwiLi9tYXRyZXNoa2EvaW5kZXguanNcIjogNjAsXG5cdFwiLi9vYmplY3QuanNcIjogNjEsXG5cdFwiLi9vbi5qc1wiOiA2Myxcblx0XCIuL3NldC5qc1wiOiA3XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDU1O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldChvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gb2JqZWN0W2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9nZXQuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG5NYXRyZXNoa2EuYmluZGVycyA9IGJpbmRlcnM7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJlc2hrYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3Moe1xuXHQvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuXHQvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXHRleHRlbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWdpYy5qc1xuICoqLyIsIlxuLy8gL14oKFteQF0rKUApPygoLis/KSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8pPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKCkge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=