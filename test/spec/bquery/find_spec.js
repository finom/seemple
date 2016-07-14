import $ from 'src/bquery';

describe('bQuery.fn.find', function test() {
    let testSandbox,
        grandChild;

    beforeEach(() => {
        testSandbox = document.createElement('div');

    	testSandbox.innerHTML = `
    		<div class="child">
    			<div class="grandchild"></div>
    		</div>
    	`;

        grandChild = testSandbox.querySelector('.grandchild');
    });

    it('finds', () => {
        expect([
            ...$(testSandbox).find('.grandchild')
        ]).toEqual([grandChild]);
    });
});
