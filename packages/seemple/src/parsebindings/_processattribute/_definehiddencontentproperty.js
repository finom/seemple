import calc from '../../calc';
import parserData from '../_parserdata';

const hiddenPropertyPrefix = `${Math.random()}`.replace('0.', 'hidden');
let hiddenPropertyIndex = 0;

// defines hiden (without accessors) computed property
// that dependent on given properties ('keys') as text template describes
// for example if text='{{x}} blah {{y}}', x='foo', y='bar'
// then the new property should have value 'foo blah bar'
export default function defineHiddenContentProperty({
  object,
  keys,
  text
}) {
  const key = `${hiddenPropertyPrefix}${hiddenPropertyIndex}`;
  const regs = {};
  const { escLeftBracket, escRightBracket } = parserData;

  hiddenPropertyIndex += 1;

  // create and cache regular expressions which will help us to
  // change target property value quickly when sources are changed
  // TODO: We need better parser!
  for (let i = 0; i < keys.length; i++) {
    regs[keys[i]] = new RegExp(`${escLeftBracket}\\s*${keys[i]}\\s*${escRightBracket}`, 'g');
  }

  calc(object, key, keys, function calcHandler() {
    let value = text;

    // replace things like {{x}} by actual values
    for (let i = 0; i < keys.length; i++) {
      value = value.replace(regs[keys[i]], arguments[i]);
    }

    return value;
  }, {
    isTargetPropertyHidden: true,
    debounceCalc: false
  });

  return key;
}
