import magic from 'matreshka-magic';
import MK from 'matreshka';
import $ from 'bquery';
let q = (s, c) => $(s, c)[0] || null;


describe('Bindings parser', () => {
	it('should bind HTML', () => {
        let node = q('<span>{{x}}</span>'),
            object = {};

        magic.parseBindings(object, node);
        object.x = 'hi';
        expect(node.firstChild.innerHTML).toEqual(object.x);
	});

	it('should bind HTML using Matreshka instance method', () => {
        let node = q('<span>{{x}}</span>'),
            mk = new MK;

        mk.parseBindings(node);
        mk.x = 'hi';
        expect(node.firstChild.innerHTML).toEqual(mk.x);
	});


    it('should bind values', () => {
        let node = q('<input value="{{x}}">'),
            object = {};
        magic.parseBindings(object, node);
        object.x = 'hey';
        expect(node.value).toEqual(object.x);
	});


    it('should bind checked', () => {
        let node = q('<input type="checkbox" checked="{{x}}">'),
            object = {};
        magic.parseBindings(object, node);
        object.x = true;
        expect(node.checked).toEqual(object.x);
	});


    it('should bind textareas', () => {
        let node = q('<textarea value="{{x}}"></textarea>'),
            object = {};
        magic.parseBindings(object, node);
        object.x = 'foo';
        expect(node.value).toEqual(object.x);
	});


    it('should bind complex attrs and HTML', () => {
        let node = q('<a href="{{x}}/{{y}}">{{x}}</a>'),
            object = {};
        magic.parseBindings(object, node);
        object.x = 'bar';
        object.y = 'baz';
        expect(node.getAttribute('href')).toEqual(object.x + '/' + object.y);
		  expect(node.textContent).toEqual(object.x);
	});


    it('should bind complex values', () => {
        let node = q('<input value="{{x}} and {{y}}">'),
            object = {};
        magic.parseBindings(object, node);
        object.x = 'foo';
        object.y = 'bar';
        expect(node.value).toEqual(object.x + ' and ' + object.y);
	});


    it('shouldnt create additional properties', () => {
        let node = q('<input value="{{x}} and {{y}}">'),
            object = {};
        magic.parseBindings(object, node);
        object.x = 'bar';
        object.y = 'baz';
        expect(node.value).toEqual(object.x + ' and ' + object.y);
        expect(Object.keys(object)).toEqual(['x', 'y']);
	});


    it('should bind nested nodes', () => {
        let node = q(`
            <div>{{x}}
                <input value="{{y}}">
                <span>
                    <span>
                        <span attr="hey {{z}}"></span>
                    </span>
                </span>
            </div>
        `),
        object = {};
        magic.parseBindings(object, node);
        object.x = 'foo';
        object.y = 'bar';
        object.z = 'baz';
        expect(node.innerHTML.indexOf('<span>' + object.x + '</span>')).toEqual(0);
        expect(q('input', node).value).toEqual(object.y);
        expect(q('[attr]', node).getAttribute('attr')).toEqual('hey ' + object.z);
        expect(Object.keys(object).sort()).toEqual(['x', 'y', 'z']);
	});

    it('should bind nested nodes and deep properties', () => {
        let node = q(`
            <div>{{a.b}}
                <input value="{{c.d}}">
                <span>
                    <span>
                        <span attr="hey {{e.f}}"></span>
                    </span>
                </span>
            </div>
        `),
        object = {
            a: {b: 1},
            c: {d: 2},
            e: {f: 2}
        };
        magic.parseBindings(object, node);
        object.a.b = 'foo';
        object.c.d = 'bar';
        object.e.f = 'baz';
        expect(node.innerHTML.indexOf('<span>' + object.a.b + '</span>')).toEqual(0);
        expect(q('input', node).value).toEqual(object.c.d);
        expect(q('[attr]', node).getAttribute('attr')).toEqual('hey ' + object.e.f);
	});

	it('works when brackets are redefined', () => {
        let node = q('<input value="[[x]] you">'),
            object = {},
			defaultBrackets = magic.parserBrackets;

		magic.parserBrackets = {
			left: '[[',
			right: ']]'
		};

        magic.parseBindings(object, node);
        object.x = 'hey';
        expect(node.value).toEqual(object.x + ' you');

		magic.parserBrackets = defaultBrackets;
	});
});
