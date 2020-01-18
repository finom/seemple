/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import Class from 'src/class';
import SeempleObject from 'src/object';

describe('Seemple.Object iterator', () => {
  const symbolIt = typeof Symbol === 'function' ? it : xit;

  symbolIt('allows to iterate an instance via for..of', () => {
    const obj = new SeempleObject({
      a: 'foo',
      b: 'bar',
      c: 'baz'
    });
    const values = ['foo', 'bar', 'baz'];
    let i = 0;

    for (const item of obj) {
      expect(item).toEqual(values[i]);
      i += 1;
    }
  });

  symbolIt('allows to iterate an instance of inherited class via for..of', () => {
    const Child = Class({
      extends: SeempleObject,
      constructor(data) {
        this.setData(data);
      }
    });
    const obj = new Child({
      a: 'foo',
      b: 'bar',
      c: 'baz'
    });
    const values = ['foo', 'bar', 'baz'];
    let i = 0;

    for (const item of obj) {
      expect(item).toEqual(values[i]);
      i += 1;
    }
  });
});
