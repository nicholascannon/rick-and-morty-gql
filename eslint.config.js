import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'unused-imports': unusedImports,
            react,
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                typescript: {},
                alias: {
                    map: [['', './public']],
                },
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
            'import/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc',
                    },
                    'newlines-between': 'always',
                    groups: [
                        'builtin',
                        'external',
                        'parent',
                        'sibling',
                        'index',
                        'unknown',
                    ],
                    pathGroups: [
                        {
                            pattern: '{.,..}/*\.css',
                            group: 'unknown',
                            position: 'after',
                        },
                    ],
                    warnOnUnassignedImports: true,
                },
            ],
            'import/no-default-export': 'error',

            // Allow '_' prefixed variables to be unused
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        // shadui/cn components
        files: ['src/components/ui/**/*.{ts,tsx}'],
        rules: {
            'react-refresh/only-export-components': 'off',
        },
    },
    {
        // Config files
        files: ['*.js', 'vite.config.ts'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            'import/no-default-export': 'off',
        },
    },
    eslintPluginPrettierRecommended,
);
