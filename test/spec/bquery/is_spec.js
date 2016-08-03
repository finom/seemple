/* eslint-disable import/no-unresolved */
import $ from 'src/bquery';

describe('bQuery.fn.is', () => {
    xit('checks className', () => {
        const el = window.document.createElement('div');
        el.className = 'el';

        expect(
            $(el).is('.el')
        ).toEqual(true);

        expect(
            $(el).is('.el2')
        ).toEqual(false);
    });
});
