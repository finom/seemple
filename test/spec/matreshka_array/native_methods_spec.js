/* eslint-disable import/no-unresolved, no-underscore-dangle */
import MatreshkaArray from 'src/array';
import createSpy from '../../helpers/createspy';

describe('Matreshka.Array native methods (including ones that ending by underscore)'
    + ' and their events', () => {
    const testFlag = { test: 'ok' };
    let simpleHandler;
    let testFlagHandler;

    beforeEach(() => {
        simpleHandler = createSpy();
        testFlagHandler = createSpy(evt => {
            expect(evt.test).toEqual('ok');
        });
    });

    it('supports push method', () => {
        const arr = new MatreshkaArray();
        arr.on('push', simpleHandler);
        arr.on('add', simpleHandler);
        arr.on('modify', simpleHandler);
        const result = arr.push('foo', 'bar');
        expect(
            arr.toJSON(false)
        ).toEqual(['foo', 'bar']);
        expect(arr.length).toEqual(2);
        expect(result).toEqual(2);
        expect(simpleHandler).toHaveBeenCalledTimes(3);
    });

    it('supports push_ method', () => {
        const arr = new MatreshkaArray();

        arr.on('push', testFlagHandler);
        arr.on('add', testFlagHandler);
        arr.on('modify', testFlagHandler);

        const result = arr.push_('foo', 'bar', testFlag);
        expect(
            arr.toJSON(false)
        ).toEqual(['foo', 'bar']);

        expect(arr.length).toEqual(2);
        expect(result).toEqual(2);

        expect(testFlagHandler).toHaveBeenCalledTimes(3);

        // test silent only once
        arr.push_('baz', 'qux', { silent: true });

        expect(testFlagHandler).toHaveBeenCalledTimes(3);
    });

    it('supports pop method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar');

        arr.on('pop', simpleHandler);
        arr.on('remove', simpleHandler);
        arr.on('modify', simpleHandler);

        const result = arr.pop();

        expect(
            arr.toJSON(false)
        ).toEqual(['foo']);

        expect(arr.length).toEqual(1);
        expect(result).toEqual('bar');

        expect(simpleHandler).toHaveBeenCalledTimes(3);
    });


    it('supports pop_ method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar');

        arr.on('pop', testFlagHandler);
        arr.on('remove', testFlagHandler);
        arr.on('modify', testFlagHandler);

        const result = arr.pop_(testFlag);

        expect(
            arr.toJSON(false)
        ).toEqual(['foo']);

        expect(arr.length).toEqual(1);
        expect(result).toEqual('bar');
        expect(testFlagHandler).toHaveBeenCalledTimes(3);
    });

    it('supports unshift method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar');
        arr.on('unshift', simpleHandler);
        arr.on('add', simpleHandler);
        arr.on('modify', simpleHandler);

        const result = arr.unshift('baz', 'qux');

        expect(
            arr.toJSON(false)
        ).toEqual(['baz', 'qux', 'foo', 'bar']);

        expect(arr.length).toEqual(4);
        expect(result).toEqual(4);
        expect(simpleHandler).toHaveBeenCalledTimes(3);
    });

    xit('supports unshift_ method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar');
        arr.on('unshift', testFlagHandler);
        arr.on('add', testFlagHandler);
        arr.on('modify', testFlagHandler);

        const result = arr.unshift_('baz', 'qux', testFlag);

        expect(
            arr.toJSON(false)
        ).toEqual(['baz', 'qux', 'foo', 'bar']);

        expect(arr.length).toEqual(4);
        expect(result).toEqual(4);
        expect(testFlagHandler).toHaveBeenCalledTimes(3);
    });

    it('supports shift method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar');
        arr.on('shift', simpleHandler);
        arr.on('remove', simpleHandler);
        arr.on('modify', simpleHandler);
        const result = arr.shift();
        expect(arr.length).toEqual(1);
        expect(
            arr.toJSON(false)
        ).toEqual(['bar']);
        expect(result).toEqual('foo');
        expect(simpleHandler).toHaveBeenCalledTimes(3);
    });

    it('supports shift_ method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar');
        arr.on('shift', testFlagHandler);
        arr.on('remove', testFlagHandler);
        arr.on('modify', testFlagHandler);
        const result = arr.shift_(testFlag);
        expect(arr.length).toEqual(1);
        expect(
            arr.toJSON(false)
        ).toEqual(['bar']);
        expect(result).toEqual('foo');
        expect(testFlagHandler).toHaveBeenCalledTimes(3);
    });

    it('supports splice method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar', 'baz', 'qux');
        arr.on('splice', simpleHandler);
        arr.on('add', simpleHandler);
        arr.on('remove', simpleHandler);
        arr.on('modify', simpleHandler);
        const result = arr.splice(1, 2, 'puk', 'boo', 'lol');

        expect(
            arr.toJSON(false)
        ).toEqual(['foo', 'puk', 'boo', 'lol', 'qux']);
        expect(
            result.toJSON(false)
        ).toEqual(['bar', 'baz']);

        expect(simpleHandler).toHaveBeenCalledTimes(4);
    });

    it('supports splice_ method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar', 'baz', 'qux');
        arr.on('splice', testFlagHandler);
        arr.on('add', testFlagHandler);
        arr.on('remove', testFlagHandler);
        arr.on('modify', testFlagHandler);
        const result = arr.splice_(1, 2, 'puk', 'boo', 'lol', testFlag);

        expect(
            arr.toJSON(false)
        ).toEqual(['foo', 'puk', 'boo', 'lol', 'qux']);
        expect(
            result.toJSON(false)
        ).toEqual(['bar', 'baz']);

        expect(testFlagHandler).toHaveBeenCalledTimes(4);
    });

    it('supports sort method', () => {
        const arr = new MatreshkaArray();
        arr.push(2, 3, 1);
        arr.on('sort', simpleHandler);
        arr.on('modify', simpleHandler);
        const result = arr.sort();
        expect(
            arr.toJSON(false)
        ).toEqual([1, 2, 3]);
        expect(result).toEqual(arr);
        expect(simpleHandler).toHaveBeenCalledTimes(2);
    });

    it('supports sort_ method', () => {
        const arr = new MatreshkaArray();
        arr.push(2, 3, 1);
        arr.on('sort', testFlagHandler);
        arr.on('modify', testFlagHandler);
        const result = arr.sort_(testFlag);
        expect(
            arr.toJSON(false)
        ).toEqual([1, 2, 3]);
        expect(result).toEqual(arr);
        expect(testFlagHandler).toHaveBeenCalledTimes(2);
    });

    it('supports reverse method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar', 'baz');
        arr.on('reverse', simpleHandler);
        arr.on('modify', simpleHandler);
        const result = arr.reverse();
        expect(
            arr.toJSON(false)
        ).toEqual(['baz', 'bar', 'foo']);
        expect(result).toEqual(arr);
        expect(simpleHandler).toHaveBeenCalledTimes(2);
    });

    it('supports reverse_ method', () => {
        const arr = new MatreshkaArray();
        arr.push('foo', 'bar', 'baz');
        arr.on('reverse', testFlagHandler);
        arr.on('modify', testFlagHandler);
        const result = arr.reverse_(testFlag);
        expect(
            arr.toJSON(false)
        ).toEqual(['baz', 'bar', 'foo']);
        expect(result).toEqual(arr);
        expect(testFlagHandler).toHaveBeenCalledTimes(2);
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

    it('supports forEach method', () => {
        const arr = new MatreshkaArray(1, 2, 3);
        const callback = createSpy();

        arr.push(1, 2, 3);

        arr.forEach(callback);

        expect(callback).toHaveBeenCalledTimes(arr.length);
    });

    it('supports reduce method', () => {
        const arr = new MatreshkaArray(0, 1, 2, 3, 4);
        const result = arr.reduce((previousValue, currentValue) =>
            previousValue + currentValue, 5);

        expect(result).toEqual(15);
    });

    it('supports reduceRight method', () => {
        const arr = new MatreshkaArray(0, 1, 2, 3, 4);
        const result = arr.reduceRight((previousValue, currentValue) =>
            previousValue + currentValue, 5);

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
