// BUILD THIS AGAIN. USE THIS FOR HELP:
// http://stackoverflow.com/questions/30773756/is-it-okay-to-use-babel-node-in-production

require('babel-register')

const express = require('express')
const path = require('path')
const port = process.env.PORT || 3002
// Has to be different for hot-middleware's SockJS
const socketPort = 3004
const ip = process.env.IP || '0.0.0.0'
const app = express()
const session = require('express-session')

// Socket.io
// const server = require('http').Server(express)
const socketIo = require('socket.io')(socketPort)

// Node liberaies for components
const instagram = require('instagram-node').instagram()
const Twitter = require('twitter')
const SonosDiscovery = require('sonos-discovery')

const GoogleCalendar = require('./server_modules/GoogleCalendar.js')

const isDevelopment = process.env.NODE_ENV !== 'production'

let expressSessions = {
  instagramAccessToken: undefined
}

if (isDevelopment) {
  console.log('RUNNING DEVELOPMENT: ', isDevelopment)
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config')

  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {

    stats: {
      noInfo: true,
      chunks: false,
      colors: true
    },
    noInfo: true,
    publicPath: '/'
  }))

  app.use(session({
    secret: '7@6D94@6D#52%9z#5@6DPl',
    resave: false,
    saveUninitialized: true
  }))

  app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath, 'index.html')
    console.log('** EXPRESS STAR **')

    expressSessions = req.session || expressSessions

    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) {
        return next(err)
      }

      next()
      // res.end()
    })
  })

  // app.get('*', function (request, response) {
  //   console.log('** STAR **')
  //   expressSessions = request.session || expressSessions
  //   console.log('request.session', request.session)
  //   console.log('expressSessions', expressSessions)
  //   response.sendFile(path.join(__dirname, '/public/index.html'))
  // })

  // Doesn't auto reload, clashes with express, idk why :(
  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use(express.static(path.join(__dirname, '/public')))
}

// app.listen(port)

app.listen(port, ip, function onStart (err) {
  if (err) {
    console.log(err)
  }

  console.info('🖥  Listening 👂  on port %s. Open 👐  up http://' +
    ip + ':%s/ in your browser 🌎 . 🤜  🤛', port, port)

  startSocketActionDispenser()
})

var startSocketActionDispenser = function () {
  // For express / socket server
  // server.listen(3004)

  var io = socketIo

  io.on('connection', function (socket) {
    console.log('Socket connected: ' + socket.id)
    listenForClientRequests(socket)

    // These two need(!!!!!) to be moved to listenForClientRequests()
    // startSonosDiscovery(socket)
    // getOldTweets(socket)
  })
}

var requestInstagramPosts = function () {
  return new Promise(
    function (resolve, reject) {
      console.log('running promise')
      instagram.user_media_recent('30605504', function (err, posts, pagination, remaining, limit) {
        if (err) {
          console.log('err', err)
          var reason = new Error({status: 'error', data: err})
          reject(reason) // reject
        } else {
          console.log('pulled instagram data')
          resolve({status: 'success', data: posts}) // fulfilled
        }
      })
    }
  )
}

var checkForInstagramKey = function () {
  if (typeof expressSessions.instagramAccessToken !== 'undefined') {
    console.log('have access_token')
    instagram.use({ access_token: expressSessions.instagramAccessToken })
    return true
  } else {
    console.log('need access_token')

    instagram.use({
      client_id: 'b4a58351058e43ee8717b690ae8fdc6e',
      client_secret: '23e103dbf5c44baf8efc205bb7d1d4bc'
    })
    return false
    // return {status: 'error', data: 'No access'}
  }
}

var authorizeInstagram = function () {
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
}

var listenForClientRequests = function (socket) {
  // Listen for a component to request data
  socket.on('action', (action) => {
    console.log('socket server listener, action: ', action)
    // Check the action type sent in the action
    if (action.type === 'SERVER_PULL_INSTAGRAM') {
      console.log('[server] Got hello request: ', action.type)
      // Send a new action to the client with it's requested data
       // Need a promise here.

      if (checkForInstagramKey() === true) {
        requestInstagramPosts()
          .then(function (fulfilled) {
            console.log(fulfilled)
            socket.emit('action', {
              type: 'RECEIVE_INSTAGRAM_POSTS',
              data: fulfilled
            })
          })
          .catch(function (error) {
            console.log(error)
            socket.emit('action', {
              type: 'RECEIVE_INSTAGRAM_POSTS_ERROR',
              data: error
            })
          })
      } else {
        socket.emit('action', {type: 'NEED_TO_AUTH_INSTAGRAM',
          data: {status: 'auth-failed'}}
        )
        authorizeInstagram()
      }
      // getInstagramPosts(socket)
      // socket.emit('action', {type: 'MESSAGE', data: action.data})
    } else if (action.type === 'SERVER_PULL_CALENDAR') {
      // GoogleCalendar()
      this.googleCal = new GoogleCalendar.default(app, socket)
      this.googleCal.listEvents()
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
