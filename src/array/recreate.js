import initMK from '../_core/init';
import reportModified from './_reportmodified';

function updateObject(instance, data) {
    if (instance.isMKArray) {
        instance.recreate(data);
    } else if (instance.isMKObject) {
        instance.jset(data);
    } else {
        nofn.forOwn(data, (value, key) => {
            instance[key] = value;
        });
    }

    return instance;
}

function updateNewItems({
    givenNewItems,
    arr,
    trackBy
}) {
    const newLength = givenNewItems.length;
    const oldLength = arr.length;
    const newItems = Array(newLength);

    if(trackBy === '$index') {
        for(let i = 0; i < newLength; i++) {
            const item = arr[i];

            if(item && typeof item === 'object') {
                newItems[i] = updateObject(item, givenNewItems[i])
            } else {
                newItems[i] = givenNewItems[i];
            }
        }
    } else {
        const trackMap = {};

        for(let i = 0; i < oldLength; i++) {
            const item = arr[i];

            if(item && typeof item === 'object') {
                if(trackBy in item) {
                    trackMap[item[trackBy]] = item;
                }

            }
        }

        for(let i = 0; i < newLength; i++) {
            const newItem = givenNewItems[i];

            if(newItem && typeof newItem === 'object') {
                const item = arr[i];

                if(item && typeof item === 'object' && newItem[trackBy] in trackMap) {
                    newItems[i] = updateObject(trackMap[newItem[trackBy]], newItem);
                } else {
                    newItems[i] = newItem;
                }
            } else {
                newItems[i] = newItem;
            }
        }
    }

    return newItems;
}

export default function recreate(givenNewItems=[], eventOptions={}) {
    const def = initMK(this);
    const { itemMediator } = def;
    const newLength = givenNewItems.length;
    const oldLength = this.length;
    const lengthDiff = oldLength - newLength;
    const was = this.toJSON(false);
    const { trackBy } = this;
    const { skipItemMediator, silent, dontRender } = eventOptions;
    let added;
    let removed;

    let newItems;

    if(trackBy) {
        newItems = updateNewItems({
            arr: this,
            givenNewItems,
            trackBy
        });
    } else {
        newItems = givenNewItems;
    }

    if (itemMediator && !skipItemMediator) {
        for (let i = 0; i < newLength; i++) {
            newItems[i] = itemMediator(newItems[i], i);
        }
    }

    for (let i = 0; i < newLength; i++) {
        this[i] = newItems[i];
    }

    for (let i = 0; i < lengthDiff; i++) {
        delete def.props[i];
        delete this[i + newLength];
    }

    this.length = newLength;

    if (silent && dontRender) {
        return this;
    }


    if (newLength) {
        if(oldLength) {
            removed = [];
            for (let i = 0; i < oldLength; i++) {
                if (!~newItems.indexOf(was[i])) {
                    removed.push(was[i]);
                }
            }
        } else {
            removed = [];
        }
    } else {
        removed = was;
    }

    if (oldLength) {
        if(newLength) {
            added = [];
            for (let i = 0; i < newLength; i++) {
                if (!~was.indexOf(newItems[i])) {
                    added.push(newItems[i]);
                }
            }
        } else {
            added = [];
        }
    } else {
        added = newItems;
    }

    reportModified(this, {
        added,
        removed,
        method: 'recreate',
        self: this,
        ...eventOptions
    }, 'recreate');

    return this;
}
