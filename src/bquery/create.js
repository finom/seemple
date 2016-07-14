export default function create(tagName, props) {
    var el, i, j, prop;

    if (typeof tagName == 'object') {
        props = tagName;
        tagName = props.tagName;
    }

    el = document.createElement(tagName);

    if (props)
        for (i in props) {
            prop = props[i];
            if (i == 'attributes' && typeof prop == 'object') {
                for (j in prop)
                    if (prop.hasOwnProperty(j)) {
                        el.setAttribute(j, prop[j]);
                    }
            } else if (i == 'tagName') {
                continue;
            } else if (i == 'children' && prop) {
                for (j = 0; j < prop.length; j++) {
                    el.appendChild(create(prop[j]));
                }
            } else if (typeof el[i] == 'object' && el[i] !== null && typeof props == 'object') {
                for (j in prop)
                    if (prop.hasOwnProperty(j)) {
                        el[i][j] = prop[j];
                    }
            } else {
                el[i] = prop;
            }
        }
    return el;
};
