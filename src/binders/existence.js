export default function existence(switcher = true) {
    let comment;

    return {
        setValue(value) {
            const node = this;
            const {
                tagName, id, classList, className
            } = node;

            if (!comment) {
                let commentText = tagName;


                if (id) {
                    commentText += `#${id}`;
                }

                if (className) {
                    commentText += `.${[].slice.apply(classList).join('.')}`;
                }

                comment = window.document.createComment(commentText);
            }

            value = !switcher ? !value : value; // eslint-disable-line no-param-reassign

            if (value) {
                delete node.__matreshkaReplacedByNode;
                if (comment.parentNode) {
                    comment.parentNode.insertBefore(node, comment);
                    comment.parentNode.removeChild(comment);
                }
            }

            if (!value) {
                node.__matreshkaReplacedByNode = comment;
                if (node.parentNode) {
                    node.parentNode.insertBefore(comment, node);
                    node.parentNode.removeChild(node);
                }
            }
        }
    };
}
