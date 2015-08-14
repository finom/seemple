import magic from 'matreshka-magic';

describe( 'linkProps', () => {
    it( 'adds simple dependency', () => {
        let obj = { a: 1, b: 2 };

        magic.linkProps( obj, 'c', 'a b', ( a, b ) => a + b );

        expect(obj.c).toEqual(3);

        obj.a = 3;

        expect(obj.c).toEqual(5);

        obj.b = 3;

        expect(obj.c).toEqual(6);
    });

    it( 'adds dependency from another object', () => {
        let obj = { a: 1, b: 2 },
            obj2 = { c: 4, d: 8 };

        magic.linkProps( obj, 'e', [
            obj, [ 'a', 'b' ],
            obj2, 'c d'
        ], ( a, b, c, d ) => a + b + c + d );

        expect(obj.e).toEqual( 15 );
    });

    it( 'doesn\'t sets on init (setOnInit)', () => {
        let obj = { a: 1, b: 2, c: 0 };

        magic.linkProps( obj, 'c', 'a b', ( a, b ) => a + b, false );

        expect(obj.c).toEqual( 0 );
    });

    it( 'saves from cyclical links', () => {
        let obj = { a: 1, b: 2, c: 3 };

        magic.linkProps( obj, 'a', 'b c', ( x, y ) => x + y );
        magic.linkProps( obj, 'b', 'a c', ( x, y ) => x + y );
        magic.linkProps( obj, 'c', 'a b', ( x, y ) => x + y );

        expect( obj.a ).toEqual( 27 );
    });
});
