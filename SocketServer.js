const socketIo = require('socket.io')
// const moment = require('moment')
// const cleanDeep = require('clean-deep')

// const GoogleCalendar = require('./modules/GoogleCalendar.js')
const Harvest = require('./modules/Harvest.js')
const Sonos = require('./modules/Sonos.js')
const Showcase = require('./modules/Showcase.js')
const Instagram = require('./modules/Instagram.js')
const TwitterApi = require('./modules/Twitter.js')
const Google = require('./modules/Google.js')


/**
 * Class for the Socket data handling.
 */
class Sockets {

  /**
   * Constructor.
   *
   * @param {Object} server Express server.
   * @param {Object} environment - run rabbit or not?
   */
  constructor(server, app, port) {
    this.io = socketIo(server)

    this.app = app

    // TODO: Remove the need for this.
    this.port = port

    this.channels = []
  }

  /**
   * init, wait for the sockets to connect before emitting / listening for
   messages.
   */
  init() {
    this.io.on('connection', socket => {
      console.log('connection socket')
      //  TODO: Send a fail or success notfication.
      this.listenForServiceConnectRequests(socket)
      this.listenForReadRequests(socket)
    })
  }

  /**
   * init, wait for the sockets to connect before emitting / listening for
   messages.
   */
  listenForServiceConnectRequests(socket) {
    // console.log('this.io.sockets', this.io.sockets)
    socket.on('create-request', requestedService => {
      console.log('create-request, requestedService:', requestedService.request)
      switch (requestedService.request) {
        case 'INSTAGRAM':
          this.instagram = new Instagram(this.app, socket, this.port)
          this.instagram.request()
          break
        case 'CALENDAR':
          break
        case 'HARVEST':
          this.harvestTime = new Harvest(this.app, socket)
          this.harvestTime.request()
          break
        case 'SHOWCASE':
          this.showcase = new Showcase(this.app, socket)
          this.showcase.request()
          break
        case 'SONOS':
          this.sonos = new Sonos(this.app, socket)
          this.sonos.request()
          break
        case 'TWITTER':
          this.twitter = new TwitterApi(this.app, socket, this.port)
          this.twitter.request()
          break
        default:
          break
      }
      // const channel = this.provideRabbitChannel(connection, requestedFeed.feed)
      // console.log('channel: ', channel)
    })
  }

  /**
   * init, wait for the sockets to connect before emitting / listening for
   messages.
   */
  listenForReadRequests(socket) {
    // console.log('this.io.sockets', this.io.sockets)
    socket.on('pull-request', payload => {
      console.log('pull-request, payload.service:', payload.service)
      switch (payload.service) {
        case 'INSTAGRAM':
          this.instagram.grabPosts()
          break
        case 'CALENDAR':
          break
        case 'HARVEST':
          this.harvestTime.getUsersAndTimes()
          break
        case 'SHOWCASE':
          // this.showcase.pullLivePlaylist()
          this.showcase.request()
          break
        case 'SONOS':
          // this.sonos = new Sonos(this.app, socket)
          this.sonos.listenForState()
          break
        case 'TWITTER':
          this.twitter.grabPosts()
          break
        case 'GOOGLE':
          this.google = new Google(this.app, socket)
          this.google.handleRequests(payload.request, payload.package)
          break
        default:
          break
      }
      // const channel = this.provideRabbitChannel(connection, requestedFeed.feed)
      // console.log('channel: ', channel)
    })
  }

}

module.exports = Sockets
