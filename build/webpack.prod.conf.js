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
      beautify: false,  // 最紧凑的输出
      comments: false,  // 删除所有的注释
      compress: {
        warnings: false,  // 在UglifyJs删除没有用到的代码时不输出警告
        drop_console: true,  // 删除所有的 `console` 语句 还可以兼容ie浏览器
        collapse_vars: true,  // 内嵌定义了但是只用到一次的变量
        reduce_vars: true  // 提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('css/[name].css')
  ]
});

module.exports = webpackConfig;
