import initMK from './_core/init';
import checkObjectType from './_util/checkobjecttype';
import matreshkaError from './_util/matreshkaerror';
import addListener from './on/_addlistener';
import set from './set';

export default function calc(object, target, sources, givenHandler, eventOptions) {
    if(typeof this === 'object' && this.isMK) {
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
            sources: itemSources,
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

            calc(object, itemTarget, itemSources, itemHandler, mergedEventOptions);
        });

        return object;
    }

    if(typeof target !== 'string') {
        throw matreshkaError('calc:target_type', { target });
    }

    eventOptions = eventOptions || {};
    const def = initMK(object);
    const { setOnInit=true, deep=true, debounce=false } = eventOptions;
    const defaultHandler = value => value;
    const handler = givenHandler || defaultHandler;
    const allSources = [];

    if(typeof sources === 'string') {
        sources = [sources];
    }

    function onChange(changeEvent = {}) {
        const values = [];
        const { protector={} } = changeEvent;
        const protectKey = target + def.id;
        let setEventOptions = nofn.assign({ protector }, eventOptions);
        setEventOptions = nofn.assign(setEventOptions, changeEvent);

        if(protectKey in protector) {
            return;
        }

        protector[protectKey] = true;

        nofn.forEach(allSources, ({ sourceObject, sourceKey }) => {
            //const propDef = defineProp(sourceObject, sourceKey);
            values.push(sourceObject[sourceKey]);
        });

        const targetValue = handler.apply(object, values);
        set(object, target, targetValue, setEventOptions);
    }

    function addSource({ sourceKey, sourceObject }) {
        if(typeof sourceKey !== 'string') {
            throw matreshkaError('calc:source_key_type', { sourceKey });
        }

        if(!sourceObject || typeof sourceObject !== 'object') {
            throw matreshkaError('calc:source_object_type', { sourceObject });
        }

        allSources.push({
            sourceKey,
            sourceObject
        });

        addListener(object, `_change:deps:${sourceKey}`, onChange);
    }

    nofn.forEach(sources, source => {
        if(typeof source === 'string') {
            addSource({
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
                        sourceKey: sourceKeyItem,
                        sourceObject
                    });
                })
            } else {
                addSource({
                    sourceKey,
                    sourceObject
                });
            }
        }



    });

    if(setOnInit) {
        onChange()
    }
}
