/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import SeempleArray from 'src/array';

describe('Seemple.Array iterator', () => {
    const symbolIt = typeof Symbol === 'function' ? it : xit;

    symbolIt('iterates via for..of', () => {
        const arr = new SeempleArray(1, 2, 3);
        let i = 1;

        for (const item of arr) {
            expect(item).toEqual(i);
            i += 1;
        }
    });
});
