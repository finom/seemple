import forEach from './_helpers/foreach';
import forOwn from './_helpers/forown';

// recursively converts objects and arrays to Matreshka.Object and Matreshka.Array instances
export default function toMatreshka(data) {
    // fix circular ref issue
    const MatreshkaObject = require('./object').default;
    const MatreshkaArray = require('./array').default;

    // convert only objects
    if (data && typeof data === 'object') {
        if ('length' in data) {
            // if length is given convert it to Matreshka.Array instance
            const arrayItems = Array(data.length);

            forEach(data, (item, index) => {
                arrayItems[index] = toMatreshka(item);
            });

            return new MatreshkaArray().recreate(arrayItems);
        }

        // if length is not given convert it to Matreshka.Object instance
        const object = {};

        forOwn(data, (value, key) => {
            object[key] = toMatreshka(value);
        });

        return new MatreshkaObject(object);
    }

    // for all non-objects just return passed data
    return data;
}
