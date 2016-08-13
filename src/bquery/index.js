import Init from './_init';
import parseHTML from './parsehtml';
import on from './on';
import off from './off';
import add from './add';

// tiny jQuery replacement for Matreshka
// bQuery is rewritten version of balalaika.js
export default function bQuery(selector, context) {
    return new Init(selector, context);
}

nofn.assign(bQuery, {
    fn: Init.prototype,
    parseHTML
});

nofn.assign(bQuery.fn, {
    on,
    off,
    add
});
