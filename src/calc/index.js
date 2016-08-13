import initMK from '../_core/init';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import addListener from '../on/_addlistener';
import delegateListener from '../on/_delegatelistener';
import debounce from '../_helpers/debounce';
import addSource from './_addsource';
import createCalcHandler from './_createcalchandler';
import defineProp from '../_core/defineprop';

export default function calc(object, target, sources, givenHandler, eventOptions) {
    if(typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        eventOptions = givenHandler;
        givenHandler = sources;
        sources = target;
        target = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'calc');
    }

    if (target instanceof Array) {
        /*
         * accept array of objects
         * this.calc([{target, source, handler, event}], commonEventOptions);
         */
        nofn.forEach(target, ({
            target: itemTarget,
            source: itemSource,
            handler: itemHandler,
            event: itemEventOptions
        }) => {
            const commonEventOptions = sources;
            const mergedEventOptions = {};

            if(commonEventOptions) {
                // extend event object by "global" event
                nofn.assign(mergedEventOptions, commonEventOptions);
            }

            if(itemEventOptions) {
                // extend event object by "local" event ("event" key of an object)
                nofn.assign(mergedEventOptions, itemEventOptions);
            }

            calc(object, itemTarget, itemSource, itemHandler, mergedEventOptions);
        });

        return object;
    }

    if(typeof target !== 'string') {
        throw matreshkaError('calc:target_type', { target });
    }

    eventOptions = eventOptions || {};
    const def = initMK(object);
    const {
        setOnInit=true,
        deep=true,
        debounceCalcOnInit=false,
        debounceCalc=true,
        // the next option is used to hide a property for internal use (eg in bindings parser)
        isTargetPropertyHidden=false
    } = eventOptions;
    const defaultHandler = value => value;
    const handler = givenHandler || defaultHandler;
    const allSources = [];
	const syncCalcHandler = createCalcHandler({
		object,
		eventOptions,
		allSources,
		target,
		def,
		handler
	});

    let debouncedCalcHandler;
    let calcHandler;

    if(debounceCalcOnInit || debounceCalc) {
        debouncedCalcHandler = debounce(syncCalcHandler);
    }

    // create property definition
    defineProp(object, target, isTargetPropertyHidden);

    if(!(sources instanceof Array)) {
        sources = [sources];
    }

    // by default debouncing is off
    // it can be turned on by passing debounce=true or debounce=<number> to event object
    if (debounceCalc) {
        calcHandler = debouncedCalcHandler;
    } else {
        calcHandler = syncCalcHandler;
    }

    nofn.forEach(sources, source => {
        if(typeof source === 'string') {
            addSource({
				calcHandler,
				allSources,
                sourceKey: source,
                sourceObject: object
            });
        } else {
            if(!source || typeof source !== 'object') {
                throw matreshkaError('calc:source_type', { source });
            }

            const sourceKey = source.key;
            const sourceObject = source.object;
            if(sourceKey instanceof Array) {
                nofn.forEach(sourceKey, (sourceKeyItem) => {
                    addSource({
						calcHandler,
						allSources,
                        sourceKey: sourceKeyItem,
                        sourceObject
                    });
                })
            } else {
                addSource({
					calcHandler,
					allSources,
                    sourceKey,
                    sourceObject
                });
            }
        }
    });

    if(setOnInit) {
        if(debounceCalcOnInit) {
            debouncedCalcHandler();
        } else {
            syncCalcHandler();
        }
    }
}
