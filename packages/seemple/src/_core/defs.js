import assign from '../_helpers/assign';

function PseudoMap() {}

// PseudoMap simulates WeakMap behavior with O(1) search complexity
// it's needed to support @IE9 and @IE10
assign(PseudoMap.prototype, {
  get(obj) {
    return obj.seempleData;
  },
  set(obj, data) {
    Object.defineProperty(obj, 'seempleData', {
      value: data,
      enumerable: false,
      writable: false,
      configurable: false
    });
  },
  has(obj) {
    return 'seempleData' in obj;
  }
});

export default typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap();
