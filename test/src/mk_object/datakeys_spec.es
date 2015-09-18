import MK from 'matreshka';

describe('MK.Object data keys', () => {
	let obj = new MK.Object({
		a: 1
	});

	it('accepts object', () => {
		expect(obj.keys()).toEqual(['a']);
	});

	it('jsets', () => {
		obj.jset('b', 2);
		expect(obj.b).toEqual(2);
		expect(obj.keys()).toEqual(['a', 'b']);
	});

	it('adds data keys', () => {
		obj.addDataKeys('c d');
		expect(obj.keys()).toEqual(['a', 'b', 'c', 'd']);
	});

	it('removes data keys', () => {
		obj.removeDataKeys('c d');
		expect(obj.keys()).toEqual(['a', 'b']);
	});
});