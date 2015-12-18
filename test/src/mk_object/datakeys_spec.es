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

	it('triggers "modify" when data keys are added', () => {
		let obj = new MK.Object(),
			bool = false;

		obj.on('modify', evt => {
			bool = true;
		});

		obj.addDataKeys('c d');
		expect(bool).toEqual(true);
	});

	it('triggers "remove" when data keys are removed', () => {
		let obj = new MK.Object(),
			bool = false;

		obj.addDataKeys('a');

		obj.on('remove', evt => {
			bool = true;
		});

		obj.removeDataKeys('a');
		expect(bool).toEqual(true);
	});

	it('triggers "modify" when data keys are removed', () => {
		let obj = new MK.Object(),
			bool = false;

		obj.addDataKeys('a');

		obj.on('modify', evt => {
			bool = true;
		});

		obj.removeDataKeys('a');

		expect(bool).toEqual(true);
	});

	it('doesn\'t trigger "modify" when data keys are not removed', () => {
		let obj = new MK.Object(),
			bool = false;

		obj.addDataKeys('a');

		obj.on('modify', evt => {
			bool = true;
		});

		obj.removeDataKeys('b');

		expect(bool).toEqual(false);
	});

	it('triggers "modify" when data is removed', () => {
		let obj = new MK.Object(),
			bool = false;

		obj.addDataKeys('a');

		obj.on('modify', evt => {
			bool = true;
		});

		obj.remove('a');

		expect(bool).toEqual(true);
	});

	it('doesn\'t trigger "modify" when non-data is removed', () => {
		let obj = new MK.Object(),
			bool = false;

		obj.addDataKeys('a');

		obj.on('modify', evt => {
			bool = true;
		});

		obj.remove('b');

		expect(bool).toEqual(false);
	});
});
