function PseudoMap() {}

// PseudoMap simulates WeakMap behavior with O(1) search complexity
// it's needed for @IE9 and @IE10
nofn.assign(PseudoMap.prototype, {
    get(obj) {
        return obj.matreshkaData;
    },
    set(obj, data) {
        Object.defineProperty(obj, 'matreshkaData', {
            value: data,
            enumerable: false,
            writable: false,
            configurable: false
        });
    },
    has(obj) {
        return 'matreshkaData' in obj;
    }
});

export default typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap();
