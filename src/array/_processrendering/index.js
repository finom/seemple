import initMK from '../../_core/init';
import matreshkaError from '../../_helpers/matreshkaerror';
import defs from '../../_core/defs';
import triggerOne from '../../trigger/_triggerone';
import renderItemNode from './renderitemnode';
import processPush from './processpush';
import processUnshift from './processunshift';
import processRecreate from './processrecreate';
import processSort from './processsort';
import processRemove from './processremove';
import processRerender from './processrerender';
import processSpliceAdd from './processspliceadd';


export default function processRendering({
    self,
    eventOptions
}) {
    const { method, added, removed } = eventOptions;
    const container = self.nodes.container || self.nodes.sandbox;
    const selfDef = defs.get(self);

    if(!container) {
        return;
    }

    switch(method) {
        case 'push':
            processPush({
                self,
                selfDef,
                eventOptions,
                container
            });
            break;
        case 'unshift':
            processUnshift({
                self,
                selfDef,
                eventOptions,
                container
            });
            break;
        case 'pull':
		case 'pop':
		case 'shift':
            processRemove({
                self,
                selfDef,
                eventOptions,
                container
            });
            break;
        case 'sort':
		case 'reverse':
            processSort({
                self,
                selfDef,
                eventOptions,
                container
            });
            break;
        case 'rerender':
            processRerender({
                self,
                selfDef,
                eventOptions,
                container
            });
            break;
        case 'recreate':
            processRecreate({
                self,
                selfDef,
                eventOptions,
                container
            });
            break;
        case 'splice':
            if(added.length) {
                processSpliceAdd({
                    self,
                    selfDef,
                    eventOptions,
                    container
                });
            }

            if(removed.length) {
                processRemove({
                    self,
                    selfDef,
                    eventOptions,
                    container
                });
            }

            break;
    }
}
