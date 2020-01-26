'use strict'

const path = require('path')
const webpack = require('webpack')

const baseConfig = require('../config/webpack.base.js')

let config = Object.assign(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false
  },
  entry: {
    build: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ]
  },
  output: {
    pathinfo: true,
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: { colors: true, progress: true },
    contentBase: path.join(__dirname, '../src'),
    quiet: false,
    hot: true
    /* watchOptions: {
      aggregateTimeout: 300,
      poll: true
    } */
  }
})

const devRules = [
  {
    test: /\.(js|jsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
      plugins: ['react-hot-loader/babel']
    },
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  },
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          attrs: [':data-src'],
          minimize: false
        }
      }
    ]
  }
]

const devPlugins = [new webpack.HotModuleReplacementPlugin()]

devRules.map(rule => {
  config.module.rules.push(rule)
})
devPlugins.map(plugin => {
  config.plugins.push(plugin)
})
module.exports = config
