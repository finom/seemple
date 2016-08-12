import dom from './_dom';
export default function useDOMLibrary(library) {
    if(typeof library === 'function') {
        dom.$ = library;
    } else {
        dom.$ = dom.mq;
    }
}
