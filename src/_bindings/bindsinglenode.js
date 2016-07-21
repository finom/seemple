import lookForBinder from './lookforbinder';
import set from '../set';
import addListener from '../_events/addlistener';
import is from '../_util/is';
import dom from '../_dom';

function runMatreshkaHandler(node, propDef, binder, options, evt) {
    const { value } = propDef;
    const { onChangeValue, changedNode, binder: evtBinder } = evt;
    const { setValue } = binder;
	// dirty hack for https://github.com/matreshkajs/matreshka/issues/19
	const dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? value + '' : value;

    if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
        return;
    }

    setValue.call(node, value, nofn.assign({ value }, options));
};

export default function bindSingleNode(object, {
	binder: givenBinder,
	key,
	$nodes,
	node,
	evt,
	propDef
}) {
	const { assignDefaultValue, debounce } = evt;
    const { value } = propDef;
	const options = {
		self: object,
		key,
        value,
		$nodes,
		node
	};
    const bindings = propDef.bindings = propDef.bindings || [];
	let isUndefined = typeof value == 'undefined';
	let binder;
	let objectHandler;

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

	if (initialize) {
        initialize.call(node, options);
    }

	if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
		const value = getValue.call(node, options);
		isUndefined = typeof value === 'undefined';

		set(object, key, value, nofn.assign({ fromNode: true }, evt));
	}

	if (setValue) {
		objectHandler = () => runMatreshkaHandler(node, propDef, binder, options, evt);

		if(debounce) {
            // TODO
			objectHandler = util.debounce(mkHandler);
		}

		addListener(object, `_change:bindings:${key}`, objectHandler, null, { node });

		if(!isUndefined) {
            objectHandler();
        }
	}

    if(getValue && on) {
        // TODO use CustomEvent instance instead of an object as default value
        const nodeHandler = (domEvent = {}) => {
            const previousValue = propDef.value;
            const { which, target } = domEvent;
            const value = getValue.call(node, nofn.assign({
				previousValue,
				domEvent,
				originalEvent: domEvent.originalEvent || domEvent, // jQuery thing
				preventDefault: () => domEvent.preventDefault(),
                stopPropagation: () => domEvent.stopPropagation(),
				which,
				target
			}, options));

            if (!is(value, previousValue)) {
                // TODO add description of a hack
                // why do we need changedNode, onChangeValue, binder?
				set(object, key, value, {
					fromNode: true,
					changedNode: node,
					onChangeValue: value,
					binder
				});
			}
        };

        bindings.push({
            node,
            binder,
            objectHandler,
            nodeHandler
        });

        if(typeof on == 'function') {
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
