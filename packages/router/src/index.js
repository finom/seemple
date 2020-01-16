/* globals Seemple */

import Router from './router';

function initRouter(obj, route, type) {
    Router[type || 'hash'].subscribe(obj, route);
    return obj;
}

/* istanbul ignore if */
if (typeof Seemple === 'function') {
    Seemple.Router = Router;
    Seemple.initRouter = initRouter;
}

module.exports = initRouter;
