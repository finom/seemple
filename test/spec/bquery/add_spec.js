import $ from 'src/bquery';

describe('bQuery.fn.add', () => {
	it('adds once', () => {
		const el1 = document.createElement('div'),
			el2 = document.createElement('div'),
			el3 = document.createElement('div'),
			el4 = document.createElement('div'),
			el5 = document.createElement('div');

		expect([
			...$([el1, el2, el3]).add([el2, el3, el4, el5])
		]).toEqual([el1, el2, el3, el4, el5]);
	});
});
