import toMatreshkaArray from '../_tomatreshkaarray';
import reportModified from '../_reportmodified';
import createSortingMethod from './createsortingmethod';
import createRemovingMethod from './createremovingmethod';
import createAddingMethod from './createaddingmethod';
import createSplice from './createsplice';
import apply from '../../_helpers/apply';

const arrayPrototype = Array.prototype;

// creates pseudo native method and returns it (push, push_, sort, sort_...)
export default function createPseudoNativeMethod(name, hasOptions=false) {
		switch (name) {
			case 'forEach':
				return function pseudoNativeMethod(callback, thisArg) {
					arrayPrototype[name].call(this, callback, thisArg);
					// return this for nice chain calls
					return this;
				};
			case 'map':
			case 'filter':
			case 'slice':
				return function pseudoNativeMethod(a, b) {
					return toMatreshkaArray(arrayPrototype[name].call(this, a, b));
				};
			case 'every':
			case 'some':
				return function pseudoNativeMethod(callback, thisArg) {
					return arrayPrototype[name].call(this, callback, thisArg);
				};
			case 'join':
				return function pseudoNativeMethod(separator=',') {
					return arrayPrototype[name].call(this, separator);
				};
			case 'indexOf':
			case 'lastIndexOf':
				return function pseudoNativeMethod(item) {
					return arrayPrototype[name].call(this, item);
				};
			case 'reduce':
			case 'reduceRight':
				return function pseudoNativeMethod() {
					return apply(arrayPrototype[name], this, arguments);
				};
			case 'sort':
			case 'reverse':
				return createSortingMethod(name, hasOptions)
			case 'pop':
			case 'shift':
				return createRemovingMethod(name, hasOptions);
			case 'push':
			case 'unshift':
				return createAddingMethod(name, hasOptions);
			case 'splice':
				return createSplice(hasOptions);
		}
	}
