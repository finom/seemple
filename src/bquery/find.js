import Init from './_init';

export default function find(s) {
    var result = new Init();

    this.forEach(function(item) {
        result = result.add(item.querySelectorAll(s));
    });

    return result;
};
