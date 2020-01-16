/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import SeempleArray from 'src/array';
import Class from 'src/class';

describe('Seemple.Array static methods (of and from)', () => {
    it('converts an array to Seemple.Array instance via Seemple.Array.from', () => {
        const items = [1, 2, 3];
        const arr = SeempleArray.from(items);

        expect(arr instanceof SeempleArray).toBe(true);
        expect(arr.toJSON(false)).toEqual(items);
    });

    it('allows to inherit Seemple.Array.from', () => {
        const items = [1, 2, 3];
        const OwnerClass = Class({ extends: SeempleArray });
        const arr = OwnerClass.from(items);

        expect(arr instanceof OwnerClass).toBe(true);
        expect(arr.toJSON(false)).toEqual(items);
    });

    it('allows to assign Seemple.Array.from to a variable', () => {
        const items = [1, 2, 3];
        const from = SeempleArray.from;
        const arr = from(items);

        expect(arr instanceof SeempleArray).toBe(true);
        expect(arr.toJSON(false)).toEqual(items);
    });

    it('converts arguments to Seemple.Array instance via Seemple.Array.of', () => {
        const items = [1, 2, 3];
        const arr = SeempleArray.of(...items);

        expect(arr instanceof SeempleArray).toBe(true);
        expect(arr.toJSON(false)).toEqual(items);
    });

    it('allows to inherit Seemple.Array.of', () => {
        const items = [1, 2, 3];
        const OwnerClass = Class({ extends: SeempleArray });
        const arr = OwnerClass.of(...items);

        expect(arr instanceof OwnerClass).toBe(true);
        expect(arr.toJSON(false)).toEqual(items);
    });

    it('allows to assign Seemple.Array.of to a variable', () => {
        const items = [1, 2, 3];
        const of = SeempleArray.of;
        const arr = of(...items);

        expect(arr instanceof SeempleArray).toBe(true);
        expect(arr.toJSON(false)).toEqual(items);
    });
});
