import Class from 'src/class';

describe('Class function', () => {
	it('allows to inherit', () => {
		const A = Class({ a: true }),
			B = Class({ b: true, extends: A }),
			C = Class({ c: true, extends: B }),
			inst = new C;

		expect(inst instanceof A).toBeTruthy();
		expect(inst instanceof B).toBeTruthy();
		expect(inst instanceof C).toBeTruthy();

		expect(inst.a).toBeTruthy();
		expect(inst.b).toBeTruthy();
		expect(inst.c).toBeTruthy();
	});
});
