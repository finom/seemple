/* eslint-disable import/no-unresolved */
import Matreshka from 'src';
import MatreshkaArray from 'src/array';

describe('Matreshka.Array class', () => {
    const methodNames = `_afterInit,
    mediateItem,
    orderBy,
    pull,
    recreate,
    rerender,
    restore,
    toJSON,
    trackBy,
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
    push_,
    pop_,
    unshift_,
    shift_,
    sort_,
    reverse_,
    splice_`.split(/\s*,\s*/);

    it('an instance should have isMK=true and isMKArray=true properties', () => {
        const obj = new MatreshkaArray();
        expect(obj.isMK).toEqual(true);
        expect(obj.isMKArray).toEqual(true);
    });

    it('includes all instance methods', () => {
        const obj = new MatreshkaArray();
        for(let i = 0; i < methodNames.length; i++) {
            const name = methodNames[i];
            expect(typeof obj[name]).toEqual('function', `${name} method is missing`);
        }
    });

    it('includes all static methods', () => {
        expect(typeof MatreshkaArray.of).toEqual('function', 'of method is missing');
        expect(typeof MatreshkaArray.from).toEqual('function', 'from method is missing');
    });

    it('is a property of Matreshka', () => {
        expect(Matreshka.Array).toEqual(MatreshkaArray);
    });
});
