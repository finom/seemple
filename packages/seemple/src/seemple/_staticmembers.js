import defaultBinders from '../defaultbinders';
import lookForBinder from '../lookforbinder';
import parserBrackers from '../parserbrackets';
import Class from '../class';
import toSeemple from '../toseemple';
import * as binders from '../binders';
import * as universalMethods from './_universalmethods';
import assign from '../_helpers/assign';
import useDOMLibrary from '../usedomlibrary';
import chain from '../chain';

export default assign({
  Class,
  defaultBinders,
  lookForBinder,
  binders,
  parserBrackers,
  toSeemple,
  useDOMLibrary,
  chain
}, universalMethods);
