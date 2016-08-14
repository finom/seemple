import cheapRecreate from './_cheaprecreate';

// creates a new Matreshka.Array instance with a variable number of arguments,
// regardless of number or type of the arguments
export default function of() {
    // allow to inherit this method by child classes
    // require('./') fixes circular ref issue
    const ParentClass = this || require('./');

    const result = new ParentClass();
    const newItems = Array(arguments.length);

    nofn.forEach(arguments, (item, index) => {
        newItems[index] = arguments[index];
    });

    return cheapRecreate(result, newItems);
}
