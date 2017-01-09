var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var http = require('http')
var socketIo = require('socket.io')
var Twitter = require('twitter')

const SonosDiscovery = require('sonos-discovery')

var ip = process.env.IP || '0.0.0.0'
var port = process.env.PORT || 3002

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  host: ip,
  stats: false,
  historyApiFallback: true,
  contentBase: 'public'
}).listen(port, ip, function (err, result) {
  if (err) {
    return console.log(err)
  }

  console.log('Listening at http://' + ip + ':' + port)

  startSocketActionDispenser()
})

var startSocketActionDispenser = function () {
  var frontSocketServer = http.createServer()

  frontSocketServer.listen(3004)

  var io = socketIo()

  io.attach(frontSocketServer)

  io.on('connection', function (socket) {
    console.log('Socket connected: ' + socket.id)

    // Action from the client to the server
    // socket.on('action', (action) => {
    //   if (action.type === 'server/hello') {
    //     console.log('[server] Got hello data!', action.data)
    //     socket.emit('action', {type: 'MESSAGE', data: action.data})
    //     // socket.emit('action', {type: 'MESSAGE', data: action.data})
    //   }
    // })

    startSonosDiscovery(socket)
    getOldTweets(socket)
  })
}

// This explicty listens for changes from Sonos, and the passes an action
var startSonosDiscovery = function (socket) {
  var discovery = new SonosDiscovery({
    port: 8080,
    cacheDir: './cache'
  })

  discovery.on('topology-change', function (data) {
    // socketServer.sockets.emit('topology-change', discovery.players)
  })

  discovery.on('transport-state', function (data) {
    if (data.roomName === 'Front Studio') {
      // console.log(data)
      socket.emit('action', {type: 'MESSAGE', data: data.state})
    }
    // socketServer.sockets.emit('transport-state', data)
  })

  discovery.on('group-volume', function (data) {
    // socketServer.sockets.emit('group-volume', data)
  })

  discovery.on('volume-change', function (data) {
    // socketServer.sockets.emit('volume', data)
  })

  discovery.on('group-mute', function (data) {
    // socketServer.sockets.emit('group-mute', data)
  })

  discovery.on('mute-change', function (data) {
    // socketServer.sockets.emit('mute', data)
  })

  discovery.on('favorites', function (data) {
    // socketServer.sockets.emit('favorites', data)
  })

  discovery.on('queue-change', function (player) {
    // console.log('queue-changed', player.roomName)
    // delete queues[player.uuid]
    // loadQueue(player.uuid)
    //   .then(queue => {
    //     socketServer.sockets.emit('queue', { uuid: player.uuid, queue })
    //   })
  })
}

// var startTwitterStream = function (client) {

//   // You can also get the stream in a callback if you prefer.
//   client.stream('statuses/filter', {follow: '54588739'}, function (stream) {
//     stream.on('data', function (event) {
//       console.log(event && event.text)
//     })

//     stream.on('error', function (error) {
//       throw error
//     })
//   })

//   var params = {screen_name: 'interstateteam'}
//   client.get('statuses/user_timeline', params, function (error, tweets, response) {
//     if (!error) {
//       console.log(tweets)
//     }
//   })
// }

var getOldTweets = function (socket) {
  var client = new Twitter({
    consumer_key: 'cOnvuDRFBwn88PcqTHFKhwt5T',
    consumer_secret: 'Bo6HZ5SQFlFM4TH7txpVBg4xwI8IR31ldgGAcepINtXoCGV9Ut',
    access_token_key: '19474879-p2kXGi5KhyS0V3edMCryCL43hMCB2LSsFZIQdNXHW',
    access_token_secret: 'M4hbAMjLTLaXCr4pKol8jsOHyN2zRWxyyxjcIqdPg4xhG'
  })

  var params = {screen_name: 'interstateteam'}
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      socket.emit('action', {type: 'RECEIVE_TWEETS', data: tweets})
      // console.log(tweets)
    }
  })
  // startTwitterStream(client);
}
