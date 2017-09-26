/* eslint-disable */
const http = require('http');
const https = require('https');

const letsEncrypt = require('greenlock-express');
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

// app.use(historyApiFallback({
//   verbose: false
// }));

// app.use(express.static(path.join(process.cwd(), PUBLIC_PATH)));

const compiler = webpack(config);

// var basic = auth.basic({
//   realm: "Protected Area",
//   file: __dirname + '/.htpasswd'
// });

// app.use(auth.connect(basic));

if (DEBUG) {

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

} else {

  // app.use(express.static(__dirname + '/dist'))
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'))
  // })

  function approveDomains(opts, certs, cb) {
    // This is where you check your database and associated
    // email addresses with domains and agreements and such


    // The domains being approved for the first time are listed in opts.domains
    // Certs being renewed are listed in certs.altnames
    if (certs) {
      opts.domains = certs.altnames;
    }
    else {
      opts.email = 'simon.b@interstateteam.com';
      opts.agreeTos = true;
    }

    // NOTE: you can also change other options such as `challengeType` and `challenge`
    // opts.challengeType = 'http-01';
    // opts.challenge = require('le-challenge-fs').create({});

    cb(null, { options: opts, certs: certs });
  }



  // returns an instance of node-greenlock with additional helper methods
  var lex = require('greenlock-express').create({
    // set to https://acme-v01.api.letsencrypt.org/directory in production
    server: 'staging'

  // If you wish to replace the default plugins, you may do so here
  //
  , challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
  , store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })

  // You probably wouldn't need to replace the default sni handler
  // See https://git.daplie.com/Daplie/le-sni-auto if you think you do
  //, sni: require('le-sni-auto').create({})

  , approveDomains: approveDomains
  });


  // handles acme-challenge and redirects to https
  require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
    console.log("Listening for ACME http-01 challenges on", this.address());
  });



  var app = require('express')();
  app.use('/', function (req, res) {
    res.end('Hello, World!');
  });

  // handles your app
  require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(3000, function () {
    console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
  });



  // letsEncrypt.create({
  //   server: 'staging',
  //   email: 'simon.b@interstateteam.com',
  //   agreeTos: true,
  //   approveDomains: [ 'interdash.duckdns.org' ],
  //   app: app.use(express.static(__dirname + '/dist'))
  // }).listen(3000, 3000)

}

// app.use(express.static(path.join(__dirname, '/public/index.html')));
