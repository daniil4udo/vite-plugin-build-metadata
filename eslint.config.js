import antfu from '@antfu/eslint-config';

const INDENT = 4;

export async function coreEslintConfigs() {
    return antfu({
        formatters: true,

        stylistic: {
            indent: INDENT,
        },

        // Configures for dmc's config
        rules: {
            'node/prefer-global/process': [ 'error', 'always' ],

            // https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/prefer-global/buffer.md
            'node/prefer-global/buffer': [ 'error', 'always' ],

            // ⌛️ process.env dependant rules
            'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',

            // Only allow `console.log` in development
            'no-console': process.env.PRE_COMMIT
                ? [ 'error', { allow: [ 'warn', 'error' ] }]
                : 'off',

            'style/arrow-parens': [
                'error',
                'as-needed',
                {
                    // modifies the as-needed rule in order NOT to require parens if the function body
                    requireForBlockBody: false,
                },
            ],
            'style/array-bracket-spacing': [
                'error',
                'always',
                {
                    objectsInArrays: false,
                },
            ],

            'style/semi': [ 'error', 'always' ],

            'style/eol-last': [
                'error',
                'always',
            ],

            // 🟡 js
            // https://eslint.org/docs/latest/rules/newline-per-chained-call
            'style/newline-per-chained-call': [
                'error',
                {
                    ignoreChainWithDepth: 3,
                },
            ],

            // 🟡 js
            // https://eslint.org/docs/latest/rules/no-await-in-loop
            'no-await-in-loop': 'error',

            // 🟡 js
            // https://eslint.org/docs/latest/rules/no-param-reassign
            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],

            // 🟡 js
            // https://eslint.org/docs/latest/rules/no-useless-concat
            'no-useless-concat': 'error',

            'perfectionist/sort-imports': [ 'error', {
                groups: [
                    [
                        'type',
                        'internal-type',
                        'parent-type',
                        'sibling-type',
                        'index-type',
                    ],
                    'builtin',
                    'external',
                    [
                        'internal',
                    ],
                    [
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'side-effect',
                    'object',
                    'unknown',
                ],
                newlinesBetween: 'always',
                order: 'asc',
                type: 'natural',
            }],
        },
    }, {
        ignores: [
            '**/coverage',
            '**/config',
            '**/build',
            '**/tests',
        ],
    }, {
        files: [
            '**/*.spec.{j,t}s?(x)',
            '**/*.unit.{j,t}s?(x)',
            // '**/__tests__/*.{j,t}s?(x)',
            // '**/tests/unit/**/*.spec.{j,t}s?(x)',
            // '**/(*.)spec.{j,t}s?(x)',
        ],
        // TODO:
        // extends: [ 'plugin:vitest/recommended' ],
        // plugins: [ 'vitest' ],
    });
}

export default await coreEslintConfigs();
