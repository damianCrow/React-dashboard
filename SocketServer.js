// const moment = require('moment')
// const cleanDeep = require('clean-deep')

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
  constructor(sockets) {
    this.io = sockets
  }

  /**
   * init, wait for the sockets to connect before emitting / listening for
   messages.
   */
  requests(services) {
    // console.log('socketserver requests')
    this.io.on('connection', socket => {
      console.log('socket connected')
      //  TODO: Send a fail or success notfication.
      // this.listenForServiceConnectRequests(socket)
      this.listenForReadRequests(socket, services)
      // this.adminPortal = new AdminPortal(this.app, socket)
    })
  }

  /**
   * init, wait for the sockets to connect before emitting / listening for
   messages.
   */
  listenForReadRequests(socket, services) {
    // console.log('this.io.sockets', this.io.sockets)
    socket.on('SOCKET_DATA_REQUEST', requestMeta => {
      // console.log('services', services)
      // console.log('requestMeta', requestMeta)
      // console.log('pull-request, requestMeta.service:', requestMeta.service)
      const requestedService = Object.keys(services)
        .find((service) => service.toUpperCase() === requestMeta.data.service)

      const successReply = payload => {
        socket.emit('SOCKET_DATA_REQUEST_SUCCESSFUL', {
          service: requestMeta.data.service,
          serverAction: requestMeta.data.serverAction.toUpperCase(),
          request: requestMeta.data.request.toUpperCase(),
          id: requestMeta.id,
          payload,
        })
      }

      const failReply = error => {
        socket.emit('SOCKET_DATA_REQUEST_UNSUCCESSFUL', {
          service: requestMeta.data.service,
          serverAction: requestMeta.data.serverAction.toUpperCase(),
          request: requestMeta.data.request.toUpperCase(),
          id: requestMeta.id,
          payload: error,
        })
      }

      if (requestMeta.data.serverAction === 'emit') {
        // 
      } else {
        // console.log('requestedService', requestedService)
        // console.log('requestMeta.data.request', requestMeta.data.request)
        services[requestedService][requestMeta.data.request](requestMeta.data.payload)
          .then(payload => successReply(payload))
          .catch(error => failReply(error))
      }
    })
  }

}

module.exports = Sockets
