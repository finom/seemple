import set from '../set';
import deepFind from '../_util/deepfind';

// TODO add description and comments
export default function runCalcHandler({
	object,
	changeEvent,
	eventOptions,
	allSources,
	target,
	def,
	handler
}) {
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
