import Init from './_init';

// excludes elements from current set by given selector
export default function not(selector) {
    const result = new Init();

    for (let i = 0; i < this.length; i++) {
        if (!new Init(this[i]).is(selector)) {
            result.push(this[i]);
        }
    }

    return result;
}
