// creates HTML element
// TODO get rid of it
export default function create(tagName, props) {
    if (typeof tagName === 'object') {
        props = tagName;
        tagName = props.tagName;
    }

    const el = document.createElement(tagName);

    if (props) {
        nofn.forOwn(props, (value, key) => {
            if (key === 'attributes' && typeof value === 'object') {
                nofn.forOwn(value, (attrValue, attrName) => {
                    el.setAttribute(attrName, attrValue);
                });
            } else if (key === 'children' && value) {
                nofn.forEach(value, (child) => {
                    el.appendChild(create(child));
                });
            } else if (el[key] && typeof el[key] === 'object' && typeof value === 'object') {
                nofn.assign(el[key], value);
            } else if (key !== 'tagName') {
                el[key] = value;
            }
        });
    }

    return el;
}
