import $ from 'src/bquery';

describe('bQuery.fn.not', function test() {
    const el1 = document.createElement('div'),
        el2 = document.createElement('div'),
        el3 = document.createElement('div');

    el2.className = 'el2';

    it('excludes by selector', () => {
        expect([
            ...$([el1, el2, el3]).not('.el2')
        ]).toEqual([el1, el3]);
	});
});
