const fs = require('fs')

const USER_DIR = './public/user-data/'
const SHOWCASEINFO = `${USER_DIR}showcase-media.json`

class Showcase {

  constructor(app, socket) {
    this.app = app
    this.socket = socket
  }

  pullLivePlaylist() {
    this.loadConfig()
      .then(showcaseInfo => {
        this.socket.emit('action', {
          type: 'RECEIVE_SHOWCASE_POSTS',
          data: { livePlaylist: this.pluckLivePlaylist(showcaseInfo), status: 'success' },
        })
      })
      .catch(error => {
        console.log(error)
        this.socket.emit('action', {
          type: 'RECEIVE_SHOWCASE_POSTS_ERROR',
          data: { message: error, status: 'error' },
        })
      })
  }

  loadConfig() {
    return new Promise((resolve, reject) => {
      // Check if we have previously stored a token.
      fs.readFile(SHOWCASEINFO, (err, showcaseInfo) => {
        if (err) {
          reject(err)
        } else {
          // We have a processed token stored and ready to go, use it.
          resolve(JSON.parse(showcaseInfo))
        }
      })
    })
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  pluckLivePlaylist(showcaseInfo) {
    for (const playlist of showcaseInfo.playlists) {
      if (playlist.live === true) {
        return playlist
      }
    }
  }
}

module.exports = Showcase
