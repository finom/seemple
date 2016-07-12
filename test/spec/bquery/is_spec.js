import $ from 'src/bquery';

describe('bQuery.fn.not', function test() {
    const el = document.createElement('div');

    el.className = 'el';

    it('checks className', () => {
        expect(
            $(el).is('.el')
        ).toEqual(true);
        
        expect(
            $(el).is('.el2')
        ).toEqual(false);
	});
});
