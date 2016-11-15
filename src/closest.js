import checkObjectType from './_helpers/checkobjecttype';

// find closest parent with instance of instance throu #parent links
// if parent with this instance is absent return root parent with #parent
export default function closest(object, instance) {
    if (typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        instance = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'closest');
    }

    if (object.parent !== undefined) {
        if (object.parent instanceof instance) {
            return object.parent;
        } else {
            return object.findClosest.call(object.parent, instance);
        }
    } else {
        return this;
    }


}
