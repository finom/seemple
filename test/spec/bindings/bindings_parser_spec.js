import parseBindings from 'src/parsebindings';

const noDebounceOption = { debounce: false };

function parse(html) {
	const node = window.document.createElement('div');
	node.innerHTML = html;
	return node.children[0];
}

describe('Bindings parser', () => {
	it('should parse inner content', () => {
        const node = parse('<span>{{x}}</span>');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
        expect(node.textContent).toEqual(obj.x);
	});

	it('should bind complex inner content', () => {
        const node = parse('<span>{{x}} {{y}}</span>');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
		obj.y = 'bar';
        expect(node.textContent).toEqual(`${obj.x} ${obj.y}`);
	});

	it('should bind attributes', () => {
        const node = parse('<a href="{{x}}"></a>');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'bar';
        expect(
			node.getAttribute('href')
		).toEqual(obj.x);
	});

	it('should bind complex attributes', () => {
        const node = parse('<a href="{{x}}/{{y}}"></a>');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
        obj.y = 'bar';
        expect(
			node.getAttribute('href')
		).toEqual(`${obj.x}/${obj.y}`);
	});




	xit('should bind HTML using Matreshka instance method', () => {
        let node = q('<span>{{x}}</span>'),
            mk = new MK;

        mk.parseBindings(node);
        mk.x = 'hi';
        expect(node.firstChild.innerHTML).toEqual(mk.x);
	});


	it('should bind input value', () => {
        const node = parse('<input value="{{x}}">');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
        expect(node.value).toEqual(obj.x);
	});

	it('should bind complex input value', () => {
        const node = parse('<input value="{{x}} {{y}}">');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
		obj.x = 'bar';
        expect(node.value).toEqual(`${obj.x} ${obj.y}`);
	});

    it('should bind input=checkbox checked', () => {
        const node = parse('<input type="checkbox" checked="{{x}}">');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = true;
        expect(node.checked).toEqual(obj.x);
	});


    it('should bind textarea value', () => {
        const node = parse('<textarea value="{{x}}"></textarea>');
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
        expect(node.value).toEqual(obj.x);
	});


    it(`shouldnt create additional properties
		(complex node values require to create hidden computable property)`, () => {
        const node = parse('<input value="{{x}} and {{y}}">')
        const obj = {};

        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
        obj.y = 'bar';
        expect(node.value).toEqual(`${obj.x} and ${obj.y}`);
        expect(
			Object.keys(obj)
		).toEqual(['x', 'y']);
	});


    it('should bind nested nodes', () => {
        const node = parse(`
            <div>{{x}}
                <input value="{{y}}">
                <span>
                    <span>
                        <span data-qux="hey {{z}}"></span>
                    </span>
                </span>
            </div>
        `);
        const obj = {};
        parseBindings(obj, node, noDebounceOption);
        obj.x = 'foo';
        obj.y = 'bar';
        obj.z = 'baz';

        expect(
			node.innerHTML.indexOf(obj.x)
		).toEqual(0);

        expect(
			node.querySelector('input').value
		).toEqual(obj.y);

        expect(
			node.querySelector('[data-qux]').getAttribute('data-qux')
		).toEqual(`hey ${obj.z}`);

        expect(
			Object.keys(obj).sort()
		).toEqual(['x', 'y', 'z']);
	});

    it('should bind nested nodes and deep properties', () => {
        const node = parse(`
            <div>{{a.b}}
                <input value="{{c.d}}">
                <span>
                    <span>
                        <span data-qux="hey {{e.f}}"></span>
                    </span>
                </span>
            </div>
        `);

        const obj = {
            a: {b: 1},
            c: {d: 2},
            e: {f: 2}
        };

        parseBindings(obj, node, noDebounceOption);

        obj.a.b = 'foo';
        obj.c.d = 'bar';
        obj.e.f = 'baz';

		expect(
			node.innerHTML.indexOf(obj.a.b)
		).toEqual(0);

		expect(
			node.querySelector('input').value
		).toEqual(obj.c.d);

        expect(
			node.querySelector('[data-qux]').getAttribute('data-qux')
		).toEqual(`hey ${obj.e.f}`);
	});

	xit('works when brackets are redefined', () => {
        let node = q('<input value="[[x]] you">'),
            object = {},
			defaultBrackets = magic.parserBrackets;

		magic.parserBrackets = {
			left: '[[',
			right: ']]'
		};

        magic.parseBindings(object, node, noDebounceOption);
        object.x = 'hey';
        expect(node.value).toEqual(object.x + ' you');

		magic.parserBrackets = defaultBrackets;
	});
});
