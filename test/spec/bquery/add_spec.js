/* eslint-disable import/no-unresolved */
import $ from 'src/bquery';

describe('bQuery.fn.add', () => {
    it('adds once', () => {
        const el1 = window.document.createElement('div');
        const el2 = window.document.createElement('div');
        const el3 = window.document.createElement('div');
        const el4 = window.document.createElement('div');
        const el5 = window.document.createElement('div');

        expect(Array.from(
            $([el1, el2, el3]).add([el2, el3, el4, el5])
        )).toEqual([el1, el2, el3, el4, el5]);
    });
});
