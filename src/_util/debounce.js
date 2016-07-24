export default function debounce(func, delay, thisArg) {
	let timeout;
	if (typeof delay !== 'number') {
		thisArg = delay;
		delay = 0;
	}

	delay = delay || 0;

	return function() {
		const args = arguments;
		const [a1, a2, a3] = args;
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
				case 3:
					func.call(callContext, a1, a2, a3);
					break;
				default:
					func.apply(callContext, args);
			}
		}, delay);
	};
};
