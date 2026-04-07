import tseslint from 'typescript-eslint';
import docusaurusPlugin from '@docusaurus/eslint-plugin';

export default [
  {
    ignores: ['.docusaurus/', 'build/', 'node_modules/'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@docusaurus': docusaurusPlugin,
    },
    rules: {
      '@docusaurus/string-literal-i18n-messages': 'error',
      '@docusaurus/no-html-links': 'warn',
      '@docusaurus/prefer-docusaurus-heading': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
