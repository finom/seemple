/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import SeempleArray from 'src/array';

describe('Seemple.Array toJSON method', () => {
  it('is converted to JSON', () => {
    const arr = new SeempleArray(1, 2, new SeempleArray(3, 4));

    expect(arr.toJSON()).toEqual([1, 2, [3, 4]]);
  });

  it('is converted to JSON with recursive=false parameter', () => {
    const arr = new SeempleArray(1, 2, new SeempleArray(3, 4));

    expect(arr.toJSON(false)).toEqual([1, 2, arr[2]]);
  });
});
