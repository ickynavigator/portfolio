module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', "plugin:prettier/recommended"],
  plugins: [],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
  },
};