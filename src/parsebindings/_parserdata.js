import calc from '../calc';
import parserBrackets from '../parserbrackets';

const parserData = {};

// since Matreshka allows to change parser brackets via parserBrackets objects
// the parser needs to generate required regular expressions and escaped brackets every time
// when parseBindings is called
// to optimize this behavior parserData object is created
// it calculates needed data every time when parserBrackets are changed
// and when parseBindings function is called it uses previously generated regeps
// from parserData object
calc(parserData, [{
    target: 'leftBracket',
    source: {
        object: parserBrackets,
        key: 'left'
    }
}, {
    target: 'rightBracket',
    source: {
        object: parserBrackets,
        key: 'right'
    }
}, {
    target: 'escLeftBracket',
    source: 'leftBracket',
    handler: left => left.replace(/(\[|\(|\?)/g, '\\$1')
}, {
    target: 'escRightBracket',
    source: 'rightBracket',
    handler: right => right.replace(/(\]|\)|\?)/g, '\\$1')
}, {
    target: 'bindingReg',
    source: ['escLeftBracket', 'escRightBracket'],
    handler: (left, right) => new RegExp(`${left}(.+?)${right}`, 'g')
}, {
    target: 'strictBindingReg',
    source: ['escLeftBracket', 'escRightBracket'],
    handler: (left, right) => new RegExp(`^${left}(.+?)${right}$`, 'g')
}], {
    debounceCalc: false // we need to get new regexps immediately when brackets are changed
});

export default parserData;
