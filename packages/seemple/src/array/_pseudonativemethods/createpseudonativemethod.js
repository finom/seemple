import toSeempleArray from '../_toseemplearray';
import createSortingMethod from './createsortingmethod';
import createRemovingMethod from './createremovingmethod';
import createAddingMethod from './createaddingmethod';
import createSplice from './createsplice';
import createCopyWithin from './createcopywithin';
import createFill from './createfill';
import apply from '../../_helpers/apply';
import seempleError from '../../_helpers/seempleerror';

const arrayPrototype = Array.prototype;

// creates pseudo native method and returns it (push, push_, sort, sort_...)
export default function createPseudoNativeMethod(name, hasOptions = false) {
  switch (name) {
    case 'forEach':
      return function pseudoNativeMethod(callback, thisArg) {
        arrayPrototype[name].call(this, callback, thisArg);
        // return this for nicer chain calls
        return this;
      };
    case 'map':
    case 'filter':
    case 'slice':
      // TODO: Improve readability of pseudoNativeMethod, arguments "a, b" look not good
      return function pseudoNativeMethod(a, b) {
        return toSeempleArray(arrayPrototype[name].call(this, a, b));
      };
    case 'every':
    case 'some':
    case 'findIndex':
    case 'find':
      return function pseudoNativeMethod(callback, thisArg) {
        const originalMethod = arrayPrototype[name];

        /* istanbul ignore if  */
        if (typeof originalMethod !== 'function') {
          throw seempleError('array:nonexistent_method', { method: name });
        }
        return originalMethod.call(this, callback, thisArg);
      };
    case 'join':
      return function pseudoNativeMethod(separator = ',') {
        return arrayPrototype[name].call(this, separator);
      };
    case 'indexOf':
    case 'lastIndexOf':
    case 'includes':
      return function pseudoNativeMethod(searchElement, fromIndex) {
        const originalMethod = arrayPrototype[name];

        /* istanbul ignore if  */
        if (typeof originalMethod !== 'function') {
          throw seempleError('array:nonexistent_method', { method: name });
        }

        if (typeof fromIndex === 'undefined') {
          return originalMethod.call(this, searchElement);
        }

        return originalMethod.call(this, searchElement, fromIndex);
      };
    case 'reduce':
    case 'reduceRight':
      return function pseudoNativeMethod() {
        return apply(arrayPrototype[name], this, arguments);
      };
    case 'sort':
    case 'reverse':
      return createSortingMethod(name, hasOptions);
    case 'pop':
    case 'shift':
      return createRemovingMethod(name, hasOptions);
    case 'push':
    case 'unshift':
      return createAddingMethod(name, hasOptions);
    case 'splice':
      return createSplice(hasOptions);
    case 'copyWithin':
      return createCopyWithin(hasOptions);
    case 'fill':
      return createFill(hasOptions);
    default:
      return undefined;
  }
}
