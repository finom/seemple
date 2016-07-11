import html2nodeList from './_html2nodelist';
import Init from './_init'

export default function parseHTML(html) {
    return new Init(html2nodeList(html));
};
