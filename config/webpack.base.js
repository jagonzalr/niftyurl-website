'use strict'

const path = require('path')
const webpack = require('webpack')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const staticPath = path.join(__dirname, '../src/assets')

let config = {
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter
            }
          }
        ],
        include: [srcPath, staticPath],
        exclude: [/node_modules/]
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.mjs', '.json', '.jsx'],
    symlinks: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/images/favicon.png',
      inject: true
    }),
    new webpack.ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${['en'].join('|')})[/\\\\\]`)
    ),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin()
  ]
}

module.exports = config
