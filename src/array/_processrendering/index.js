import initMK from '../../_core/init';
import matreshkaError from '../../_helpers/matreshkaerror';
import defs from '../../_core/defs';
import triggerOne from '../../trigger/_triggerone';
import renderItemNode from './renderitemnode';
import processPush from './processpush';
import processRecreate from './processrecreate';

export default function processRendering({
    self,
    eventOptions
}) {
    const { method } = eventOptions;
    const container = self.nodes.container || self.nodes.sandbox;

    if(!container) {
        return;
    }

    switch(method) {
        case 'push':
            processPush({
                self,
                eventOptions,
                container
            });
            break;
        case 'unshift': throw '';
        case 'pull':
		case 'pop':
		case 'shift': throw '';
        case 'sort':
		case 'reverse': throw '';
        case 'rerender': throw '';
        case 'recreate':
            processRecreate({
                self,
                eventOptions,
                container
            });
            break;
        case 'splice': throw '';
    }
}
