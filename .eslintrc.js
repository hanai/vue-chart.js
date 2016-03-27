var production = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  rules: {
    'arrow-parens': 0,
    semi: [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
