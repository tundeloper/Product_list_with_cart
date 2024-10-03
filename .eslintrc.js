module.exports = {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Disable completely
      // OR to make it a warning
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  };

  module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser for TypeScript
    extends: [
      'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Use TypeScript rules
    'next/core-web-vitals', // Next.js specific rule
    ],
    parserOptions: {
      ecmaVersion: 2020,  // Allows for the parsing of modern ECMAScript features
      sourceType: 'module',  // Allows for the use of imports
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Disable completely
      // OR to make it a warning
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  };