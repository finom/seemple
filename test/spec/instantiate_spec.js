import instantiate from 'src/instantiate';

describe('instantiate', () => {
    it('allows to instantiate a property', () => {
        const obj = {
            x: { a: 42 }
        };

        class X {
            constructor(data) {
                this.a = data.a;
            }
        };

        instantiate(obj, 'x', X);

        expect(obj.x.constructor).toEqual(X);
        expect(obj.x.a).toEqual(42);
    });

    it('instantiates in context of an object which has isMatreshka=true property', () => {
        const obj = {
            isMatreshka: true,
            x: { a: 42 }
        };

        class X {
            constructor(data) {
                this.a = data.a;
            }
        };

        instantiate.call(obj, 'x', X);

        expect(obj.x.constructor).toEqual(X);
        expect(obj.x.a).toEqual(42);
    });

    it('allows to pass key-class object', () => {
        const obj = {
            x: { a: 1 },
            y: { b: 2 }
        };

        class X {
            constructor(data) {
                this.a = data.a;
            }
        };

        class Y {
            constructor(data) {
                this.b = data.b;
            }
        };

        instantiate(obj, {
            x: X,
            y: Y
        });

        expect(obj.x.constructor).toEqual(X);
        expect(obj.x.a).toEqual(1);
        expect(obj.y.constructor).toEqual(Y);
        expect(obj.y.b).toEqual(2);
    });

    xit('sets class for a property (trying to rewrite)', () => {
        let obj = {},
            x;

        class X {};

        magic.setClassFor(obj, 'x', X);

        x = obj.x;

        obj.x = {a: 42};

        expect(obj.x).toEqual(x);

        expect(obj.x.a).toEqual(42);
    });


    xit('sets MK.Object class for a property', () => {
        let obj = {
            x: { a: 42 }
        };

        let X = MK.Class({
            extends: MK.Object,
            constructor(data) {
                this.jset(data);
            }
        });


        magic.setClassFor(obj, 'x', X);

        expect(obj.x.constructor).toEqual(X);
        expect(obj.x.a).toEqual(42);

        obj.x = {
            b: 1,
            c: 2
        };

        expect(obj.x.keys()).toEqual(['b', 'c']);
    });

    xit('sets MK.Array class for a property', () => {
        let obj = {
            x: [1, 2, 3, 4, 5]
        };

        let X = MK.Class({
            extends: MK.Array,
            constructor(data) {
                this.recreate(data);
            }
        });
        /*class X extends MK.Array {
            constructor(data) {
                super(...data);
            }
        };*/

        magic.setClassFor(obj, 'x', X);

        expect(obj.x.constructor).toEqual(X);
        expect(obj.x.toArray()).toEqual([1, 2, 3, 4, 5]);

        obj.x = [6, 7, 8, 9, 0];

        expect(obj.x.toArray()).toEqual([6, 7, 8, 9, 0]);
    });

    xit('makes possible to customize update function', () => {})
});
