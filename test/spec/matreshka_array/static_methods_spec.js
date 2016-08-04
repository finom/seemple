describe('Matreshka.Array static methods', () => {
    xit('converts array to MK.Array via "from" method', () => {
        var arr = MK.Array.from([1, 2, 3]),
            i = 1;

        expect(arr instanceof MK.Array).toBe(true);

        for(let i = 0; i < arr.length; i++) {
            expect(arr[i]).toEqual(i + 1);
        }
    });

    xit('converts args to MK.Array via "of" method', () => {
        var arr = MK.Array.of(1, 2, 3),
            i = 1;

        expect(arr instanceof MK.Array).toBe(true);

        for(let i = 0; i < arr.length; i++) {
            expect(arr[i]).toEqual(i + 1);
        }
    });
});
