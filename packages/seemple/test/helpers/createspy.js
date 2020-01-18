export default function createSpy(spy = () => {}) {
  const spyName = 'function';
  const spyObj = {};
  spyObj[spyName] = spy;
  return spyOn(spyObj, spyName).and.callThrough();
}
