var path = require('path');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    full: './src/full.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      enforce: 'pre',
      use: 'eslint-loader',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      enforce: 'pre',
      use: 'eslint-loader',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      include: projectRoot,
      exclude: /node_modules/
    }]
  }
}
