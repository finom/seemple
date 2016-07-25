export default function debounce(func, givenDelay, thisArg) {
    let timeout;
    let delay;
    if (typeof delay !== 'number') {
        thisArg = givenDelay; // eslint-disable-line no-param-reassign
        delay = 0;
    }

    delay = givenDelay || 0;

    return function debounced() {
        const args = arguments;
        const [a1, a2] = args;
        const argsLength = args.length;
        const callContext = thisArg || this;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            switch(argsLength) {
                case 0:
                    func.call(callContext);
                    break;
                case 1:
                    func.call(callContext, a1);
                    break;
                case 2:
                    func.call(callContext, a1, a2);
                    break;
                default:
                    func.apply(callContext, args);
            }
        }, delay);
    };
}
