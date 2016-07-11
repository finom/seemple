import Init from './_init';
import extend from '../extend';
import parseHTML from './parsehtml';
import on from './on';
import off from './off';
import is from './is';


export default function bQuery(selector, context) {
	return new Init(selector, context);
}

nofn.assign(bQuery, {
	fn: Init.prototype,
	extend,
	parseHTML
});

nofn.assign(bQuery.fn, {
	on,
	off,
	is
});
