// simulates click on a node
export default function simulateClick(node) {
    const evt = window.document.createEvent('MouseEvent');
    evt.initMouseEvent(
        'click', true, true, window, 0, 0, 0, 0, 0,
        false, false, false, false, 0, null
    );
    node.dispatchEvent(evt);
}
