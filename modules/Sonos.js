const SonosSystem = require('sonos-discovery')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
class Sonos {

  constructor(app, socket) {
    this.app = app
    this.socket = socket
    this.maxGroups = 4
    console.log('server module sonos constructor')
  }

  request() {
    this.discovery = new SonosSystem({
      port: 8080,
      cacheDir: './.cache',
    })

    this.discovery.on('initialized', (data) => {
      console.log('initialized data', data)
      this.socket.emit('successful.create-request.SONOS')
    })
  }

  listenForState() {
    console.log('server module sonos listenForState')

   // let groupStates = []

    this.discovery.on('topology-change', sonosGroups => {
      console.log('this.discovery', this.discovery)
      this.socket.emit('topology-change', sonosGroups)

      // THIS SPITS OUT DETAILS ABOUT ALL GROUPS

      // socketServer.sockets.emit('topology-change', discovery.players)
      // console.log('topology-change (data)')
      // console.log(data[0].coordinator.groupState)
      // console.log('discovery.players[0].coordinator.roomName', discovery.players[0].coordinator.roomName)
      // console.log('topology-change data: ', data)
      // console.log('player.members:')

      // console.log('sonosGroups', sonosGroups)

      // this.socket.emit('action', { type: 'RECEIVE_SONOS_GROUPS', data: { data: sonosGroups, status: 'success' } })

      // for (const player of data) {
      //   // console.log(player)
      //   // console.log(player.coordinator.roomName)
      //   // console.log('-- members:')
      //   for (const member of player.members) {
      //     // console.log(member.roomName)
      //   }
      //   // console.log(player.members)
      // }
    })

    this.discovery.on('transport-state', newSonosState => {
      // THIS SPITS OUT EACH GROUPS DETAILS (EACH IN THEIR OWN CALL)

      // if (groupStates[newSonosState.uuid]) {
      //   groupStates[newSonosState.uuid] =
      // }

      // console.log(data)
      // if (data.roomName === 'Back Studio') {
      //   this.socket.emit('action', {type: 'MESSAGE', data: data.state})
      // }
      // console.log('transport-state')
      // console.log('newSonosState', newSonosState)
      // this.socket.emit(newSonosState)
      this.socket.emit('transport-state', newSonosState)
    })

    this.discovery.on('group-volume', function (data) {
      // socketServer.sockets.emit('group-volume', data)
    })

    this.discovery.on('volume-change', function (data) {
      // socketServer.sockets.emit('volume', data)
    })

    this.discovery.on('group-mute', function (data) {
      // socketServer.sockets.emit('group-mute', data)
    })

    this.discovery.on('mute-change', function (data) {
      // socketServer.sockets.emit('mute', data)
    })

    this.discovery.on('favorites', function (data) {
      // socketServer.sockets.emit('favorites', data)
    })

    this.discovery.on('queue-change', function (player) {
      // console.log('queue-changed', player.roomName)
      // delete queues[player.uuid]
      // loadQueue(player.uuid)
      //   .then(queue => {
      //     socketServer.sockets.emit('queue', { uuid: player.uuid, queue })
      //   })
    })
  }

}

module.exports = Sonos

