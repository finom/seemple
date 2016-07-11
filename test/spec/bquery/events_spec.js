import $ from 'src/bquery';
import simulateClick from '../../lib/simulateclick';

describe("bQuery Events", () => {
	const testSandbox = document.createElement('div');

	testSandbox.innerHTML = `
		<div class="child1">
			<div class="grandchild1"></div>
		</div>
		<div class="child2"></div>
	`;

    const child1 = testSandbox.querySelector('.child1'),
        child2 = testSandbox.querySelector('.child2'),
        grandchild1 = testSandbox.querySelector('.grandchild1');

	let ctx,
		handler;


	beforeEach(() => {
		ctx = {};
		this.handler = () => {};
		spyOn(this, 'handler');
		handler = this.handler;
	});

    it('Adds event listener', () => {
    	$(testSandbox).on('click', handler);
        simulateClick(testSandbox);
		expect(handler).toHaveBeenCalled();
	});

    xit('Removes event listener (listener is specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent)
            .on('click', f)
            .off('click', f);

        click(parent);

        expect(bool).toEqual(false);
	});


    xit('Removes event listener (listener is not specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent)
            .on('click', f)
            .off('click');

        click(parent);

        expect(bool).toEqual(false);
	});

    xit('Adds namespaced listener', () => {
        let bool = false;
        $(parent).on('click.yo', evt => bool = true);

        click(parent);

        expect(bool).toEqual(true);

        $(parent).off('click.yo');
	});

    xit('Removes namespaced listener (listener is specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent).on('click.yo', f);
        $(parent).off('click.yo', f);

        click(parent);

        expect(bool).toEqual(false);
	});

    xit('Removes namespaced listener (listener is not specified)', () => {
        let bool = false,
            f = evt => bool = true;
        $(parent).on('click.yo', f);
        $(parent).off('click.yo');

        click(parent);

        expect(bool).toEqual(false);
	});

    xit('Adds bubbling event listener', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', f);

        click(grandchild1);

        expect(bool).toEqual(true);

        $(parent).off('click', f);
    });

    xit('Adds delegated event listener', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);

        click(child1);

        expect(bool).toEqual(true);

        $(parent).off('click','.child1', f);
    });

    xit('Adds delegated event listener (click on grandchildren)' , () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);

        click(grandchild1);

        expect(bool).toEqual(true);

        $(parent).off('click', '.child1', f);
    });

    xit('Doesn\t trigger when clicked on wrong child', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);

        click(child2);

        expect(bool).toEqual(false);
    });

    xit('Removes delegated event listener (selector and handler are specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click', '.child1', f);

        click(child1);

        expect(bool).toEqual(false);
    });

    xit('Removes delegated event listener (selector is specified, handler is not specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click', '.child1');

        click(child1);

        expect(bool).toEqual(false);
    });

    xit('Removes delegated event listener (selector is not specified, handler is specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click', f);

        click(child1);

        expect(bool).toEqual(false);
    });

    xit('Removes delegated event listener (selector and handler are not specified)', () => {
        let bool = false,
            f = evt => bool = true;

        $(parent).on('click', '.child1', f);
        $(parent).off('click');

        click(child1);

        expect(bool).toEqual(false);
    });


    xit('Stops propagation', () => {
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
