module.exports = {
    root: true,
    extends: 'airbnb',
    plugins: ["output-todo-comments"],
    parser: 'babel-eslint',
    rules: {
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'no-var': 'error',
        'prefer-rest-params': 0, // arguments work faster
        // TODO: no-param-reassign rule definitely needs to be turned on
        'no-param-reassign': 0, // hard to follow
        'no-underscore-dangle': 0, // for some hacks and array methods underscore prefix/suffix is required
        'no-use-before-define': 0, // impossible to follow
        'global-require': 0, // allow to fix circular refs
        'new-cap': ['error', {"capIsNewExceptions": ['Class']}],
        'comma-dangle': ["error", "never"], // personal preference
        'no-continue': 0, // continue statements are useful to flatten nested blocks
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-unresolved': ['error', { ignore: ['^src'] }], // allow to use 'src/' in tests
        'no-cond-assign': ['error', 'except-parens'], // sometimes it's needed in while()
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
