/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server')
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const config = require('./webpack.config');
const express = require('express');
const auth = require('http-auth');

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 3000;

const DEBUG = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');

const Sockets = require('./SocketServer.js');
const app = express();

// const basic = auth.basic({
//   realm: 'Password Protected Area',
//   file: path.join(__dirname, '.htpasswd')
// });

console.log('DEBUG', DEBUG);

app.use(historyApiFallback({
  verbose: false
}));

app.use(express.static(path.join(process.cwd(), PUBLIC_PATH)));


// app.use(auth.connect(basic));
if (DEBUG) {

  const compiler = webpack(config);
  const middleware = WebpackDevMiddleware(compiler, {
    contentBase: 'public',
    historyApiFallback: true,
    hot: true,
    lazy: false,
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: false,
    stats: {
      colors: false
    }
  });

  app.use(middleware);
  // console.log('compiler', compiler)
  // Keeps crashing sometimes?
  app.use(webpackHotMiddleware(compiler));

}


// if (DEBUG) {

// }

// app.use(express.static(path.join(__dirname, '/public/index.html')));

const server = app.listen(port, () => {
  console.info('🌎   🖥... Listening at http://%s:%s', ip, port);
});

let socketServer = new Sockets(server, app, port)
socketServer.init()