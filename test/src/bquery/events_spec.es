import $ from 'bquery';

let click = node => {
    let ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */ , true /* cancelable */ ,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/ , null
    );
    node.dispatchEvent(ev);
}

/* TODO:
    Test $ with various values
    Test addClass, removeClass
*/

describe("bQuery Events", () => {
    document.body.appendChild($.create('div', {
        id: 'bquery-test',
        innerHTML: `
        <div class="child1">
            <div class="grandchild1"></div>
        </div>
        <div class="child2"></div>`
    }))

    var parent = document.getElementById('bquery-test'),
        child1 = parent.querySelector('.child1'),
        child2 = parent.querySelector('.child2'),
        grandchild1 = parent.querySelector('.grandchild1');

    setTimeout(() => document.body.removeChild(parent), 1000);

    it('Adds event listener', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', f);
        click(parent);

        expect(bool).toEqual(true);
	});

    it('Removes event listener (listener is specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent)
            .on('click', f)
            .off('click', f);

        click(parent);

        expect(bool).toEqual(false);
	});


    it('Removes event listener (listener is not specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent)
            .on('click', f)
            .off('click');

        click(parent);

        expect(bool).toEqual(false);
	});

    it('Adds namespaced listener', () => {
        let bool = false;
        $(parent).on('click.yo', evt => bool = true);

        click(parent);

        expect(bool).toEqual(true);

        $(parent).off('click.yo');
	});

    it('Removes namespaced listener (listener is specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent).on('click.yo', f);
        $(parent).off('click.yo', f);

        click(parent);

        expect(bool).toEqual(false);
	});

    it('Removes namespaced listener (listener is not specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent).on('click.yo', f);
        $(parent).off('click.yo');

        click(parent);

        expect(bool).toEqual(false);
	});

    it('Adds bubbling event listener', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', f);

        click(grandchild1);

        expect(bool).toEqual(true);

        $(parent).off('click', f);
    });

    it('Adds delegated event listener', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);

        click(child1);

        expect(bool).toEqual(true);

        $(parent).off('click','.child1', f);
    });

    it('Adds delegated event listener (click on grandchildren)' , () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);

        click(grandchild1);

        expect(bool).toEqual(true);

        $(parent).off('click', '.child1', f);
    });

    it('Doesn\t trigger when clicked on wrong child', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);

        click(child2);

        expect(bool).toEqual(false);
    });

    it('Removes delegated event listener (selector and handler are specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click', '.child1', f);

        click(child1);

        expect(bool).toEqual(false);
    });

    it('Removes delegated event listener (selector is specified, handler is not specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click', '.child1');

        click(child1);

        expect(bool).toEqual(false);
    });

    it('Removes delegated event listener (selector is not specified, handler is specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click', f);

        click(child1);

        expect(bool).toEqual(false);
    });

    it('Removes delegated event listener (selector and handler are not specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click');

        click(child1);

        expect(bool).toEqual(false);
    });


    it('Stops propagation', () => {
        let bool = false,
            f = evt => bool = true,
            f2 = evt => evt.stopPropagation();

        $(parent).on('click', f);
        $(child1).on('click', f2);


        click(child1);

        expect(bool).toEqual(false);

        $(child1).off('click');
        $(parent).off('click');
    });


    /*it('Stops propagation for delegated events', () => {
        let bool = false,
            f = evt => bool = true,
            f2 = evt => evt.stopPropagation();

        $(parent).on('click', '.child1', f);
        $(parent).on('click', '.grandchild1', f2);

        click(grandchild1);

        expect(bool).toEqual(false);

        $(parent).off('click');
    });*/

});
