import MatreshkaObject from 'src/object';
import createSpy from '../../helpers/createspy';
import Class from 'src/class';

describe('Matreshka.Object other features', () => {
    const symbolIt = typeof Symbol === 'function' ? it : xit;

    it('is iterated via each', () => {
        const obj = new MatreshkaObject({
            a: 'foo',
            b: 'bar',
            c: 'baz'
        });
        const keys = ['a', 'b', 'c'];
        const values = ['foo', 'bar', 'baz'];
        const callback = createSpy((value, key, itSelf) => {
            expect(value).toEqual(values[i]);
            expect(key).toEqual(keys[i]);
            expect(itSelf).toEqual(obj);
            expect(this).toEqual(context);
			i++;
        });
        const context = {};
        let i = 0;

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

    it('is converted to JSON object', () => {
        const obj = new MatreshkaObject({
            a: 42,
            b: 'yop',
            c: new MatreshkaObject({
                d: 'ya'
            })
        });
        const result = obj.toJSON();

        expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
        expect(result.a).toEqual(42);
        expect(result.b).toEqual('yop');
        expect(result.c.d).toEqual('ya');
        expect(result.c).not.toEqual(obj.c);
    });


    it('is converted to JSON with recursive=false parameter', () => {
        const obj = new MatreshkaObject({
            a: 42,
            b: 'yop',
            c: new MatreshkaObject({
                d: 'ya'
            })
        });
        const result = obj.toJSON(false);

        expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
        expect(result.a).toEqual(42);
        expect(result.b).toEqual('yop');
        expect(result.c.d).toEqual('ya');
        expect(result.c).toEqual(obj.c);
    });


    it('finds a key of an object', () => {
        const toFind = {};
        const obj = new MatreshkaObject({
            a: 42,
            b: toFind,
            c: 'yop'
        });

        expect(obj.keyOf(toFind)).toEqual('b');
    });
});
