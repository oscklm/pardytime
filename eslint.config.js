const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.expo', 'node_modules', 'ios', 'android'],
    rules: {
      'react/no-children-prop': [
        'error',
        {
          allowFunctions: true,
        },
      ],
      'prettier/prettier': 'warn',
    },
  },
]);
