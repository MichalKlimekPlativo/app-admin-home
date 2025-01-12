module.exports = {
    extends: ['airbnb-base/legacy', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'comma-dangle': ['error', 'never'],
        'no-underscore-dangle': ['off'],
        'func-names': ['off'],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'vars-on-top': 'off',
        'global-require': 'off',
        'no-use-before-define': ['error', { functions: false }],
        'linebreak-style': ['off'],
        'prettier/prettier': [
            'error',
            {
                printWidth: 80,
                singleQuote: true,
                tabWidth: 4
            }
        ]
    },
    env: {
        browser: true,
        node: true
    },
    globals: {
        __: false,
        api: false,
        app: false,
        CONFIG: false,
        resolve: false,
        wemjq: false,
        wemQ: false
    }
};
