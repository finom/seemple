// simplified version of this https://github.com/commitizen/cz-conventional-changelog
const wrap = require('word-wrap');

module.exports = {
    prompter(cz, commit) {
        global.console.log(`Line 1 will be cropped at 100 characters.
            All other lines will be wrapped after 100 characters.`);
        cz.prompt([{
            type: 'list',
            name: 'type',
            message: 'Select the type of change that you\'re committing:',
            choices: [{
                name: 'feat:     A new feature',
                value: 'feat'
            }, {
                name: 'fix:      A bug fix',
                value: 'fix'
            }, {
                name: `refactor: A change that neither fixes a bug nor adds a feature
            (for example, comments and code style fixes)`,
                value: 'refactor'
            }, {
                name: 'perf:     A change that improves performance',
                value: 'perf'
            }, {
                name: 'test:     A change that adds or updates tests',
                value: 'test'
            }, {
                name: 'chore:    A change to the build process, auxiliary tools, or documentation',
                value: 'chore'
            }]
        }, {
            type: 'input',
            name: 'subject',
            message: 'Write a short, imperative present tense description of the change:\n'
        }, {
            type: 'input',
            name: 'body',
            message: 'Provide a longer description of the change (emphasis on WHY not WHAT):\n'
        }]).then(answers => {
            const maxLineWidth = 100;

            const wrapOptions = {
                trim: true,
                newline: '\n',
                indent: '',
                width: maxLineWidth
            };


            // Hard limit this line
            const head = `${answers.type}: ${answers.subject.trim()}`.slice(0, maxLineWidth);

            // Wrap these lines at 100 characters
            const body = wrap(answers.body, wrapOptions);

            commit(`${head}\n\n${body}`);
        });
    }
};
