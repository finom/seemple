import magic from 'matreshka-magic';
import $ from 'balalaika';
let q = (s, c) => $(s, c)[0] || null;
let object = {};

describe('Bindings parser', () => {
    it('should bind HTML', () => {
        let node = q('<span>{{x}}</span>');
        //document.body.appendChild(node);
        magic.parseBindings(object, node);
        object.x = 'hi';
        expect(node.firstChild.innerHTML).toEqual(object.x);
	});


    it('should bind values', () => {
        let node = q('<input value="{{x}}">');
        magic.parseBindings(object, node);
        object.x = 'hey';
        expect(node.value).toEqual(object.x);
	});


    it('should bind checked', () => {
        let node = q('<input type="checkbox" checked="{{x}}">');
        magic.parseBindings(object, node);
        object.x = true;
        expect(node.checked).toEqual(object.x);
	});


    it('should bind textareas', () => {
        let node = q('<textarea value="{{x}}"></textarea>');
        magic.parseBindings(object, node);
        object.x = 'foo';
        expect(node.value).toEqual(object.x);
	});


    it('should bind complex attrs', () => {
        let node = q('<a href="{{x}}/{{y}}">');
        magic.parseBindings(object, node);
        object.x = 'bar';
        object.y = 'baz';
        expect(node.getAttribute('href')).toEqual(object.x + '/' + object.y);
	});


    it('should bind complex values', () => {
        let node = q('<input value="{{x}} and {{y}}">');
        magic.parseBindings(object, node);
        object.x = 'foo';
        object.y = 'bar';
        expect(node.value).toEqual(object.x + ' and ' + object.y);
	});


    it('shouldnt create additional properties', () => {
        let node = q('<input value="{{x}} and {{y}}">');
        magic.parseBindings(object, node);
        object.x = 'bar';
        object.y = 'baz';
        expect(node.value).toEqual(object.x + ' and ' + object.y);
        expect(Object.keys(object)).toEqual(['x', 'y']);
	});


    it('should bind deep nodes', () => {
        let node = q(`
            <div>{{x}}
                <input value="{{y}}">
                <span>
                    <span>
                        <span attr="hey {{z}}"></span>
                    </span>
                </span>
            </div>
        `);
        magic.parseBindings(object, node);
        object.x = 'foo';
        object.y = 'bar';
        object.z = 'baz';
        expect(node.innerHTML.indexOf('<span>' + object.x + '</span>')).toEqual(0);
        expect(q('input', node).value).toEqual(object.y);
        expect(q('[attr]', node).getAttribute('attr')).toEqual('hey ' + object.z);
        expect(Object.keys(object)).toEqual(['x', 'y', 'z']);
	});
});
