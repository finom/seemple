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

	afterEach(() => {
		$([testSandbox, child1, child2, grandchild1]).off('click');
	});

    it('Adds event listener', () => {
    	$(testSandbox).on('click', handler);
        simulateClick(testSandbox);
		expect(handler).toHaveBeenCalled();
	});

	it('Removes event listener (listener is specified)', () => {
		$(testSandbox).on('click', handler).off('click', handler);
        simulateClick(testSandbox);
		expect(handler).not.toHaveBeenCalled();
	});

    it('Removes event listener (listener is not specified)', () => {
		$(testSandbox).on('click', handler).off('click');
        simulateClick(testSandbox);
		expect(handler).not.toHaveBeenCalled();
	});

    it('Adds namespaced listener', () => {
		$(testSandbox).on('click.yo', handler);
        simulateClick(testSandbox);
		expect(handler).toHaveBeenCalled();
	});

    it('Removes namespaced listener (listener is specified)', () => {
		$(testSandbox).on('click.yo', handler).off('click.yo', handler);
        simulateClick(testSandbox);
		expect(handler).not.toHaveBeenCalled();
	});

    it('Removes namespaced listener (listener is not specified)', () => {
		$(testSandbox).on('click.yo', handler).off('click.yo');
        simulateClick(testSandbox);
		expect(handler).not.toHaveBeenCalled();
	});

    it('Adds bubbling event listener', () => {
		$(testSandbox).on('click', handler);
        simulateClick(grandchild1);
		expect(handler).toHaveBeenCalled();
    });

    it('Adds delegated event listener', () => {
		$(testSandbox).on('click', '.child1', handler);
		simulateClick(child1);
		expect(handler).toHaveBeenCalled();
    });

	it('Adds delegated event listener (click on grandchildren)' , () => {
		$(testSandbox).on('click', '.child1', handler);
		simulateClick(grandchild1);
		expect(handler).toHaveBeenCalled();
    });

    it('Doesn\t trigger when clicked on wrong child', () => {
		$(testSandbox).on('click', '.child2', handler);
		simulateClick(grandchild1);
		expect(handler).not.toHaveBeenCalled();
    });

    it('Removes delegated event listener (selector and handler are specified)', () => {
		$(testSandbox).on('click', '.child1', handler).off('click', '.child1', handler);
        simulateClick(child1);
		expect(handler).not.toHaveBeenCalled();
    });

    it('Removes delegated event listener (selector is specified, handler is not specified)', () => {
		$(testSandbox).on('click', '.child1', handler).off('click', '.child1');
        simulateClick(child1);
		expect(handler).not.toHaveBeenCalled();
    });

    it('Removes delegated event listener (selector is not specified, handler is specified)', () => {
		$(testSandbox).on('click', '.child1', handler).off('click', handler);
        simulateClick(child1);
		expect(handler).not.toHaveBeenCalled();
    });

    it('Removes delegated event listener (selector and handler are not specified)', () => {
		$(testSandbox).on('click', '.child1', handler).off('click');
        simulateClick(child1);
		expect(handler).not.toHaveBeenCalled();
    });

    it('Stops propagation', () => {
        $(testSandbox).on('click', handler);
        $(child1).on('click', evt => evt.stopPropagation());
        simulateClick(child1);
        expect(handler).not.toHaveBeenCalled();
    });
});
