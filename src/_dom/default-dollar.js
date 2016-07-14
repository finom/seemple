/*global $*/
import bQuery from '../bquery';

const neededMethods = 'on off is add not find'.split(/\s/);

const globalDollar = typeof $ === 'function' ? $ : null;
let useGlobalDollar = true;

if (globalDollar) {
	const fn = globalDollar.fn || globalDollar.prototype;
	for (let i = 0; i < neededMethods.length; i++) {
		if (!fn[neededMethods[i]]) {
			useGlobalDollar = false;
			break;
		}
	}

	if (!globalDollar.parseHTML) {
		globalDollar.parseHTML = bQuery.parseHTML;
	}
} else {
	useGlobalDollar = false;
}

export default useGlobalDollar ? globalDollar : bQuery;
