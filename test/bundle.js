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
	
	var componentsContext = __webpack_require__(56);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 34,
		"./bquery/create_spec.js": 35,
		"./bquery/events_spec.js": 36,
		"./bquery/find_spec.js": 38,
		"./bquery/init_spec.js": 39,
		"./bquery/is_spec.js": 40,
		"./bquery/not_spec.js": 41,
		"./bquery/one_spec.js": 42,
		"./bquery/parsehtml_spec.js": 43,
		"./class_spec.js": 44,
		"./events/delegated_collection_spec.js": 46,
		"./events/delegated_spec.js": 47,
		"./events/events_change_spec.js": 52,
		"./events/events_core_spec.js": 53,
		"./events/events_dom_spec.js": 54,
		"./events/events_summary_spec.js": 55
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
					console.log('ebat ti loh');
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
	
	var getNodes = __webpack_require__(12);
	
	var MatreshkaError = __webpack_require__(10);
	
	var bindSingleNode = __webpack_require__(30);
	
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
		console.log(';yoceee', propDef);
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
	
			addListener(object, '_change:bindings:' + key, objectHandler, null, { node: node });
	
			if (!isUndefined) {
				objectHandler();
			}
		}
	
		if (getValue && on) {
			// TODO use CustomEvent instance instead of an object as default value
			var nodeHandler = function () {
				var domEvent = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
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
				node: node,
				binder: binder,
				objectHandler: objectHandler,
				nodeHandler: nodeHandler
			});
	
			if (typeof on == 'function') {
				on.call(node, nodeHandler, options);
			} else {
				dom.$(node).on(on, nodeHandler);
			}
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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(16);
	
	var simulateClick = __webpack_require__(37);
	
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(45);
	
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
/* 45 */
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
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(48);
	
	var undelegateListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(51);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var undelegateListener = __webpack_require__(49);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var removeListener = __webpack_require__(50);
	
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var delegateListener = __webpack_require__(48);
	
	var undelegateListener = __webpack_require__(49);
	
	var removeListener = __webpack_require__(50);
	
	var makeObject = __webpack_require__(51);
	
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var removeListener = __webpack_require__(50);
	
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
/* 54 */
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
/* 55 */
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
/* 56 */
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
		"./_events/delegatelistener.js": 48,
		"./_events/removelistener.js": 50,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 49,
		"./_util/checkobjecttype.js": 9,
		"./_util/is.js": 11,
		"./_util/matreshkaerror.js": 10,
		"./array.js": 57,
		"./binders.js": 58,
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
		"./class.js": 45,
		"./extend.js": 19,
		"./get.js": 59,
		"./index.js": 60,
		"./magic.js": 63,
		"./matreshka/index.js": 61,
		"./object.js": 62,
		"./on.js": 64,
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
	webpackContext.id = 56;


