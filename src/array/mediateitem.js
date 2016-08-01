import initMK from '../_core/init';

// creates item mediator
function createItemMediator({
    arr,
    mediator
}) {
    return function itemMediator(value, index) {
        return mediator.call(arr, value, arr[index], index, arr);
    }
}

// defines a "type" of every array item
export default function mediateItem(mediator) {
    const def = initMK(this);
    const { length } = this;

    // store itemMediator in object definition
	const itemMediator = def.itemMediator = createItemMediator({
        arr: this,
        mediator
    });

    // convert existing items
	for (let i = 0; i < length; i++) {
		this[i] = itemMediator(this[i], i);
	}

	return this;
}
