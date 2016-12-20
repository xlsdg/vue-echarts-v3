var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('./utils');

var distDir = path.resolve(__dirname, '../dist');

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: true,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': "'production'"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('css/[name].css')
  ]
});

module.exports = webpackConfig;
