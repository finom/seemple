/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import Seemple from 'src';
import SeempleArray from 'src/array';
import createSpy from '../../helpers/createspy';

describe('Seemple.Array class', () => {
  const methodNames = `_afterInit,
    mediateItem,
    orderBy,
    pull,
    recreate,
    rerender,
    restore,
    toJSON,
    concat,
    join,
    pop,
    push,
    reverse,
    shift,
    slice,
    sort,
    splice,
    toString,
    unshift,
    every,
    filter,
    forEach,
    indexOf,
    lastIndexOf,
    map,
    some,
    entries,
    keys,
    values,
    copyWithin,
    fill,
    includes,
    find,
    findIndex,
    push_,
    pop_,
    unshift_,
    shift_,
    sort_,
    reverse_,
    splice_`.split(/\s*,\s*/);

  it('an instance should have isSeemple=true and isSeempleArray=true properties', () => {
    const obj = new SeempleArray();
    expect(obj.isSeemple).toEqual(true);
    expect(obj.isSeempleArray).toEqual(true);
  });

  it('includes all instance methods', () => {
    const obj = new SeempleArray();
    for (let i = 0; i < methodNames.length; i++) {
      const name = methodNames[i];
      expect(typeof obj[name]).toEqual('function', `${name} method is missing`);
    }
  });

  it('includes all static methods', () => {
    expect(typeof SeempleArray.of).toEqual('function', 'of method is missing');
    expect(typeof SeempleArray.from).toEqual('function', 'from method is missing');
  });

  it('is a property of Seemple', () => {
    expect(Seemple.Array).toEqual(SeempleArray);
  });

  it('triggers addone and removeone', () => {
    const arr = SeempleArray.of(1, 2, 3, 4, 5);
    const addOneHandler = createSpy(({ addedItem }) => {
      expect(addedItem).toEqual('foo');
    });
    const removeOneHandler = createSpy(({ removedItem }) => {
      expect(removedItem).toEqual(2);
    });

    arr.on('addone', addOneHandler);
    arr.on('removeone', removeOneHandler);

    arr.push('foo');
    arr.pull(1);

    expect(addOneHandler).toHaveBeenCalledTimes(1);
    expect(removeOneHandler).toHaveBeenCalledTimes(1);
  });
});
