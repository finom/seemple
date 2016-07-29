import simulateClick from '../../lib/simulateclick';
import addDomListener from 'src/on/_adddomlistener';
import removeDomListener from 'src/off/_removedomlistener';
import triggerDOMEvent from 'src/trigger/_triggerdomevent';
import bindNode from 'src/bindnode';
import createSpy from '../../lib/createspy';

describe("Events core: addDomListener, removeDomListener, triggerDOMListener", () => {
    let node;
    let obj;
    let handler;
    let childNode;
    let grandchildNode;

    beforeEach(() => {
        obj = {};
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
    })

    it('fires (no selector)', () => {
        bindNode(obj, 'x', '#child')
        addDomListener(obj, 'x', 'click', null, handler);

        simulateClick(childNode);

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('removes (no selector)', () => {
        addDomListener(obj, 'x', 'click', null, handler);
        removeDomListener(obj, 'x', 'click');
        bindNode(obj, 'x', '#child');

        simulateClick(childNode);

        expect(handler).not.toHaveBeenCalled();
    });

    it('fires (use selector)', () => {
        bindNode(obj, 'x', '#child')
        addDomListener(obj, 'x', 'click', '.grandchild', handler);

        simulateClick(grandchildNode);

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('adds (use selector) and removes (no selector)', () => {
        bindNode(obj, 'x', '#child')
        addDomListener(obj, 'x', 'click', '.grandchild', handler);
        removeDomListener(obj, 'x', 'click');

        simulateClick(grandchildNode);

        expect(handler).not.toHaveBeenCalled();
    });

    it('adds (use selector) then binds then removes (no selector)', () => {
        bindNode(obj, 'x', '#child');
        addDomListener(obj, 'x', 'click', '.grandchild', handler);
        removeDomListener(obj, 'x', 'click');

        simulateClick(grandchildNode);

        expect(handler).not.toHaveBeenCalled();
    });

    it('triggers DOM event', () => {
        const handler = createSpy((d1, d2) => expect(d1 + d2).toEqual(3));
        bindNode(obj, 'x', '#child');
        addDomListener(obj, 'x', 'click', null, handler);
        triggerDOMEvent(obj, 'x', 'click', null, [1, 2]);


        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('triggers DOM event with specified selector', () => {
        const handler = createSpy((d1, d2) => expect(d1 + d2).toEqual(3));
        bindNode(obj, 'x', '#child');
        addDomListener(obj, 'x', 'click', '.grandchild', handler);
        triggerDOMEvent(obj, 'x', 'click', '.grandchild', [1, 2]);

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('triggers DOM event with specified selector (bubbling test)', () => {
        const handler = createSpy((d1, d2) => expect(d1 + d2).toEqual(3));
        bindNode(obj, 'x', '#child');
        addDomListener(obj, 'x', 'click', null, handler);
        triggerDOMEvent(obj, 'x', 'click', '.grandchild', [1, 2]);

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('removes delegated', () => {
        bindNode(obj, 'x', '#child');
        addDomListener(obj, 'x', 'click', '.grandchild', evt => bool = true);
        removeDomListener(obj, 'x', 'click', '.grandchild');

        simulateClick(grandchildNode);

        expect(handler).not.toHaveBeenCalled();
    });

    it('removes delegated and doesn\'t remove events from other nodes', () => {
        bindNode(obj, 'x', '#child');
        addDomListener(obj, 'x', 'click', '.grandchild', handler);
        removeDomListener(obj, 'x', 'click', '.blah');

        simulateClick(grandchildNode);

        expect(handler).toHaveBeenCalledTimes(1);
    });
});
