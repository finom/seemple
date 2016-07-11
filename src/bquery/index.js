import Init from './_init';
import extend from '../extend';
import parseHTML from './parsehtml';
import on from './on';


export default function bQuery(selector, context) {
	return new Init(selector, context);
}

nofn.assign(bQuery, {
	fn: Init.prototype,
	extend,
	parseHTML
});

nofn.assign(bQuery.fn, {
	on
});
