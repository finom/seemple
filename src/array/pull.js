import reportModified from './_reportmodified';
import seempleError from '../_helpers/seempleerror';

// removes array item by given index
function shift(arr, index) {
    for (let i = index; i < arr.length; i++) {
        arr[i] = arr[i + 1];
    }
    delete arr[arr.length - 1];
    arr.length -= 1;
}

// finds array item that equals to given value and removes it
// returns removed value
function pullByValue(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            shift(arr, i);
            return value;
        }
    }

    return undefined;
}

// removes array item by given index if the index is not over array length
// returns removed value
function pullByIndex(arr, index) {
    if (index < arr.length) {
        const value = arr[index];
        shift(arr, index);
        return value;
    }

    return undefined;
}

// removes an array item by index (if number is given) or by value (if object is given)
export default function pull(toRemove, eventOptions = {}) {
    const typeofToRemove = typeof toRemove;
    let removed;

    if (toRemove && typeofToRemove === 'object') {
        removed = pullByValue(this, toRemove);
    } else if (typeofToRemove === 'number') {
        removed = pullByIndex(this, toRemove);
    } else {
        throw seempleError('pull:to_remove_type', { toRemove });
    }

    if (typeof removed !== 'undefined') {
        reportModified(this, {
            method: 'pull',
            self: this,
            added: [],
            removed: [removed],
            ...eventOptions
        });
    }

    return removed;
}
