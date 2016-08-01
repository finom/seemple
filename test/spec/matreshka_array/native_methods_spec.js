import MatreshkaArray from 'src/array';

describe('Matreshka.Array native methods', () => {
	it('supports push method', () => {
		const arr = new MatreshkaArray();
		const result = arr.push('foo', 'bar');
		expect(
			arr.toJSON(false)
		).toEqual(['foo', 'bar']);
		expect(arr.length).toEqual(2);
		expect(result).toEqual(2);
	});

	it('supports pop method', () => {
		const arr = new MatreshkaArray();
		arr.push('foo', 'bar');
		const result = arr.pop();

		expect(
			arr.toJSON(false)
		).toEqual(['foo']);

		expect(arr.length).toEqual(1);
		expect(result).toEqual('bar')
	});

	it('supports unshift method', () => {
		const arr = new MatreshkaArray();
		arr.push('foo', 'bar');
		const result = arr.unshift('baz', 'qux');

		expect(
			arr.toJSON(false)
		).toEqual(['baz', 'qux', 'foo', 'bar']);

		expect(arr.length).toEqual(4);
		expect(result).toEqual(4);
	});

	it('supports shift method', () => {
		const arr = new MatreshkaArray();
		arr.push('foo', 'bar');
		const result = arr.shift();
		expect(arr.length).toEqual(1);
		expect(
			arr.toJSON(false)
		).toEqual(['bar']);
		expect(result).toEqual('foo');
	});


	it('supports sort method', () => {
		const arr = new MatreshkaArray();
		arr.push(2, 3, 1);
		const result = arr.sort();
		expect(
			arr.toJSON(false)
		).toEqual([1, 2, 3]);
		expect(result).toEqual(arr);
	});

	it('supports reverse method', () => {
		const arr = new MatreshkaArray();
		arr.push('foo', 'bar', 'baz');
		const result = arr.reverse();
		expect(
			arr.toJSON(false)
		).toEqual(['baz', 'bar', 'foo']);
		expect(result).toEqual(arr);
	});

	it('supports splice method', () => {
		const arr = new MatreshkaArray();
		arr.push('foo', 'bar', 'baz', 'qux');
		const result = arr.splice(1, 2, 'puk', 'boo', 'lol');

		expect(
			arr.toJSON(false)
		).toEqual(['foo', 'puk', 'boo', 'lol', 'qux']);
		expect(
			result.toJSON(false)
		).toEqual(['bar', 'baz']);
	});

	it('supports filter method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3, 4, 5);
		const result = arr.filter(item => item > 3);

		expect(
			result.toJSON(false)
		).toEqual([4, 5]);
	});

	it('supports map method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3);
		const result = arr.map(item => item * 2);

		expect(
			result.toJSON(false)
		).toEqual([2, 4, 6]);
	});

	it('supports every method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3);
		expect(
			arr.every(item => item < 4)
		).toBe(true);
		expect(
			arr.every(item => item > 4)
		).toBe(false);
	});

	it('supports some method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3);
		expect(
			arr.some(item => item === 2)
		).toBe(true);
		expect(
			arr.some(item => item === 4)
		).toBe(false);
	});

	it('supports join method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3);
		expect(
			arr.join(' ')
		).toEqual('1 2 3');
	});

	it('supports indexOf method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3, 3, 4, 5);
		expect(
			arr.indexOf(3)
		).toEqual(2);
		expect(
			arr.indexOf(6)
		).toEqual(-1);
	});

	it('supports lastIndexOf method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3, 3, 4, 5);
		expect(
			arr.lastIndexOf(3)
		).toEqual(3);
		expect(
			arr.lastIndexOf(6)
		).toEqual(-1);
	});

	it('supports slice method', () => {
		const arr = new MatreshkaArray();
		arr.push(1, 2, 3);
		expect(
			arr.slice(1).toJSON(false)
		).toEqual([2, 3]);
	});

	xit('supports forEach method', () => {
		let arr = new MK.Array(),
			i = 0;

		arr.push(1, 2, 3);

		arr.forEach(item => i++);
		expect(i).toEqual(arr.length);
	});

	it('supports reduce method', () => {
		const arr = new MatreshkaArray(0, 1, 2, 3, 4);
		const result = arr.reduce(function(previousValue, currentValue) {
			return previousValue + currentValue;
		}, 5);

		expect(result).toEqual(15);
	})

	it('supports reduceRight method', () => {
		const arr = new MatreshkaArray(0, 1, 2, 3, 4);
		const result = arr.reduceRight(function(previousValue, currentValue) {
			return previousValue + currentValue;
		}, 5);

		expect(result).toEqual(15);
	});


	it('supports concat method', () => {
		const arr = new MatreshkaArray(1, 2, 3);

		expect(
			arr.concat([4, 5, 6]).toJSON(false)
		).toEqual([1, 2, 3, 4, 5, 6]);

		expect(
			arr.concat(
				new MatreshkaArray(4, 5, 6)
			).toJSON(false)
		).toEqual([1, 2, 3, 4, 5, 6]);
	});
});
