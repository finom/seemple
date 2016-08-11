import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';
import matreshkaError from '../_helpers/matreshkaerror';

// TODO: Describe itemMediator
function itemMediator(item, index) {
    const { Model } = this;

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

    return new Model(itemData, this, index);
}

// TODO: Describe changeModel
function changeModel() {
    const { Model } = this;

    // if model has wrong type then throw an error
    if(typeof Model !== 'function') {
        throw matreshkaError('array:model_type', { Model });
    }

    // attatch item mediator
    this.mediateItem(itemMediator);
}

function changeItemRendererHandler(eventOptions={}) {
    const { forceRerender=true } = eventOptions;
    this.rerender({ forceRerender });
}

export default function afterMatreshkaArrayInit(def) {
    // we need to calculate hasModel before change:Model is added
    const hasModel = 'Model' in this;

    // call "afterinit" of Matreshka
    afterMatreshkaInit.call(this);

    // easy Matreshka.Object detection
    this.isMatreshkaArray = true;

    addListener(this, '_change:common:Model', changeModel);

    addListener(this, '_change:common:itemRenderer', changeItemRendererHandler)

    // call changeModel handler immediately if model is present
    // it will throw an error if Model is not a function
    if(hasModel) {
        changeModel.call(this);
    }
}
