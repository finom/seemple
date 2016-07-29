/* eslint-disable import/no-unresolved */
import $ from 'src/bquery';

describe('bQuery.create', () => {
    const datasetIt = window.document.body.dataset ? it : xit;

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


    datasetIt('extends dataset object', () => {
        expect(
            $.create('div', {
                dataset: {
                    foo: 'bar'
                }
            }).getAttribute('data-foo')
        ).toEqual('bar');
    });
});
