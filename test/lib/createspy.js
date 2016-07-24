export default function createSpy() {
	const spyName = `randomName${Math.random()}${new Date().getTime()}`;
	const spy = () => {};
	const spyObj = {};
	spyObj[spyName] = spy;
	return spyOn(spyObj, spyName);;
}
