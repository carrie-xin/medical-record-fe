const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '.swc/**'],
  },
  js.configs.recommended,
  {
    files: ['*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
