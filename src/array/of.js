import cheapRecreate from './_cheaprecreate';
import forEach from '../_helpers/foreach';

// creates a new Seemple.Array instance with a variable number of arguments,
// regardless of number or type of the arguments
export default function of() {
    // allow to inherit this method by child classes
    // require('./') fixes circular ref issue
    const ParentClass = typeof this === 'function' ? this : require('./').default;

    const result = new ParentClass();
    const newItems = Array(arguments.length);

    forEach(arguments, (item, index) => {
        newItems[index] = arguments[index];
    });

    return cheapRecreate(result, newItems);
}
