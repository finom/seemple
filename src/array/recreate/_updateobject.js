// updates one single object by new data
// for Matreshka.Array instance call recreate method
// for Matreshka.Object instance call jset method
// for other objects just extend them by properties of data parameter
export default function updateObject(instance, data) {
    if (instance.isMatreshkaArray) {
        instance.recreate(data);
    } else if (instance.isMatreshkaObject) {
        instance.jset(data);
    } else {
        nofn.forOwn(data, (value, key) => {
            instance[key] = value;
        });
    }

    return instance;
}
