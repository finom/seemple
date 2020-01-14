/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import SeempleObject from 'src/object';

describe('Seemple.Object toJSON method', () => {
    it('is converted to JSON object', () => {
        const obj = new SeempleObject({
            a: 42,
            b: 'yop',
            c: new SeempleObject({
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
        const obj = new SeempleObject({
            a: 42,
            b: 'yop',
            c: new SeempleObject({
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
});
