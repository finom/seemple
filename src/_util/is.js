// determines whether two values are the same value
const isPolyfill = (v1, v2) =>
    v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;

export default Object.is || isPolyfill;
