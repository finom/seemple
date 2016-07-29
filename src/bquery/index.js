import Init from './_init';
import parseHTML from './parsehtml';
import one from './one';
import create from './create';
import on from './on';
import off from './off';
import is from './is';
import add from './add';
import not from './not';
import find from './find';

// tiny jQuery replacement for Matreshka
// bQuery is rewritten version of balalaika.js
export default function bQuery(selector, context) {
    return new Init(selector, context);
}

nofn.assign(bQuery, {
    fn: Init.prototype,
    parseHTML,
    one,
    create
});

nofn.assign(bQuery.fn, {
    on,
    off,
    is,
    add,
    not,
    find
});
