var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
// })

baseWebpackConfig.entry = {
  app: ['./build/dev-client'].concat(baseWebpackConfig.entry.app)
};

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/dev.js'
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
        'process.env': "'development'"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});
