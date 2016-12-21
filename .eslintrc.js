module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  'globals': {
    window: true,
    document: true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-extra-semi': 1,
    'no-inner-declarations': [2,'both'],
    'valid-jsdoc': [2,{'requireReturn':false,'prefer':{'returns':'return'}}],
    'curly': [2,'all'],
    'no-eval': 2,
    'no-extend-native': [2,{'exceptions':['Object']}],
    'no-new-wrappers': 2,
    'no-with': 2,
    'no-undef': 2,
    'no-unused-vars': [2,{'args':'none'}],
    'array-bracket-spacing': [2,'never',{}],
    'indent': [2,2,{'SwitchCase':1}],
    'no-array-constructor': 2,
    'no-mixed-spaces-and-tabs': [2,'smart-tabs'],
    'no-new-object': 2,
    'object-curly-spacing': [2,'never',{}],
    'semi': [2,'always'],
    'space-before-function-paren': [2,'never'],
    'max-len': [1,80,4,{'ignoreComments':true,'ignoreUrls':true}]
  }
}
