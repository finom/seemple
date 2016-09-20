import initMK from '../_core/init';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import debounce from '../_helpers/debounce';
import addSource from './_addsource';
import createCalcHandler from './_createcalchandler';
import defineProp from '../_core/defineprop';

// defines a property which is dependend on other properties
export default function calc(object, target, sources, givenHandler, eventOptions) {
    if (typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        eventOptions = givenHandler;
        givenHandler = sources;
        sources = target;
        target = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'calc');
    }

    if (target instanceof Object) {
        /*
         * accept an object
         * this.calc({target: { source, handler, event } }, commonEventOptions);
         */
        nofn.forOwn(target, ({
            source: itemSource,
            handler: itemHandler,
            event: itemEventOptions
        }, itemTarget) => {
            const commonEventOptions = sources;
            const mergedEventOptions = {};

            if (commonEventOptions) {
                // extend event object by "global" event
                nofn.assign(mergedEventOptions, commonEventOptions);
            }

            if (itemEventOptions) {
                // extend event object by "local" event ("event" key of an object)
                nofn.assign(mergedEventOptions, itemEventOptions);
            }

            calc(object, itemTarget, itemSource, itemHandler, mergedEventOptions);
        });

        return object;
    }

    if (typeof target !== 'string') {
        throw matreshkaError('calc:target_type', { target });
    }

    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
    const def = initMK(object);
    const {
        setOnInit = true,
        debounceCalcOnInit = false,
        debounceCalc = true,
        debounceCalcDelay = 0,
        // the next option is used to hide a property for internal use (eg in bindings parser)
        // hidden property means no accessors
        isTargetPropertyHidden = false
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

    if (debounceCalcOnInit || debounceCalc) {
        debouncedCalcHandler = debounce(syncCalcHandler, debounceCalcDelay);
    }

    defineProp(object, target, isTargetPropertyHidden);

    if (!(sources instanceof Array)) {
        sources = [sources]; // eslint-disable-line no-param-reassign
    }

    if (debounceCalc) {
        calcHandler = debouncedCalcHandler;
    } else {
        calcHandler = syncCalcHandler;
    }

    nofn.forEach(sources, (source) => {
        if (typeof source === 'string') {
            // source object is current object
            addSource({
                calcHandler,
                allSources,
                sourceKey: source,
                sourceObject: object,
                eventOptions
            });
        } else {
            // source object is external object
            if (!source || typeof source !== 'object') {
                throw matreshkaError('calc:source_type', { source });
            }

            const sourceKey = source.key;
            const sourceObject = source.object;
            if (sourceKey instanceof Array) {
                // many keys are passed
                nofn.forEach(sourceKey, (sourceKeyItem) => {
                    addSource({
                        calcHandler,
                        allSources,
                        sourceKey: sourceKeyItem,
                        sourceObject,
                        eventOptions
                    });
                });
            } else {
                // one key is passed
                addSource({
                    calcHandler,
                    allSources,
                    sourceKey,
                    sourceObject,
                    eventOptions
                });
            }
        }
    });

    if (setOnInit) {
        if (debounceCalcOnInit) {
            debouncedCalcHandler();
        } else {
            syncCalcHandler();
        }
    }

    return object;
}
