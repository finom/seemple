/* eslint-disable import/no-unresolved */
import MatreshkaObject from 'src/object';
import createSpy from '../../helpers/createspy';

describe('Matreshka.Object data keys', () => {
    it('the class accepts an object as an argument', () => {
        const obj = new MatreshkaObject({
            a: 1
        });

        expect(obj.keys()).toEqual(['a']);
    });

    it('sets data via setData', () => {
        const obj = new MatreshkaObject({
            a: 1
        });
        obj.setData('b', 2);
        expect(obj.b).toEqual(2);
        expect(obj.keys()).toEqual(['a', 'b']);
    });

    it('adds data keys', () => {
        const obj = new MatreshkaObject({
            a: 1
        });
        obj.addDataKeys('c', 'd');
        obj.addDataKeys(['e', 'f']);
        expect(obj.keys()).toEqual(['a', 'c', 'd', 'e', 'f']);
    });

    it('removes data keys', () => {
        const obj = new MatreshkaObject({
            a: 1
        });
        obj.addDataKeys('c', 'd');
        obj.addDataKeys(['e', 'f']);
        obj.removeDataKeys('c', 'd');
        obj.removeDataKeys(['e', 'f']);
        expect(obj.keys()).toEqual(['a']);
    });

    it('triggers "modify" when data keys are added', () => {
        const obj = new MatreshkaObject();
        const handler = createSpy();
        obj.on('modify', handler);
        obj.addDataKeys('c', 'd');
        expect(handler).toHaveBeenCalledTimes(2);
    });

    it('triggers "modify" when data keys are removed', () => {
        const obj = new MatreshkaObject();
        const modifyHandler = createSpy();
        obj.addDataKeys('c', 'd');
        obj.on('modify', modifyHandler);
        obj.removeDataKeys('c', 'd');
        expect(modifyHandler).toHaveBeenCalledTimes(2);
    });


    it('does not trigger "modify" when data keys are not removed', () => {
        const obj = new MatreshkaObject();
        const handler = createSpy();
        obj.addDataKeys('c', 'd');
        obj.on('modify', handler);
        obj.removeDataKeys('e', 'f');
        expect(handler).not.toHaveBeenCalled();
    });

    it('triggers "modify" when data is removed', () => {
        const obj = new MatreshkaObject();
        const handler = createSpy();
        obj.addDataKeys('a');
        obj.on('modify', handler);
        obj.remove('a');
        expect(handler).toHaveBeenCalled();
    });

    it('does not trigger "modify" when non-data is removed', () => {
        const obj = new MatreshkaObject({
            a: 1
        });
        const handler = createSpy();
        obj.b = 'foo';
        obj.on('modify', handler);
        obj.remove('b');
        expect(handler).not.toHaveBeenCalled();
    });

    it('checks is data key by isDataKey method', () => {
        const obj = new MatreshkaObject();
        obj.setData('a', 1);
        obj.b = 2;
        expect(obj.isDataKey('a')).toBeTruthy();
        expect(obj.isDataKey('b')).toBeFalsy();
    });
});
