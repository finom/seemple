/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import toSeemple from 'src/toseemple';
import SeempleObject from 'src/object';
import SeempleArray from 'src/array';

describe('toSeemple function', () => {
  it('converts to Seemple via Seemple.toSeemple', () => {
    const obj = toSeemple({
      a: 1,
      b: [1, 2, 3, {
        foo: 'bar'
      }]
    });

    expect(obj.constructor).toEqual(SeempleObject);
    expect(obj.b.constructor).toEqual(SeempleArray);
    expect(obj.b[3].constructor).toEqual(SeempleObject);

    expect(obj.a).toEqual(1);
    expect(obj.b[0]).toEqual(1);
    expect(obj.b[1]).toEqual(2);
    expect(obj.b[2]).toEqual(3);
    expect(obj.b[3].foo).toEqual('bar');
  });
});
