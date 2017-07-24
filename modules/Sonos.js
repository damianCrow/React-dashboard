const fs = require('fs')

const SonosSystem = require('sonos-discovery')

class Sonos {

  constructor(app, sockets) {
    this.app = app
    this.sockets = sockets
    this.maxGroups = 4

    this.discovery = new SonosSystem({
      port: 8080,
      cacheDir: './.cache',
    })

    // const player = this.discovery.getAnyPlayer()


    this.listenSaveEmit()
  }

  listenSaveEmit() {
    console.log('server module sonos listenForState')

    this.discovery.on('initialized', () => {
      // this.sockets.emit('speakerZones', this.discovery.zones)
      // this.sockets.emit('SOCKET_DATA_EMIT', { service: 'SONOS', description: 'TOPOLOGY', payload: sonosGroups })
      // console.log('discovery.players', this.discovery.players)
      // this.saveToServer()
    })

    this.discovery.on('topology-change', zones => {
      const releventChanges = []
      zones.forEach(group => {
        // console.log('group', group)
        releventChanges.push(
          {
            speakerNames: group.members.map(member => member.roomName),
            uuid: group.uuid,
          }
        )
      })

      this.sockets.emit('SOCKET_DATA_EMIT', { service: 'SONOS', description: 'TOPOLOGY', payload: zones })
    })

    this.discovery.on('transport-state', newSonosState => {
      const releventChanges = newSonosState
      releventChanges.speakerNames = []

      newSonosState.system.players.forEach(group => {
        // console.log('group', group)
        releventChanges.speakerNames.push(group.roomName)
      })

      // console.log('newSonosState.speakerNames', newSonosState.speakerNames)
      this.sockets.emit('SOCKET_DATA_EMIT', { service: 'SONOS', description: 'TRANSPORT', payload: newSonosState })
    })

    this.discovery.on('group-volume', data => {
      // socketServer.sockets.emit('group-volume', data)
    })

    this.discovery.on('volume-change', data => {
      // socketServer.sockets.emit('volume', data)
    })

    this.discovery.on('group-mute', data => {
      // socketServer.sockets.emit('group-mute', data)
    })

    this.discovery.on('mute-change', data => {
      // socketServer.sockets.emit('mute', data)
    })

    this.discovery.on('favorites', data => {
      // socketServer.sockets.emit('favorites', data)
    })

    this.discovery.on('queue-change', data => {
      // console.log('queue-changed', player.players)
      // delete queues[player.uuid]
      // loadQueue(player.uuid)
      //   .then(queue => {
      //     socketServer.sockets.emit('queue', { uuid: player.uuid, queue })
      //   })
    })
  }

  zones() {
    return new Promise((resolve, reject) => {
      resolve(this.discovery.zones)
    })
  }

  saveToServer(newSonosState) {
    fs.readFile('./public/sonos.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        fs.writeFile('./public/sonos.json', JSON.stringify(data), 'utf8', (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  }

}

module.exports = Sonos

