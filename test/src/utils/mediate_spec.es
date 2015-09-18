import magic from 'matreshka-magic';

describe('mediate', () => {
	it('mediates', () => {
		let obj = {};

		magic.mediate(obj, 'a', v => Number(v));
		magic.mediate(obj, 'b c', v => Number(v));

		obj.a = obj.b = obj.c = '123';

		expect(typeof obj.a).toEqual('number');
		expect(typeof obj.b).toEqual('number');
		expect(typeof obj.c).toEqual('number');
	});
});