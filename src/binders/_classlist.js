// @IE9

let add;
let remove;
let contains; // eslint-disable-line import/no-mutable-exports

/* istanbul ignore else */
if (window.document.createElement('div').classList) {
    add = (node, name) => node.classList.add(name);
    remove = (node, name) => node.classList.remove(name);
    contains = (node, name) => node.classList.contains(name);
} else {
    add = (node, name) => {
        const re = new RegExp(`(^|\\s)${name}(\\s|$)`, 'g');
        if (!re.test(node.className)) {
            node.className = `${node.className} ${name}`
                .replace(/\s+/g, ' ')
                .replace(/(^ | $)/g, '');
        }
    };

    remove = (node, name) => {
        const re = new RegExp(`(^|\\s)${name}(\\s|$)`, 'g');
        node.className = node.className
            .replace(re, '$1')
            .replace(/\s+/g, ' ')
            .replace(/(^ | $)/g, '');
    };

    contains = (node, name) => new RegExp(`(\\s|^)${name}(\\s|$)`).test(node.className);
}

const toggle = (node, name, switcher) => {
    if (switcher) {
        add(node, name);
    } else {
        remove(node, name);
    }
};

export {
    toggle,
    contains
};
