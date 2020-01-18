/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import Seemple from 'src';
import SeempleOnly from 'src/seemple';
import initMK from 'src/_core/init';
import defineProp from 'src/_core/defineprop';

describe('Seemple class', () => {
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

  it('an instance should have isSeemple=true property', () => {
    const obj = new Seemple();
    expect(obj.isSeemple).toEqual(true);
  });

  it('an instance should have nodes and $nodes properties', () => {
    const obj = new Seemple();
    expect(typeof obj.nodes).toEqual('object');
    expect(typeof obj.$nodes).toEqual('object');
  });

  it('includes all instance methods', () => {
    const obj = new Seemple();
    for (let i = 0; i < universalMethodsNames.length; i++) {
      const name = universalMethodsNames[i];
      expect(typeof obj[name]).toEqual('function');
    }

    expect(typeof obj._afterInit).toEqual('function');

    // test selectAll alias
    expect(typeof obj.$).toEqual('function');
    expect(obj.$).toEqual(obj.selectAll);
  });

  it('includes all static members', () => {
    for (let i = 0; i < universalMethodsNames.length; i++) {
      const name = universalMethodsNames[i];
      expect(typeof Seemple[name]).toEqual('function');
    }

    expect(typeof Seemple.binders).toEqual('object');
    expect(typeof Seemple.parserBrackers).toEqual('object');
    expect(typeof Seemple.defaultBinders).toEqual('object');
    expect(typeof Seemple.lookForBinder).toEqual('function');
    expect(typeof Seemple.Class).toEqual('function');
    expect(typeof Seemple.Array).toEqual('function');
    expect(typeof Seemple.Object).toEqual('function');
    expect(typeof Seemple.toSeemple).toEqual('function');
    expect(typeof Seemple.useDOMLibrary).toEqual('function');
    expect(typeof Seemple.chain).toEqual('function');
  });

  it('exports the same thing from index.js and seemple/index.js', () => {
    expect(Seemple).toEqual(SeempleOnly);
  });

  it('does not allow to get and set "sandbox" property', () => {
    const obj = {};

    initMK(obj);

    defineProp(obj, 'sandbox');

    expect(() => {
      obj.sandbox; // eslint-disable-line no-unused-expressions
    }).toThrow();

    expect(() => {
      obj.sandbox = 'foo';
    }).toThrow();
  });

  it(`does not allow to get and set "container" property
        when an object has a property isSeempleArray=true`, () => {
    const obj = {
      isSeempleArray: true
    };

    initMK(obj);

    defineProp(obj, 'container');

    expect(() => {
      obj.container; // eslint-disable-line no-unused-expressions
    }).toThrow();

    expect(() => {
      obj.container = 'foo';
    }).toThrow();
  });
});
