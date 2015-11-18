import $ from 'balalaika';

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

describe("Balalaika Events", () => {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="balalaika-test">

        </div>
    `);
    var balalaikaTest = document.getElementById('balalaika-test');

    setTimeout(() => document.body.removeChild(balalaikaTest));

    it('Adds event listener', () => {
        let bool = false,
            f = evt => bool = true;

        $(balalaikaTest).on('click', f);
        click(balalaikaTest);

        expect(bool).toEqual(true);
	});

    it('Removes event listener (listener is specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(balalaikaTest)
            .on('click', f)
            .off('click', f);

        click(balalaikaTest);

        expect(bool).toEqual(false);
	});


    it('Removes event listener (listener is not specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(balalaikaTest)
            .on('click', f)
            .off('click');

        click(balalaikaTest);

        expect(bool).toEqual(false);
	});

    it('Adds namespaced listener', () => {
        let bool = false;
        $(balalaikaTest).on('click.yo', evt => bool = true);

        click(balalaikaTest);

        expect(bool).toEqual(true);
	});

    it('Removes namespaced listener (listener is specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(balalaikaTest).on('click.yo', f);
        $(balalaikaTest).off('click.yo', f);

        click(balalaikaTest);

        expect(bool).toEqual(false);
	});

    it('Removes namespaced listener (listener is not specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(balalaikaTest).on('click.yo', f);
        $(balalaikaTest).off('click.yo');

        click(balalaikaTest);

        expect(bool).toEqual(false);
	});
});
