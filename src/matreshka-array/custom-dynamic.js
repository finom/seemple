define([
	'matreshka_dir/core/var/map',
	'matreshka_dir/matreshka.class',
	'matreshka_dir/matreshka-array/processrendering',
	'matreshka_dir/matreshka-array/triggermodify',
	'matreshka_dir/matreshka-array/recreate',
	'matreshka_dir/core/initmk'
], function(map, MK, processRendering, triggerModify, recreate, initMK) {
	"use strict";

	return {
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
				newLength = array.length,
				oldLength = _this.length,
				diff = oldLength - newLength,
				was = _this.toArray(),
				trackBy = _this.trackBy,
				prepared,
				i, j,
				_evt,
				trackMap,

				added, removed, now;

			evt = evt || {};

			function update(instance, data) {
				var i;

				if (instance.isMKArray) {
					instance.recreate(data);
				} else if (instance.isMKObject) {
					instance.jset(data);
				} else {
					for (i in data) {
						if (data.hasOwnProperty(i)) {
							instance[i] = data[i];
						}
					}
				}

				return instance;
			}

			if(trackBy) {
				trackMap = {};
				if(trackBy == '$index') {
					for(i = 0; i < newLength; i++) {
						array[i] = _this[i] ? update(_this[i], array[i]) : array[i];
					}
				} else {
					for(i = 0; i < _this.length; i++) {
						trackMap[_this[i][trackBy]] = _this[i];
					}

					for(i = 0; i < newLength; i++) {
						if(array[i][trackBy] in trackMap) {
							array[i] = update(trackMap[array[i][trackBy]], array[i]);
						}
					}
				}
			}

			if (_this._itemMediator && !evt.skipMediator) {
				prepared = [];
				for (i = 0; i < newLength; i++) {
					prepared[i] = _this._itemMediator.call(_this, array[i], i);
				}
				array = prepared;
			}

			for (i = 0; i < newLength; i++) {
				_this[i] = array[i];
			}

			for (i = 0; i < diff; i++) {
				delete _this[i + newLength];

				delete map.get(_this).special[i + newLength];
			}

			_this.length = newLength;

			if (evt.silent && evt.dontRender) {
				return _this;
			}

			now = _this.toArray();

			if (now.length) {
				if(was.length) {
					removed = [];
					j = 0;
					for (i = 0; i < was.length; i++) {
						if (!~now.indexOf(was[i])) {
							removed[j++] = was[i];
						}
					}
				} else {
					removed = [];
				}
			} else {
				removed = was;
			}

			if (was.length) {
				if(now.length) {
					added = [];
					j = 0;
					for (i = 0; i < now.length; i++) {
						if (!~was.indexOf(now[i])) {
							added[j++] = now[i];
						}
					}
				} else {
					added = [];
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

		rerender: function(evt) {
			var _evt = {
					method: 'rerender'
				},
				i;
			if (evt && typeof evt == 'object') {
				for (i in evt) {
					_evt[i] = evt[i];
				}
			}

			return processRendering(this, _evt);
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

			if (returns) {
				recreate(_this, array, evt);

				_evt = {
					returns: returns,
					args: [_index],
					method: 'pull',
					self: _this,
					added: [],
					removed: removed = returns ? [returns] : []
				};

				if(evt) {
					for (i in evt) {
						_evt[i] = evt[i];
					}
				}


				triggerModify(_this, _evt, 'pull');
			}

			return returns;
		},

		restore: function(selector, evt) {
			var _this = this._initMK(),
				objectData = map.get(_this),
				id = objectData.id,
				Model = _this.Model,
				nodes,
				node,
				container,
				i,
				item,
				arraysNodes,
				itemEvt,
				result,
				_evt;

			if(selector) {
				nodes = MK._getNodes(_this, selector);
			} else {
				container = objectData.special.container || objectData.special.sandbox;
				container = container && container.$nodes;
				container = container && container[0];
				nodes = container && container.children;
			}

			if(nodes && nodes.length) {
				result = [];
				for(i = 0; i < nodes.length; i++) {
					node = nodes[i];
					item = Model ? new Model() : {};
					initMK(item);
					arraysNodes = objectData.arraysNodes = {};
					arraysNodes[id] = node;

					if (item.bindRenderedAsSandbox !== false) {
						MK.bindNode(item, 'sandbox', node);
					}

					if(!evt || !evt.silent) {
						itemEvt = {
							node: node,
							$nodes: MK.$(node),
							self: item,
							parentArray: _this
						};

						item.onRender && item.onRender(itemEvt);
						_this.onItemRender && _this.onItemRender(item, itemEvt);
						MK._fastTrigger(item, 'render', itemEvt);
					}

					result[i] = item;
				}

				_evt = {
					dontRender: true
				};

				if(evt) {
					for (i in evt) {
						_evt[i] = evt[i];
					}
				}

				_this.recreate(result, _evt);
			}

			return _this;
		},

		orderBy: function(keys, orders, evt) {
			var _this = this,
				_evt,
				i;

			if(_this.length > 1) {
				recreate(_this, MK.orderBy(_this, keys, orders));

				_evt = {
					method: 'sort', // allows to listen "sort" event
					self: _this,
					added: [],
					removed: []
				};

				if(evt) {
					for (i in evt) {
						_evt[i] = evt[i];
					}
				}

				triggerModify(_this, _evt, 'sort');
			}

			return _this;
		}
	};
});
