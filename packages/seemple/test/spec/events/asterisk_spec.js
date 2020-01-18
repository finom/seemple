/* eslint-disable import/no-extraneous-dependencies, max-lines, import/extensions */
import SeempleArray from 'src/array';
import SeempleObject from 'src/object';
import delegateListener from 'src/on/_delegatelistener';
import undelegateListener from 'src/off/_undelegatelistener';
import trigger from 'src/trigger';
import createSpy from '../../helpers/createspy';

describe('Astrerisk events: delegateListener, undelegateListener', () => {
  it('allows to attatch "*" events to Seemple.Array instance', () => {
    const obj = new SeempleArray();
    const handler = createSpy();

    delegateListener(obj, '*', 'someevent', handler);
    obj.push({});
    trigger(obj[0], 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('automatically removes "*" delegated event from Seemple.Array instance'
        + 'if an item is removed', () => {
    const obj = new SeempleArray();
    const handler = createSpy();
    const item = {};

    delegateListener(obj, '*', 'someevent', handler);

    obj.push(item);
    obj.pop();
    trigger(item, 'someevent');
    expect(handler).not.toHaveBeenCalled();
  });

  it('allows to attatch "*" event to Seemple.Object instance', () => {
    const obj = new SeempleObject();
    const handler = createSpy();

    delegateListener(obj, '*', 'someevent', handler);
    obj.setData('x', {});
    trigger(obj.x, 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('automatically removes "*" delegated event from Seemple.Object instance'
        + ' if an item is removed', () => {
    const obj = new SeempleObject();
    const handler = createSpy();
    const item = {};

    delegateListener(obj, '*', 'someevent', handler);
    obj.setData('x', item);
    obj.remove('x');
    trigger(item, 'someevent');
    expect(handler).not.toHaveBeenCalled();
  });

  it('removes "*" events from Seemple.Array instance', () => {
    const obj = new SeempleArray();
    const handler = createSpy();

    delegateListener(obj, '*', 'someevent', handler);
    obj.push({});
    undelegateListener(obj, '*', 'someevent');
    trigger(obj[0], 'someevent');
    expect(handler).not.toHaveBeenCalled();
  });

  it('removes "*" events from Seemple.Object instance', () => {
    const obj = new SeempleObject();
    const handler = createSpy();

    delegateListener(obj, '*', 'someevent', handler);
    obj.setData('x', {});
    undelegateListener(obj, '*', 'someevent');
    trigger(obj.x, 'someevent');
    expect(handler).not.toHaveBeenCalled();
  });

  it('removes "*" events from Seemple.Array instance using callback', () => {
    const obj = new SeempleArray();
    const handler = createSpy();

    delegateListener(obj, '*', 'someevent', handler);
    obj.push({});
    undelegateListener(obj, '*', 'someevent', handler);
    trigger(obj[0], 'someevent');
    expect(handler).not.toHaveBeenCalled();
  });

  it(
    'does not remove "*" events from Seemple.Array instance when wrong callback is given',
    () => {
      const obj = new SeempleArray();
      const handler = createSpy();

      delegateListener(obj, '*', 'someevent', handler);
      obj.push({});
      undelegateListener(obj, '*', 'someevent', () => {});
      trigger(obj[0], 'someevent');
      expect(handler).toHaveBeenCalledTimes(1);
    }
  );

  it('removes "*" events from Seemple.Object instance using callback', () => {
    const obj = new SeempleObject();
    const handler = createSpy();

    delegateListener(obj, '*', 'someevent', handler);
    obj.setData('x', {});
    undelegateListener(obj, '*', 'someevent', handler);
    trigger(obj.x, 'someevent');
    expect(handler).not.toHaveBeenCalled();
  });

  it(
    'does not remove "*" events from Seemple.Object instance when wrong callback is given',
    () => {
      const obj = new SeempleObject();
      const handler = createSpy();

      delegateListener(obj, '*', 'someevent', handler);
      obj.setData('x', {});
      undelegateListener(obj, '*', 'someevent', () => {});
      trigger(obj.x, 'someevent');
      expect(handler).toHaveBeenCalledTimes(1);
    }
  );

  it('allows to attatch "*" events to Seemple.Array instance, go deeper (*.a)', () => {
    const obj = new SeempleArray();
    const handler = createSpy();

    delegateListener(obj, '*.a', 'someevent', handler);
    obj.push({
      a: {}
    });
    trigger(obj[0].a, 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('allows to attatch "*" events to Seemple.Object instance, go deeper (*.a)', () => {
    const obj = new SeempleObject();
    const handler = createSpy();

    delegateListener(obj, '*.a', 'someevent', handler);
    obj.setData('x', {
      a: {}
    });
    trigger(obj.x.a, 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('allows to attatch "*" events to Seemple.Array instance, go deeper (*.*)', () => {
    const obj = new SeempleArray();
    const handler = createSpy();

    delegateListener(obj, '*.*', 'someevent', handler);
    obj.push(new SeempleArray({}));
    trigger(obj[0][0], 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('allows to attatch "*" events to Seemple.Object instance, go deeper (*.*)', () => {
    const obj = new SeempleObject();
    const handler = createSpy();

    delegateListener(obj, '*.*', 'someevent', handler);
    obj.setData('x', new SeempleObject({
      a: {}
    }));
    trigger(obj.x.a, 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('allows to attatch "*" events to Seemple.Array instance, go deeper (*.*.a)', () => {
    const obj = new SeempleArray();
    const handler = createSpy();

    delegateListener(obj, '*.*.a', 'someevent', handler);
    obj.push(new SeempleArray({
      a: {}
    }));
    trigger(obj[0][0].a, 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('allows to attatch "*" events to Seemple.Object instance, go deeper (*.*.a)', () => {
    const obj = new SeempleObject();
    const handler = createSpy();

    delegateListener(obj, '*.*.a', 'someevent', handler);
    obj.setData('x', new SeempleObject({
      y: new SeempleObject({
        a: {}
      })
    }));
    trigger(obj.x.y.a, 'someevent');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
