// returns a binder for select element
export default function select(multiple) {
    if (multiple) {
        return {
            on: 'change',
            getValue() {
                const { options } = this;
                const result = [];

                for (let i = 0; options.length > i; i++) {
                    if (options[i].selected) {
                        result.push(options[i].value);
                    }
                }

                return result;
            },
            setValue(givenValue) {
                const { options } = this;
                const value = typeof givenValue === 'string' ? [givenValue] : givenValue;
                for (let i = options.length - 1; i >= 0; i--) {
                    options[i].selected = ~value.indexOf(options[i].value);
                }
            }
        };
    }

    return {
        on: 'change',
        getValue() {
            return this.value;
        },
        setValue(value) {
            this.value = value;

            if (!value) {
                const { options } = this;
                for (let i = options.length - 1; i >= 0; i--) {
                    if (!options[i].value) {
                        options[i].selected = true;
                        break;
                    }
                }
            }
        }
    };
}
