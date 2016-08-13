export default function toArray(object, start) {
    var array = [],
        l = object.length,
        i;

    start = start || 0;

    for (i = start; i < l; i++) {
        array[i - start] = object[i];
    }

    return array;
}
