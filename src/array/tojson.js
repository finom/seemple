import initMK from '../_core/init';
import defs from '../_core/defs';

// converts Matreshka.Object instance to ordinary object
export default function toJSON(recursive=true) {
    const result = new Array(this.length);

    nofn.forEach(this, (item, index) => {
        // when recursive is true and when value has toJSON method then call it recusively
        if(recursive && item && typeof item.toJSON === 'function') {
            result[index] = item.toJSON(true);
        } else {
            result[index] = item;
        }
    });


	return result;
}
