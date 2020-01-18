import bindNode from './bindnode';
import unbindNode from './unbindnode';
import checkObjectType from './_helpers/checkobjecttype';

// binds or rebinds sandbox node
export default function bindSandbox(object, node, evt) {
  if (typeof this === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args
    /* eslint-disable no-param-reassign */
    evt = node;
    node = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    checkObjectType(object, 'bindSandbox');
  }

  unbindNode(object, 'sandbox', null, evt);
  return bindNode(object, 'sandbox', node, null, evt);
}
