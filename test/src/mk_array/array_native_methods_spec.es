import MK from 'matreshka';

describe('MK.Array native methods', () => {
	it('pushes', () => {
		let arr = new MK.Array();

		arr.push(1, 2);

		expect(arr[0]).toEqual(1);
		expect(arr[1]).toEqual(2);
		expect(arr.length).toEqual(2);
	});

	it('pops', () => {
		let arr = new MK.Array();
		arr.push(1, 2);
		arr.pop();

		expect(arr.length).toEqual(1);
		expect(arr.toNative()).toEqual([1]);
	});

	it('unshifts', () => {
		let arr = new MK.Array();
		arr.push(1, 2);
		arr.unshift(2, 3, 4);

		expect(arr[0]).toEqual(2);
		expect(arr[1]).toEqual(3);
		expect(arr[2]).toEqual(4);

		expect(arr.toNative()).toEqual([2, 3, 4, 1, 2]);
		expect(arr.length).toEqual(5);
	});

	it('shifts', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		arr.shift();
		expect(arr.length).toEqual(2);

		expect(arr.toNative()).toEqual([2, 3]);
	});

	it('sorts', () => {
		let arr = new MK.Array();
		arr.push(2, 3, 1);

		arr.sort();
		expect(arr.toNative()).toEqual([1, 2, 3]);
	});

	it('reverses', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		arr.reverse();

		expect(arr.toNative()).toEqual([3, 2, 1]);
	});

	it('splices', () => {
		let arr = new MK.Array(),
			newArr;

		arr.push(1, 2, 3);
		newArr = arr.splice(1, 1, 3, 4, 5);

		expect(arr.toNative()).toEqual([1, 3, 4, 5, 3]);
		expect(newArr.toNative()).toEqual([2]);
	});

	it('filters', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3, 4, 5);
		arr = arr.filter(item => item > 3);

		expect(arr.toNative()).toEqual([4, 5]);
	});

	it('maps', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		arr = arr.map(item => item * 2);

		expect(arr.toNative()).toEqual([2, 4, 6]);
	});

	it('runs every', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		expect(arr.every(item => item < 4)).toBe(true);
		expect(arr.every(item => item > 4)).toBe(false);
	});

	it('runs some', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		expect(arr.some(item => item === 2)).toBe(true);
		expect(arr.some(item => item === 4)).toBe(false);
	});


	it('concats', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);

		expect(arr.concat([4, 5, 6]).toNative()).toEqual([1, 2, 3, 4, 5, 6]);
		expect(arr.concat(MK.Array.from([4, 5, 6])).toNative()).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it('joins', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		expect(arr.join(' ')).toEqual('1 2 3');
	});

	it('converts to string', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		expect(arr.toString()).toEqual('1,2,3');
	});

	it('finds index of', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3, 3, 4, 5);
		expect(arr.indexOf(3)).toEqual(2);
		expect(arr.indexOf(6)).toEqual(-1);
	});

	it('finds last index of', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3, 3, 4, 5);
		expect(arr.lastIndexOf(3)).toEqual(3);
		expect(arr.lastIndexOf(6)).toEqual(-1);
	});

	it('slices', () => {
		let arr = new MK.Array();
		arr.push(1, 2, 3);
		expect(arr.slice(1).toNative()).toEqual([2, 3]);
	});

	it('iterates', () => {
		let arr = new MK.Array(),
			i = 0;

		arr.push(1, 2, 3);

		arr.forEach(item => i++);
		expect(i).toEqual(arr.length);
	});
});
