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

var plugins = [

  new webpack.DefinePlugin({

    'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    __DEV__: isDevelopment
  }),
  new HtmlWebpackPlugin({

    template: path.join(__dirname, '/public/index.html'),
    minify: {

      removeComments: !isDevelopment,
      collapseWhitespace: !isDevelopment
    },
    inject: true
  })
]

isDevelopment && plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = {

  cache: isDevelopment,
  debug: isDevelopment,
  devServer: {
    stats: 'errors-only'
  },
  entry: entry,
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
  output: {

    path: path.join(__dirname, 'public'),
    publicPath: '',
    filename: 'app.[hash].js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  plugins: plugins
}

// var path = require('path')
// var webpack = require('webpack')
// var HtmlWebpackPlugin = require('html-webpack-plugin')

// // var ip = process.env.IP || '0.0.0.0'
// // var port = process.env.PORT || 3002
// var DEBUG = process.env.NODE_ENV !== 'production'

// var config = {
//   devtool: DEBUG ? 'eval' : false,
//   entry: [
//     'babel-polyfill',
//     path.join(__dirname, 'src')
//   ]
// }

// if (DEBUG) {
//   config.entry.unshift(
//     'webpack-hot-middleware/client?reload=true',
//     'react-hot-loader/patch'
//   )

//   config.plugins = config.plugins.concat([
//     new webpack.HotModuleReplacementPlugin()
//   ])
// } else {
//   config.plugins = config.plugins.concat([
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
//   ])
// }

// module.exports = config
