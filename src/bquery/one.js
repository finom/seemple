import Init from './_init';

// returns the first element of matched set
export default function one(s, context) {
	return new Init(s, context)[0];
}
