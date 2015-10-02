import MK from 'matreshka';

describe('MK.Object data keys', () => {


	it('accepts object', () => {
		let obj = new MK.Object({
			a: 1
		});
		expect(obj.keys()).toEqual(['a']);
	});

	it('jsets', () => {
		let obj = new MK.Object({
			a: 1
		});
		obj.jset('b', 2);
		expect(obj.b).toEqual(2);
		expect(obj.keys()).toEqual(['a', 'b']);
	});

	it('adds data keys', () => {
		let obj = new MK.Object({
			a: 1
		});
		obj.addDataKeys('c d');
		expect(obj.keys()).toEqual(['a', 'c', 'd']);
	});

	it('removes data keys', () => {
		let obj = new MK.Object({
			a: 1
		});
		obj.removeDataKeys('c d');
		expect(obj.keys()).toEqual(['a']);
	});
});
