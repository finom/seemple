import MK from 'matreshka';

describe('MK.Object common stuff', () => {
	it('iterates via for..of', () => {
		let obj = new MK.Object({a: 'foo', b: 'bar', c: 'baz'}),
			values = ['foo', 'bar', 'baz'],
			i = 0;

		for(let item of obj) {
			expect(item).toEqual(values[i++]);
		}
	});
});
