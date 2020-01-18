/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import Seemple from 'src';
import SeempleObject from 'src/object';

describe('Seemple.Object class', () => {
  const methodNames = `_afterInit,
    setData,
    addDataKeys,
    removeDataKeys,
    isDataKey,
    keys,
    entries,
    values,
    keyOf,
    toJSON,
    each`.split(/\s*,\s*/);

  it('an instance should have isSeemple=true and isSeempleObject=true properties', () => {
    const obj = new SeempleObject();
    expect(obj.isSeemple).toEqual(true);
    expect(obj.isSeempleObject).toEqual(true);
  });

  it('includes all instance methods', () => {
    const obj = new SeempleObject();
    for (let i = 0; i < methodNames.length; i++) {
      const name = methodNames[i];
      expect(typeof obj[name]).toEqual('function', `${name} method is missing`);
    }

    expect(typeof obj.jset).toEqual('function', 'jset method is missing');
    expect(obj.jset).toEqual(obj.setData);
  });

  it('is a property of Seemple', () => {
    expect(Seemple.Object).toEqual(SeempleObject);
  });
});
