import assign from '../_helpers/assign';
import _afterInit from './_afterinit';
import mediateItem from './mediateitem';
import orderBy from './orderby';
import pull from './pull';
import recreate from './recreate';
import rerender from './rerender';
import restore from './restore';
import toJSON from './tojson';
import trackBy from './trackby';
import pseudoNativeMethods from './_pseudonativemethods';

export default assign({
    _afterInit,
    mediateItem,
    orderBy,
    pull,
    recreate,
    rerender,
    restore,
    toJSON,
    trackBy,
    length: 0
}, pseudoNativeMethods);
