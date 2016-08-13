import MatreshkaArray from 'src/array';
import createSpy from '../../helpers/createspy';
describe('Common tests for MK.Array', () => {
    const symbolIt = typeof Symbol === 'function' ? it : xit;

    symbolIt('iterates via for..of', () => {
        const arr = new MatreshkaArray(1, 2, 3);
        let i = 1;

        for(let item of arr) {
            expect(item).toEqual(i++);
        }
    });

    it('triggers addone and removeone', () => {
        const arr = MatreshkaArray.of(1, 2, 3, 4, 5);
        const addOneHandler = createSpy(({ added }) => {
            expect(added).toEqual('foo')
        });
        const removeOneHandler = createSpy(({ removed }) => {
            expect(removed).toEqual(2);
        });

        arr.on('addone', addOneHandler);
        arr.on('removeone', removeOneHandler);

        arr.push('foo');
        arr.pull(1);

        expect(addOneHandler).toHaveBeenCalledTimes(1);
        expect(removeOneHandler).toHaveBeenCalledTimes(1);
    });
});
