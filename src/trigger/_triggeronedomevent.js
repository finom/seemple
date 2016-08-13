// triggers given DOM event on given node
export default function triggerOneDOMEvent({
    node,
    eventName,
    triggerArgs
}) {
    const { document, Event } = window;
    let event;

    // polyfill for older browsers
    if (document.createEvent) {
        /* istanbul ignore next */
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    } else if (typeof Event !== 'undefined') {
        event = new Event(eventName, {
            bubbles: true,
            cancelable: true
        });
    }

    // matreshkaTriggerArgs will be used in a handler created by addDOMListener
    event.matreshkaTriggerArgs = triggerArgs;

    node.dispatchEvent(event);
}
