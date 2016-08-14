import dom from './_dom';
import mq from './_dom/mq';

export default function useDOMLibrary(library) {
    if (typeof library === 'function') {
        dom.$ = library;
    } else {
        dom.$ = mq;
    }
}
