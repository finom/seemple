import parserData from './_parserdata';
import defineHiddenContentProperty from './_definehiddencontentproperty';

// TODO: Add description and comments for getBindingKey
export default function getBindingKey({
    object,
    text
}) {
    const { strictBindingReg, bindingReg } = parserData;
    const keys = [];

    let execResult;
    let key;

    bindingReg.lastIndex = 0;

    while (execResult = bindingReg.exec(text)) {
        keys.push(execResult[1])
    }

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
