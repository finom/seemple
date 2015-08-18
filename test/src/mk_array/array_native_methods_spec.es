import MK from 'matreshka';

describe('MK.Array native methods', () => {
	let arr = new MK.Array();

	it('pushes', () => {
		arr.push(1, 2);

		expect(arr[0]).toEqual(1);
		expect(arr[1]).toEqual(2);
		expect(arr.length).toEqual(2);
	});

	it('pops', () => {
		arr.pop();

		expect(arr.length).toEqual(1);

		expect(arr.toNative()).toEqual([1]);
	});

	it('unshifts', () => {
		arr.unshift(2, 3, 4);

		expect(arr[0]).toEqual(2);
		expect(arr[1]).toEqual(3);
		expect(arr[2]).toEqual(4);

		expect(arr.toNative()).toEqual([2, 3, 4, 1]);
		expect(arr.length).toEqual(4);
	});

	it('shifts', () => {
		arr.shift();
		expect(arr.length).toEqual(3);

		expect(arr.toNative()).toEqual([3, 4, 1]);
	});

	it('sorts', () => {
		arr.sort();

		expect(arr.toNative()).toEqual([1, 3, 4]);
	});

	it('reverses', () => {
		arr.reverse();

		expect(arr.toNative()).toEqual([4, 3, 1]);
	});

	it('splices', () => {
		let newArr = arr.splice(1, 1, 3, 4, 5);

		expect(arr.toNative()).toEqual([4, 3, 4, 5, 1]);
		expect(newArr.toNative()).toEqual([3]);
	});

	it('filters', () => {
		arr = arr.filter(item => item > 3);

		expect(arr.toNative()).toEqual([4, 4, 5]);
	});

	it('maps', () => {
		arr = arr.map(item => item * 2);

		expect(arr.toNative()).toEqual([8, 8, 10]);
	});

	it('runs every', () => {
		expect(arr.every(item => item > 7)).toBe(true);
		expect(arr.every(item => item < 7)).toBe(false);
	});

	it('runs some', () => {
		expect(arr.some(item => item === 10)).toBe(true);
		expect(arr.some(item => item === 42)).toBe(false);
	});


	it('concats', () => {
		expect(arr.concat([1, 2, 3]).toNative()).toEqual([8, 8, 10, 1, 2, 3]);
		expect(arr.concat(MK.Array.from([1, 2, 3])).toNative()).toEqual([8, 8, 10, 1, 2, 3]);
	});

	it('joins', () => {

		expect(arr.join(' ')).toEqual('8 8 10');
	});

	it('converts to string', () => {
		expect(arr.toString()).toEqual('8,8,10');
	});

	it('finds index of', () => {
		expect(arr.indexOf(10)).toEqual(2);
		expect(arr.indexOf(42)).toEqual(-1);
	});

	it('finds last index of', () => {
		expect(arr.lastIndexOf(8)).toEqual(1);
		expect(arr.lastIndexOf(42)).toEqual(-1);
	});

	it('slices', () => {
		expect(arr.slice(1).toNative()).toEqual([8, 10]);
	});

	it('iterates', () => {
		let i = 0;
		arr.forEach(item => i++);
		expect(i).toEqual(3);
	});
});