import initSeemple from '../_core/init';

// creates item mediator
function createItemMediator({
  arr,
  mediator
}) {
  return function itemMediator(value, index) {
    // args: value, old value, index, array itself
    return mediator.call(arr, value, index, arr);
  };
}

// defines a "type" of every array item
export default function mediateItem(mediator) {
  const def = initSeemple(this);
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
