import on from 'src/on';
import once from 'src/once';
import onDebounce from 'src/ondebounce';
import off from 'src/off';
import trigger from 'src/trigger';
import bindNode from 'src/bindnode';
import createSpy from '../../helpers/createspy';
import makeObject from '../../helpers/makeobject';
import simulateClick from '../../helpers/simulateclick';

describe('Events summary (on, once, onDebounce, off, trigger)', () => {
    let obj;
    let ctx;
    let handler;
    let node;
    let childNode;
    let grandchildNode;


    beforeEach(() => {
        obj = {};
        ctx = {};
        handler = createSpy();
        node = window.document.body.appendChild(
            window.document.createElement('div')
        );

        node.innerHTML = `
            <div id="child">
                <div class="grandchild">

                </div>
            </div>
        `

        childNode = node.querySelector('#child');
        grandchildNode = node.querySelector('.grandchild');
    });

    afterEach(() => {
        document.body.removeChild(node);
    });

    it('fires', () => {
        on(obj, 'someevent', handler);
        trigger(obj, 'someevent');
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('fires on an object which has isMK=true property', () => {
        const obj = { isMK: true };
        on(obj, 'someevent', handler);
        trigger(obj, 'someevent');
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('removes', () => {
        on(obj, 'someevent', handler);
        off(obj, 'someevent');
        trigger(obj, 'someevent');

        expect(handler).not.toHaveBeenCalled();
    });

    it('removes an object which has isMK=true property', () => {
        const obj = { isMK: true };
        on(obj, 'someevent', handler);
        off(obj, 'someevent');
        trigger(obj, 'someevent');

        expect(handler).not.toHaveBeenCalled();
    });

    it('fires delegated', () => {
        const obj = makeObject('a.b.c');
        on(obj, 'a.b.c@someevent', handler);
        trigger(obj.a.b.c, 'someevent');
        expect(handler).toHaveBeenCalledTimes(1);
    });


    it('removes delegated', () => {
        const obj = makeObject('a.b.c');
        on(obj, 'a.b.c@someevent', handler);
        off(obj, 'a.b.c@someevent');
        trigger(obj.a.b.c, 'someevent');
        expect(handler).not.toHaveBeenCalled();
    });

    it('fires DOM event (no selector)', () => {
        bindNode(obj, 'x', '#child')
        on(obj, 'click::x', handler);
        simulateClick(childNode);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('removes DOM event (no selector)', () => {
        on(obj, 'click::x', handler);
        off(obj, 'click::x');
        bindNode(obj, 'x', '#child');
        simulateClick(childNode);
        expect(handler).not.toHaveBeenCalled();
    });

    it('fires DOM event (uses selector)', () => {
        bindNode(obj, 'x', '#child');
        on(obj, 'click::x(.grandchild)', handler);
        simulateClick(grandchildNode);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    xit('works with "*" events (MK.Array)', () => {
        let obj = new MK.Array(),
            bool = false;

        magic.on(obj, '@someevent', evt => bool = true);

        obj.push({});

        magic.trigger(obj[0], 'someevent');

        expect(bool).toBe(true);
    });

    it('triggers once', () => {
        once(obj, 'someevent', handler);
        trigger(obj, 'someevent');
        trigger(obj, 'someevent');
        trigger(obj, 'someevent');

        expect(handler).toHaveBeenCalledTimes(1);
    });

    xit('allows to pass name-handler object to "once"', () => {
        let obj = {},
            i = 0,
            j = 0,
            f1 = evt => i++,
            f2 = evt => j++;

        magic.once(obj, {
            foo: f1,
            bar: f2
        });

        magic.trigger(obj, 'foo');
        magic.trigger(obj, 'foo');
        magic.trigger(obj, 'foo');

        magic.trigger(obj, 'bar');
        magic.trigger(obj, 'bar');
        magic.trigger(obj, 'bar');

        expect(i).toBe(1);
        expect(j).toBe(1);
    });

    xit('triggers once on Matreshka instance', () => {
        let mk = new MK,
            i = 0,
            f = evt => i++;

        mk.once('someevent', f);
        mk.trigger('someevent');
        mk.trigger('someevent');
        mk.trigger('someevent');

        expect(i).toBe(1);
    });


    it('onDebounce works', done => {
        const handler = createSpy();

        setTimeout(() => {
            expect(handler).toHaveBeenCalledTimes(1);
            done();
        }, 200);

        onDebounce(obj, 'someevent', handler);
        trigger(obj, 'someevent');
        trigger(obj, 'someevent');
        trigger(obj, 'someevent');
    });

    xit('allows to pass name-handler object to "onDebounce"', (done) => {
        let obj = {},
            i = 0,
            j = 0,
            f1 = evt => i++,
            f2 = evt => j++;

        setTimeout(() => {
            expect(i).toBe(1);
            expect(j).toBe(1);
            done();
        }, 200);

        magic.onDebounce(obj, {
            foo: f1,
            bar: f2
        });

        magic.trigger(obj, 'foo');
        magic.trigger(obj, 'foo');
        magic.trigger(obj, 'foo');

        magic.trigger(obj, 'bar');
        magic.trigger(obj, 'bar');
        magic.trigger(obj, 'bar');
    });

    xit('onDebounce works on Matreshka instance', done => {
        let mk = new MK,
            i = 0,
            f = evt => i++;

        setTimeout(() => {
            expect(i).toBe(1);
            done();
        }, 800);

        mk.onDebounce('someevent', f);
        mk.trigger('someevent');
        mk.trigger('someevent');
        mk.trigger('someevent');
    });


    it('allows to pass name-handler object to "on" and "off"', () => {
        const handlers = {
            foo: createSpy(),
            bar: createSpy()
        };

        on(obj, handlers);

        trigger(obj, 'foo');
        trigger(obj, 'bar');

        expect(handlers.foo).toHaveBeenCalledTimes(1);
        expect(handlers.bar).toHaveBeenCalledTimes(1);

        off(obj, handlers);

        trigger(obj, 'foo');
        trigger(obj, 'bar');

        expect(handlers.foo).toHaveBeenCalledTimes(1);
        expect(handlers.bar).toHaveBeenCalledTimes(1);
    });


    it('allows to flip context and triggerOnInit (on)', () => {
        const thisArg = {};
        const handler = createSpy(function() {
            expect(this).toEqual(thisArg);
        });

        on(obj, 'foo', handler, true, thisArg);
        on(obj, 'bar', handler, thisArg, true);
        expect(handler).toHaveBeenCalledTimes(2);
    });

    xit('triggers event via "trigger" method', () => {
        let obj = {},
            bool = false;

        magic.bindNode(obj, 'x', '#d-test');
        magic._addDOMListener(obj, 'x', 'click', null, (d1, d2) => bool = d1 === 1 && d2 === 2);
        magic.trigger(obj, 'click::x', 1, 2);

        expect(bool).toBe(true);
    });

});
