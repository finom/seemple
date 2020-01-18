import set from '../set';
import deepFind from '../_helpers/deepfind';
import forEach from '../_helpers/foreach';
import apply from '../_helpers/apply';

// creates event handler for target object which will be fired when a source is changed
export default function createCalcHandler({
  object,
  eventOptions,
  allSources,
  target,
  def,
  handler
}) {
  return function calcHandler(changeEvent = {}) {
    const values = [];
    const { protector = {} } = changeEvent;
    const protectKey = target + def.id;
    const { promiseCalc } = eventOptions;
    const setEventOptions = {
      protector,
      ...eventOptions,
      ...changeEvent
    };

    if (protectKey in protector) {
      return;
    }

    protector[protectKey] = true;

    forEach(allSources, ({
      sourceObject,
      sourceKey,
      isDelegated
    }) => {
      const value = isDelegated ? deepFind(sourceObject, sourceKey) : sourceObject[sourceKey];
      values.push(value);
    });

    let targetValue = apply(handler, object, values);

    if (promiseCalc) {
      if (!(targetValue instanceof Promise)) {
        targetValue = Promise.resolve(targetValue);
      }

      targetValue
        .then((promiseResult) => set(object, target, promiseResult, setEventOptions))
        .catch((e) => {
          throw Error(e);
        });
    } else {
      set(object, target, targetValue, setEventOptions);
    }
  };
}
