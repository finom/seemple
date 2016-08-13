import defaultBinders from '../defaultbinders';
import lookForBinder from '../lookforbinder';
import parserBrackers from '../parserbrackets';
import Class from '../class';
import toMatreshka from '../tomatreshka';
import * as binders from '../binders';
import * as universalMethods from './_universalmethods';
import assign from '../_helpers/assign';
import useDOMLibrary from '../usedomlibrary';

export default assign({
    Class,
    defaultBinders,
    lookForBinder,
    binders,
    parserBrackers,
    toMatreshka,
    useDOMLibrary
}, universalMethods);
