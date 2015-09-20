define(['exports', 'matreshka-magic', 'balalaika'], function (exports, _matreshkaMagic, _balalaika) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _magic = _interopRequireDefault(_matreshkaMagic);

    var _$ = _interopRequireDefault(_balalaika);

    var q = function q(s, c) {
        return (0, _$['default'])(s, c)[0] || null;
    };
    var object = {};

    describe('Bindings parser', function () {
        it('should bind HTML', function () {
            var node = q('<span>{{x}}</span>');
            //document.body.appendChild(node);
            _magic['default'].parseBindings(object, node);
            object.x = 'hi';
            expect(node.firstChild.innerHTML).toEqual(object.x);
        });

        it('should bind values', function () {
            var node = q('<input value="{{x}}">');
            _magic['default'].parseBindings(object, node);
            object.x = 'hey';
            expect(node.value).toEqual(object.x);
        });

        it('should bind checked', function () {
            var node = q('<input type="checkbox" checked="{{x}}">');
            _magic['default'].parseBindings(object, node);
            object.x = true;
            expect(node.checked).toEqual(object.x);
        });

        it('should bind textareas', function () {
            var node = q('<textarea value="{{x}}"></textarea>');
            _magic['default'].parseBindings(object, node);
            object.x = 'foo';
            expect(node.value).toEqual(object.x);
        });

        it('should bind complex attrs', function () {
            var node = q('<a href="{{x}}/{{y}}">');
            _magic['default'].parseBindings(object, node);
            object.x = 'bar';
            object.y = 'baz';
            expect(node.getAttribute('href')).toEqual(object.x + '/' + object.y);
        });

        it('should bind complex values', function () {
            var node = q('<input value="{{x}} and {{y}}">');
            _magic['default'].parseBindings(object, node);
            object.x = 'foo';
            object.y = 'bar';
            expect(node.value).toEqual(object.x + ' and ' + object.y);
        });

        it('shouldnt create additional properties', function () {
            var node = q('<input value="{{x}} and {{y}}">');
            _magic['default'].parseBindings(object, node);
            object.x = 'bar';
            object.y = 'baz';
            expect(node.value).toEqual(object.x + ' and ' + object.y);
            expect(Object.keys(object)).toEqual(['x', 'y']);
        });

        it('should bind deep nodes', function () {
            var node = q('\n            <div>{{x}}\n                <input value="{{y}}">\n                <span>\n                    <span>\n                        <span attr="hey {{z}}"></span>\n                    </span>\n                </span>\n            </div>\n        ');
            _magic['default'].parseBindings(object, node);
            object.x = 'foo';
            object.y = 'bar';
            object.z = 'baz';
            expect(node.innerHTML.indexOf('<span>' + object.x + '</span>')).toEqual(0);
            expect(q('input', node).value).toEqual(object.y);
            expect(q('[attr]', node).getAttribute('attr')).toEqual('hey ' + object.z);
            expect(Object.keys(object)).toEqual(['x', 'y', 'z']);
        });
    });
});