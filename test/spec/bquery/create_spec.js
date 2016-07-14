import $ from 'src/bquery';

describe('bQuery.create', function test() {
    it('creates element', () => {
        expect(
            $.create('div').tagName
        ).toEqual('DIV');
	});

    it('adds a property', () => {
        expect(
            $.create('div', {
                className: 'foobar'
            }).className
        ).toEqual('foobar');
	});

    it('creates childen', () => {
        expect(
            $.create('div', {
                children: [{
                    tagName: 'span'
                }]
            }).children[0].tagName
        ).toEqual('SPAN');
	});

    it('adds attribute', () => {
        expect(
            $.create('div', {
                attributes: {
                    foo: 'bar'
                }
            }).getAttribute('foo')
        ).toEqual('bar');
	});

    it('allows to pass object with tagName property', () => {
        expect(
            $.create({
                tagName: 'div'
            }).tagName
        ).toEqual('DIV');
	});
});
