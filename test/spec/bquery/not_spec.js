/* eslint-disable import/no-unresolved */
import $ from 'src/bquery';

describe('bQuery.fn.not', () => {
    xit('excludes by selector', () => {
        const el1 = window.document.createElement('div');
        const el2 = window.document.createElement('div');
        const el3 = window.document.createElement('div');

        el2.className = 'el2';

        expect(Array.from(
            $([el1, el2, el3]).not('.el2')
        )).toEqual([el1, el3]);
    });
});
