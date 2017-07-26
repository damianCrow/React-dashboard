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
const socketIo = require('socket.io')

const Harvest = require('./modules/Harvest.js')
const Sonos = require('./modules/Sonos.js')
const Showcase = require('./modules/Showcase.js')
const Instagram = require('./modules/Instagram.js')
const TwitterApi = require('./modules/Twitter.js')
const Google = require('./modules/Google.js')
const AdminPortal = require('./modules/AdminPortal.js')

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 3000;

const DEBUG = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');

const Sockets = require('./SocketServer.js');

const app = express();

console.log('DEBUG', DEBUG);

const server = app.listen(port, () => {
  console.info('🌎   🖥... Listening at http://%s:%s', ip, port);
});

const sockets = socketIo(server)

const services = {
  instagram: new Instagram(app, sockets),
  admin: new AdminPortal(app, sockets),
  twitter: new TwitterApi(app, sockets),
  sonos: new Sonos(app, sockets),
  harvest: new Harvest(app, sockets),
  google: new Google(app, sockets),
}

const socketHandler = new Sockets(sockets)
socketHandler.requests(services)

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

// app.use(express.static(path.join(__dirname, '/public/index.html')));
