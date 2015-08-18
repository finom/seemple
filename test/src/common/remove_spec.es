import magic from 'matreshka-magic';

describe("remove", () => {
	it('removes', () => {
		let obj = {
			a: 1
		};

		magic.remove(obj, 'a')

		expect('a' in obj).toBe(false);
	});

	it('removes special', () => {
		let obj = {
			a: 1
		};

		magic._defineSpecial(obj, 'a');

		magic.remove(obj, 'a');

		expect('a' in obj).toBe(false);
	});
});