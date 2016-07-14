import defaultDollar from './default-dollar';

const dom = {
	$: defaultDollar,
	useAs$($) {
		dom.$ = $;
	}
};

export default dom;
