import initMK from '../_core/init';

export default function matreshkaObjectIterator() {
    const keys = this.keys();
	let i = 0;

	return {
		next() {
			if (i > keys.length - 1) {
				return { done: true };
			} else {
				return {
					done: false,
					value: this[keys[i++]]
				};
			}
		}
	};
}
