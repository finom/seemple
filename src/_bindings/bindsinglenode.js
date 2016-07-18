import lookForBinder from './lookforbinder';
import set from '../set';

function runMatreshkaHandler(node, propDef, options, evt) {
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

export default function bindSingleNode(object, {
	binder: givenBinder,
	key,
	$nodes,
	node,
	evt,
	propDef
}) {
	const { assignDefaultValue } = evt;
	const options = {
		self: object,
		key,
		$nodes,
		node
	};
	let isUndefined = typeof propDef.value == 'undefined';
	let binder;
	let mkHandler;

	if (givenBinder !== null) {
		const foundBinder = lookForBinder(node);

		if (foundBinder) {
			if (givenBinder) {
				nofn.assign(foundBinder, givenBinder);
			}

			binder = foundBinder;
		} else {
			binder = givenBinder;
		}
	}

	const { getValue, setValue, on, initialize } = binder;

	/* TODO if (binder.initialize) { ... }*/

	if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
		const value = getValue.call(node, options);
		isUndefined = typeof val == 'undefined';

		set(object, key, value, nofn.assign({
			fromNode: true
		}, evt));
	}

	if (setValue) {
		mkHandler = () => runMatreshkaHandler(node, propDef, options, evt);

		if(evt.debounce) {
			mkHandler = util.debounce(mkHandler);
		}
		console.log(1);
		core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, {node: node});
		console.log(2);
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
