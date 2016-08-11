/* eslint-disable import/no-unresolved */
import Class from 'src/class';

describe('Class function', () => {
    const symbolIt = typeof Symbol === 'function' ? it : xit;

    it('allows to inherit', () => {
        const A = Class({ a: true }),
            B = Class({ b: true, extends: A }),
            C = Class({ c: true, extends: B }),
            inst = new C;

        expect(inst instanceof A).toBeTruthy();
        expect(inst instanceof B).toBeTruthy();
        expect(inst instanceof C).toBeTruthy();

        expect(inst.a).toBeTruthy();
        expect(inst.b).toBeTruthy();
        expect(inst.c).toBeTruthy();
    });

    symbolIt('allows to inherit symbols', () => {
        const a = Symbol('a');
        const b = Symbol('b');
        const c = Symbol('c');

        const A = Class({ [a]: true }),
            B = Class({ [b]: true, extends: A }),
            C = Class({ [c]: true, extends: B }),
            inst = new C;

        expect(inst[a]).toBeTruthy();
        expect(inst[a]).toBeTruthy();
        expect(inst[c]).toBeTruthy();
    });

    it('allows to pass static props', () => {
        const A = Class({}, { staticProp: true });
        expect(A.staticProp).toBeTruthy();
    });

    it('allows to inherit static props', () => {
        const A = Class({}, { staticProp: true });
        const B = Class({ extends: A });
        expect(B.staticProp).toBeTruthy();
    });

    symbolIt('allows to pass symbols as static props', () => {
        const staticProp = Symbol('staticProp');
        const A = Class({}, { [staticProp]: true });
        expect(A[staticProp]).toBeTruthy();
    });

    symbolIt('allows to inherit symbols as static props', () => {
        const staticProp = Symbol('staticProp');
        const A = Class({}, { [staticProp]: true });
        const B = Class({ extends: A });
        expect(B[staticProp]).toBeTruthy();
    });

    it('if new Class({}) is called return its instance', () => {
        const inst = new Class({ a: true });
        expect(inst.a).toEqual(true);
        expect(inst instanceof Class).toBeFalsy();
    });
});
