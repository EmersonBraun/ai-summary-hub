/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['plugin:@docusaurus/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  ignorePatterns: ['.docusaurus/', 'build/', 'node_modules/'],
};
