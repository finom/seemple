import Matreshka from 'src';
import MatreshkaObject from 'src/object';

describe('Matreshka.Object class', () => {
    const methodNames = `_afterInit,
    setData,
    addDataKeys,
    removeDataKeys,
    isDataKey,
    keys,
    keyOf,
    toJSON,
    each`.split(/\s*,\s*/);

    it('an instance should have isMK=true and isMKObject=true properties', () => {
        const obj = new MatreshkaObject();
        expect(obj.isMK).toEqual(true);
        expect(obj.isMKObject).toEqual(true);
    });

    it('includes all instance methods', () => {
        const obj = new MatreshkaObject();
        for(let i = 0; i < methodNames.length; i++) {
            const name = methodNames[i];
            expect(typeof obj[name]).toEqual('function');
        }

        expect(typeof obj.jset).toEqual('function');
        expect(obj.jset).toEqual(obj.setData);
    });

    it('is a property of Matreshka', () => {
        expect(Matreshka.Object).toEqual(MatreshkaObject);
    });
});
