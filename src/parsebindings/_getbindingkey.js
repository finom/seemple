import parserData from './_parserdata';
import defineHiddenContentProperty from './_definehiddencontentproperty';

// analyzes string and returns only one key which will be actually bound to a node
export default function getBindingKey({
    object,
    text // 'Hello, {{x}}'
}) {
    const { strictBindingReg, bindingReg } = parserData;
    const keys = [];

    let execResult;
    let key;

    bindingReg.lastIndex = 0;

    // extract keys given in parser brackers
    // '{{x}} {{y}}' -> ['x', 'y']
    while (execResult = bindingReg.exec(text)) {
        keys.push(execResult[1])
    }

    // if there is only one key and if only 
    if (keys.length === 1 && strictBindingReg.test(text)) {
        key = keys[0];
    } else {
        key = defineHiddenContentProperty({
            object,
            keys,
            text
        });
    }

    return key;
}
