module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  globals: {
    window: true,
    global: true,
    process: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
}
