import afterMatreshkaInit from '../matreshka/_afterinit';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';

export default function afterMatreshkaArrayInit(def) {
    // call "afterinit" of Matreshka
    afterMatreshkaInit.call(this);

    // easy Matreshka.Object detection
    this.isMKArray = true;

}
