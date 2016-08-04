/* eslint-disable import/no-unresolved */
import Matreshka from 'src';
import MatreshkaOnly from 'src/matreshka';

describe('Matreshka class', () => {
    const universalMethodsNames = `on,
        once,
        onDebounce,
        off,
        trigger,
        calc,
        bindNode,
        unbindNode,
        bindOptionalNode,
        bindSandbox,
        parseBindings,
        select,
        selectAll,
        set,
        remove,
        instantiate,
        mediate`.split(/\s*,\s*/);

    it('an instance should have isMK=true property', () => {
        const obj = new Matreshka();
        expect(obj.isMK).toEqual(true);
    });

    it('an instance should have nodes and $nodes properties', () => {
        const obj = new Matreshka();
        expect(typeof obj.nodes).toEqual('object');
        expect(typeof obj.$nodes).toEqual('object');
    });

    it('includes all instance methods', () => {
        const obj = new Matreshka();
        for(let i = 0; i < universalMethodsNames.length; i++) {
            const name = universalMethodsNames[i];
            expect(typeof obj[name]).toEqual('function');
        }

        expect(typeof obj._afterInit).toEqual('function');

        // test selectAll alias
        expect(typeof obj.$).toEqual('function');
        expect(obj.$).toEqual(obj.selectAll);
    });

    it('includes all static members', () => {
        for(let i = 0; i < universalMethodsNames.length; i++) {
            const name = universalMethodsNames[i];
            expect(typeof Matreshka[name]).toEqual('function');
        }

        expect(typeof Matreshka.binders).toEqual('object');
        expect(typeof Matreshka.defaultBinders).toEqual('object');
        expect(typeof Matreshka.lookForBinder).toEqual('function');
        expect(typeof Matreshka.Class).toEqual('function');
        expect(typeof Matreshka.Array).toEqual('function');
        expect(typeof Matreshka.Object).toEqual('function');
    });

    it('exports the same thing from index.js and matreshka/index.js', () => {
        expect(Matreshka).toEqual(MatreshkaOnly);
    });
});
