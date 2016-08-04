module.exports = {
    root: true,
    extends: 'airbnb',
    plugins: ["output-todo-comments"],
    rules: {
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'no-var': 'error',
        'no-else-return': 0,
        'prefer-rest-params': 0,
        'new-cap': ['error', {"capIsNewExceptions": ['Class']}],
        'comma-dangle': ["error", "never"],
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
}
