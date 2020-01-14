// Symbol.iterator of Seemple.Array instances
export default function seempleArrayIterator() {
    let i = 0;

    return {
        next: () => {
            if (i > this.length - 1) {
                return {
                    done: true
                };
            }

            return {
                done: false,
                value: this[i++] // eslint-disable-line no-plusplus
            };
        }
    };
}
