export default [node => {
    const tagName = node.tagName;
	const binders = undefined; // TODO
    let b;

    // TODO Switch/case
    if (tagName === 'INPUT') {
        b = binders.input(node.type);
    } else if (tagName === 'TEXTAREA') {
        b = binders.textarea();
    } else if (tagName === 'SELECT') {
        b = binders.select(node.multiple);
    } else if (tagName === 'PROGRESS') {
        b = binders.progress();
    } else if (tagName === 'OUTPUT') {
        b = binders.output();
    }

    return b;
}];
