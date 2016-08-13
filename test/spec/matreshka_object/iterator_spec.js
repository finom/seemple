/* eslint-disable import/no-unresolved */
import Class from 'src/class';
import MatreshkaObject from 'src/object';
import createSpy from '../../helpers/createspy';

describe('Matreshka.Object iterator', () => {
    const symbolIt = typeof Symbol === 'function' ? it : xit;

    it('is iterated via each', () => {
        const obj = new MatreshkaObject({
            a: 'foo',
            b: 'bar',
            c: 'baz'
        });
        const keys = ['a', 'b', 'c'];
        const values = ['foo', 'bar', 'baz'];
        const context = {};
        let i = 0;
        const callback = createSpy((value, key, itSelf) => {
            expect(value).toEqual(values[i]);
            expect(key).toEqual(keys[i]);
            expect(itSelf).toEqual(obj);
            expect(this).toEqual(context);
            i++;
        });


        obj.each(callback, context);

        expect(callback).toHaveBeenCalledTimes(3);
    });

    symbolIt('allows to iterate an instance via for..of', () => {
        const obj = new MatreshkaObject({
            a: 'foo',
            b: 'bar',
            c: 'baz'
        });
        const values = ['foo', 'bar', 'baz'];
        let i = 0;

        for (const item of obj) {
            expect(item).toEqual(values[i++]);
        }
    });

    symbolIt('allows to iterate an instance of inherited class via for..of', () => {
        const Child = Class({
            extends: MatreshkaObject,
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
            expect(item).toEqual(values[i++]);
        }
    });
});
