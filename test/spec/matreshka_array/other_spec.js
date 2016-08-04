xdescribe('Common tests for MK.Array', () => {


    (hasSymbol ? it : xit)('iterates via for..of', () => {
        let arr = new MK.Array(1, 2, 3),
            i = 1;

        for(let item of arr) {
            expect(item).toEqual(i++);
        }
    });

    


    it('triggers addone and removeone', () => {
        var arr = MK.Array.of(1, 2, 3, 4, 5),
            i = 0;

        arr.on('addone', evt => {
            i++;
            expect(evt.added).toEqual('foo');
        });

        arr.on('removeone', evt => {
            i++;
            expect(evt.removed).toEqual(2);
        });

        arr.push('foo');
        arr.pull(1);
    });
});