/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = get;
	function get(object, key) {
		return object[key];
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(61);
	
	var MatreshkaArray = __webpack_require__(57);
	
	var MatreshkaObject = __webpack_require__(62);
	
	var Class = __webpack_require__(45);
	
	var binders = __webpack_require__(58);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
	var Class = __webpack_require__(45);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzMzNDk2Mjc4YThiMDA5ZmVkYTciLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL21ha2VvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRyZXNoa2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFnaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtB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bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzMzNDk2Mjc4YThiMDA5ZmVkYTdcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiAzNCxcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiAzNSxcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiAzNixcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogMzgsXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDM5LFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNDAsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNDEsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNDIsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNDMsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDQ0LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogNDYsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogNDcsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDUyLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNTMsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDU0LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNTVcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcblxuLyppbXBvcnQgbWFnaWMgZnJvbSAnbWF0cmVzaGthLW1hZ2ljJztcbmltcG9ydCBNSyBmcm9tICdtYXRyZXNoa2EnO1xuaW1wb3J0ICQgZnJvbSAnYnF1ZXJ5JztcbmxldCBxID0gKHMsIGMpID0+ICQocywgYylbMF0gfHwgbnVsbDtcblxubGV0IGJpbmRJbnB1dCA9IChvYmosIGtleSwgZXZ0KSA9PiB7XG5cdGxldCBpbnB1dCA9ICQuY3JlYXRlKCdpbnB1dCcpLFxuXHRcdGJpbmRlciA9IHtcblx0XHRcdG9uKGNiYykge1xuXHRcdFx0XHR0aGlzLl9vbmtleXVwID0gY2JjO1xuXHRcdFx0fSxcblx0XHRcdGdldFZhbHVlKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXRWYWx1ZSh2KSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2O1xuXHRcdFx0fVxuXHRcdH07XG5cblx0aWYob2JqIGluc3RhbmNlb2YgTUspIHtcblx0XHRvYmouYmluZE5vZGUoa2V5LCBpbnB1dCwgYmluZGVyLCBldnQpO1xuXHR9IGVsc2Uge1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwga2V5LCBpbnB1dCwgYmluZGVyLCBldnQpO1xuXHR9XG5cblxuXHRyZXR1cm4gaW5wdXQ7XG59OyovXG5cbmRlc2NyaWJlKCdCaW5kaW5ncycsICgpID0+IHtcblx0bGV0IG9iajtcblx0bGV0IG5vZGU7XG5cdGxldCBiaW5kZXI7XG5cdGxldCBzaW11bGF0ZURvbUV2ZW50O1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRiaW5kZXIgPSAge1xuXHRcdFx0b24oY2JjKSB7Y29uc29sZS5sb2coJ2ViYXQgdGkgbG9oJylcblx0XHRcdFx0c2ltdWxhdGVEb21FdmVudCA9IGNiYztcblx0XHRcdH0sXG5cdFx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdFx0cmV0dXJuIG5vZGUudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0VmFsdWUodikge1xuXHRcdFx0XHRub2RlLnZhbHVlID0gdjtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQnLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXInO1xuXHRcdHNpbXVsYXRlRG9tRXZlbnQoKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCBiaW5kIGFuZCBjYWxsIGluaXRpYWxpemUnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSAkLmNyZWF0ZSgnaW5wdXQnKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdE1LLmJpbmROb2RlKG9iaiwgJ3gnLCBpbnB1dCwge1xuXHRcdFx0aW5pdGlhbGl6ZSgpIHtcblx0XHRcdFx0Ym9vbCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdGV4cGVjdChib29sKS50b0VxdWFsKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dDEgPSBiaW5kSW5wdXQob2JqLCAneCcpLFxuXHRcdFx0aW5wdXQyID0gYmluZElucHV0KG9iaiwgJ3knKTtcblxuXHRcdG1hZ2ljLnVuYmluZE5vZGUob2JqLCAneCB5JywgW2lucHV0MSwgaW5wdXQyXSk7XG5cblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdG9iai55ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0MS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0ZXhwZWN0KGlucHV0Mi52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0aW5wdXQxLnZhbHVlID0gJ2Jheic7XG5cdFx0aW5wdXQyLnZhbHVlID0gJ3F1eCc7XG5cdFx0aW5wdXQxLl9vbmtleXVwKHt9KTtcblx0XHRpbnB1dDIuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG9iai55KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0MSA9IGJpbmRJbnB1dChvYmosICd4JyksXG5cdFx0XHRpbnB1dDIgPSBiaW5kSW5wdXQob2JqLCAneScpO1xuXG5cdFx0bWFnaWMudW5iaW5kTm9kZShvYmosIHtcblx0XHRcdHg6IGlucHV0MSxcblx0XHRcdHk6IGlucHV0MlxuXHRcdH0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRvYmoueSA9ICdiYXInO1xuXHRcdGV4cGVjdChpbnB1dDEudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGV4cGVjdChpbnB1dDIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0MS52YWx1ZSA9ICdiYXonO1xuXHRcdGlucHV0Mi52YWx1ZSA9ICdxdXgnO1xuXHRcdGlucHV0MS5fb25rZXl1cCh7fSk7XG5cdFx0aW5wdXQyLl9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGV4cGVjdChvYmoueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCdzaG91bGQgYmluZCB2aWEgTWF0cmVzaGthIGluc3RhbmNlIG1ldGhvZCcsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChtaywgJ3gnKTtcblxuXHRcdG1rLnggPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChtay54KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgdmlhIE1hdHJlc2hrYSBpbnN0YW5jZSBtZXRob2QnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aW5wdXQxID0gYmluZElucHV0KG1rLCAneCcpLFxuXHRcdFx0aW5wdXQyID0gYmluZElucHV0KG1rLCAneScpO1xuXG5cdFx0bWsudW5iaW5kTm9kZSgneCB5JywgW2lucHV0MSwgaW5wdXQyXSk7XG5cblx0XHRtay54ID0gJ2Zvbyc7XG5cdFx0bWsueSA9ICdiYXInO1xuXHRcdGV4cGVjdChpbnB1dDEudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGV4cGVjdChpbnB1dDIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0MS52YWx1ZSA9ICdiYXonO1xuXHRcdGlucHV0Mi52YWx1ZSA9ICdxdXgnO1xuXHRcdGlucHV0MS5fb25rZXl1cCh7fSk7XG5cdFx0aW5wdXQyLl9vbmtleXVwKHt9KTtcblx0XHRleHBlY3QobWsueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG1rLnkpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIGJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56Jyk7XG5cblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKTtcblxuXHRcdG1hZ2ljLnVuYmluZE5vZGUob2JqLCAneC55LnonLCBpbnB1dCk7XG5cblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2ZvbycpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56Jyk7XG5cblx0XHRvYmoueCA9IHtcblx0XHRcdHk6IHtcblx0XHRcdFx0ejogJ2Zvbydcblx0XHRcdH1cblx0XHR9O1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdHhpdCgnc2hvdWxkIHJlbW92ZSBiaW5kaW5nIGlmIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56JyksXG5cdFx0XHR4ID0gb2JqLng7XG5cblx0XHRvYmoueCA9IHtcblx0XHRcdHk6IHtcblx0XHRcdFx0ejogJ2Zvbydcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cblx0XHR4LnkueiA9ICdiYXonO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd1c2VzIGN1c3RvbSBzZWxlY3RvcnMgb24gY3VycmVudCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IE1LLnRvKHt4OiB7eTogJ2Zvbyd9fSksXG5cdFx0IFx0ZGl2ID0gJC5jcmVhdGUoJ2RpdicpLFxuXHRcdFx0aW5wdXQgPSBkaXYuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoJ2lucHV0JykpO1xuXG5cdFx0b2JqLmJpbmROb2RlKCdzYW5kYm94JywgZGl2KTtcblx0XHRvYmouYmluZE5vZGUoJ3gueScsICc6c2FuZGJveCBpbnB1dCcsIHtcblx0XHRcdG9uKGNiYykge1xuXHRcdFx0XHR0aGlzLl9vbmtleXVwID0gY2JjO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzblxcJ3QgdGhlcmUnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0ZXJyb3IgPSBmYWxzZTtcblxuXHRcdHRyeSB7XG5cdFx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4Jyk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRlcnJvciA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZXhwZWN0KGVycm9yKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kT3B0aW9uYWxOb2RlKG9iaiwgJ3gnKTtcblxuXHRcdGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSztcblxuXHRcdG1rLmJpbmRPcHRpb25hbE5vZGUoJ3gnLCBudWxsKTtcblxuXHRcdGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgncmV0dXJucyBib3VuZCBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jyk7XG5cblxuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy5ib3VuZChvYmosICd4JykpO1xuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy4kYm91bmQob2JqLCAneCcpWzBdKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnc3BhbicpLnRhZ05hbWUpO1xuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS50YWdOYW1lKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxzcGFuPjwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXHR4aXQoJ2NhbmNlbHMgZGVlcCBiaW5kaW5nIHZpYSBkZWVwOiBmYWxzZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICdhLmInLCB7XG5cdFx0XHRcdGRlZXA6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdG9ialsnYS5iJ10gPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmpbJ2EuYiddKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ2FsbG93cyB0byBkZWJvdW5jZSBoYW5kbGVyJywgZG9uZSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneCcsIHtcblx0XHRcdFx0ZGVib3VuY2U6IHRydWVcblx0XHRcdH0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCcnKTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCA0MDApO1xuXHR9KTtcblxuXHR4aXQoJ2FsbG93cyB0byBiaW5kIHNhbmRib3ggdmlhIGJpbmRTYW5kYm94JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGRpdiA9ICQuY3JlYXRlKCdkaXYnKTtcblxuXHRcdE1LLmJpbmRTYW5kYm94KG9iaiwgZGl2KTtcblxuXHRcdGV4cGVjdChNSy5ib3VuZChvYmosICdzYW5kYm94JykpLnRvRXF1YWwoZGl2KTtcblx0fSk7XG5cblxuXHR4aXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHR0cnkge1xuXHRcdFx0TUsuYmluZFNhbmRib3gob2JqLCBudWxsKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdGJvb2wgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGV4cGVjdChib29sKS50b0JlVHJ1dGh5KCk7XG5cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCIvLyBEZWJvdW5jZWQhXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIgPSB7fSwgZXZ0ID0ge30pIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7IG9wdGlvbmFsIH0gPSBldnQ7XG5cbiAgICBpZigha2V5KSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmZhbHN5X2tleScpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogdGhpcy5iaW5kTm9kZShbWydrZXknLCAkKCksIHtvbjonZXZ0J31dLCBbe2tleTogJCgpLCB7b246ICdldnQnfX1dXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwga2V5W2ldWzBdLCBrZXlbaV1bMV0sIGtleVtpXVsyXSB8fCBldnQsIG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5lYWNoKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiB0aGlzLmJpbmROb2RlKCdrZXknLCBbIG5vZGUsIGJpbmRlciBdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICAvLyBub2RlICE9PSB3aW4gaXMgdGhlIG1vc3QgdW5jb21tb24gYnVnZml4IGV2ZXJcbiAgICAvLyB0aGlzIGlzIGFib3V0IGlmcmFtZXMsIENPUlMgYW5kIGRlcHJlY2F0ZWQgRE9NIEFQSS5cbiAgICBpZiAobm9kZSAmJiBub2RlLmxlbmd0aCA9PSAyICYmIG5vZGUgIT09IHdpbiAmJiAhbm9kZVsxXS5ub2RlTmFtZVxuICAgICAgICAgICAgJiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlWzBdLCBub2RlWzFdLCBiaW5kZXIpO1xuICAgIH1cblxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIGlmICghJG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpub2RlX21pc3NpbmcnLCB7IGtleSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICBvYmplY3QuJG5vZGVzW2tleV0gPSBvYmplY3QuJG5vZGVzW2tleV0ubGVuZ3RoXG4gICAgICAgICAgICA/IG9iamVjdC4kbm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG4gICAgICAgIG9iamVjdC5ub2Rlc1trZXldID0gb2JqZWN0LiRub2Rlc1trZXldWzBdO1xuICAgIH1cblxuXG5cbiAgICBpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZ0LFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cblxuICAgIC8qXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgJG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGksIGJpbmRlciwgZXZ0LCBzcGVjaWFsKTtcbiAgICB9XG5cbiAgICBpZiAoIWV2dC5zaWxlbnQpIHtcbiAgICAgICAgX2V2dCA9IHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgJG5vZGVzOiAkbm9kZXMsXG4gICAgICAgICAgICBub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgIF9ldnRbaV0gPSBldnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kJywgX2V2dCk7XG4gICAgfSovXG5cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9pbml0bWsnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3V0aWwvY29tbW9uJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwLCBpbml0TUssIHV0aWwpIHtcblxuXHR2YXIgYmluZE5vZGUgPSBjb3JlLmJpbmROb2RlID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZ0LCBvcHRpb25hbCkge1xuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKlxuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHRpZihrZXkgPT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRyZXR1cm4gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQsIG9wdGlvbmFsKTtcblx0XHR9XG5cblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLFxuXHRcdFx0JG5vZGVzLFxuXHRcdFx0a2V5cyxcblx0XHRcdGksXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0cGF0aCxcblx0XHRcdGxpc3RlbktleSxcblx0XHRcdGNoYW5nZUhhbmRsZXIsXG5cdFx0XHRfZXZ0O1xuXG5cdFx0Lypcblx0XHQgKiB0aGlzLmJpbmROb2RlKFtbJ2tleScsICQoKSwge29uOidldnQnfV0sIFt7a2V5OiAkKCksIHtvbjogJ2V2dCd9fV1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHQgKlxuXHRcdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRiaW5kTm9kZShvYmplY3QsIGtleVtpXVswXSwga2V5W2ldWzFdLCBrZXlbaV1bMl0gfHwgZXZ0LCBub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleTEga2V5MicsIG5vZGUsIGJpbmRlciwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiB+a2V5LmluZGV4T2YoJyAnKSkge1xuXHRcdFx0a2V5cyA9IGtleS5zcGxpdCgvXFxzKy8pO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5c1tpXSwgbm9kZSwgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBrZXkpIHtcblx0XHRcdFx0aWYgKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwgaSwga2V5W2ldLCBub2RlLCBiaW5kZXIsIGV2dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleScsIFsgbm9kZSwgYmluZGVyIF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0Ly8gbm9kZSAhPT0gd2luIGlzIHRoZSBtb3N0IHVuY29tbW9uIGJ1Z2ZpeCBldmVyLiBEb24ndCBhc2sgd2hhdCBkb2VzIGl0IG1lYW4uXG5cdFx0Ly8gVGhpcyBpcyBhYm91dCBpZnJhbWVzLCBDT1JTIGFuZCBkZXByZWNhdGVkIERPTSBBUEkuXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5sZW5ndGggPT0gMiAmJiBub2RlICE9PSB3aW4gJiYgIW5vZGVbMV0ubm9kZU5hbWVcblx0XHRcdFx0JiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcblx0XHRcdHJldHVybiBiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZVswXSwgbm9kZVsxXSwgYmluZGVyLCBvcHRpb25hbCk7XG5cdFx0fVxuXG5cdFx0JG5vZGVzID0gY29yZS5fZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuXHRcdGlmICghJG5vZGVzLmxlbmd0aCkge1xuXHRcdFx0aWYgKG9wdGlvbmFsKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignQmluZGluZyBlcnJvcjogbm9kZSBpcyBtaXNzaW5nIGZvciBcIicgKyBrZXkgKyAnXCIuJyArICh0eXBlb2Ygbm9kZSA9PSAnc3RyaW5nJyA/ICcgVGhlIHNlbGVjdG9yIGlzIFwiJyArIG5vZGUgKyAnXCInIDogJycpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuXHRcdFx0cGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRcdFx0Y2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRldnQgPSBldnQgJiYgZXZ0Lm9yaWdpbmFsRXZlbnQ7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2dCAmJiBldnQudmFsdWUsXG5cdFx0XHRcdFx0aTtcblx0XHRcdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBvYmplY3Q7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXRbcGF0aFtpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmluZE5vZGUodGFyZ2V0LCBwYXRoW3BhdGgubGVuZ3RoIC0gMV0sICRub2RlcywgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblxuXG5cdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnVuYmluZE5vZGUoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5fZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGguc2xpY2UoMCwgcGF0aC5sZW5ndGggLSAyKS5qb2luKCcuJyksXG5cdFx0XHRcdCdjaGFuZ2U6JyArIHBhdGhbcGF0aC5sZW5ndGggLSAyXSwgY2hhbmdlSGFuZGxlcik7XG5cblx0XHRcdGNoYW5nZUhhbmRsZXIoKTtcblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHRldnQgPSBldnQgfHwge307XG5cblx0XHRzcGVjaWFsID0gY29yZS5fZGVmaW5lU3BlY2lhbChvYmplY3QsIGtleSk7XG5cblx0XHRzcGVjaWFsLiRub2RlcyA9IHNwZWNpYWwuJG5vZGVzLmxlbmd0aCA/IHNwZWNpYWwuJG5vZGVzLmFkZCgkbm9kZXMpIDogJG5vZGVzO1xuXG5cdFx0aWYgKG9iamVjdC5pc01LKSB7XG5cdFx0XHRvYmplY3QuJG5vZGVzW2tleV0gPSBzcGVjaWFsLiRub2Rlcztcblx0XHRcdG9iamVjdC5ub2Rlc1trZXldID0gc3BlY2lhbC4kbm9kZXNbMF07XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8ICRub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaSwgYmluZGVyLCBldnQsIHNwZWNpYWwpO1xuXHRcdH1cblxuXHRcdGlmICghZXZ0LnNpbGVudCkge1xuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0XHRub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuXHRcdFx0Y29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmluZCcsIF9ldnQpO1xuXHRcdH1cblxuXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHQkbm9kZXM6ICRub2Rlcyxcblx0XHRcdFx0bm9kZTogbm9kZVxuXHRcdFx0fSxcblx0XHRcdG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2Ygc3BlY2lhbC52YWx1ZSA9PSAndW5kZWZpbmVkJyxcblx0XHRcdF9iaW5kZXIsXG5cdFx0XHRfZXZ0LFxuXHRcdFx0Zm91bmRCaW5kZXIsXG5cdFx0XHRfb3B0aW9ucyxcblx0XHRcdGksXG5cdFx0XHRkb21FdnQsXG5cdFx0XHRta0hhbmRsZXIsXG5cdFx0XHR2YWw7XG5cblxuXG5cblx0XHRpZiAoYmluZGVyID09PSBudWxsKSB7XG5cdFx0XHRfYmluZGVyID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRcdGlmIChiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3IgKGkgaW4gYmluZGVyKSB7XG5cdFx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfYmluZGVyID0gYmluZGVyIHx8IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfYmluZGVyLmluaXRpYWxpemUpIHtcblx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHR2YWx1ZTogc3BlY2lhbC52YWx1ZVxuXHRcdFx0fTtcblx0XHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdH1cblx0XHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblxuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IGV2dFtpXTtcblx0XHRcdH1cblxuXHRcdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsLCBfZXZ0KTtcblx0XHR9XG5cblxuXHRcdGlmIChfYmluZGVyLnNldFZhbHVlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdFx0Ly8gZGlydHkgaGFjayBmb3IgdGhpcyBvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0XHRcdFx0XHRfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHRcdFx0XHRcdGk7XG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG5cdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRcdG1rSGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHRcdH1cblxuXHRcdFx0Y29yZS5fZmFzdEFkZExpc3RlbmVyKG9iamVjdCwgJ19ydW5iaW5kaW5nczonICsga2V5LCBta0hhbmRsZXIsIG51bGwsIHtub2RlOiBub2RlfSk7XG5cblx0XHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0XHR9XG5cblxuXG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiBfYmluZGVyLm9uKSB7XG5cdFx0XHRkb21FdnQgPSB7XG5cdFx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRcdG9uOiBfYmluZGVyLm9uLFxuXHRcdFx0XHRpbnN0YW5jZTogb2JqZWN0LFxuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0bWtIYW5kbGVyOiBta0hhbmRsZXIsXG5cdFx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHRcdHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBvbGR2YWx1ZSxcblx0XHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR3aGljaDogZXZ0LndoaWNoLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHRcdC8vIGhhc093blByb3BlcnR5IGlzIG5vdCByZXF1aXJlZCB0aGVyZVxuXHRcdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRfb3B0aW9uc1tqXSA9IG9wdGlvbnNbal07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSBvbGR2YWx1ZSkge1xuXHRcdFx0XHRcdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkTm9kZTogbm9kZSxcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5kb21FdmVudHMuYWRkKGRvbUV2dCk7XG5cdFx0fVxuXHR9XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9ICovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQ/IG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdFx0XHQvLz9kZXN0cm95ZXJzOiBNYXAsXG5cdFx0XHRcdFx0YmluZGluZ3M6IFt7XG5cdFx0XHRcdFx0XHRub2RlLFxuXHRcdFx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRcdFx0bm9kZUhhbmRsZXIsXG5cdFx0XHRcdFx0XHRvYmplY3RIYW5kbGVyXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSovXG5cdFx0XHR9LFxuXHRcdFx0aWQ6IGBtayR7TWF0aC5yYW5kb20oKX1gXG5cdFx0fTtcblxuXHRcdGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcblx0fVxuXG5cdHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG5cdGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuXHR9XG5cblx0Ly8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG5cdC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcblx0Ly8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0cmV0dXJuIG9iamVjdC5faW5pdE1LID8gb2JqZWN0Ll9pbml0TUsoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcblx0Z2V0KG9iaikge1xuXHRcdHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcblx0fSxcblx0c2V0KG9iaiwgZGF0YSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuXHRcdFx0dmFsdWU6IGRhdGEsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0XHR9KTtcblx0fSxcblx0aGFzKG9iaikge1xuXHRcdHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0aWYgKCFkZWYucHJvcHNba2V5XSkge1xuXHRcdGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHNba2V5XSA9IHtcblx0XHRcdHZhbHVlOiBvYmplY3Rba2V5XSxcblx0XHRcdGdldHRlcjogbnVsbCxcblx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdG1lZGlhdG9yOiBudWxsLFxuXHRcdFx0YmluZGluZ3M6IG51bGxcblx0XHR9O1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BEZWYuZ2V0dGVyID8gcHJvcERlZi5nZXR0ZXIuY2FsbChvYmplY3QpIDogcHJvcERlZi52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXQodikge1xuXHRcdFx0XHRyZXR1cm4gcHJvcERlZi5zZXR0ZXIgPyBwcm9wRGVmLnNldHRlci5jYWxsKG9iamVjdCwgdikgOiBzZXQob2JqZWN0LCBrZXksIHYsIHtcblx0XHRcdFx0XHRmcm9tU2V0dGVyOiB0cnVlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGRlZjtcbn1cblxuXG4vKmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9tYXAnXG5dLCBmdW5jdGlvbihjb3JlLCBtYXApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGNvcmUuX2RlZmluZVNwZWNpYWwgPSBmdW5jdGlvbihvYmplY3QsIGtleSwgbm9BY2Nlc3NvcnMpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnIHx8ICFtYXAuaGFzKG9iamVjdCkpIHJldHVybiBvYmplY3Q7XG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHNwZWNpYWxQcm9wcyA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldO1xuXG5cdFx0aWYgKCFzcGVjaWFsUHJvcHMpIHtcblx0XHRcdHNwZWNpYWxQcm9wcyA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldID0ge1xuXHRcdFx0XHQkbm9kZXM6IGNvcmUuJCgpLFxuXHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdGdldHRlcjogbnVsbCxcblx0XHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0XHRtZWRpYXRvcjogbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFub0FjY2Vzc29ycyAmJiBrZXkgIT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3BlY2lhbFByb3BzLmdldHRlciA/IHNwZWNpYWxQcm9wcy5nZXR0ZXIuY2FsbChvYmplY3QpIDogc3BlY2lhbFByb3BzLnZhbHVlO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsUHJvcHMuc2V0dGVyID8gc3BlY2lhbFByb3BzLnNldHRlci5jYWxsKG9iamVjdCwgdikgOiBjb3JlLnNldChvYmplY3QsIGtleSwgdiwge1xuXHRcdFx0XHRcdFx0XHRmcm9tU2V0dGVyOiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzcGVjaWFsUHJvcHM7XG5cdH07XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX3V0aWwvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCA9IHt9KSB7XG4gICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuXG4gICAgLy8gaWYgbm8ga2V5IG9yIGZhbHN5IGtleSBpcyBnaXZlblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcbiAgICBpZiAoIWRlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG5cdGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmO1xuXHRjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIC8vIGFsbG93IHRvIHVzZSBrZXktdmFsdWUgb2JqZWN0IGFzIGFub3RoZXIgdmFyaWF0aW9uXG5cdGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG5cdFx0bm9mbi5mb3JPd24oa2V5LCAob2JqVmFsLCBvYmpLZXkpID0+IHNldChvYmplY3QsIG9iaktleSwgb2JqVmFsLCB2YWx1ZSkpO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuICAgIC8vIGlmIG5vIHByb3BlcnR5IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG5cdGlmICghcHJvcERlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG5cdGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3Ncblx0Y29uc3Qge1xuICAgICAgICBza2lwTWVkaWF0b3IsXG4gICAgICAgIGZyb21NZWRpYXRvcixcbiAgICAgICAgZm9yY2UsXG4gICAgICAgIGZvcmNlSFRNTCxcbiAgICAgICAgc2lsZW50LFxuICAgICAgICBzaWxlbnRIVE1MLFxuICAgICAgICBza2lwTGlua3NcbiAgICB9ID0gZXZ0O1xuXG5cdGxldCBuZXdWYWx1ZTtcblxuXHRpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcblx0XHQvLyBUT0RPXG5cdFx0bmV3VmFsdWUgPSBzcGVjaWFsLm1lZGlhdG9yKHYsIHByZXZWYWwsIGtleSwgb2JqZWN0KTtcblx0fSBlbHNlIHtcblx0XHRuZXdWYWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcblx0Y29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG5cdFx0dmFsdWU6IG5ld1ZhbHVlLFxuXHRcdHNlbGY6IG9iamVjdCxcblx0XHRwcmV2aW91c1ZhbHVlLFxuXHRcdGtleSxcblx0XHRpc0NoYW5nZWRcblx0fSwgZXZ0KTtcblxuXHRjb25zdCB0cmlnZ2VyQ2hhbmdlID0gKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNpbGVudDtcblxuICAgIC8vIHRyaWdnZXIgYmVmb3JlY2hhbmdlOktFWSBhbmQgYmVmb3JlY2hhbmdlIGV2ZW50c1xuXHRpZiAodHJpZ2dlckNoYW5nZSkge1xuXHRcdGNvbnN0IGJlZm9yZWNoYW5nZVN0ciA9ICdiZWZvcmVjaGFuZ2UnO1xuICAgICAgICBjb25zdCBiZWZvcmVjaGFuZ2VFdnROYW1lID0gYCR7YmVmb3JlY2hhbmdlU3RyfToke2tleX1gO1xuXG5cdFx0aWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cblxuXHRcdGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VTdHJdKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvcERlZi52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgLy8gdHJpZ2VyIGJpbmRpbmdzXG5cdGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcblx0XHRpZihldmVudHNbY2hhbmdlQmluZGluZ3NFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cdH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuXHRcdGlmKGV2ZW50c1tjaGFuZ2VFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXG5cdFx0aWYoZXZlbnRzW2NoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICAvLyB0cmlnZ2VyIGRlcGVuZGVuY2llcyAobWFkZSB3aXRoIGxpbmtQcm9wcylcblx0aWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG5cdFx0aWYoZXZlbnRzW2NoYW5nZURlcHNFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlcHNFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcblx0XHR9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmlnZ2VyT25lKG9iamVjdCwgbmFtZSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgZXZlbnRzID0gZGVmLmV2ZW50c1tuYW1lXTtcblxuXHRpZiAoZXZlbnRzKSB7XG5cdFx0Y29uc3QgYXJncyA9IG5vZm4uc2xpY2UoYXJndW1lbnRzLCAyKSxcblx0XHRcdGwgPSBldmVudHMubGVuZ3RoLFxuXHRcdFx0W2ExLCBhMiwgYTNdID0gYXJncztcblxuXHRcdGxldCBpID0gMCxcblx0XHRcdGV2O1xuXG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDE6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMjpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMzpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRkZWZhdWx0OlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cbn1cblxudHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IHtcblx0aW5mbzoge30sXG5cdG5hbWU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthRXJyb3IgZnJvbSAnLi9tYXRyZXNoa2FlcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgbWV0aG9kKSB7XG5cdGNvbnN0IHR5cGVvZk9iamVjdCA9IG9iamVjdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBvYmplY3Q7XG5cbiAgICBpZih0eXBlb2ZPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdjb21tb246b2JqZWN0X3R5cGUnLCB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlb2ZPYmplY3QsXG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzXG4gKiovIiwiY29uc3QgYmluZGluZ0Vycm9yUHJlZml4ID0gJ0JpbmRpbmcgZXJyb3I6JztcbmNvbnN0IGVycm9ycyA9IHtcblx0J2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcblx0XHRjb25zdCBzZWxlY3RvckluZm8gPSB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBgIFRoZSBzZWxlY3RvciBpcyAke25vZGV9YCA6ICcnO1xuXHRcdHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWBcblx0fSxcblx0J2JpbmRpbmc6ZmFsc3lfa2V5JzogKCkgPT4gJ0JpbmRpbmcgZXJyb3I6IFwia2V5XCIgYXJnIGNhbm5vdCBiZSBmYWxzeScsXG5cdCdjb21tb246b2JqZWN0X3R5cGUnOiAoeyB0eXBlLCBtZXRob2QgfSkgPT4ge1xuXHRcdHJldHVybiBgTWV0aG9kIFwiJHttZXRob2R9XCIgZG9lcyBub3QgYWNjZXB0ICR7dHlwZX0gYXMgdGFyZ2V0IG9iamVjdGA7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG5cdGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG5cdGlmKCFnZXRFcnJvcikge1xuXHRcdHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcblx0fVxuXG5cdHJldHVybiBuZXcgRXJyb3IoZXJyb3JzW2tleV0oZGF0YSkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcbiAqKi8iLCIvLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuXHRsZXQgbm9kZXM7XG5cdGlmKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhLzwvLnRlc3Qoc2VsZWN0b3IpICYmIC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcilcblx0fSBlbHNle1xuXHRcdG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuXHR9XG5cdHJldHVybiBub2Rlcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZ2V0bm9kZXMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9ycykge1xuXHRcblx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0JCA9IGNvcmUuJCxcblx0XHRyZXN1bHQgPSAkKCksXG5cdFx0ZXhlY1Jlc3VsdCxcblx0XHQkYm91bmQsXG5cdFx0bm9kZSxcblx0XHRzZWxlY3Rvcixcblx0XHRpLCBqLFxuXHRcdHJhbmRvbSxcblx0XHRzdWJTZWxlY3Rvcixcblx0XHRrZXksXG5cdFx0c2VsZWN0ZWQ7XG5cblx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhb2JqZWN0RGF0YSkgcmV0dXJuIHJlc3VsdDtcblxuXHQvLyByZXBsYWNpbmcgOnNhbmRib3ggdG8gOmJvdW5kKHNhbmRib3gpXG5cdHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5zcGxpdCgnLCcpO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRzZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcblxuXHRcdGlmIChleGVjUmVzdWx0ID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLy5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0a2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcblx0XHRcdHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG5cblx0XHRcdC8vIGdldHRpbmcgS0VZIGZyb20gOmJvdW5kKEtFWSlcblx0XHRcdCRib3VuZCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldICYmIG9iamVjdERhdGEuc3BlY2lhbFtrZXldLiRub2Rlcztcblx0XHRcdGlmKCEkYm91bmQgfHwgISRib3VuZC5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuXHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuXHRcdFx0aWYgKHN1YlNlbGVjdG9yKSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuXHRcdFx0XHQvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcblx0XHRcdFx0aWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIHNlbGVjdGluZyBjaGlsZHJlblxuXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCAkYm91bmQubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdG5vZGUgPSAkYm91bmRbal07XG5cdFx0XHRcdFx0XHRyYW5kb20gPSAnbScgKyBjb3JlLnJhbmRvbVN0cmluZygpO1xuXHRcdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tLCByYW5kb20pO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgcmFuZG9tICsgJz1cIicgKyByYW5kb20gKyAnXCJdJyArIHN1YlNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQodXRpbC50b0FycmF5KHNlbGVjdGVkKSk7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKCRib3VuZC5maW5kKHN1YlNlbGVjdG9yKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmdcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3Jcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcblx0JDogZGVmYXVsdERvbGxhclxufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9pbmRleC5qc1xuICoqLyIsIi8qZ2xvYmFsICQqL1xuaW1wb3J0IGJRdWVyeSBmcm9tICcuLi9icXVlcnknO1xuXG5jb25zdCBuZWVkZWRNZXRob2RzID0gJ29uIG9mZiBpcyBhZGQgbm90IGZpbmQnLnNwbGl0KC9cXHMvKTtcblxuY29uc3QgZ2xvYmFsRG9sbGFyID0gdHlwZW9mICQgPT09ICdmdW5jdGlvbicgPyAkIDogbnVsbDtcbmxldCB1c2VHbG9iYWxEb2xsYXIgPSB0cnVlO1xuXG5pZiAoZ2xvYmFsRG9sbGFyKSB7XG5cdGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcblx0XHRcdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFnbG9iYWxEb2xsYXIucGFyc2VIVE1MKSB7XG5cdFx0Z2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG5cdH1cbn0gZWxzZSB7XG5cdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VHbG9iYWxEb2xsYXIgPyBnbG9iYWxEb2xsYXIgOiBiUXVlcnk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG4vLyB0aW55IGpRdWVyeSByZXBsYWNlbWVudCBmb3IgTWF0cmVzaGthXG4vLyBiUXVlcnkgaXMgcmV3cml0dGVuIHZlcnNpb24gb2YgYmFsYWxhaWthLmpzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiUXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0cmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG5cdGZuOiBJbml0LnByb3RvdHlwZSxcblx0ZXh0ZW5kLFxuXHRwYXJzZUhUTUwsXG5cdG9uZSxcblx0Y3JlYXRlXG59KTtcblxubm9mbi5hc3NpZ24oYlF1ZXJ5LmZuLCB7XG5cdG9uLFxuXHRvZmYsXG5cdGlzLFxuXHRhZGQsXG5cdG5vdCxcblx0ZmluZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcblxuLy8gZnVuY3Rpb24tY29uc3RydWN0b3Igb2YgYlF1ZXJ5IGxpYnJhcnlcbi8vIGFjY2VwdHMgbWFueSBraW5kcyBvZiBhcmd1bWVudHMgKHNlbGVjdG9yLCBodG1sLCBmdW5jdGlvbilcbmZ1bmN0aW9uIEJRdWVyeUluaXQoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0bGV0IHJlc3VsdDtcblxuXHRpZiAoc2VsZWN0b3IpIHtcblx0XHRpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuXHRcdFx0cmVzdWx0ID0gW3NlbGVjdG9yXTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmICgvPC8udGVzdChzZWxlY3RvcikpIHtcblx0XHRcdFx0cmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG5cdFx0XHRcdFx0aWYgKG5ld0NvbnRleHQpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7IC8vIHR5cGVvZiBub2RlTGlzdCByZXR1cm5zIFwiZnVuY3Rpb25cIiBpbiBvbGQgV2ViS2l0XG5cdFx0XHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuXHRpZiAobGVuZ3RoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKHJlc3VsdFtpXSk7XG5cdFx0fVxuXHR9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChodG1sKSB7XG5cdC8vIHdyYXBNYXAgaXMgdGFrZW4gZnJvbSBqUXVlcnlcblx0Y29uc3Qgd3JhcE1hcCA9IHtcblx0XHRvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuXHRcdGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG5cdFx0dGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuXHRcdHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcblx0XHR0ZDogWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0Y29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcblx0XHRhcmVhOiBbMSwgJzxtYXA+JywgJzwvbWFwPiddLFxuXHRcdF86IFswLCAnJywgJyddXG5cdH07XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRpO1xuXG5cdGh0bWwgPSBodG1sLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcblxuXHR3cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cdHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG5cdHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cdGNvbnN0IGV4ID0gLzwoW1xcdzpdKykvLmV4ZWMoaHRtbCksXG5cdFx0d3JhcHBlciA9IGV4ICYmIHdyYXBNYXBbZXhbMV1dIHx8IHdyYXBNYXAuXztcblxuXHRub2RlLmlubmVySFRNTCA9IHdyYXBwZXJbMV0gKyBodG1sICsgd3JhcHBlclsyXTtcblxuXHRpID0gd3JhcHBlclswXTtcblxuXHR3aGlsZSAoaS0tKSB7XG5cdFx0bm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG5cdH1cblxuXHRyZXR1cm4gbm9kZS5jaGlsZE5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXG4gKiovIiwiLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZnlsbCBpcyB0YWtlbiB0aGVyZTpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24jUG9seWZpbGxcbi8vIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlXG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG5cdH1cblxuXHRjb25zdCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcblx0Zm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgbmV4dEtleSBpbiBzb3VyY2UpIHtcblx0XHRcdFx0aWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuXHRcdFx0XHRcdG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuXHRyZXR1cm4gbmV3IEluaXQoaHRtbDJub2RlTGlzdChodG1sKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbWF0Y2hlZCBzZXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uZShzLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzLCBjb250ZXh0KVswXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCIvLyBjcmVhdGVzIEhUTUwgZWxlbWVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG5cdGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ29iamVjdCcpIHtcblx0XHRwcm9wcyA9IHRhZ05hbWU7XG5cdFx0dGFnTmFtZSA9IHByb3BzLnRhZ05hbWU7XG5cdH1cblxuXHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cblx0aWYgKHByb3BzKSB7XG5cdFx0bm9mbi5mb3JPd24ocHJvcHMsICh2YWx1ZSwga2V5KSA9PiB7XG5cdFx0XHRpZiAoa2V5ID09PSAnYXR0cmlidXRlcycgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRub2ZuLmZvck93bih2YWx1ZSwgKGF0dHJWYWx1ZSwgYXR0ck5hbWUpID0+IHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgPT09ICdjaGlsZHJlbicgJiYgdmFsdWUpIHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZWxba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgIT09ICd0YWdOYW1lJykge1xuXHRcdFx0XHRlbFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0Y29uc3QgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkucmVwbGFjZSgnMC4nLCAneCcpLFxuXHRcdHNjb3BlU2VsZWN0b3IgPSBgWyR7cmFuZG9tSUR9PVwiJHtyYW5kb21JRH1cIl0gYCxcblx0XHRzcGxpdHRlZFNlbGVjdG9yID0gc2VsZWN0b3Iuc3BsaXQoJywnKTtcblxuXHRsZXQgbWF0Y2hpbmcgPSAnJztcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzZWwgPSBzcGxpdHRlZFNlbGVjdG9yW2ldO1xuXHRcdG1hdGNoaW5nICs9IGAke2kgPT09IDAgPyAnJyA6ICcsJ30ke3Njb3BlU2VsZWN0b3J9JHtzZWx9LCR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0gKmA7XG5cdH1cblxuXG5cdHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cblx0aWYgKGlzLmNhbGwoW2V2dC50YXJnZXRdLCBtYXRjaGluZykpIHtcblx0XHRoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcblx0fVxuXG5cdHRoaXMucmVtb3ZlQXR0cmlidXRlKHJhbmRvbUlEKTtcbn1cblxuLy8gYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNldCBvZiBlbGVtbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0bGV0IGRlbGVnYXRlO1xuXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XG5cdFx0c2VsZWN0b3IgPSBudWxsO1xuXHR9XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0ZGVsZWdhdGUgPSBmdW5jdGlvbiB1bmlxdWVEZWxlZ2F0ZUhhbmRsZXIoZXZ0KSB7XG5cdFx0XHRkZWxlZ2F0ZUhhbmRsZXIuY2FsbCh0aGlzLCBldnQsIHNlbGVjdG9yLCBoYW5kbGVyKTtcblx0XHR9O1xuXHR9XG5cblx0bmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcblx0XHRjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuXHRcdG5hbWUgPSBuYW1lWzBdO1xuXG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gdGhpc1tqXSxcblx0XHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleCxcblx0XHRcdFx0ZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuXHRcdFx0bGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0Y29uc3QgZXZlbnQgPSBldmVudHNba107XG5cblx0XHRcdFx0aWYgKGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0ZXhpc3QgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZXhpc3QpIHtcblx0XHRcdFx0ZXZlbnRzLnB1c2goe1xuXHRcdFx0XHRcdGRlbGVnYXRlLFxuXHRcdFx0XHRcdGhhbmRsZXIsXG5cdFx0XHRcdFx0bmFtZXNwYWNlLFxuXHRcdFx0XHRcdHNlbGVjdG9yXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb24uanNcbiAqKi8iLCIvLyBzaGFyZSBkYXRhIGJldHdlZW4gYXMgYW4gb2JqZWN0IG1vZHVsZXMgYmVjYXVzZSB3ZSB1c2Vcbi8vIHNpbXBsaWZpZWQgZXMgbW9kdWxlcyB0aGVyZSBhbmQgY2Fubm90IGltcG9ydCBhbmQgc2hhcmUgYSBudW1iZXJcbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9kZUluZGV4OiAwLFxuXHRhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG5cdGNvbnN0IG5vZGUgPSB0aGlzWzBdO1xuXHRyZXR1cm4gbm9kZVxuXHRcdD8gKG5vZGUubWF0Y2hlc1xuXHRcdFx0fHwgbm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUubW96TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgcykgOiBmYWxzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pcy5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyByZW1vdmVzIGV2ZW50IGhhbmRsZXIgZnJvbSBhIHNldCBvZiBlbGVtZW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2ZmKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuXHRcdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdCghaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5oYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmRlbGVnYXRlKVxuXHRcdFx0XHRcdFx0JiYgKCFuYW1lc3BhY2UgfHwgbmFtZXNwYWNlID09PSBldmVudC5uYW1lc3BhY2UpXG5cdFx0XHRcdFx0XHQmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3Rvcilcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcblx0XHRcdFx0XHRcdGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghbmFtZXNwYWNlICYmICFzZWxlY3Rvcikge1xuXHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIGFkZHMgdW5pcXVlIG5vZGVzIHRvIGJRdWVyeSBjb2xsZWN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGQoc2VsZWN0b3IpIHtcblx0Y29uc3QgaWRNYXAgPSB7fTtcblxuXHRsZXQgcmVzdWx0LFxuXHRcdG5vZGVJRCxcblx0XHRub2RlLFxuXHRcdGk7XG5cblx0c2VsZWN0b3IgPSBuZXcgSW5pdChzZWxlY3Rvcik7XG5cblx0aWYgKHRoaXMubGVuZ3RoKSB7XG5cdFx0cmVzdWx0ID0gbmV3IEluaXQodGhpcyk7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bm9kZSA9IHJlc3VsdFtpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZE1hcFtub2RlSURdID0gMTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSBzZWxlY3RvcltpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZiAoIWlkTWFwW25vZGVJRF0pIHtcblx0XHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvYWRkLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGV4Y2x1ZGVzIGVsZW1lbnRzIGZyb20gY3VycmVudCBzZXQgYnkgZ2l2ZW4gc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdChzZWxlY3Rvcikge1xuXHRjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRyZXN1bHQucHVzaCh0aGlzW2ldKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L25vdC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBnZXQgdGhlIGRlc2NlbmRhbnRzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgY3VycmVudCBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50cyxcbi8vIGZpbHRlcmVkIGJ5IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcblx0bGV0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cblx0bm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcblx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblx0fSk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9maW5kLmpzXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG5mdW5jdGlvbiBydW5NYXRyZXNoa2FIYW5kbGVyKG5vZGUsIHByb3BEZWYsIGJpbmRlciwgb3B0aW9ucywgZXZ0KSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCB7IG9uQ2hhbmdlVmFsdWUsIGNoYW5nZWROb2RlLCBiaW5kZXI6IGV2dEJpbmRlciB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgc2V0VmFsdWUgfSA9IGJpbmRlcjtcblx0Ly8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0Y29uc3QgZGlydHlIYWNrVmFsdWUgPSBvbkNoYW5nZVZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgKyAnJyA6IHZhbHVlO1xuXG4gICAgaWYgKGNoYW5nZWROb2RlID09PSBub2RlICYmIG9uQ2hhbmdlVmFsdWUgPT09IGRpcnR5SGFja1ZhbHVlICYmIGV2dEJpbmRlciA9PT0gYmluZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJzt5b2NlZWUnLCBwcm9wRGVmKVxuICAgIHNldFZhbHVlLmNhbGwobm9kZSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgdmFsdWUgfSwgb3B0aW9ucykpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG5cdGJpbmRlcjogZ2l2ZW5CaW5kZXIsXG5cdGtleSxcblx0JG5vZGVzLFxuXHRub2RlLFxuXHRldnQsXG5cdHByb3BEZWZcbn0pIHtcblx0Y29uc3QgeyBhc3NpZ25EZWZhdWx0VmFsdWUsIGRlYm91bmNlIH0gPSBldnQ7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcblx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRzZWxmOiBvYmplY3QsXG5cdFx0a2V5LFxuICAgICAgICB2YWx1ZSxcblx0XHQkbm9kZXMsXG5cdFx0bm9kZVxuXHR9O1xuICAgIGNvbnN0IGJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgfHwgW107XG5cdGxldCBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJztcblx0bGV0IGJpbmRlcjtcblx0bGV0IG9iamVjdEhhbmRsZXI7XG5cblx0aWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgZm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoZ2l2ZW5CaW5kZXIpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZm91bmRCaW5kZXIsIGdpdmVuQmluZGVyKTtcblx0XHRcdH1cblxuXHRcdFx0YmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJpbmRlciA9IGdpdmVuQmluZGVyO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvbiwgaW5pdGlhbGl6ZSB9ID0gYmluZGVyO1xuXG5cdGlmIChpbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemUuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICB9XG5cblx0aWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuXG5cdFx0c2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyBmcm9tTm9kZTogdHJ1ZSB9LCBldnQpKTtcblx0fVxuXG5cdGlmIChzZXRWYWx1ZSkge1xuXHRcdG9iamVjdEhhbmRsZXIgPSAoKSA9PiBydW5NYXRyZXNoa2FIYW5kbGVyKG5vZGUsIHByb3BEZWYsIGJpbmRlciwgb3B0aW9ucywgZXZ0KTtcblxuXHRcdGlmKGRlYm91bmNlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG5cdFx0XHRvYmplY3RIYW5kbGVyID0gdXRpbC5kZWJvdW5jZShta0hhbmRsZXIpO1xuXHRcdH1cblxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlciwgbnVsbCwgeyBub2RlIH0pO1xuXG5cdFx0aWYoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgaWYoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgLy8gVE9ETyB1c2UgQ3VzdG9tRXZlbnQgaW5zdGFuY2UgaW5zdGVhZCBvZiBhbiBvYmplY3QgYXMgZGVmYXVsdCB2YWx1ZVxuICAgICAgICBjb25zdCBub2RlSGFuZGxlciA9IChkb21FdmVudCA9IHt9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcHJvcERlZi52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHsgd2hpY2gsIHRhcmdldCB9ID0gZG9tRXZlbnQ7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgbm9mbi5hc3NpZ24oe1xuXHRcdFx0XHRwcmV2aW91c1ZhbHVlLFxuXHRcdFx0XHRkb21FdmVudCxcblx0XHRcdFx0b3JpZ2luYWxFdmVudDogZG9tRXZlbnQub3JpZ2luYWxFdmVudCB8fCBkb21FdmVudCwgLy8galF1ZXJ5IHRoaW5nXG5cdFx0XHRcdHByZXZlbnREZWZhdWx0OiAoKSA9PiBkb21FdmVudC5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG5cdFx0XHRcdHdoaWNoLFxuXHRcdFx0XHR0YXJnZXRcblx0XHRcdH0sIG9wdGlvbnMpKTtcblxuICAgICAgICAgICAgaWYgKCFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCBjaGFuZ2VkTm9kZSwgb25DaGFuZ2VWYWx1ZSwgYmluZGVyP1xuXHRcdFx0XHRzZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0ZnJvbU5vZGU6IHRydWUsXG5cdFx0XHRcdFx0Y2hhbmdlZE5vZGU6IG5vZGUsXG5cdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0YmluZGVyXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuICAgICAgICB9O1xuXG4gICAgICAgIGJpbmRpbmdzLnB1c2goe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIsXG4gICAgICAgICAgICBub2RlSGFuZGxlclxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0eXBlb2Ygb24gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb24uY2FsbChub2RlLCBub2RlSGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uJChub2RlKS5vbihvbiwgbm9kZUhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuLypcbmZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdHNlbGY6IG9iamVjdCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0JG5vZGVzOiAkbm9kZXMsXG5cdFx0XHRub2RlOiBub2RlXG5cdFx0fSxcblx0XHRub2RlID0gJG5vZGVzW2luZGV4XSxcblx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiBzcGVjaWFsLnZhbHVlID09ICd1bmRlZmluZWQnLFxuXHRcdF9iaW5kZXIsXG5cdFx0X2V2dCxcblx0XHRmb3VuZEJpbmRlcixcblx0XHRfb3B0aW9ucyxcblx0XHRpLFxuXHRcdGRvbUV2dCxcblx0XHRta0hhbmRsZXIsXG5cdFx0dmFsO1xuXG5cblxuXG5cdGlmIChiaW5kZXIgPT09IG51bGwpIHtcblx0XHRfYmluZGVyID0ge307XG5cdH0gZWxzZSB7XG5cdFx0Zm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoYmluZGVyKSB7XG5cdFx0XHRcdGZvciAoaSBpbiBiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9iaW5kZXIgPSBiaW5kZXIgfHwge307XG5cdFx0fVxuXHR9XG5cblx0aWYgKF9iaW5kZXIuaW5pdGlhbGl6ZSkge1xuXHRcdF9vcHRpb25zID0ge1xuXHRcdFx0dmFsdWU6IHNwZWNpYWwudmFsdWVcblx0XHR9O1xuXHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0fVxuXHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0fVxuXG5cdGlmIChfYmluZGVyLmdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBldnQuYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBldnQuYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuXG5cdFx0X2V2dCA9IHtcblx0XHRcdGZyb21Ob2RlOiB0cnVlXG5cdFx0fTtcblxuXHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdF9ldnRbaV0gPSBldnRbaV07XG5cdFx0fVxuXG5cdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbCA9PSAndW5kZWZpbmVkJztcblxuXHRcdGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWwsIF9ldnQpO1xuXHR9XG5cblxuXHRpZiAoX2JpbmRlci5zZXRWYWx1ZSkge1xuXHRcdG1rSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdC8vIGRpcnR5IGhhY2sgZm9yIHRoaXMgb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG5cdFx0XHRcdF92ID0gZXZ0ICYmIHR5cGVvZiBldnQub25DaGFuZ2VWYWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdiA9PSAnbnVtYmVyJyA/IHYgKyAnJyA6IHYsXG5cdFx0XHRcdGk7XG5cblx0XHRcdGlmIChldnQgJiYgZXZ0LmNoYW5nZWROb2RlID09IG5vZGUgJiYgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gX3YpIHJldHVybjtcblxuXHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGkgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHR9XG5cblx0XHRcdF9iaW5kZXIuc2V0VmFsdWUuY2FsbChub2RlLCB2LCBfb3B0aW9ucyk7XG5cdFx0fTtcblxuXHRcdGlmKGV2dC5kZWJvdW5jZSkge1xuXHRcdFx0bWtIYW5kbGVyID0gdXRpbC5kZWJvdW5jZShta0hhbmRsZXIpO1xuXHRcdH1cblxuXHRcdGNvcmUuX2Zhc3RBZGRMaXN0ZW5lcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgbWtIYW5kbGVyLCBudWxsLCB7bm9kZTogbm9kZX0pO1xuXG5cdFx0IWlzVW5kZWZpbmVkICYmIG1rSGFuZGxlcigpO1xuXHR9XG5cblxuXG5cblx0aWYgKF9iaW5kZXIuZ2V0VmFsdWUgJiYgX2JpbmRlci5vbikge1xuXHRcdGRvbUV2dCA9IHtcblx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRvbjogX2JpbmRlci5vbixcblx0XHRcdGluc3RhbmNlOiBvYmplY3QsXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG1rSGFuZGxlcjogbWtIYW5kbGVyLFxuXHRcdFx0aGFuZGxlcjogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHR2YXIgb2xkdmFsdWUgPSBvYmplY3Rba2V5XSxcblx0XHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0dmFsdWU6IG9sZHZhbHVlLFxuXHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2dC5vcmlnaW5hbEV2ZW50IHx8IGV2dCxcblx0XHRcdFx0XHRcdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHdoaWNoOiBldnQud2hpY2gsXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHR9O1xuXG5cblx0XHRcdFx0Ly8gaGFzT3duUHJvcGVydHkgaXMgbm90IHJlcXVpcmVkIHRoZXJlXG5cdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0X29wdGlvbnNbal0gPSBvcHRpb25zW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSAhPT0gb2xkdmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcblx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0Y2hhbmdlZE5vZGU6IG5vZGUsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZVZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGNvcmUuZG9tRXZlbnRzLmFkZChkb21FdnQpO1xuXHR9XG59Ki9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0QmluZGVycyBmcm9tICcuL2RlZmF1bHRiaW5kZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciByZXN1bHQsXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGVmYXVsdEJpbmRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9IGRlZmF1bHRCaW5kZXJzW2ldLmNhbGwobm9kZSwgbm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvbG9va2ZvcmJpbmRlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IFtub2RlID0+IHtcblx0dmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWUsXG5cdFx0YmluZGVycyA9IHVuZGVmaW5lZCxcblx0XHRiO1xuXG5cdC8vIFRPRE8gU3dpdGNoL2Nhc2Vcblx0aWYgKHRhZ05hbWUgPT0gJ0lOUFVUJykge1xuXHRcdGIgPSBiaW5kZXJzLmlucHV0KG5vZGUudHlwZSk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnVEVYVEFSRUEnKSB7XG5cdFx0YiA9IGJpbmRlcnMudGV4dGFyZWEoKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdTRUxFQ1QnKSB7XG5cdFx0YiA9IGJpbmRlcnMuc2VsZWN0KG5vZGUubXVsdGlwbGUpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1BST0dSRVNTJykge1xuXHRcdGIgPSBiaW5kZXJzLnByb2dyZXNzKCk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnT1VUUFVUJykge1xuXHRcdGIgPSBiaW5kZXJzLm91dHB1dCgpO1xuXHR9XG5cblx0cmV0dXJuIGI7XG59XTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcImV2dFwiXSB9XSovXG5cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5cbi8vIHByb3BlcnR5IG1vZGlmaWVyIGV2ZW50IHJlZ2V4cFxuY29uc3QgcHJvcE1vZEV2ZW50UmVnXG5cdD0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KSxcblx0XHRjdHggPSBjb250ZXh0IHx8IG9iamVjdCxcblx0XHRldmVudHMgPSBhbGxFdmVudHNbbmFtZV0sXG5cdFx0ZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuXHQvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZVxuXHRpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBldnQgPSBldmVudHNbaV07XG5cdFx0XHRpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG5cdFx0XHRcdFx0JiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3Rcblx0XHRldmVudHMucHVzaChldnQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG5cdFx0YWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG5cdH1cblxuXHRpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcblx0XHQvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG5cdFx0ZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG5cdH1cblxuXHRpZiAobmFtZVswXSAhPT0gJ18nKSB7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcblx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcblx0fVxuXG5cdC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmFkZCcsICgpID0+IHtcblx0aXQoJ2FkZHMgb25jZScsICgpID0+IHtcblx0XHRjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5hZGQoW2VsMiwgZWwzLCBlbDQsIGVsNV0pXG5cdFx0XSkudG9FcXVhbChbZWwxLCBlbDIsIGVsMywgZWw0LCBlbDVdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsICgpID0+IHtcblx0aXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2JykudGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIGEgcHJvcGVydHknLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZm9vYmFyJ1xuXHRcdFx0fSkuY2xhc3NOYW1lXG5cdFx0KS50b0VxdWFsKCdmb29iYXInKTtcblx0fSk7XG5cblx0aXQoJ2NyZWF0ZXMgY2hpbGRlbicsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRjaGlsZHJlbjogW3tcblx0XHRcdFx0XHR0YWdOYW1lOiAnc3Bhbidcblx0XHRcdFx0fV1cblx0XHRcdH0pLmNoaWxkcmVuWzBdLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0XHRmb286ICdiYXInXG5cdFx0XHRcdH1cblx0XHRcdH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcblx0XHQpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSh7XG5cdFx0XHRcdHRhZ05hbWU6ICdkaXYnXG5cdFx0XHR9KS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdESVYnKTtcblx0fSk7XG5cblx0eGl0KCdleHRlbmRzIGRhdGFzZXQgb2JqZWN0JywgKCkgPT4ge1xuXHRcdC8vIFRPRE9cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vbGliL3NpbXVsYXRlY2xpY2snO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGV2ZW50cycsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94LFxuXHRcdGNoaWxkMSxcblx0XHRjaGlsZDIsXG5cdFx0Z3JhbmRjaGlsZDEsXG5cdFx0aGFuZGxlcjtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDFcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkMlwiPjwvZGl2PlxuXHRcdGA7XG5cblx0XHRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQxJyk7XG5cdFx0Y2hpbGQyID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMicpO1xuXHRcdGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGFmdGVyRWFjaCgoKSA9PiB7XG5cdFx0JChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQyJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1N0b3BzIHByb3BhZ2F0aW9uJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdCQoY2hpbGQxKS5vbignY2xpY2snLCBldnQgPT4gZXZ0LnN0b3BQcm9wYWdhdGlvbigpKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanNcbiAqKi8iLCIvLyBzaW11bGF0ZXMgY2xpY2sgb24gYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW11bGF0ZUNsaWNrKG5vZGUpIHtcblx0Y29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcblx0ZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuXHRub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmZpbmQnLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveCxcblx0XHRncmFuZENoaWxkO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcblx0fSk7XG5cblx0aXQoJ2ZpbmRzJywgKCkgPT4ge1xuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKHRlc3RTYW5kYm94KS5maW5kKCcuZ3JhbmRjaGlsZCcpXG5cdFx0XSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuLy8g0LfQsNGB0YPQvdGD0YLRjCDQstGB0LUg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLRi9GFINGN0LvQtdC80LXQvdGC0L7QsiDQsiBiZWZvcmVFYWNoXG4vLyDRgNC10YTQsNC60YLQvtGA0LjRgtGMXG4vLyDQvdCw0L/QuNGB0LDRgtGMINC60L7QvNC80LXQvdGC0LDRgNC40LggKNCyINGC0L7QvCDRh9C40YHQu9C1INC4INC6INGD0LbQtSDRgNC10LDQu9C40LfQvtCy0LDQvdC90YvQvCDRhNGD0L3QutGG0LjRj9C8KVxuLy8g0L/QvtGB0LvQtSDQstGB0LXQs9C+INC90YPQttC90L4g0LLQutC70Y7Rh9C40YLRjCDQu9C40L3RgtC10YAg0Lgg0L/RgNC+0LLQtdGA0LjRgtGMINC60L7QstC10YDQsNC00LZcblxuZGVzY3JpYmUoJ2JRdWVyeSBpbml0aWFsaXphdGlvbicsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94O1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0xXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtM1wiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fSk7XG5cblx0aXQoJ2FjY2VwdHMgd2luZG93JywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQod2luZG93KTtcblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKHdpbmRvdyk7XG5cdH0pO1xuXG5cdGl0KCdhY2NlcHRzIGRvY3VtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoZG9jdW1lbnQpO1xuXHR9KTtcblxuXHRpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgnY29udmVydHMgYXJyYXktbGlrZScsICgpID0+IHtcblx0XHRjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSxcblx0XHRcdHJlc3VsdCA9ICQoY2hpbGRyZW4pO1xuXG5cdFx0ZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuXHRcdH1cblx0fSk7XG5cblx0aXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KGVsZW1lbnQpLnRvRXF1YWwocmVzdWx0WzBdKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgxKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQobnVsbCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcblx0XHQkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uIGJRdWVyeVBsdWdpbigpIHtcblx0XHRcdGV4cGVjdChcblx0XHRcdFx0dGhpcy5sZW5ndGhcblx0XHRcdCkudG9FcXVhbChcblx0XHRcdFx0dGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLmxlbmd0aFxuXHRcdFx0KTtcblx0XHR9O1xuXG5cdFx0c3B5T24oJC5mbiwgJ2JRdWVyeVBsdWdpbicpO1xuXG5cdFx0JCgnKicsIHRlc3RTYW5kYm94KS5iUXVlcnlQbHVnaW4oKTtcblxuXHRcdGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcblx0aXQoJ2NoZWNrcyBjbGFzc05hbWUnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbC5jbGFzc05hbWUgPSAnZWwnO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChlbCkuaXMoJy5lbCcpXG5cdFx0KS50b0VxdWFsKHRydWUpO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChlbCkuaXMoJy5lbDInKVxuXHRcdCkudG9FcXVhbChmYWxzZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcblx0aXQoJ2V4Y2x1ZGVzIGJ5IHNlbGVjdG9yJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGVsMi5jbGFzc05hbWUgPSAnZWwyJztcblxuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKFtlbDEsIGVsMiwgZWwzXSkubm90KCcuZWwyJylcblx0XHRdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuXHRpdCgnZmluZHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdGNvbnN0IGNoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkJyk7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkLm9uZSgnKicsIHRlc3RTYW5kYm94KVxuXHRcdCkudG9FcXVhbChjaGlsZCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG5cdGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgncGFyc2VzIGNvbnRleHR1YWwgZWxlbWVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzx0ZD48L3RkPjx0ZD48L3RkPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG5cdGl0KCdhbGxvd3MgdG8gaW5oZXJpdCcsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuXHRcdFx0QiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcblx0XHRcdEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG5cdFx0XHRpbnN0ID0gbmV3IEM7XG5cblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEIpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdC5iKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3Mgc3RhdGljIHByb3BzJywgKCkgPT4ge1xuXHRcdGNvbnN0IEEgPSBDbGFzcyh7fSwgeyBzdGF0aWNQcm9wOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2lmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgaW5zdCA9IG5ldyBDbGFzcyh7IGE6IHRydWUgfSk7XG5cdFx0ZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQ2xhc3MpLnRvQmVGYWxzeSgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG5cdGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBPYmplY3Rcblx0XHRcdD8gcHJvdG90eXBlLmNvbnN0cnVjdG9yXG5cdFx0XHQ6IGZ1bmN0aW9uIEVtcHR5Q29uc3RydWN0b3IoKSB7fSxcblx0XHQvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRcdFBhcmVudCA9IHByb3RvdHlwZS5leHRlbmRzIHx8IHByb3RvdHlwZS5leHRlbmQsXG5cdFx0Ly9pbmhlcml0IHByb3RvIGZyb20gY2xhc3MgcGFyZW50IG9yIGVtcHR5IG9iamVjdFxuXHRcdHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG5cdGV4dGVuZChwcm90bywgcHJvdG90eXBlKTtcblxuXHRpZiAodHlwZW9mIHN0YXRpY1Byb3BzID09PSAnb2JqZWN0Jykge1xuXHRcdGV4dGVuZChDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHR9XG5cblx0Ly8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0cHJvdG8uaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcjtcblx0fTtcblxuXHRDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90bztcblxuXHQvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG5cdGlmICh0aGlzIGluc3RhbmNlb2YgQ2xhc3MpIHtcblx0XHRyZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzcy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChNYXRyZXNoa2EuT2JqZWN0IGFuZCBNYXRyZXNoa2EuQXJyYXkpJywgZnVuY3Rpb24oKSB7XG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHtcblx0XHRcdGE6IHt9XG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF1bMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdHk6IG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0XHRhOiB7fVxuXHRcdFx0fSlcblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsImltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKGJhc2ljKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBjdHgsXG5cdFx0aGFuZGxlcjtcblxuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdGN0eCA9IHt9O1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblxuXHRpdCgnZmlyZXMgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi5jID0ge307XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGEgPSBvYmouYTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcblx0XHR0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YyA9IG9iai5hLmM7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUoYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG5cdFx0b2JqLmEuYi5jID0gNTU7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBjb3JyZWN0IGNvbnRleHQgZm9yIGRlbGVnYXRlZCBldmVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblx0XHRsZXQgYm9vbCA9IGZhbHNlO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRib29sID0gdGhpcyA9PT0gY3R4O1xuXHRcdH0sIGN0eCk7XG5cblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFtcImVycm9yXCIsIHsgXCJmdW5jdGlvbnNcIjogZmFsc2UgfV0qL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vYWRkbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcblx0cHJldmlvdXNWYWx1ZSxcblx0dmFsdWVcbn0sIHtcblx0cGF0aCxcblx0bmFtZSxcblx0Y2FsbGJhY2ssXG5cdGNvbnRleHRcbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0fVxuXG5cdGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihwcmV2aW91c1ZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcblx0cGF0aCA9IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBwYXRoICE9PSAnJyA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGg7XG5cblx0aWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuXHRcdC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG5cdFx0XHRwYXRoLFxuXHRcdFx0bmFtZSxcblx0XHRcdGNhbGxiYWNrLFxuXHRcdFx0Y29udGV4dFxuXHRcdH07XG5cblx0XHQvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG5cdFx0XHRkZWxlZ2F0ZWREYXRhLFxuXHRcdFx0cGF0aFN0clxuXHRcdH0pO1xuXG5cdFx0Ly8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG5cdFx0Y2hhbmdlSGFuZGxlcih7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV1cblx0XHR9LCBkZWxlZ2F0ZWREYXRhKTtcblx0fVxufVxuXG4vKlxuZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvaW5pdG1rJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvc3BlY2lhbGV2dHJlZydcbl0sIGZ1bmN0aW9uKGNvcmUsIGluaXRNSywgbWFwLCBzcGVjaWFsRXZ0UmVnKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX2RlbGVnYXRlTGlzdGVuZXIgPSBjb3JlLl9kZWxlZ2F0ZUxpc3RlbmVyID0gZnVuY3Rpb24ob2JqZWN0LFxuXHQgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0aW5pdE1LKG9iamVjdCk7XG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV4ZWN1dGVkID0gLyhbXlxcLl0rKVxcLiguKikvLmV4ZWMocGF0aCksXG5cdFx0XHRmLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdGNoYW5nZUtleSxcblx0XHRcdG9iajtcblxuXHRcdHBhdGggPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzJdIDogJyc7XG5cblx0XHRldnREYXRhID0gZXZ0RGF0YSB8fCB7fTtcblxuXHRcdGlmIChmaXJzdEtleSkge1xuXHRcdFx0aWYgKGZpcnN0S2V5ID09ICcqJykge1xuXHRcdFx0XHRpZiAob2JqZWN0LmlzTUtBcnJheSkge1xuXHRcdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRcdChldnQgJiYgZXZ0LmFkZGVkID8gZXZ0LmFkZGVkIDogb2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdFx0aXRlbSAmJiBfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLFxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdhZGQnLCBmLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRmKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2JqZWN0LmlzTUtPYmplY3QpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2V2dC5rZXldO1xuXG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0ICYmIGV2dCAmJiAoZXZ0LmtleSBpbiBvYmplY3REYXRhLmtleXMpKSB7XG5cdFx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5fc2lsZW50KSByZXR1cm47XG5cblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2ZpcnN0S2V5XSxcblx0XHRcdFx0XHRcdGNoYW5nZUtleSxcblx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSB0cnVlLFxuXHRcdFx0XHRcdFx0aSxcblx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cztcblxuXHRcdFx0XHRcdGV2dERhdGEucGF0aCA9IHBhdGg7XG5cblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgPSBldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgfHxcblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2ZpcnN0S2V5XTtcblxuXHRcdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgJiYgbWFwLmhhcyhldnQucHJldmlvdXNWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lcihldnQucHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0ID09ICdvYmplY3QnICYmIHRhcmdldCkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIodGFyZ2V0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHNwZWNpYWxFdnRSZWcudGVzdChuYW1lKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlS2V5ID0gbmFtZS5yZXBsYWNlKHNwZWNpYWxFdnRSZWcsICcnKTtcblxuXHRcdFx0XHRcdFx0aWYgKCFwYXRoICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZSAmJiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XVxuXHRcdFx0XHRcdFx0IT09IHRhcmdldFtjaGFuZ2VLZXldKSB7XG5cdFx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cyA9IG1hcC5nZXQoZXZ0RGF0YS5wcmV2aW91c1ZhbHVlKS5ldmVudHNbbmFtZV07XG5cdFx0XHRcdFx0XHRcdGlmIChjaGFuZ2VFdmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hhbmdlRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzW2ldLnBhdGggPT09IHBhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJpZ2dlckNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29yZS5zZXQodGFyZ2V0LCBjaGFuZ2VLZXksIHRhcmdldFtjaGFuZ2VLZXldLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3JjZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzVmFsdWU6IGV2dERhdGEucHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuXHRcdFx0XHRcdFx0XHRcdFx0cHJldmlvdXNPYmplY3Q6IGV2dERhdGEucHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9zaWxlbnQ6IHRydWVcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXG5cdFx0XHRcdGYoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0fVxuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9yZW1vdmVsaXN0ZW5lcic7XG4vLyBSRUZBQ1RPUiwgRE9OVCBUUklHR0VSIEFEREVWRU5ULCBSRU1PVkVFVkVOVFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcblxuXHRwYXRoID0gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHBhdGggIT09ICcnID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aDtcblxuXHRpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG5cdFx0Ly8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuXHRcdHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG5cdFx0Y29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGlmIChldmVudHMpIHtcblx0XHRcdGNvbnN0IHJldGFpbiA9IFtdO1xuXHRcdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQuaW5mby5wYXRoU3RyICE9PSBwYXRoU3RyKSB7XG5cdFx0XHRcdFx0cmV0YWluLnB1c2goZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdFx0YWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdID0gcmV0YWluO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX3VuZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lciA9XG5cdCBmdW5jdGlvbihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdHAgPSBwYXRoLFxuXHRcdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV2ZW50cyxcblx0XHRcdGk7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuYWRkIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmNoYW5nZSB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHNbJ2NoYW5nZTonICsgZmlyc3RLZXldIHx8IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygb2JqZWN0W2ZpcnN0S2V5XSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2ZpcnN0S2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXHRjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG5cdGNvbnN0IHJldGFpbiA9IFtdO1xuXHRjb25zdCBub1RyaWdnZXIgPSBuYW1lID8gbmFtZVswXSA9PT0gJ18nIDogZmFsc2U7XG5cblx0Ly8gaWYgYWxsIGV2ZW50cyBuZWVkIHRvIGJlIHJlbW92ZWRcblx0aWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuXHRcdGlmICghbm9UcmlnZ2VyKSB7XG5cdFx0XHRub2ZuLmZvck93bihhbGxFdmVudHMsIChldmVudHMsIG5hbWUpID0+IHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdFx0XHRjb25zdCByZW1vdmVFdnREYXRhID0ge1xuXHRcdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRcdGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG5cdFx0XHRcdFx0XHRjb250ZXh0OiBldnQuY29udGV4dFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gcmVzdG9yZSBkZWZhdWx0IHZhbHVlIG9mIFwiZXZlbnRzXCJcblx0XHRkZWYuZXZlbnRzID0ge307XG5cdH0gZWxzZSBpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcblx0XHRub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuXHRcdFx0aWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuXHRcdFx0XHR8fCAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldnQuY29udGV4dCkpIHtcblx0XHRcdFx0Ly8ga2VlcCBldmVudFxuXHRcdFx0XHRyZXRhaW4ucHVzaChldnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG5cdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIW5vVHJpZ2dlcikge1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KHBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcblx0cGF0aCA9IHBhdGggPyBwYXRoLnNwbGl0KCcuJykgOiBbXTtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGxldCBvYmogPSByZXN1bHQsXG5cdFx0a2V5O1xuXG5cblx0d2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdGtleSA9IHBhdGguc2hpZnQoKTtcblx0XHRvYmogPSBvYmpba2V5XSA9IHt9O1xuXHR9XG5cblx0b2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdC8qZXNsaW50LWRpc2FibGUgKi9cblx0eGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy54JywgMik7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRvYmouYS5iID0ge1xuXHRcdFx0Yzoge1xuXHRcdFx0XHR4OiAyXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIuYyA9IHtcblx0XHRcdHg6IDJcblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aSA9IDA7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWUxMCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU5KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTgpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU3KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTUpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTQpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTMpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTIpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTEpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTApO1xuXHRcdG9iai5hID0ge1xuXHRcdFx0Yjoge1xuXHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0eDogMlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTExMTExMTExMTEpO1xuXHR9KTtcblxuXHR4aXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5hLmIgPSBudWxsO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblx0Lyplc2xpbnQtZW5hYmxlICovXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBvYmosXG5cdFx0Y3R4LFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0Y3R4ID0ge307XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmopO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdyZW1vdmVzIGJ5IGhvd1RvUmVtb3ZlIChub3QgZG9jdW1lbnRlZCBjb3JlIGZlYXR1cmUpJywgKCkgPT4ge1xuXHRcdC8qZXNsaW50LWRpc2FibGUgKi9cblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlLFxuXHRcdFx0b25EYXRhID0ge1xuXHRcdFx0XHRob3dUb1JlbW92ZShvbkRhdGEsIG9mZkRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2ZmRGF0YS54ID09PSA0Mjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDEnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQzXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDInKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHRcdC8qZXNsaW50LWVuYWJsZSAqL1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdkLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cImQtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblxuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQgYW5kIGRvZXNuXFwndCByZW1vdmUgZXZlbnRzIGZyb20gb3RoZXIgbm9kZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ3MtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwicy10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXHRub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuXHR9XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtay5vbignc29tZWV2ZW50JywgZik7XG5cdFx0bWsub2ZmKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbmNlXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbkRlYm91bmNlXCInLCAoZG9uZSkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0fSk7XG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgODAwKTtcblxuXHRcdG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMCxcblx0XHRcdGhhbmRsZXJzID0ge1xuXHRcdFx0XHRmb286ICgpID0+IGkrKyxcblx0XHRcdFx0YmFyOiAoKSA9PiBpKytcblx0XHRcdH07XG5cblx0XHRNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuXHRcdE1LLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0TUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXG5cdFx0TUsub2ZmKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHR0aGlzQXJnID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMDtcblxuXHRcdE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdHJ1ZSwgdGhpc0FyZyk7XG5cblx0XHRNSy5vbihvYmosICdiYXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRoaXNBcmcsIHRydWUpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiAzMCxcblx0XCIuL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1wiOiAzMixcblx0XCIuL19iaW5kaW5ncy9nZXRub2Rlcy5qc1wiOiAxMixcblx0XCIuL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXCI6IDMxLFxuXHRcIi4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXCI6IDEzLFxuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiA2LFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiA1LFxuXHRcIi4vX2NvcmUvaW5pdC5qc1wiOiA0LFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiAxNSxcblx0XCIuL19kb20vaW5kZXguanNcIjogMTQsXG5cdFwiLi9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXCI6IDMzLFxuXHRcIi4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDQ4LFxuXHRcIi4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1wiOiA1MCxcblx0XCIuL19ldmVudHMvdHJpZ2dlcm9uZS5qc1wiOiA4LFxuXHRcIi4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogNDksXG5cdFwiLi9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcIjogOSxcblx0XCIuL191dGlsL2lzLmpzXCI6IDExLFxuXHRcIi4vX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcIjogMTAsXG5cdFwiLi9hcnJheS5qc1wiOiA1Nyxcblx0XCIuL2JpbmRlcnMuanNcIjogNTgsXG5cdFwiLi9iaW5kbm9kZS5qc1wiOiAzLFxuXHRcIi4vYnF1ZXJ5L19kYXRhLmpzXCI6IDI0LFxuXHRcIi4vYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXCI6IDE4LFxuXHRcIi4vYnF1ZXJ5L19pbml0LmpzXCI6IDE3LFxuXHRcIi4vYnF1ZXJ5L2FkZC5qc1wiOiAyNyxcblx0XCIuL2JxdWVyeS9jcmVhdGUuanNcIjogMjIsXG5cdFwiLi9icXVlcnkvZmluZC5qc1wiOiAyOSxcblx0XCIuL2JxdWVyeS9pbmRleC5qc1wiOiAxNixcblx0XCIuL2JxdWVyeS9pcy5qc1wiOiAyNSxcblx0XCIuL2JxdWVyeS9ub3QuanNcIjogMjgsXG5cdFwiLi9icXVlcnkvb2ZmLmpzXCI6IDI2LFxuXHRcIi4vYnF1ZXJ5L29uLmpzXCI6IDIzLFxuXHRcIi4vYnF1ZXJ5L29uZS5qc1wiOiAyMSxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWwuanNcIjogMjAsXG5cdFwiLi9jbGFzcy5qc1wiOiA0NSxcblx0XCIuL2V4dGVuZC5qc1wiOiAxOSxcblx0XCIuL2dldC5qc1wiOiA1OSxcblx0XCIuL2luZGV4LmpzXCI6IDYwLFxuXHRcIi4vbWFnaWMuanNcIjogNjMsXG5cdFwiLi9tYXRyZXNoa2EvaW5kZXguanNcIjogNjEsXG5cdFwiLi9vYmplY3QuanNcIjogNjIsXG5cdFwiLi9vbi5qc1wiOiA2NCxcblx0XCIuL3NldC5qc1wiOiA3XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDU2O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldChvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gb2JqZWN0W2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9nZXQuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG5NYXRyZXNoa2EuYmluZGVycyA9IGJpbmRlcnM7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJlc2hrYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3Moe1xuXHQvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuXHQvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXHRleHRlbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWdpYy5qc1xuICoqLyIsIlxuLy8gL14oKFteQF0rKUApPygoLis/KSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8pPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKCkge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=