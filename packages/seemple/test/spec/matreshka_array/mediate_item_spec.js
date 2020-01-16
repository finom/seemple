/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import SeempleArray from 'src/array';

describe('Seemple.Array mediate item', () => {
    it('allows to set item mediator via mediateItem', () => {
        const arr = new SeempleArray('foo', 'bar');
        arr.mediateItem(value => `x${value}`);

        expect(arr.toJSON(false)).toEqual(['xfoo', 'xbar']);

        arr.push('baz');

        expect(arr.toJSON(false)).toEqual(['xfoo', 'xbar', 'xbaz']);

        arr.splice(0, 0, 'qux');

        expect(arr.toJSON(false)).toEqual(['xqux', 'xfoo', 'xbar', 'xbaz']);
    });
});
