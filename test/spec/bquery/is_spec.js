import $ from 'src/bquery';

describe('bQuery.fn.not', function test() {
    it('checks className', () => {
        const el = document.createElement('div');
        el.className = 'el';

        expect(
            $(el).is('.el')
        ).toEqual(true);

        expect(
            $(el).is('.el2')
        ).toEqual(false);
	});
});
