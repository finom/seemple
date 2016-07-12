import $ from 'src/bquery';

describe('bQuery.fn.add', function test() {
    const el1 = document.createElement('div'),
        el2 = document.createElement('div'),
        el3 = document.createElement('div'),
        el4 = document.createElement('div'),
        el5 = document.createElement('div');

    it('adds once', () => {
        expect([
            ...$([el1, el2, el3]).add([el2, el3, el4, el5])
        ]).toEqual([el1, el2, el3, el4, el5]);
	});
});
