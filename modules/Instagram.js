const fs = require('fs')
const request = require('request-promise')

// https://www.instagram.com/psysize/
const INSTAGRAM_USER_ID = '30605504'

// https://www.instagram.com/interstateteam/
// const INSTAGRAM_USER_ID = '494086480'

// https://www.instagram.com/simoninterstate/
// const INSTAGRAM_USER_ID = '5846525555'

const CRED_DIR = './.credentials/instagram/'
const HOST_URL = 'https://api.instagram.com'
const TOKEN_PATH = `${CRED_DIR}instagram_token.json`
const CLIENT_DETAILS = `${CRED_DIR}config.json`


// A base class is defined using the new reserved 'class' keyword
class Instagram {

  constructor(app, sockets) {
    this.app = app
    this.sockets = sockets
    this.credentials = {}

    this.init()
  }

  init() {
    // This needs to be done first, before any async.
    this.setupLocalAuthPaths()

    // Setup and load the class with the already known credentials,
    // then make sure the external auth url is correct.
    this.grabLocalCredentials()
      .then(() => this.setupExternalAuthUrl())
  }

  grabLocalCredentials() {
    return new Promise((resolve, reject) => {
      fs.readFile(CLIENT_DETAILS, (err, content) => {
        if (err) {
          reject(`Error loading client secret file: '${err}`)
        }
        this.credentials = JSON.parse(content)
        resolve()
      })
    })
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      // Load client secrets from a local file.
      this.checkStoredAccessToken()
        .then(token => resolve(token))
        .catch(error => {
          // It ends here, the user needs to authenticate.
          console.log(`User needs to authenticate Instagram, error report: ${error} `)
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
  checkStoredAccessToken() {
    return new Promise((resolve, reject) => {
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          // No token stored, so get a new one.
          // Setup to catch authorize user in the consuctor
          // this.setupAccessForNewToken()
          reject(err)
        } else {
          // We have a processed token stored, instagram doesn't have an expire date so return the access token.
          resolve(JSON.parse(token).access_token)
          // this.checkAccessTokenExpiration(resolve, reject, JSON.parse(token))
        }
      })
    })
  }

  checkAccessTokenExpiration(resolveAuth, rejectAuth, tokenDetails) {
    // console.log('tokenDetails.expires_at', tokenDetails.expires_at)
    // console.log('new Date().getTime()', new Date().getTime())
    if (tokenDetails.expires_at > new Date().getTime()) {
      // Token still fine, send it back
      resolveAuth(tokenDetails.access_token)
    } else {
      // Token expired
      console.log('token expired, get new token using refresh token')
      // Get a new token using the refresh token
      this.getNewToken(tokenDetails.refresh_token, 'refresh')
        .then(tokenDetails => {
          this.storeToken(tokenDetails)
          resolveAuth(tokenDetails.access_token)
        })
        .catch(error => {
          console.log(error)
          rejectAuth(error)
        })
    }
  }

  setupExternalAuthUrl() {
    console.log('setupExternalAuthUrl')
    this.authUrl = `${HOST_URL}/oauth/authorize/?client_id=${this.credentials.client_id}&redirect_uri=${this.credentials.redirect_uri}&state=optional-csrf-token&response_type=code`
    console.log('this.authUrl', this.authUrl)
  }

  setupLocalAuthPaths() {
    // Send the user to authUrl and grab the access code passed as a get parameter
    this.app.get('/authorize_instagram', (req, res) => {
      // This will ultimately redirect back to our setup '/instagram_auth' with the code
      res.redirect(this.authUrl)
    })

    this.app.get('/instagram_auth', (req, res) => {
      const accessCode = req.query.code
      console.log('instagram auth accessCode = ', accessCode)
      // This needs to go back to autherise and fire our request with sucess
      this.getNewToken(accessCode, 'access')
        .then(tokenDetails => {
          this.storeToken(tokenDetails)
          res.redirect('/')
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  /**
   * Get a new token with either a refresh token or access code.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  getNewToken(code, requstType) {
    return new Promise((resolve, reject) => {
      console.log(`--GET NEW INSTAGRAM ACCESS TOKEN WITH ${requstType} CODE (getNewToken)--`)

      const extraOptions = {
        refresh: {
          grant_type: 'refresh_token',
          refresh_token: code,
        },
        access: {
          code,
          redirect_uri: this.credentials.redirect_uri,
          grant_type: 'authorization_code',
        },
      }

      const options = {
        method: 'POST',
        uri: `${HOST_URL}/oauth/access_token`,
        form: Object.assign({
          client_id: this.credentials.client_id,
          client_secret: this.credentials.client_secret,
        }, extraOptions[requstType]),
        json: true, // Automatically stringifies the body to JSON
      }

      request(options)
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

  testoAuth(accessToken) {
    this.instagramRequest('/account/who_am_i', accessToken)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  instagramRequest(instagramRequest, accessToken) {
    return new Promise((resolve, reject) => {
      const options = {
        uri: `${HOST_URL}/${instagramRequest}`,
        qs: {
          access_token: accessToken, // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        json: true, // Automatically parses the JSON string in the response
      }

      request(options)
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  storeToken(token) {
    console.log('--STORE TOKEN RUNNING--')
    const tokenWithExpiresAt = token
    tokenWithExpiresAt.expires_at = new Date().getTime() + (token.expires_in * 1000)
    fs.writeFile(TOKEN_PATH, JSON.stringify(tokenWithExpiresAt))
    console.log(`Token stored to ${TOKEN_PATH} 💾`)
  }

  posts() {
    return new Promise((resolve, reject) => {
      this.checkAuth().then(accessToken => {
        this.instagramRequest('v1/users/self/media/recent/', accessToken)
          .then(posts => {
            this.refreshPosts()
            resolve(posts.data)
          })
          .catch(err => {
            console.log('err', err)
            reject(err)
          })
      }).catch(error => {
        console.log('error', error)
        reject({ message: 'auth-failed' })
      })
    })
  }

  refreshPosts() {
    // console.log('refreshPosts timeout this.refreshInterval: ', this.refreshInterval)
    if (!this.refreshInterval) {
      this.refreshInterval = setInterval(() => {
        this.posts()
          .then(posts => this.sockets.emit('SOCKET_DATA_EMIT', {
            service: 'INSTAGRAM',
            description: 'POSTS',
            payload: posts,
          }))
      }, 900000)
    }
    // 900000 = 15 minutes
  }


}

module.exports = Instagram

