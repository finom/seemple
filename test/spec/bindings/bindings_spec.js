/* eslint-disable */
import bindNode from 'src/bindnode';
import unbindNode from 'src/unbindnode';
import addListener from 'src/_events/addlistener';
import makeObject from '../../lib/makeobject';
import createSpy from '../../lib/createspy';

describe('Bindings', () => {
    let obj;
    let node;
    let node2;
    let binder;
    let simulateDomEvent;
    let initializeCall;
    let destroyCall;
    const noDebounceFlag = { debounce: false };

    const testSimpleBind = (key = 'x') => {
        obj[key] = 'foo';
        expect(node.value).toEqual('foo');
        node.value = 'bar';
        node.ondummyevent();
        expect(obj[key]).toEqual('bar');
        expect(initializeCall).toHaveBeenCalled();
    };

    const testSimpleUnbind = () => {
        obj.x = 'foo';
        expect(node.value).toEqual('');
        node.value = 'baz';
        node.ondummyevent();
        expect(obj.x).toEqual('foo');
        expect(destroyCall).toHaveBeenCalled();
    };

    beforeEach(() => {
        obj = {};
        node = document.createElement('span');
        node2 = document.createElement('span');

        initializeCall = createSpy();
        destroyCall = createSpy();

        binder =  {
            on(cbc) {
                this.ondummyevent = cbc;
            },
            getValue() {
                return this.value;
            },
            setValue(v) {
                this.value = v;
            },
            initialize(o) {
                this.value = '';
                initializeCall();
            },
            destroy() {
                //this.ondummyevent = () => {};
                destroyCall();
            }
        };
    });

    it('should debounce', done => {
        bindNode(obj, 'x', node, binder);
        obj.x = 'foo';
        expect(node.value).toEqual('');
        setTimeout(() => {
            expect(node.value).toEqual('foo');
            node.value = 'bar';
            node.ondummyevent();
            expect(obj.x).toEqual('bar');
            expect(initializeCall).toHaveBeenCalled();
            done();
        }, 50);
    });

    it('should bind and trigger events', () => {
        const bindCall = createSpy();
        const bindKeyCall = createSpy();
        addListener(obj, 'bind', bindCall);
        addListener(obj, 'bind:x', bindKeyCall);
        bindNode(obj, 'x', node, binder, noDebounceFlag);
        testSimpleBind();
        expect(bindCall).toHaveBeenCalled();
        expect(bindKeyCall).toHaveBeenCalled();
    });

    it('should unbind and trigger events', () => {
        const unbindCall = createSpy();
        const unbindKeyCall = createSpy();
        addListener(obj, 'unbind', unbindCall);
        addListener(obj, 'unbind:x', unbindKeyCall);
        bindNode(obj, 'x', node, binder, noDebounceFlag);
        unbindNode(obj, 'x', node);
        testSimpleUnbind();
        expect(unbindCall).toHaveBeenCalled();
        expect(unbindKeyCall).toHaveBeenCalled();
    });

    it('should bind using key-node object', () => {
        bindNode(obj, { x: node }, binder, noDebounceFlag);
        testSimpleBind();
    });

    it('should not unbind wne wrong node is given', () => {
        const wrongNode = document.createElement('div');
        bindNode(obj, 'x', node, binder, noDebounceFlag);
        unbindNode(obj, 'x', wrongNode);
        testSimpleBind();
    });

    it('should not unbind wne wrong key is given', () => {
        bindNode(obj, 'x', node, binder, noDebounceFlag);
        unbindNode(obj, 'y', node);
        testSimpleBind();
    });

    it('should unbind when node is not given', () => {
        bindNode(obj, 'x', node, binder, noDebounceFlag);
        unbindNode(obj, 'x');
        testSimpleUnbind();
    });

    it('should unbind all when neither key nor node is given', () => {
        bindNode(obj, 'x', node, binder, noDebounceFlag);
        unbindNode(obj);
        testSimpleUnbind();
    });

    it('should unbind key-node object', () => {
        bindNode(obj, { x: node }, binder, noDebounceFlag);
        unbindNode(obj, { x: node });
        testSimpleUnbind();
    });

    it('should bind using array of objects', () => {
        bindNode(obj, [{ key: 'x', node, binder }], noDebounceFlag);
        testSimpleBind();
    });

    it('should unbind using array of objects', () => {
        bindNode(obj, [{ key: 'x', node, binder }], noDebounceFlag);
        unbindNode(obj, [{ key: 'x', node }]);
        testSimpleUnbind();
    });

    it('should bind a property in context object which has isMK=true property', () => {
        obj = {
            isMK: true,
            nodes: {},
            $nodes: {}
        };
        bindNode.call(obj, 'x', node, binder, noDebounceFlag);
        testSimpleBind();
        expect(obj.nodes.x).toEqual(node);
        expect(
            Array.from(obj.$nodes.x)
        ).toEqual([node]);
    });

    it('should unbind a property in context object which has isMK=true property', () => {
        obj = {
            isMK: true,
            nodes: {},
            $nodes: {}
        };
        bindNode.call(obj, 'x', node, binder, noDebounceFlag);
        unbindNode.call(obj, 'x', node);
        testSimpleUnbind();
        expect(obj.nodes.x).toBeUndefined();
        expect(obj.$nodes.x).toBeUndefined();
    });

    it('should bind delegated target', () => {
        const obj = makeObject('x.y');
        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
        obj.x.y.z = 'foo';
        expect(node.value).toEqual('foo');
        node.value = 'bar';
        node.ondummyevent();
        expect(obj.x.y.z).toEqual('bar');
    });

    it('should unbind delegated target', () => {
        const obj = makeObject('x.y');
        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
        unbindNode(obj, 'x.y.z', node);
        obj.x.y.z = 'foo';
        expect(node.value).toEqual('');
        node.value = 'bar';
        node.ondummyevent();
        expect(obj.x.y.z).toEqual('foo');
    });

    it('cancels deep binding when deep=false option is passed', () => {
        bindNode(obj, 'x.y.z', node, binder, Object.assign({
            deep: false
        }, noDebounceFlag));
        testSimpleBind('x.y.z');
    });

    it('should rebind delegated target', () => {
        const obj = makeObject('x.y.z', 'go');
        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
        obj.x = makeObject('y.z', 'foo');
        expect(node.value).toEqual('foo');
        node.value = 'bar';
        node.ondummyevent();
        expect(obj.x.y.z).toEqual('bar');
    });

    it('should remove binding if delegated target is reassigned', () => {
        const obj = makeObject('x.y');
        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
        const x = obj.x;

        obj.x = makeObject('y.z', 'foo');

        node.value = 'bar';
        node.ondummyevent();
        expect(x.y.z).not.toEqual('bar');
        window.target = obj.x.y;
        expect(obj.x.y.z).toEqual('bar');
        x.y.z = 'baz';
        expect(node.value).toEqual('bar');
    });


    xit('uses custom selectors on current target', () => {
        let obj = MK.to({x: {y: 'foo'}}),
             div = $.create('div'),
            input = div.appendChild($.create('input'));

        obj.bindNode('sandbox', div);
        obj.bindNode('x.y', ':sandbox input', {
            on(cbc) {
                this._onkeyup = cbc;
            }
        });

        expect(input.value).toEqual('foo');
        input.value = 'bar';
        input._onkeyup({});
        expect(obj.x.y).toEqual('bar');
    });


    it(`throws error when node isn't there`, () => {
        expect(() => {
            bindNode(obj, 'x');
        }).toThrow();
    });


    it(`doesn't throw error when node isn't there and optional=true is given`, () => {
        expect(() => {
            bindNode(obj, 'x', undefined, undefined, { optional: true });
        }).not.toThrow();
    });

    xit('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', () => {
        let mk = new MK;

        mk.bindOptionalNode('x', null);

        expect(true).toBe(true);
    });

    xit('returns bound nodes', () => {
        let obj = {},
            input = bindInput(obj, 'x');


        expect(input).toEqual(magic.bound(obj, 'x'));
        expect(input).toEqual(magic.$bound(obj, 'x')[0]);
    });


    xit('selects children of sandbox', () => {
        let obj = {};

        magic.bindNode(obj, 'sandbox', `<div>
                <div>
                    <span></span>
                </div>
            </div>
        `);

        expect('SPAN').toEqual(magic.select(obj, 'span').tagName);
        expect('SPAN').toEqual(magic.selectAll(obj, 'span')[0].tagName);
    });


    xit('selects nodes with custom selector', () => {
        let obj = {};

        magic.bindNode(obj, 'sandbox', `<div>
                <div>
                    <span></span>
                </div>
            </div>
        `);

        expect('SPAN').toEqual(magic.select(obj, ':bound(sandbox) span').tagName);
        expect('SPAN').toEqual(magic.selectAll(obj, ':sandbox span')[0].tagName);
    });



    xit('allows to bind sandbox via bindSandbox', () => {
        let obj = {},
            div = $.create('div');

        MK.bindSandbox(obj, div);

        expect(MK.bound(obj, 'sandbox')).toEqual(div);
    });


    xit('bindSandbox throws an error when node is missing', () => {
        let obj = {},
            bool = false;

        try {
            MK.bindSandbox(obj, null);
        } catch(e) {
            bool = true;
        }

        expect(bool).toBeTruthy();
    });
});
