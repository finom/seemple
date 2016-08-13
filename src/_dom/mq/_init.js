import html2nodeList from './_html2nodelist';

// function-constructor of mq library
// accepts many kinds of arguments (selector, html, function)
function MQInit(selector, context) {
    let result;

    if (selector) {
        if (selector.nodeType || typeof window === 'object' && selector === window) {
            result = [selector];
        } else if (typeof selector === 'string') {
            if (/</.test(selector)) {
                result = html2nodeList(selector);
            } else {
                if (context) {
                    const newContext = (new MQInit(context))[0];

                    if (newContext) {
                        result = newContext.querySelectorAll(selector);
                    }
                } else {
                    result = window.document.querySelectorAll(selector);
                }
            }
        } else {
            if('length' in selector) {
                // if it's something array-like (eg NodeList)
                result = selector;
            } else {
                // this is somethong another (eg Attr)
                result = [selector];
            }
        }
    }

    const length = result && result.length;

    if (length) {
        for (let i = 0; i < length; i++) {
            this.push(result[i]);
        }
    }
}

MQInit.prototype = [];

export default MQInit;
