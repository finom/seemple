import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';
import matreshkaError from '../_helpers/matreshkaerror';

// returns item mediator function which converts a property to Model instance
function createItemMediator({
    arr,
    Model
}) {
    return function itemMediator(item, index) {
        // if an item is already instance of Model
        if(item instanceof Model) {
            return item;
        }

        let itemData;

        if(item && typeof item.toJSON === 'function') {
            // if item is not falsy and if it has toJSON method
            // then retrieve instance data by this method
            itemData = item.toJSON(false);
        } else {
            // if not then use an item as its data
            itemData = item;
        }

        return new Model(itemData, index);
    }
}

// returns change:Model handler which adds needed mediator
function createChangeModelHandler({ arr }) {
    return function changeModel() {
        const { Model } = arr;

        // if model has wrong type then throw an error
        if(typeof Model !== 'function') {
            throw matreshkaError('array:model_type', { Model });
        }

        // attatch item mediator
        arr.mediateItem(createItemMediator({
            arr,
            Model
        }));
    }
}

export default function afterMatreshkaArrayInit(def) {
    // we need to calculate hasModel before change:Model is added
    const hasModel = 'Model' in this;

    // call "afterinit" of Matreshka
    afterMatreshkaInit.call(this);

    // easy Matreshka.Object detection
    this.isMKArray = true;

    const changeModel = createChangeModelHandler({
        arr: this
    });

    addListener(this, 'change:Model', changeModel);

    // call changeModel handler immediately if model is present
    // it will throw an error if Model is not a function
    if(hasModel) {
        changeModel();
    }
}
