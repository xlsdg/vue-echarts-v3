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
    chunkFilename: 'js/[id].js',
    library: 'IEcharts',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': "'production'"
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      // mangle: {
      //   except: [],
      //   screw_ie8: false,
      //   keep_fnames: true
      // },
      compress: {
        // drop_console: true,
        // collapse_vars: true,
        // reduce_vars: true,
        // screw_ie8: false,
        warnings: false
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    })
  ]
});

module.exports = webpackConfig;
