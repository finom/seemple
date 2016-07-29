import domEventReg from '../on/_domeventregexp';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import splitBySpaceReg from '../on/_splitbyspaceregexp';
import defs from '../_core/defs';
import triggerOne from './_triggerone';
import triggerDomEvent from './_triggerdomevent';

// triggers event
export default function trigger(...args) {
    let object;
    let givenNames;
    let triggerArgs;

    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        [givenNames, ...triggerArgs] = args;
        object = this;
    } else {
        [object, givenNames, ...triggerArgs] = args;
        // throw error when object type is wrong
        checkObjectType(object, 'trigger');
    }
    let names;

    if(typeof givenNames === 'string') {
        names = givenNames.split(splitBySpaceReg)
    } else {
        throw matreshkaError('trigger:names_type', {
            names: givenNames
        });
    }

    const def = defs.get(object);

    // if no definition do nothing
    if (!def) {
        return object;
    }

    const { events: allEvents } = def;

    if(!allEvents) {
        return object;
    }

    nofn.forEach(names, name => {
        const events = allEvents[name];
        const domEvtExecResult = domEventReg.exec(name);

        if(domEvtExecResult) {
            const [, eventName, key='sandbox', selector] = domEvtExecResult;
            triggerDomEvent(object, key, eventName, selector, triggerArgs);
        } else {
            triggerOne(object, name);
        }
    });

    return object;
}
