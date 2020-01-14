import forEach from './_helpers/foreach';
import forOwn from './_helpers/forown';

// recursively converts objects and arrays to Seemple.Object and Seemple.Array instances
export default function toSeemple(data) {
    // fix circular ref issue
    const SeempleObject = require('./object').default;
    const SeempleArray = require('./array').default;

    // convert only objects
    if (data && typeof data === 'object') {
        if ('length' in data) {
            // if length is given convert it to Seemple.Array instance
            const arrayItems = Array(data.length);

            forEach(data, (item, index) => {
                arrayItems[index] = toSeemple(item);
            });

            return new SeempleArray().recreate(arrayItems);
        }

        // if length is not given convert it to Seemple.Object instance
        const object = {};

        forOwn(data, (value, key) => {
            object[key] = toSeemple(value);
        });

        return new SeempleObject(object);
    }

    // for all non-objects just return passed data
    return data;
}
