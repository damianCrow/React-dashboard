const UploadMedia = require('./UploadMedia.js')

class AdminPortal {

  constructor(app, socket) {
    this.app = app
    this.socket = socket
    this.handleUpload(app, socket)
  }

  handleUpload(app, socket) {
    const mediaUpload = new UploadMedia(app, socket)

    this.app.all('*', (req, res, next) => {
      switch (req.path) {
        case '/admin/upload':
          mediaUpload.handleImageUpload()
          break
        case '/admin/playlist-update':
          mediaUpload.updateServerPlaylist()
          break
        case '/admin/files-index-update':
          mediaUpload.updateFilesIndex()
          break
        default:
          return next()
      }
      return next()
    })
  }
}

module.exports = AdminPortal
