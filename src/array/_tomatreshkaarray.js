import MatreshkaArray from './';
export function toMatreshkaArray(arrayLike) {
    const result = new MatreshkaArray(arrayLike.length);
    nofn.forEach(arrayLike, (item, index) => {
        result[index] = item;
    });

    return result;
}
