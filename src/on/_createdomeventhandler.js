import apply from '../_helpers/apply';
// returns DOM event handler
export default function createDomEventHandler({
    key,
    object,
    callback,
    context
}) {
    return function domEventHandler(domEvent) {
        const originalEvent = domEvent.originalEvent || domEvent;
        const triggerArgs = originalEvent.matreshkaTriggerArgs;
        const { which, target } = domEvent;

        if(triggerArgs) {
            // if args are passed to trigger method then pass them to an event handler
            apply(callback, context, triggerArgs);
        } else {
            // use the following object as an arg for event handler
            callback.call(context, {
                self: object,
                node: this,
                preventDefault: () => domEvent.preventDefault(),
                stopPropagation: () => domEvent.stopPropagation(),
                key,
                domEvent,
                originalEvent,
                which,
                target
            });
        }
    };
}
