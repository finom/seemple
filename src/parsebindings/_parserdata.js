import calc from '../calc';
import parserBrackets from '../parserbrackets';

const parserData = {};
// TODO: Add description and comments for parserData
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
}]);

export default parserData;
