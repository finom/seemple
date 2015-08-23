"use strict";
(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([
			'matreshka_dir/balalaika-extended',
			'matreshka_dir/dollar-lib',
			'matreshka_dir/binders'
		], factory);
	} else {
		root.magic = root.MatreshkaMagic = factory(root.$b, root.__DOLLAR_LIB, root.__MK_BINDERS);
	}
}(this, function($b, $, binders) { // make dollar! useas$
	// trim, extend, randomString, toArray, each,
	// review and resort
	var magic, toArray, each, extend, trim, sym,
		initMK = function(object) {
			object._initMK ? object._initMK() : magic.initMK(object);
			return object;
		},

		/**
		 * @private
		 * @summary selectNodes selects nodes match to custom selectors such as :sandbox and :bound(KEY)
		 */
		selectNodes = function(object, s) {
			var result = $(),
				execResult,
				$bound,
				node,
				selectors,
				selector,
				i, j,
				random;

			// replacing :sandbox to :bound(sandbox)
			selectors = s.replace(/:sandbox/g, ':bound(sandbox)').split(',');

			for (i = 0; i < selectors.length; i++) {
				selector = selectors[i];

				if (execResult = /:bound\(([^(]*)\)(.*)/.exec(trim(selector))) {
					// getting KEY from :bound(KEY)
					$bound = object.$bound(execResult[1]);

					// if native selector passed after :bound(KEY) is not empty string
					// for example ":bound(KEY) .my-selector"
					if (selector = trim(execResult[2])) {
						// if native selector contains children selector
						// for example ":bound(KEY) > .my-selector"
						if (selector.indexOf('>') === 0) {
							// selecting children
							for (j = 0; j < $bound.length; j++) {
								node = $bound[j];
								random = magic.randomString();
								node.setAttribute(random, random);
								result = result.add($('[' + random + '="' + random + '"]' + selector, node));
								node.removeAttribute(random);
							}

						} else {
							// if native selector doesn't contain children selector
							result = result.add($bound.find(selector));
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
		};

	magic = {
		/**
		 * @private
		 * @since 0.0.4
		 * @todo optimize
		 * @summary This object is used to map DOM nodes and their DOM events
		 */
		domEvents: {
			list: {},
			// adds events to the map
			add: function(o) {
				if (o.node) {
					if (typeof o.on == 'function') {
						o.on.call(o.node, o.handler);
					} else {
						$(o.node).on(o.on.split(/\s/).join('.mk ') + '.mk', o.handler);
					}
				}

				(this.list[o.instance[sym].id] = this.list[o.instance[sym].id] || []).push(o);
			},
			// removes events from the map
			remove: function(o) {
				var evts = this.list[o.instance[sym].id],
					evt, i;

				if (!evts) return;

				for (i = 0; i < evts.length; i++) {
					evt = evts[i];
					if (evt.node !== o.node) continue;
					// remove Matreshka event
					evt.mkHandler && magic._off(o.instance, '_runbindings:' + o.key, evt.mkHandler);
					// remove DOM event
					if (typeof evt.on == 'string') {
						$(o.node).off(evt.on + '.mk', evt.handler);
					}

					evt.removed = true;


					this.list[o.instance[sym].id].splice(i--, 1);
				}
			}
		},

		initMK: function(object) {
			if (!object[sym]) {
				Object.defineProperty(object, sym, {
					value: {
						events: {},
						special: {},
						id: 'mk' + Math.random()
					},
					enumerable: false,
					configurable: false,
					writable: false
				});
			}

			return object;
		},

		on: function(object, names, callback, triggerOnInit, context, evtData) {
			if (!object) return object;
			initMK(object);

			var t, i;

			// if event-callback object is passed to the function
			if (typeof names == 'object' && !(names instanceof Array)) {
				for (i in names) {
					if (names.hasOwnProperty(i)) {
						magic.on(object, i, names[i], callback, triggerOnInit);
					}
				}

				return object;
			}

			// callback is required
			if (!callback) throw Error('callback is not function for event(s) "' + names + '"');

			names = names instanceof Array ? names : trim(names)
				.replace(/\s+/g, ' ') // single spaces only
				.split(/\s(?![^(]*\))/g) // split by spaces
			;

			// allow to flip triggerOnInit and context
			if (typeof triggerOnInit != 'boolean' && typeof triggerOnInit != 'undefined') {
				t = context;
				context = triggerOnInit;
				triggerOnInit = t;
			}

			// for every name call _on method
			for (i = 0; i < names.length; i++) {
				magic._on(object, names[i], callback, context, evtData);
			}

			// trigger after event is initialized
			if (triggerOnInit === true) {
				callback.call(context || object, {
					triggeredOnInit: true
				});
			}

			return object;
		},

		_fastAddListener: function(object, name, callback, context, evtData) {
			var allEvents = object[sym].events,
				events = allEvents[name] || (allEvents[name] = []);

			events.push({
				callback: callback,
				context: context,
				ctx: context || object,
				name: name
			});

			if (name.indexOf('change:') === 0) {
				// define needed accessors for KEY
				magic._defineSpecial(object, name.replace('change:', ''));
			}

			return object;
		},

		_addListener: function(object, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var ctx = context || object,
				allEvents = object[sym].events,
				events = allEvents[name] || (allEvents[name] = []),
				l = events.length,
				domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)?(\((.*)\))?)?/,
				defaultEvtData = {
					callback: callback,
					//_callback: callback._callback || callback,
					context: context,
					ctx: ctx,
					//howToRemove: null,
					name: name
				},
				i,
				ev,
				_evtData,
				executed;

			for (i = 0; i < l; i++) {
				ev = events[i];
				if ((ev.callback == callback || ev.callback == callback._callback) && ev.context == context) {
					return object;
				}
			}

			if (evtData) {
				_evtData = {};
				for (i in evtData) {
					_evtData[i] = evtData[i];
				}
				for (i in defaultEvtData) {
					_evtData[i] = defaultEvtData[i];
				}
			} else {
				_evtData = defaultEvtData;
			}

			events.push(_evtData);

			executed = domEvtNameRegExp.exec(name);

			if (executed && executed[2]) {
				magic._addDOMListener(object, executed[3] || 'sandbox', executed[1], executed[5], callback, ctx, _evtData);
			} else if (name.indexOf('change:') === 0) {
				// define needed accessors for KEY
				magic._defineSpecial(object, name.replace('change:', ''));
			}

			allEvents[ 'addevent:' + name ]
				&& magic._trigger( object, 'addevent:' + name );

			return object;
		},

		_removeListener: function(object, name, callback, context, evtData) {
			if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

			var events = object[sym].events[name] || [],
				retain = object[sym].events[name] = [],
				domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)(\((.*)\))?)?/,
				j = 0,
				l = events.length,
				evt,
				i,
				executed;

			evtData = evtData || {};

			executed = domEvtNameRegExp.exec(name);

			if (executed && executed[2]) {
				magic._removeDOMListener(object, executed[3], executed[1], executed[5], callback, context);
			} else {
				for (i = 0; i < l; i++) {
					evt = events[i];

					if (evt.howToRemove ? !evt.howToRemove(evt, evtData) : (callback && (callback !== evt.callback
						&& callback._callback !== evt.callback)) || (context && context !== evt.context)) {
						retain[j++] = evt;
					}
				}

				if (!retain.length) {
					delete object[sym].events[name];
				}
			}

			return object;
		},

		_delegateListener: function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var executed = /([^\.]+)\.(.*)/.exec(path),
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
								item && magic._delegateListener(item, path, name, callback, context, evtData);
							});
						};

						f._callback = callback;
						magic._addListener(object, 'add', f, context, evtData);
						f();
					} else if (object.isMKObject) {
						f = function(evt) {
							var target = object[evt.key];

							if (target && evt && (evt.key in object[sym].keys)) {
								magic._delegateListener(target, path, name, callback, context, evtData);
							}
						};

						object.each(function(item) {
							magic._delegateListener(item, path, name, callback, context, evtData);
						});

						f._callback = callback;

						magic._addListener(object, 'change', f, context, evtData);
					} else {
						throw Error('"*" events are only allowed for MK.Array and MK.Object');
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

						evtData.previousValue = evt && evt.previousValue
							|| evtData.previousValue && evtData.previousValue[firstKey];

						if (evt && evt.previousValue && evt.previousValue[sym]) {
							magic._undelegateListener(evt.previousValue, path, name, callback, context, evtData);
						}

						if (typeof target == 'object' && target) {
							magic._delegateListener(target, path, name, callback, context, evtData);
						}

						if (name.indexOf('change:') === 0) {
							changeKey = name.replace('change:', '');

							if (!path && evtData.previousValue && evtData.previousValue[changeKey]
								!== target[changeKey]) {
								changeEvents = evtData.previousValue[sym].events[name];
								if (changeEvents) {
									for (i = 0; i < changeEvents.length; i++) {
										if (changeEvents[i].path === path) {
											triggerChange = false;
										}
									}
								}

								if (triggerChange) {
									magic.set(target, changeKey, target[changeKey], {
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

					magic._addListener(object, 'change:' + firstKey, f, context, evtData);

					f();
				}
			} else {
				magic._addListener(object, name, callback, context, evtData);
			}
		},

		/**
		 * @private
		 * @summary this experimental function adds event listener to any object from deep tree of objects
		 */
		_delegateTreeListener: function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var f;

			f = function(evt) {
				var target = object[evt.key];

				if (target) {
					magic._delegateListener(target, path, name, callback, context, evtData);
					magic._delegateTreeListener(target, path, name, callback, context, evtData);
				}
			};

			each(object, function(item) {
				magic._delegateListener(item, path, name, callback, context, evtData);
				magic._delegateTreeListener(item, path, name, callback, context, evtData);
			});

			f._callback = callback;

			magic._addListener(object, 'change', f, context, evtData);

			return object;
		},



		_undelegateListener: function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var executed = /([^\.]+)\.(.*)/.exec(path),
				firstKey = executed ? executed[1] : path,
				events,
				i,
				p = path;

			path = executed ? executed[2] : '';

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						if (callback) {
							magic._undelegateListener(object, path, 'add', callback, context, evtData);
						} else {
							events = object[sym].events.add || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {

									magic._undelegateListener(object, path, 'add', events[i].callback);
								}
							}
						}

						object.forEach(function(item) {
							item && magic._undelegateListener(item, path, name, callback, context);
						});
					} else if (object.isMKObject) {
						if (callback) {
							magic._undelegateListener(object, path, 'change', callback, context);
						} else {
							events = object[sym].events.change || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {
									magic._undelegateListener(object, path, 'change', events[i].callback);
								}
							}
						}

						object.each(function(item) {
							item && magic._undelegateListener(item, path, name, callback, context);
						});
					}
				} else {
					if (callback) {
						magic._removeListener(object, 'change:' + firstKey, callback, context, evtData);
					} else {
						events = object[sym].events['change:' + firstKey] || [];
						for (i = 0; i < events.length; i++) {
							if (events[i].path == p) {
								magic._removeListener(object, 'change:' + firstKey, events[i].callback);
							}
						}
					}
					if (typeof object[firstKey] == 'object') {
						magic._undelegateListener(object[firstKey], path, name, callback, context, evtData);
					}
				}
			} else {
				magic._removeListener(object, name, callback, context, evtData);
			}
		},

		_addDOMListener: function(object, key, domEvtName, selector, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			selector = selector || null;
			evtData = evtData || {};
			var domEvtHandler = function(domEvt) {
					var node = this,
						$nodes = $(node),
						evt = {
							self: object,
							node: node,
							$nodes: $nodes,
							key: key,
							domEvent: domEvt,
							originalEvent: domEvt.originalEvent || domEvt,
							preventDefault: function() {
								domEvt.preventDefault();
							},
							stopPropagation: function() {
								domEvt.stopPropagation();
							},
							which: domEvt.which,
							target: domEvt.target
						},
						randomID,
						is;

					// DOM event is delegated
					if (selector) {
						randomID = 'x' + String(Math.random()).split('.')[1];
						node.setAttribute(randomID, randomID);
						is = '[' + randomID + '="' + randomID + '"] ' + selector;

						if ($(domEvt.target).is(is + ',' + is + ' *')) {
							callback.call(context, evt);
						}

						node.removeAttribute(randomID);
					} else {
						callback.call(context, evt);
					}
				},
				fullEvtName = domEvtName + '.' + object[sym].id + key,
				bindHandler = function(evt) {
					evt && evt.$nodes && evt.$nodes.on(fullEvtName, domEvtHandler);
				},
				unbindHandler = function(evt) {
					evt && evt.$nodes && evt.$nodes.off(fullEvtName, domEvtHandler);
				};

			magic._defineSpecial(object, key);

			bindHandler._callback = unbindHandler._callback = callback;

			// minor but TODO
			// wat if user adds same DOM listener twice or more?
			// then bind/unbind will not be added but bindHandler will be called anyway
			magic._addListener(object, 'bind:' + key, bindHandler, context, evtData);
			magic._addListener(object, 'unbind:' + key, unbindHandler, context, evtData);

			bindHandler({
				$nodes: object[sym].special[key] && object[sym].special[key].$nodes
			});


			return object;
		},

		_removeDOMListener: function(object, key, domEvtName, selector, callback, context, evtData) {
			if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

			selector = selector || null;
			evtData = evtData || {};

			if (key && object[sym].special[key]) {
				object[sym].special[key].$nodes.off(domEvtName + '.' + object[sym].id + key);
				magic._removeListener(object, 'bind:' + key, callback, context, evtData);
				magic._removeListener(object, 'unbind:' + key, callback, context, evtData);
			}

			return object;
		},

		_on: function(object, name, callback, context) {
			if (!object) return object;
			initMK(object);

			var path;
			// index of @
			var lastIndexOfET = name.lastIndexOf('@');

			if (~lastIndexOfET) {
				path = name.slice(0, lastIndexOfET).replace(/([^@]*)@/g, function($0, key) {
					return (key || '*') + '.';
				}).replace(/\.$/, '.*') || '*';

				name = name.slice(lastIndexOfET + 1);

				magic._delegateListener(object, path, name, callback, context || object);
			} else {
				magic._addListener(object, name, callback, context);
			}

			return object;
		},

		_off: function(object, name, callback, context) {
			if (!object) return object;

			initMK(object);

			var path;
			// index of @
			var lastIndexOfET = name.lastIndexOf('@');

			if (~lastIndexOfET) {
				path = name.slice(0, lastIndexOfET);
				name = name.slice(lastIndexOfET + 1).replace(/@/g, '.');

				magic._undelegateListener(object, path, name, callback, context);
			} else {
				magic._removeListener(object, name, callback, context);
			}

			return object;
		},

		once: function(object, names, callback, context, evtData) {
			var i;
			if (!object || typeof object != 'object') return object;

			if (typeof names == 'object') {
				for (i in names)
					if (names.hasOwnProperty(i)) {
						magic.once(object, i, names[i], callback, context);
					}

				return object;
			}

			if (!callback) throw Error('callback is not function for event "' + names + '"');

			initMK(object);

			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				(function(name) {
					var once = (function(func) {
						var ran = false,
							memo;
						return function() {
							if (ran) return memo;
							ran = true;
							memo = func.apply(this, arguments);
							func = null;
							return memo;
						};
					})(callback);
					once._callback = callback;
					magic._on(object, name, once, context);
				})(names[i]);
			}

			return object;
		},

		onDebounce: function(object, names, callback, debounceDelay, triggerOnInit, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var cbc, i;

			if (typeof names == 'object') {
				for (i in names)
					if (names.hasOwnProperty(i)) {
						magic.onDebounce(object, i, names[i], callback, debounceDelay, triggerOnInit, context);
					}

				return object;
			}

			// flip args
			if (typeof debounceDelay != 'number') {
				evtData = context;
				context = triggerOnInit;
				triggerOnInit = debounceDelay;
				debounceDelay = 0;
			}

			cbc = magic.debounce(callback, debounceDelay);

			// set reference to real callback for .off method
			cbc._callback = callback;

			return magic.on(object, names, cbc, triggerOnInit, context, evtData);
		},

		_defineSpecial: function(object, key, noAccessors) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var specialProps = object[sym].special[key];

			if (!specialProps) {
				specialProps = object[sym].special[key] = {
					$nodes: $(),
					value: object[key],
					getter: null,
					setter: null,
					mediator: null
				};

				if (!noAccessors) {
					Object.defineProperty(object, key, {
						configurable: true,
						enumerable: true,
						get: function() {
							return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
						},
						set: function(v) {
							specialProps.setter ? specialProps.setter.call(object, v) : magic.set(object, key, v, {
								fromSetter: true
							});
						}
					});
				}
			}

			return specialProps;
		},

		mediate: function(object, keys, mediator) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var type = typeof keys,
				i,
				special;

			if (type == 'object' && !(keys instanceof Array)) {
				for (i in keys)
					if (keys.hasOwnProperty(i)) {
						magic.mediate(object, i, keys[i]);
					}
				return object;
			}

			keys = type == 'string' ? keys.split(/\s/) : keys;

			for (i = 0; i < keys.length; i++)(function(key) {
				special = magic._defineSpecial(object, key);

				special.mediator = function(v) {
					return mediator.call(object, v, special.value, key, object);
				};

				magic.set(object, key, special.mediator(special.value), {
					fromMediator: true
				});
			})(keys[i]);

			return object;
		},

		setClassFor: function(object, keys, Class, updateFunction) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var type = typeof keys,
				i;

			if (type == 'object' && !(keys instanceof Array)) {
				for (i in keys)
					if (keys.hasOwnProperty(i)) {
						magic.setClassFor(object, i, keys[i], Class);
					}

				return object;
			}

			keys = type == 'string' ? keys.split(/\s/) : keys;

			updateFunction = updateFunction || function(instance, data) {
				var i;

				for (i in data) {
					if (data.hasOwnProperty(i)) {
						instance[i] = data[i];
					}
				}
			};

			for (i = 0; i < keys.length; i++) {
				magic.mediate(object, keys[i], function(v, previousValue) {
					var result;
					if (previousValue instanceof Class) {
						updateFunction.call(object, previousValue, v);
						result = previousValue;
					} else {
						result = new Class(v);
					}

					return result;
				});
			}

			return object;
		},

		linkProps: function(object, key, keys, getter, setOnInit) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			keys = typeof keys == 'string' ? keys.split(/\s/) : keys;

			var on_Change = function(evt) {
					var values = [],
						_protect = evt._protect = evt._protect || {};

					evt.fromDependency = true;

					if (!(key + object[sym].id in _protect)) {
						if (typeof keys[0] == 'object') {
							for (i = 0; i < keys.length; i += 2) {
								_this = keys[i];

								_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
								for (j = 0; j < _keys.length; j++) {
									values.push(_this[_keys[j]]);
								}
							}
						} else {
							for (i = 0; i < keys.length; i++) {
								_key = keys[i];
								_this = object;
								values.push(_this[_key]);
							}
						}

						_protect[key + object[sym].id] = 1;
						//evt._protect = evt._protect || evt.key + object[ sym ].id;

						magic.set(object, key, getter.apply(object, values), evt);
					}

				},
				_this, _key, _keys, i, j;

			getter = getter || function(value) {
				return value;
			};


			if (typeof keys[0] == 'object') {
				for (i = 0; i < keys.length; i += 2) {
					_this = initMK(keys[i]);
					_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
					for (j = 0; j < _keys.length; j++) {
						magic._defineSpecial(_this, _keys[j]);
						magic._fastAddListener(_this, '_rundependencies:' + _keys[j], on_Change);
					}
				}
			} else {
				for (i = 0; i < keys.length; i++) {
					_key = keys[i];
					_this = object;
					magic._defineSpecial(_this, _key);
					magic._fastAddListener(_this, '_rundependencies:' + _key, on_Change);
				}
			}

			setOnInit !== false && on_Change.call(typeof keys[0] == 'object' ? keys[0] : object, {
				key: typeof keys[0] == 'object' ? keys[1] : keys[0]
			});

			return object;
		},

		off: function(object, names, callback, context) {
			var i;

			// if event-callback object is passed to the function
			if (typeof names == 'object' && !(names instanceof Array)) {
				for (i in names)
					if (names.hasOwnProperty(i)) {
						magic.off(object, i, names[i], callback);
					}

				return object;
			}

			if (!names && !callback && !context && object[sym]) {
				object[sym].events = {};
				return object;
			}

			names = trim(names)
				.replace(/\s+/g, ' ') // single spaces only
				.split(/\s(?![^(]*\))/g);

			if (typeof object != 'object') {
				return object;
			}

			for (i = 0; i < names.length; i++) {
				object._off ? object._off(names[i], callback, context) : magic._off(object, names[i], callback, context);
			}

			return object;
		},


		trigger: function(object, names) {
			if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

			var args,
				i;

			if (names) {
				args = toArray(arguments);
				names = names.split(/\s/);

				for (i = 0; i < names.length; i++) {
					args = args.slice();
					magic._trigger.apply(magic, args);
				}
			}

			return object;
		},


		_trigger: function(object, name) {
			var events = object && typeof object == 'object' && object[sym]
					&& object[sym].events && object[sym].events[name],
				args, i, l, ev;

			if (events) {
				args = toArray(arguments, 2),
					i = -1, l = events.length;
				while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
			}

			return object;
		},

		_fastTrigger: function(object, name, evt) {
			var events = object[sym].events[name],
				i, l, ev;

			if (events) {
				i = -1, l = events.length;
				while (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);
			}
		},

		bindNode: function(object, key, node, binder, evt, optional) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var isUndefined = typeof object[key] == 'undefined',
				$nodes,
				keys,
				i,
				j,
				special,
				indexOfDot,
				path,
				listenKey,
				changeHandler,
				domEvt,
				_binder,
				options,
				_options,
				mkHandler,
				foundBinder,
				_evt;

			/*
			 * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
			 */
			if (key instanceof Array) {
				for (i = 0; i < key.length; i++) {
					magic.bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
				}

				return object;
			}

			/*
			 * this.bindNode('key1 key2', node, binder, { silent: true });
			 */
			if (typeof key == 'string') {
				keys = trim(key).split(/\s+/);
				if (keys.length > 1) {
					for (i = 0; i < keys.length; i++) {
						magic.bindNode(object, keys[i], node, binder, evt);
					}
					return object;
				}
			}

			/*
			 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
			 */
			if (typeof key == 'object') {
				for (i in key) {
					if (key.hasOwnProperty(i)) {
						magic.bindNode(object, i, key[i], node, binder, evt);
					}
				}

				return object;
			}

			/*
			 * this.bindNode('key', [ node, binder ], { silent: true });
			 */
			if (node && node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
				return magic.bindNode(object, key, node[0], node[1], binder, evt);
			}

			indexOfDot = key.indexOf('.');

			if (~indexOfDot) {
				path = key.split('.');
				changeHandler = function(evt) {
					var target = evt && evt.value;
					if (!target) {
						target = object;
						for (var i = 0; i < path.length - 1; i++) {
							target = target[path[i]];
						}
					}
					magic.bindNode(target, path[path.length - 1], node, binder, evt, optional);

					if (evt && evt.previousValue) {
						magic.unbindNode(evt.previousValue, path[path.length - 1], node);
					}
				};

				magic._delegateListener(object, path.slice(0, path.length - 2).join('.'),
					'change:' + path[path.length - 2], changeHandler);

				changeHandler();

				return object;
			}

			$nodes = magic._getNodes(object, node);

			if (!$nodes.length) {
				if (optional) {
					return object;
				} else {
					throw Error('Binding error: node is missing for key "' + key + '".'
						+ (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
				}
			}

			evt = evt || {};

			special = magic._defineSpecial(object, key, key == 'sandbox');

			special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

			if (object.isMK) {
				if (key == 'sandbox') {
					object.$sandbox = $nodes;
					object.sandbox = $nodes[0];
				}
				object.$nodes[key] = special.$nodes;
				object.nodes[key] = special.$nodes[0];
			}

			if (key != 'sandbox') {
				for (i = 0; i < $nodes.length; i++) (function(node){
					var _binder,
						options = {
							self: object,
							key: key,
							$nodes: $nodes,
							node: node
						};

					if (binder === null) {
						_binder = {};
					} else {
						foundBinder = key == 'sandbox' ? null : magic.lookForBinder(node);

						if (foundBinder) {
							if (binder) {
								for (j in binder) {
									foundBinder[j] = binder[j];
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
						for (j in options) {
							_options[j] = options[j];
						}
						_binder.initialize.call(node, _options);
					}

					if (_binder.setValue) {
						mkHandler = function(evt) {
							var v = object[key];
							if (evt && evt.changedNode == node && evt.onChangeValue == v) return;

							_options = {
								value: v
							};

							for (j in options) {
								_options[j] = options[j];
							}

							_binder.setValue.call(node, v, _options);
						};
						magic._fastAddListener(object, '_runbindings:' + key, mkHandler);
						!isUndefined && mkHandler();
					}

					if (_binder.getValue
							&& (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {
						_evt = {
							fromNode: true
						};

						for (j in evt) {
							_evt[j] = evt[j];
						}

						magic.set(object, key, _binder.getValue.call(node, options), _evt);
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
									magic.set(object, key, value, {
										fromNode: true,
										changedNode: node,
										onChangeValue: value
									});
								}
							}
						};

						magic.domEvents.add(domEvt);
					}

				})($nodes[i]);
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

				magic._fastTrigger(object, 'bind:' + key, _evt);
				magic._fastTrigger(object, 'bind', _evt);
			}

			return object;
		},

		bindOptionalNode: function(object, key, node, binder, evt) {
			if (typeof key == 'object') {
				/*
				 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
				 */
				magic.bindNode(object, key, node, binder, true);
			} else {
				magic.bindNode(object, key, node, binder, evt, true);
			}

			return object;
		},

		unbindNode: function(object, key, node, evt) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var type = typeof key,
				$nodes,
				keys,
				special = object[sym].special[key],
				i,
				indexOfDot,
				path,
				listenKey,
				_evt;

			if (key instanceof Array) {
				for (i = 0; i < key.length; i++) {
					evt = node;
					magic.unbindNode(object, key[i][0], key[i][1] || evt, evt);
				}

				return object;
			}

			if (type == 'string') {
				keys = key.split(/\s/);
				if (keys.length > 1) {
					for (i = 0; i < keys.length; i++) {
						magic.unbindNode(object, keys[i], node, evt);
					}
					return object;
				}
			}

			indexOfDot = key.indexOf('.');

			if (~indexOfDot) {
				path = key.split('.');
				var target = object;

				for (i = 0; i < path.length - 1; i++) {
					target = target[path[i]];
				}

				magic._undelegateListener(object, path.slice(0, path.length - 2), 'change:' + path[path.length - 2]);

				magic.unbindNode(target, path[path.length - 1], node, evt);

				return object;
			}

			if (key === null) {
				for (key in object[sym].special)
					if (object[sym].special.hasOwnProperty(key)) {
						magic.unbindNode(object, key, node, evt);
					}
				return object;
			} else if (type == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.unbindNode(object, i, key[i], node);
					}
				return object;
			} else if (!node) {
				if (special && special.$nodes) {
					return magic.unbindNode(object, key, special.$nodes, evt);
				} else {
					return object;
				}
			} else if (node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
				// It actually ignores binder. With such a syntax you can assign definite binders to some variable and then easily delete all at once using
				return magic.unbindNode(object, key, node[0], evt);
			} else if (!special) {
				return object;
			}

			$nodes = magic._getNodes(object, node);

			each($nodes, function(node, i) {
				magic.domEvents.remove({
					key: key,
					node: node,
					instance: object
				});

				special.$nodes = special.$nodes.not(node);
			});

			if (object.isMK) {
				object.$nodes[key] = special.$nodes;
				object.nodes[key] = special.$nodes[0] || null;

				if (key == 'sandbox') {
					object.sandbox = special.$nodes[0] || null;
					object.$sandbox = special.$nodes;
				}
			}

			if (!evt || !evt.silent) {
				_evt = {
					key: key,
					$nodes: $nodes,
					node: $nodes[0] || null
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				magic._fastTrigger(object, 'unbind:' + key, _evt);
				magic._fastTrigger(object, 'unbind', _evt);
			}

			return object;
		},

		selectAll: function(object, s) {
			if (!object || typeof object != 'object' || !object.$sandbox) return $();
			initMK(object);

			return /:sandbox|:bound\(([^(]*)\)/.test(s) ? selectNodes(object, s) : object.$sandbox.find(s);
		},

		select: function(object, s) {
			return magic.selectAll(object, s)[0] || null;
		},

		boundAll: function(object, key) {
			if (!object || typeof object != 'object') return $();

			initMK(object);

			var special = object[sym].special,
				keys, $nodes, i;

			key = !key ? 'sandbox' : key;
			keys = typeof key == 'string' ? key.split(/\s+/) : key;
			if (keys.length <= 1) {
				return keys[0] in special ? special[keys[0]].$nodes : $();
			} else {
				$nodes = $();

				for (i = 0; i < keys.length; i++) {
					$nodes = $nodes.add(special[keys[i]].$nodes);
				}

				return $nodes;
			}
		},


		$bound: function(object, key) {
			return magic.boundAll(object, key);
		},


		bound: function(object, key) {
			if (!object || typeof object != 'object') return null;

			initMK(object);

			var special = object[sym].special,
				keys,
				i;

			key = !key ? 'sandbox' : key;
			keys = typeof key == 'string' ? key.split(/\s+/) : key;
			if (keys.length <= 1) {
				return keys[0] in special ? special[keys[0]].$nodes[0] || null : null;
			} else {
				for (i = 0; i < keys.length; i++) {
					if (keys[i] in special && special[keys[i]].$nodes.length) {
						return special[keys[i]].$nodes[0];
					}
				}
			}

			return null;
		},

		get: function(object, key) {
			return object && object[key];
		},

		// set method is the most often used method
		// we need to optimize it as good as possible
		set: function(object, key, v, evt) {

			if (!object || typeof object != 'object') return object;

			var type = typeof key,
				_isNaN = Number.isNaN || function(value) {
					return typeof value == 'number' && isNaN(value);
				},
                special, events, prevVal, newV, i, _evt, triggerChange;

			if (type == 'undefined') return object;

			if (type == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.set(object, i, key[i], v);
					}
				return object;
			}

			if (!object[sym] || !object[sym].special || !object[sym].special[key]) {
				object[key] = v;
				return object;
			}

			special = object[sym].special[key];
			events = object[sym].events;

			prevVal = special.value;

			if (special.mediator && v !== prevVal && (!evt || !evt.skipMediator && !evt.fromMediator)) {
				newV = special.mediator(v, prevVal, key, object);
			} else {
				newV = v;
			}

			_evt = {
				value: newV,
				previousValue: prevVal,
				key: key,
				node: special.$nodes[0] || null,
				$nodes: special.$nodes,
				self: object
			};

			if (evt && typeof evt == 'object') {
				for (i in evt) {
					_evt[i] = evt[i];
				}
			}

			triggerChange = (newV !== prevVal || _evt.force) && !_evt.silent;

			if (triggerChange) {
				events['beforechange:' + key] && magic._fastTrigger(object, 'beforechange:' + key, _evt);

				events.beforechange && magic._fastTrigger(object, 'beforechange', _evt);
			}

			special.value = newV;

			if (newV !== prevVal || _evt.force || _evt.forceHTML || newV !== v && !_isNaN(newV)) {
				if (!_evt.silentHTML) {
					events['_runbindings:' + key] && magic._fastTrigger(object, '_runbindings:' + key, _evt);
				}
			}

			if (triggerChange) {
				events['change:' + key] && magic._fastTrigger(object, 'change:' + key, _evt);

				events.change && magic._fastTrigger(object, 'change', _evt);
			}

			if ((newV !== prevVal || _evt.force || _evt.forceHTML) && !_evt.skipLinks) {
				events['_rundependencies:' + key] &&
					magic._fastTrigger(object, '_rundependencies:' + key, _evt);
			}

			return object;
		},


		/**
		 * @private
		 * Experimental simple template engine
		 */
		_parseBindings: function(object, node) {
			if (!object || typeof object != 'object') return null;

			initMK(object);

			var $nodes = (typeof node == 'string' ? magic.$.parseHTML(node.replace(/^\s+|\s+$/g, '')) : $(node)),
				all = $nodes.find('*').add($nodes);

			each(all, function(node) {

				(function f(node) {
					if (node.tagName !== 'TEXTAREA') {
						each(node.childNodes, function(childNode) {
							var previous = childNode.previousSibling,
								textContent;

							if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf('{{')) {
								textContent = childNode.nodeValue.replace(/{{([^}]*)}}/g,
									'<mk-bind mk-html="$1"></mk-bind>');
								if (previous) {
									previous.insertAdjacentHTML('afterend', textContent);
								} else {
									node.insertAdjacentHTML('afterbegin', textContent);
								}

								node.removeChild(childNode);
							} else if (childNode.nodeType == 1) {
								f(childNode);
							}
						});
					}
				})(node);
			});

			// reload list of nodes
			all = $nodes.find('*').add($nodes);

			each(all, function(node) {
				var bindHTMLKey = node.getAttribute('mk-html');
				if (bindHTMLKey) {
					magic.bindNode(object, bindHTMLKey, node, magic.binders.innerHTML());
					node.removeAttribute('mk-html');
				}

				each(node.attributes, function(attr) {
					var attrValue = trim(attr.value),
						attrName = attr.name,
						keys,
						key,
						binder;

					if (~attrValue.indexOf('{{')) {
						keys = attrValue.match(/{{[^}]*}}/g).map(function(key) {
							return key.replace(/{{(.*)}}/, '$1');
						});

						if (keys.length == 1 && /^{{[^}]*}}$/g.test(attrValue)) {
							key = keys[0];
						} else {
							key = magic.randomString();
							magic.linkProps(object, key, keys, function() {
								var v = attrValue;
								keys.forEach(function(_key) {
									v = v.replace(new RegExp('{{' + _key + '}}', 'g'), object[_key]);
								});

								return v;
							});
						}

						if ((attrName == 'value' && node.type != 'checkbox' || attrName == 'checked'
								&& node.type == 'checkbox') && magic.lookForBinder(node)) {
							magic.bindNode(object, key, node);
						} else {
							magic.bindNode(object, key, node, magic.binders.attribute(attrName));
						}
					}
				});
			});

			return $nodes;
		},

		remove: function(object, key, evt) {
			if (!object || typeof object != 'object') return null;

			var exists,
				keys = String(key).split(/\s/),
				i,
				_evt = {
					keys: keys
				};

			if (evt && typeof evt == 'object') {
				for (i in evt) {
					_evt[i] = evt[i];
				}
			}

			for (i = 0; i < keys.length; i++) {
				key = keys[i];
				exists = key in object;

				if (exists) {
					_evt.key = key;
					_evt.value = object[key];

					try { // @IE8 spike
						delete object[key];
					} catch (e) {}

					if (object[sym]) {
						magic.unbindNode(object, key);
						magic.off(object, 'change:' + key + ' beforechange:' + key
							+ ' _runbindings:' + key + ' _rundependencies:' + key);
						delete object[sym].special[key];

						if (!_evt.silent) {
							magic._fastTrigger(object, 'delete', _evt);
							magic._fastTrigger(object, 'delete:' + key, _evt);
						}
					}
				}
			}

			return object;
		},

		_getNodes: function(object, s) {
			return typeof s == 'string' && !/</.test(s) && /:sandbox|:bound\(([^(]*)\)/.test(s)
				? selectNodes(object, s) : $(s);
		},

		define: function(object, key, descriptor) {
			if (!object || typeof object != 'object') return object;

			var i;

			if (typeof key == 'object') {
				for (i in key) {
					magic.define(object, i, key[i]);
				}

				return object;
			}

			Object.defineProperty(object, key, descriptor);

			return object;
		},

		defineGetter: function(object, key, getter) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var i,
				special;

			if (typeof key == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.defineGetter(object, i, key[i]);
					}

				return object;
			}

			special = magic._defineSpecial(object, key);

			special.getter = function() {
				return getter.call(object, {
					value: special.value,
					key: key,
					self: object
				});
			};

			return object;
		},

		defineSetter: function(object, key, setter) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var i;

			if (typeof key == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.defineSetter(object, i, key[i]);
					}

				return object;
			}

			magic._defineSpecial(object, key).setter = function(v) {
				return setter.call(object, v, {
					value: v,
					key: key,
					self: object
				});
			};

			return object;
		},

		delay: function(object, f, delay, thisArg) {
			if (typeof delay == 'object') {
				thisArg = delay;
				delay = 0;
			}

			setTimeout(function() {
				f.call(thisArg || object);
			}, delay || 0);

			return object;
		},

		trim: trim = function(s) {
			return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, '');
		},

		toArray: toArray = function(object, start) {
			var array = [],
				l = object.length,
				i;

			start = start || 0;

			for (i = start; i < l; i++) {
				array[i - start] = object[i];
			}

			return array;
		},

		extend: extend = function(o1, o2) {
			var i, j;
			if (o1)
				for (i = 1; i < arguments.length; i++) {
					o2 = arguments[i];
					if (o2)
						for (j in o2)
							if (o2.hasOwnProperty(j)) {
								o1[j] = o2[j];
							}
				}
			return o1;
		},

		each: each = function(o, f, thisArg) {
			if (!o) return;
			if (o.isMK && typeof o.each == 'function') o.each(f, thisArg);
			else if ('length' in o)[].forEach.call(o, f, thisArg);
			else
				for (var i in o)
					if (o.hasOwnProperty(i)) {
						f.call(thisArg, o[i], i, o);
					}
			return o;
		},

		randomString: function() {
			return (new Date().getTime() - new Date(2013, 4, 3).getTime()).toString(36)
				+ Math.floor(Math.random() * 1679616).toString(36);
		},

		binders: binders,

		defaultBinders: [function(node) {
			var tagName = node.tagName,
				b;

			if (tagName == 'INPUT') {
				b = binders.input(node.type);
			} else if (tagName == 'TEXTAREA') {
				b = binders.textarea();
			} else if (tagName == 'SELECT') {
				b = binders.select(node.multiple);
			} else if (tagName == 'PROGRESS') {
				b = binders.progress();
			}

			return b;
		}],

		lookForBinder: function(node) {
			var result,
				ep = magic.defaultBinders,
				i;

			for (i = 0; i < ep.length; i++) {
				if (result = ep[i].call(node, node)) {
					return result;
				}
			}
		},

		debounce: function(f, d, thisArg) {
			var timeout;
			if (typeof d !== 'number') {
				thisArg = d;
				d = 0;
			}

			return function() {
				var args = arguments,
					ctx = this;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					f.apply(thisArg || ctx, args);
				}, d || 0);
			};
		},

		noop: function() {},

		$: $,

		$b: $b,

		useAs$: function(_$) {
			return magic.$ = this.$ = $ = _$;
		}
	};

	sym = magic.sym = typeof Symbol == 'undefined' ? 'mk-' + magic.randomString() : Symbol('matreshka');

	return magic;
}));
