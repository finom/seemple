export default function simulateClick(node) {
    const evt = document.createEvent("MouseEvent");
    evt.initMouseEvent('click');
    node.dispatchEvent(evt);
};
