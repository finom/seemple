import Init from './_init';

export default function not(s) {
    var result = new Init(),
        index,
        i;

    for (i = 0; i < this.length; i++) {
        if(!new Init(this[i]).is(s)) {
            result.push(this[i])
        }

    }

    return result;
};
