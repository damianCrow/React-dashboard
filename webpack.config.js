var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var isDevelopment = process.env.NODE_ENV !== 'production'

var entryPath = path.join(__dirname, 'src')
var entry = isDevelopment ? [
  'babel-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'react-hot-loader/patch',
  entryPath
] : ['babel-polyfill', entryPath]

module.exports = {
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg' },
      { test: /\.woff$/, loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file?prefix=fonts/' },
      { test: /\.eot$/, loader: 'file?prefix=fonts/' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({

      template: path.join(__dirname, '/public/index.html'),
      minify: {

        removeComments: !isDevelopment,
        collapseWhitespace: !isDevelopment
      },
      inject: true
    }),
    new webpack.NoErrorsPlugin()
  ]
}
