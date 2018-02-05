const fs = require('fs-extra')

class Auth {
  constructor(app, socket) {
    this.app = app
    this.socket = socket
    this.tokenDir = './.tokens/'

    this.init()
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  checkStoredAccessToken(service) {
    const tokenJsonPath = `${this.tokenDir}${service}_token.json`
    return new Promise((resolve, reject) => {
      // Check if we have previously stored a token.
      if (fs.existsSync(tokenJsonPath)) {
        this.readAccessToken(resolve, reject, tokenJsonPath)
      }
      // else {
      //   fs.writeFile(tokenJsonPath, { test: 'test' }, (err) => {
      //     err ? reject(err) : reject()
      //   })
      // }
    })
  }

  readAccessToken(resolve, reject, tokenJsonPath) {
    fs.readFile(tokenJsonPath, (err, token) => {
      err ? reject(err) : resolve(JSON.parse(token))
    })
  }
}

module.exports = Auth
