import bindNode from './bindnode';
import apply from './_helpers/apply';

// TODO description
export default function bindOptionalNode() {
    // this hack allows to keep bindOptionalNode as compact as possible
    // and doesn't require to flip args and suppoer all bindNode variations
    bindNode.temporaryOptionalFlag = true;
    return apply(bindNode, this, arguments);
}
