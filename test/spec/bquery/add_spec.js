/* eslint-disable import/no-unresolved */
import $ from 'src/bquery';

describe('bQuery.fn.add', () => {
    it('adds once', () => {
        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        const el3 = document.createElement('div');
        const el4 = document.createElement('div');
        const el5 = document.createElement('div');

        expect([
            ...$([el1, el2, el3]).add([el2, el3, el4, el5])
        ]).toEqual([el1, el2, el3, el4, el5]);
    });
});
