import forOwn from '../../_helpers/forown';

// updates one single object by new data
// for Seemple.Array instance call recreate method
// for Seemple.Object instance call setData method
// for other objects just extend them by properties of data parameter
export default function updateObject(instance, data) {
  if (instance.isSeempleArray) {
    instance.recreate(data);
  } else if (instance.isSeempleObject) {
    // QUESTION: Is it OK to just extend but not replace instance data?
    instance.setData(data);
  } else {
    forOwn(data, (value, key) => {
      instance[key] = value;
    });
  }

  return instance;
}
