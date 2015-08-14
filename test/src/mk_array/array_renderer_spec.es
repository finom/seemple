import MK from 'matreshka';
import $ from 'balalaika';
let q = ( s, c ) => $( s, c )[0] || null;

describe( 'MK.Array#renderer', () => {
    it( 'renders and removes items of collection', () => {
        let container = $.create( 'div', { attributes: { role : 'parent' } } ),
            n = 10,
            arr;


        class Model extends MK.Object {
            constructor() {
                super();
                this
                    .on( 'render', evt => this.bindNode( 'x', 'span', MK.binders.innerHTML() ) )
                ;
            }
        }

        class Arr extends MK.Array {
            get Model() {
                return Model;
            }
            itemRenderer() {
                return '<div role="child"><span></span></div>'
            }
            constructor() {
                super();
                this.bindNode( 'sandbox', container )
            }
        }

        arr =  window.arr = new Arr;

        for( let i = 0; i < n ; i++ ) {
            arr.push({ x: i });
        }


        expect( arr.length ).toEqual( n );
        expect( arr.sandbox.children.length ).toEqual( n );

        //arr.recreate();

        //expect( arr.length ).toEqual( 0 );
        //expect( arr.sandbox.children.length ).toEqual( 0 );
    })
});
