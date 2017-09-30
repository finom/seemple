module.exports = {
    root: true,
    extends: 'airbnb-base',
    plugins: ["output-todo-comments"],
    parser: 'babel-eslint',
    rules: {
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'no-var': 'error',
        'no-console': 'error',
        'prefer-rest-params': 0, // arguments work faster
        'no-param-reassign': ["error", { "props": false }],
        'no-underscore-dangle': 0, // for some hacks and array methods underscore prefix/suffix is required
        'no-use-before-define': 0, // impossible to follow
        'global-require': 0, // allow to fix circular refs
        'new-cap': ['error', {"capIsNewExceptions": ['Class']}],
        'comma-dangle': ["error", "never"], // personal preference
        'no-continue': 0, // continue statements are useful to flatten nested blocks
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-unresolved': ['error', { ignore: ['^src'] }], // allow to use 'src/' in tests
        'no-cond-assign': ['error', 'except-parens'], // sometimes it's needed in while()
        'max-lines': ["error", 210], // we may want to decrease this number later
        'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }], // x++ is used very often in cycles
        'class-methods-use-this': 0, // it't not required to use this in class methods
        'no-bitwise': ["error", { "allow": ["~"] }], // allow to use ~x.indexOf
        'no-restricted-syntax': 0, // for..of is used at tests
        'no-multi-assign': 0, // allow x = y = z
        'prefer-destructuring': 0, // allow things like x = y[z]
        'output-todo-comments/output-todo-comments': [
            'warn', {
                terms: ['todo'],
                location: 'start',
            }
        ]
    },
    env: {
        jasmine: true
    },
    globals: {
        nofn: true,
        window: true
    }
};
