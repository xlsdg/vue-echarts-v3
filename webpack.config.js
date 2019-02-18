var path = require('path')
var webpack = require('webpack');

module.exports = {
  entry: './src/full.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-echarts.js',
    library: undefined,
    libraryTarget: 'umd'
    // umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue',
    },
    echarts: {
      root: 'echarts',
      commonjs2: 'echarts',
      commonjs: 'echarts',
      amd: 'echarts',
    }
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ],
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
};
