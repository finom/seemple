/* eslint-disable import/no-unresolved */
import $ from 'src/bquery';

describe('bQuery.fn.find', () => {
    let testSandbox;
    let grandChild;

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
