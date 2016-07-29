import set from '../set';
import deepFind from '../_helpers/deepfind';

// TODO: Add description and comments for createCalcHandler
export default function createCalcHandler({
	object,
	eventOptions,
	allSources,
	target,
	def,
	handler
}) {
	return function calcHandler(changeEvent={}) {
		const values = [];
		const { protector={} } = changeEvent;
		const protectKey = target + def.id;
		let setEventOptions = nofn.assign({ protector }, eventOptions);
		setEventOptions = nofn.assign(setEventOptions, changeEvent);

		if(protectKey in protector) {
			return;
		}

		protector[protectKey] = true;

		nofn.forEach(allSources, ({ sourceObject, sourceKey, isDelegated }) => {
			const value = isDelegated ? deepFind(sourceObject, sourceKey) : sourceObject[sourceKey];
			values.push(value);
		});

		const targetValue = handler.apply(object, values);
		set(object, target, targetValue, setEventOptions);
	}
}
