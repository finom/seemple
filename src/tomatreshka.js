// recursively converts objects and arrays to Matreshka.Object and Matreshka.Array instances
export default function toMatreshka(data) {
    // fix circular ref issue
    const MatreshkaObject = require('./object');
    const MatreshkaArray = require('./array');

    // convert only objects
    if (data && typeof data === 'object') {
        if ('length' in data) {
            // if length is given convert it to Matreshka.Array instance
            const arrayItems = Array(data.length);

            nofn.forEach(data, (item, index) => {
                arrayItems[index] = toMatreshka(item);
            });

            return new MatreshkaArray().recreate(arrayItems);
        }

        // if length is not given convert it to Matreshka.Object instance
        const object = {};

        nofn.forOwn(data, (value, key) => {
            object[key] = toMatreshka(value);
        });

        return new MatreshkaObject(object);
    }

    // for all non-objects just return passed data
    return data;
}
