define([
    'matreshka_dir/var/magic',
    'matreshka_dir/var/sym',
    'matreshka_dir/core/initmk'
], function(magic, sym, initMK) {
    var parseBindings = magic.parseBindings = function(object, nodes) {
        var $ = magic.$;

        if (!object || typeof object != 'object') return $();
        if(typeof nodes == 'string') {
            if(~nodes.indexOf('{{')) {
                nodes = $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
            } else {
                return $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
            }
        } else if(!nodes) {
            nodes = magic.boundAll(['sandbox']);
        } else {
            nodes = $(nodes);
        }


        initMK(object);

        var recursiveSpider = function(node) {
                var i, previous, textContent, childNode, body;
                if (node.tagName != 'TEXTAREA') {
                    for(i = 0; i < node.childNodes.length; i++) {
                        childNode = node.childNodes[i];
                        previous = childNode.previousSibling;

                        if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf('{{')) {
                            textContent = childNode.nodeValue.replace(/{{([^}]*)}}/g,
                                '<mk-bind mk-html="$1"></mk-bind>');

                            try {
                                if (previous) {
                                    previous.insertAdjacentHTML('afterend', textContent);
                                } else {
                                    node.insertAdjacentHTML('afterbegin', textContent);
                                }
                            } catch(e) {
                                // in case user uses very old webkit-based browser
                                body = document.body;
                                if (previous) {
                                    body.appendChild(previous);
                                    previous.insertAdjacentHTML('afterend', textContent);
                                    body.removeChild(previous);
                                } else {
                                    body.appendChild(node);
                                    node.insertAdjacentHTML('afterbegin', textContent);
                                    body.removeChild(node);
                                }
                            }

                            node.removeChild(childNode);
                        } else if (childNode.nodeType == 1) {
                            recursiveSpider(childNode);
                        }
                    }
                }
            },
            i,
            j,
            all,
            node,
            bindHTMLKey,
            attr,
            attrValue,
            attrName,
            keys,
            key,
            binder;

        for(i = 0; i < nodes.length; i++) {
            recursiveSpider(nodes[i]);
        }

        all = nodes.find('*').add(nodes);

        for(i = 0; i < all.length; i++) {
            node = all[i];

            bindHTMLKey = node.getAttribute('mk-html');

            if (bindHTMLKey) {
                magic.bindNode(object, bindHTMLKey, node, {
                    setValue: function(v) {
                        this.innerHTML = v;
                    }
                });
            }

            for(j = 0; j < node.attributes.length; j++) {
                attr = node.attributes[j];

                attrValue = attr.value;
                attrName = attr.name;

                if (~attrValue.indexOf('{{')) {
                    keys = attrValue.match(/{{[^}]*}}/g).map(function(key) {
                        return key.replace(/{{(.*)}}/, '$1');
                    });

                    if (keys.length == 1 && /^{{[^}]*}}$/g.test(attrValue)) {
                        key = keys[0];
                    } else {
                        key = magic.randomString();

                        magic.linkProps(object, key, keys, function() {
                            var v = attrValue;
                            keys.forEach(function(_key) {
                                v = v.replace(new RegExp('{{' + _key + '}}', 'g'), object[sym].special[_key].value);
                            });

                            return v;
                        }, true, { hideProperty: true });
                    }

                    if ((attrName == 'value' && node.type != 'checkbox' || attrName == 'checked'
                            && node.type == 'checkbox') && magic.lookForBinder(node)) {
                        magic.bindNode(object, key, node);
                    } else {
                        magic.bindNode(object, key, node, {
                            setValue: function(v) {
                                this.setAttribute(attrName, v);
                            }
                        });
                    }
                }
            }
        }


        return nodes;
    };
});
