const UploadMedia = require('./UploadMedia.js')

class AdminPortal {

  constructor(app, socket) {
    this.app = app
    this.socket = socket
    this.mediaUpload = new UploadMedia(app, socket)
    this.handleUpload()
  }

  // handleRequests(request, payloadPackage) {
  //   // this.socket.emit('successful.create-request.GOOGLE')
  //   // console.log('google handleRequests: request = ', request)
  //   switch (request) {
  //     case 'GET_NEW_PLAYLIST':

  //       // this.getUsers(auth, payloadPackage)
  //       // this.socket.emit('google-got-users', values)
  //       break
  //     default:
  //       break
  //   }
  // }

  handleUpload() {
    this.app.all('*', (req, res, next) => {
      switch (req.path) {
        case '/admin/upload':
          this.mediaUpload.handleImageUpload()
          break
        case '/admin/playlist-update':
  // HORRIBLE HACK IF STATEMENT! MUST REFACTOR ASAP!! \\
          if (this.socket.connected) {
            this.mediaUpload.updateServerPlaylist()
          }
          break
        case '/admin/files-index-update':
          this.mediaUpload.updateFilesIndex()
          break
        default:
          return next()
      }
      return next()
    })
  }
}

module.exports = AdminPortal
