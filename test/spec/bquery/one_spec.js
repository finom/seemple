import $ from 'src/bquery';

describe('bQuery.one', function test() {
    it('finds', () => {
        const testSandbox = document.createElement('div');

    	testSandbox.innerHTML = `
        <div class="child">
            <div class="grandchild"></div>
        </div>
        <div class="child2">
            <div class="grandchild2"></div>
        </div>
    	`;

        const child = testSandbox.querySelector('.child');

        expect(
            $.one('*', testSandbox)
        ).toEqual(child);
    });
});
