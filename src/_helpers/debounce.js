import apply from './apply';

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
        const callContext = thisArg || this;

        clearTimeout(timeout);

        timeout = setTimeout(() => apply(func, callContext, args), delay);
    };
}
