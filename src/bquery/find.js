import Init from './_init';

// get the descendants of each element in the current set of matched elements,
// filtered by a selector
export default function find(selector) {
    let result = new Init();

    nofn.forEach(this, el => {
        result = result.add(el.querySelectorAll(selector));
    });

    return result;
}
