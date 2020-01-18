/*
Copyright (c) 2008-2015 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
jasmineRequire.html = function (j$) {
    j$.ResultsNode = jasmineRequire.ResultsNode();
    j$.HtmlReporter = jasmineRequire.HtmlReporter(j$);
    j$.QueryString = jasmineRequire.QueryString();
    j$.HtmlSpecFilter = jasmineRequire.HtmlSpecFilter();
};

jasmineRequire.HtmlReporter = function (j$) {
    const noopTimer = {
        start() {},
        elapsed() { return 0; }
    };

    function HtmlReporter(options) {
        const env = options.env || {};
        const getContainer = options.getContainer;
        const createElement = options.createElement;
        const createTextNode = options.createTextNode;
        const onRaiseExceptionsClick = options.onRaiseExceptionsClick || function () {};
        const onThrowExpectationsClick = options.onThrowExpectationsClick || function () {};
        const onRandomClick = options.onRandomClick || function () {};
        const addToExistingQueryString = options.addToExistingQueryString || defaultQueryString;
        const timer = options.timer || noopTimer;
        const results = [];
        let specsExecuted = 0;
        let failureCount = 0;
        let pendingSpecCount = 0;
        let htmlReporterMain;
        let symbols;
        const failedSuites = [];

        this.initialize = function () {
            clearPrior();
            htmlReporterMain = createDom('div', { className: 'jasmine_html-reporter' },
                createDom('div', { className: 'jasmine-banner' },
                    createDom('a', { className: 'jasmine-title', href: 'http://jasmine.github.io/', target: '_blank' }),
                    createDom('span', { className: 'jasmine-version' }, j$.version)),
                createDom('ul', { className: 'jasmine-symbol-summary' }),
                createDom('div', { className: 'jasmine-alert' }),
                createDom('div', { className: 'jasmine-results' },
                    createDom('div', { className: 'jasmine-failures' })));
            getContainer().appendChild(htmlReporterMain);
        };

        let totalSpecsDefined;
        this.jasmineStarted = function (options) {
            totalSpecsDefined = options.totalSpecsDefined || 0;
            timer.start();
        };

        const summary = createDom('div', { className: 'jasmine-summary' });

        const topResults = new j$.ResultsNode({}, '', null);
        let currentParent = topResults;

        this.suiteStarted = function (result) {
            currentParent.addChild(result, 'suite');
            currentParent = currentParent.last();
        };

        this.suiteDone = function (result) {
            if (result.status == 'failed') {
                failedSuites.push(result);
            }

            if (currentParent == topResults) {
                return;
            }

            currentParent = currentParent.parent;
        };

        this.specStarted = function (result) {
            currentParent.addChild(result, 'spec');
        };

        const failures = [];
        this.specDone = function (result) {
            if (noExpectations(result) && typeof console !== 'undefined' && typeof console.error !== 'undefined') {
                console.error(`Spec '${result.fullName}' has no expectations.`);
            }

            if (result.status != 'disabled') {
                specsExecuted++;
            }

            if (!symbols) {
                symbols = find('.jasmine-symbol-summary');
            }

            symbols.appendChild(createDom('li', {
                className: noExpectations(result) ? 'jasmine-empty' : `jasmine-${result.status}`,
                id: `spec_${result.id}`,
                title: result.fullName
            }));

            if (result.status == 'failed') {
                failureCount++;

                const failure = createDom('div', { className: 'jasmine-spec-detail jasmine-failed' },
                    createDom('div', { className: 'jasmine-description' },
                        createDom('a', { title: result.fullName, href: specHref(result) }, result.fullName)),
                    createDom('div', { className: 'jasmine-messages' }));
                const messages = failure.childNodes[1];

                for (let i = 0; i < result.failedExpectations.length; i++) {
                    const expectation = result.failedExpectations[i];
                    messages.appendChild(createDom('div', { className: 'jasmine-result-message' }, expectation.message));
                    messages.appendChild(createDom('div', { className: 'jasmine-stack-trace' }, expectation.stack));
                }

                failures.push(failure);
            }

            if (result.status == 'pending') {
                pendingSpecCount++;
            }
        };

        this.jasmineDone = function (doneResult) {
            const banner = find('.jasmine-banner');
            const alert = find('.jasmine-alert');
            const order = doneResult && doneResult.order;
            alert.appendChild(createDom('span', { className: 'jasmine-duration' }, `finished in ${timer.elapsed() / 1000}s`));

            banner.appendChild(
                createDom('div', { className: 'jasmine-run-options' },
                    createDom('span', { className: 'jasmine-trigger' }, 'Options'),
                    createDom('div', { className: 'jasmine-payload' },
                        createDom('div', { className: 'jasmine-exceptions' },
                            createDom('input', {
                                className: 'jasmine-raise',
                                id: 'jasmine-raise-exceptions',
                                type: 'checkbox'
                            }),
                            createDom('label', { className: 'jasmine-label', for: 'jasmine-raise-exceptions' }, 'raise exceptions')),
                        createDom('div', { className: 'jasmine-throw-failures' },
                            createDom('input', {
                                className: 'jasmine-throw',
                                id: 'jasmine-throw-failures',
                                type: 'checkbox'
                            }),
                            createDom('label', { className: 'jasmine-label', for: 'jasmine-throw-failures' }, 'stop spec on expectation failure')),
                        createDom('div', { className: 'jasmine-random-order' },
                            createDom('input', {
                                className: 'jasmine-random',
                                id: 'jasmine-random-order',
                                type: 'checkbox'
                            }),
                            createDom('label', { className: 'jasmine-label', for: 'jasmine-random-order' }, 'run tests in random order'))))
            );

            const raiseCheckbox = find('#jasmine-raise-exceptions');

            raiseCheckbox.checked = !env.catchingExceptions();
            raiseCheckbox.onclick = onRaiseExceptionsClick;

            const throwCheckbox = find('#jasmine-throw-failures');
            throwCheckbox.checked = env.throwingExpectationFailures();
            throwCheckbox.onclick = onThrowExpectationsClick;

            const randomCheckbox = find('#jasmine-random-order');
            randomCheckbox.checked = env.randomTests();
            randomCheckbox.onclick = onRandomClick;

            const optionsMenu = find('.jasmine-run-options');
            const optionsTrigger = optionsMenu.querySelector('.jasmine-trigger');
            const optionsPayload = optionsMenu.querySelector('.jasmine-payload');
            const isOpen = /\bjasmine-open\b/;

            optionsTrigger.onclick = function () {
                if (isOpen.test(optionsPayload.className)) {
                    optionsPayload.className = optionsPayload.className.replace(isOpen, '');
                } else {
                    optionsPayload.className += ' jasmine-open';
                }
            };

            if (specsExecuted < totalSpecsDefined) {
                const skippedMessage = `Ran ${specsExecuted} of ${totalSpecsDefined} specs - run all`;
                alert.appendChild(
                    createDom('span', { className: 'jasmine-bar jasmine-skipped' },
                        createDom('a', { href: '?', title: 'Run all specs' }, skippedMessage))
                );
            }
            let statusBarMessage = '';
            let statusBarClassName = 'jasmine-bar ';

            if (totalSpecsDefined > 0) {
                statusBarMessage += `${pluralize('spec', specsExecuted)}, ${pluralize('failure', failureCount)}`;
                if (pendingSpecCount) { statusBarMessage += `, ${pluralize('pending spec', pendingSpecCount)}`; }
                statusBarClassName += (failureCount > 0) ? 'jasmine-failed' : 'jasmine-passed';
            } else {
                statusBarClassName += 'jasmine-skipped';
                statusBarMessage += 'No specs found';
            }

            let seedBar;
            if (order && order.random) {
                seedBar = createDom('span', { className: 'jasmine-seed-bar' },
                    ', randomized with seed ',
                    createDom('a', { title: `randomized with seed ${order.seed}`, href: seedHref(order.seed) }, order.seed));
            }

            alert.appendChild(createDom('span', { className: statusBarClassName }, statusBarMessage, seedBar));

            for (i = 0; i < failedSuites.length; i++) {
                const failedSuite = failedSuites[i];
                for (let j = 0; j < failedSuite.failedExpectations.length; j++) {
                    const errorBarMessage = `AfterAll ${failedSuite.failedExpectations[j].message}`;
                    const errorBarClassName = 'jasmine-bar jasmine-errored';
                    alert.appendChild(createDom('span', { className: errorBarClassName }, errorBarMessage));
                }
            }

            const results = find('.jasmine-results');
            results.appendChild(summary);

            summaryList(topResults, summary);

            function summaryList(resultsTree, domParent) {
                let specListNode;
                for (let i = 0; i < resultsTree.children.length; i++) {
                    const resultNode = resultsTree.children[i];
                    if (resultNode.type == 'suite') {
                        const suiteListNode = createDom('ul', { className: 'jasmine-suite', id: `suite-${resultNode.result.id}` },
                            createDom('li', { className: 'jasmine-suite-detail' },
                                createDom('a', { href: specHref(resultNode.result) }, resultNode.result.description)));

                        summaryList(resultNode, suiteListNode);
                        domParent.appendChild(suiteListNode);
                    }
                    if (resultNode.type == 'spec') {
                        if (domParent.getAttribute('class') != 'jasmine-specs') {
                            specListNode = createDom('ul', { className: 'jasmine-specs' });
                            domParent.appendChild(specListNode);
                        }
                        let specDescription = resultNode.result.description;
                        if (noExpectations(resultNode.result)) {
                            specDescription = `SPEC HAS NO EXPECTATIONS ${specDescription}`;
                        }
                        if (resultNode.result.status === 'pending' && resultNode.result.pendingReason !== '') {
                            specDescription = `${specDescription} PENDING WITH MESSAGE: ${resultNode.result.pendingReason}`;
                        }
                        specListNode.appendChild(
                            createDom('li', {
                                className: `jasmine-${resultNode.result.status}`,
                                id: `spec-${resultNode.result.id}`
                            },
                            createDom('a', { href: specHref(resultNode.result) }, specDescription))
                        );
                    }
                }
            }

            if (failures.length) {
                alert.appendChild(
                    createDom('span', { className: 'jasmine-menu jasmine-bar jasmine-spec-list' },
                        createDom('span', {}, 'Spec List | '),
                        createDom('a', { className: 'jasmine-failures-menu', href: '#' }, 'Failures'))
                );
                alert.appendChild(
                    createDom('span', { className: 'jasmine-menu jasmine-bar jasmine-failure-list' },
                        createDom('a', { className: 'jasmine-spec-list-menu', href: '#' }, 'Spec List'),
                        createDom('span', {}, ' | Failures '))
                );

                find('.jasmine-failures-menu').onclick = function () {
                    setMenuModeTo('jasmine-failure-list');
                };
                find('.jasmine-spec-list-menu').onclick = function () {
                    setMenuModeTo('jasmine-spec-list');
                };

                setMenuModeTo('jasmine-failure-list');

                const failureNode = find('.jasmine-failures');
                for (var i = 0; i < failures.length; i++) {
                    failureNode.appendChild(failures[i]);
                }
            }
        };

        return this;

        function find(selector) {
            return getContainer().querySelector(`.jasmine_html-reporter ${selector}`);
        }

        function clearPrior() {
            // return the reporter
            const oldReporter = find('');

            if (oldReporter) {
                getContainer().removeChild(oldReporter);
            }
        }

        function createDom(type, attrs, childrenVarArgs) {
            const el = createElement(type);

            for (let i = 2; i < arguments.length; i++) {
                const child = arguments[i];

                if (typeof child === 'string') {
                    el.appendChild(createTextNode(child));
                } else if (child) {
                    el.appendChild(child);
                }
            }

            for (const attr in attrs) {
                if (attr == 'className') {
                    el[attr] = attrs[attr];
                } else {
                    el.setAttribute(attr, attrs[attr]);
                }
            }

            return el;
        }

        function pluralize(singular, count) {
            const word = (count == 1 ? singular : `${singular}s`);

            return `${count} ${word}`;
        }

        function specHref(result) {
            return addToExistingQueryString('spec', result.fullName);
        }

        function seedHref(seed) {
            return addToExistingQueryString('seed', seed);
        }

        function defaultQueryString(key, value) {
            return `?${key}=${value}`;
        }

        function setMenuModeTo(mode) {
            htmlReporterMain.setAttribute('class', `jasmine_html-reporter ${mode}`);
        }

        function noExpectations(result) {
            return (result.failedExpectations.length + result.passedExpectations.length) === 0
        && result.status === 'passed';
        }
    }

    return HtmlReporter;
};

jasmineRequire.HtmlSpecFilter = function () {
    function HtmlSpecFilter(options) {
        const filterString = options && options.filterString() && options.filterString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const filterPattern = new RegExp(filterString);

        this.matches = function (specName) {
            return filterPattern.test(specName);
        };
    }

    return HtmlSpecFilter;
};

jasmineRequire.ResultsNode = function () {
    function ResultsNode(result, type, parent) {
        this.result = result;
        this.type = type;
        this.parent = parent;

        this.children = [];

        this.addChild = function (result, type) {
            this.children.push(new ResultsNode(result, type, this));
        };

        this.last = function () {
            return this.children[this.children.length - 1];
        };
    }

    return ResultsNode;
};

jasmineRequire.QueryString = function () {
    function QueryString(options) {
        this.navigateWithNewParam = function (key, value) {
            options.getWindowLocation().search = this.fullStringWithNewParam(key, value);
        };

        this.fullStringWithNewParam = function (key, value) {
            const paramMap = queryStringToParamMap();
            paramMap[key] = value;
            return toQueryString(paramMap);
        };

        this.getParam = function (key) {
            return queryStringToParamMap()[key];
        };

        return this;

        function toQueryString(paramMap) {
            const qStrPairs = [];
            for (const prop in paramMap) {
                qStrPairs.push(`${encodeURIComponent(prop)}=${encodeURIComponent(paramMap[prop])}`);
            }
            return `?${qStrPairs.join('&')}`;
        }

        function queryStringToParamMap() {
            const paramStr = options.getWindowLocation().search.substring(1);
            let params = [];
            const paramMap = {};

            if (paramStr.length > 0) {
                params = paramStr.split('&');
                for (let i = 0; i < params.length; i++) {
                    const p = params[i].split('=');
                    let value = decodeURIComponent(p[1]);
                    if (value === 'true' || value === 'false') {
                        value = JSON.parse(value);
                    }
                    paramMap[decodeURIComponent(p[0])] = value;
                }
            }

            return paramMap;
        }
    }

    return QueryString;
};
