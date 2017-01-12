const express = require('express')
const path = require('path')
const port = process.env.PORT || 3002
// Has to be different for hot-middleware's SockJS
const socketPort = 3004
const ip = process.env.IP || '0.0.0.0'
const app = express()
// const session = require('express-session')

// Socket.io
// const server = require('http').Server(express)
const socketIo = require('socket.io')(socketPort)

// Node liberaies for components
const instagram = require('instagram-node').instagram()
const Twitter = require('twitter')
const SonosDiscovery = require('sonos-discovery')

const isDevelopment = process.env.NODE_ENV !== 'production'

if (isDevelopment) {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config')

  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {

    hot: true,
    devServer: {
      stats: 'errors-only'
    },
    stats: {
      noInfo: true,
      chunks: false,
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use(express.static(path.join(__dirname, '/public')))
}

let expressSessions = {
  instagramAccessToken: undefined
}

app.get('*', function (request, response) {
  console.log('please?')
  console.log('request.session', request.session)
  expressSessions = request.session || expressSessions
  response.sendFile(path.join(__dirname, '/public/index.html'))
})

// app.listen(port)

app.listen(port, ip, function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info('🖥  Listening 👂  on port %s. Open 👐  up http://' + ip + ':%s/ in your browser 🌎 . 🤜  🤛', port, port)
  startSocketActionDispenser()
})

// const instagram = require('instagram-node').instagram()
// const Twitter = require('twitter')

// const SonosDiscovery = require('sonos-discovery')

// const ip = process.env.IP || '0.0.0.0'
// const port = process.env.PORT || 3002

// const compiler = webpack(config)

// app.use(webpackMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }))

// app.use(session({
//   secret: '7@6D94@6D#52%9z#5@6DPl',
//   resave: false,
//   saveUninitialized: true
// }))

// let expressSessions

// app.get('*', function response (req, res, next) {
//   console.log('EXPRESS * CATCH')
//   expressSessions = req.session
//   res.sendFile(path.join(__dirname, '/public/index.html'))
//   // response.sendFile(__dirname + '/public/index.html')
// })

// app.use(webpackHotMiddleware(compiler))

// // app.get('*', function (req, res, next) {
// //   console.log('EXPRESS * CATCH')
// //   req.url = 'index.html'
// //   next('route')
// // })

// // app.use('/public', express.static('public'))

// app.listen(port, ip, function onStart (err) {
//   if (err) {
//     console.log(err)
//   }
//   console.info('🖥  Listening 👂  on port %s. Open 👐  up http://' + ip + ':%s/ in your browser 🌎 . 🤜  🤛', port, port)
//   // startSocketActionDispenser()
// })

// Action from the client to the server

var startSocketActionDispenser = function () {
  // For express / socket server
  // server.listen(3004)

  var io = socketIo

  io.on('connection', function (socket) {
    console.log('Socket connected: ' + socket.id)
    listenForClientRequests(socket)
    startSonosDiscovery(socket)
    getOldTweets(socket)
  })
}

var getInstagramPosts = function () {
  // console.log('expressSessions ', expressSessions)
  if (typeof expressSessions.instagramAccessToken !== 'undefined') {
    console.log('have access_token')
    instagram.use({ access_token: expressSessions.instagramAccessToken })
  } else {
    console.log('need access_token')
    instagram.use({
      client_id: 'b4a58351058e43ee8717b690ae8fdc6e',
      client_secret: '23e103dbf5c44baf8efc205bb7d1d4bc'
    })
  }

  const redirectUri = 'http://' + 'localhost' + ':' + port + '/handleauth'

  exports.authorizeUser = (req, res) => {
    console.log('authorizeUser')
    res.redirect(instagram.get_authorization_url(redirectUri, {
      scope: ['likes', 'follower_list', 'basic', 'public_content'], state: 'a state'
    }))
  }

  exports.handleAuth = (req, res) => {
    instagram.authorize_user(req.query.code, redirectUri, (err, result) => {
      if (err) {
        console.log(err.body)
        res.send("Didn't work")
      } else {
        console.log(`Yay! Access token is ${result.access_token}`)
        req.session.instagramAccessToken = result.access_token
        res.redirect('/')
      }
    })
  }

  // This is where you would initially send users to authorize
  app.get('/authorize_user', exports.authorizeUser)
  // This is your redirect URI
  app.get('/handleauth', exports.handleAuth)

  // instagram.user_follows('494086480', function (err, users, pagination, remaining, limit) {
  //   if (err) {
  //     console.log('err', err)
  //   } else {
  //     console.log(users, pagination, remaining, limit)
  //   }
  // })
}

var listenForClientRequests = function (socket) {
  // Listen for a component to request data
  socket.on('action', (action) => {
    console.log('socket server listener, action: ', action)
    // Check the action type sent in the action
    if (action.type === 'SERVER_PULL_INSTAGRAM') {
      console.log('[server] Got hello request: ', action.type)
      // Send a new action to the client with it's requested data
      getInstagramPosts()
      // socket.emit('action', {type: 'RECEIVE_INSTAGRAM_POSTS', data: getInstagramPosts})
      // getInstagramPosts(socket)
      // socket.emit('action', {type: 'MESSAGE', data: action.data})
    }
  })
}

// This explicty listens for changes from Sonos, and the passes an action
var startSonosDiscovery = function (socket) {
  console.log('startSonosDiscovery')
  var discovery = new SonosDiscovery({
    port: 8080,
    cacheDir: './cache'
  })

  discovery.on('topology-change', function (data) {
    // socketServer.sockets.emit('topology-change', discovery.players)
  })

  discovery.on('transport-state', function (data) {
    // console.log(data)
    if (data.roomName === 'Back Studio') {
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
