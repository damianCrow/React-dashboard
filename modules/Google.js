const fs = require('fs')
const google = require('googleapis')
const googleAuth = require('google-auth-library')

const CRED_DIR = './.credentials/google/'
const HOST = 'https://www.googleapis.com'
const TOKEN_PATH = `${CRED_DIR}google_token.json`
const CLIENT_DETAILS = `${CRED_DIR}config.json`

const SCOPES = [`${HOST}/auth/admin.directory.user.readonly`, `${HOST}/auth/calendar.readonly`]


// Example 1: Creating a new class (declaration-form)
// ===============================================================

class Google {

  constructor(app, socket) {
    this.app = app
    this.socket = socket
    this.config = {}

    this.init()
  }

  init() {
    // This needs to be done first, before any async.
    this.setupLocalAuthPaths()

    // Setup and load the class with the already known credentials,
    // then make sure the external auth url is correct.
    this.grabLocalCredentials()
      .then(() => this.loadUpOauthClient())
  }

  setupLocalAuthPaths() {
    // Send the user to authUrl and grab the access code passed as a get parameter
    this.app.get('/authorize_calendar', (req, res) => {
      // This will ultimately redirect back to our setup '/harvest_auth' with the code
      res.redirect(this.authUrl)
    })

    this.app.get('/calendar_auth', (req, res) => {
      const accessCode = req.query.code
      console.log('harvest auth accessCode = ', accessCode)
      // This needs to go back to autherise and fire our request with sucess
      // oauth2Client, authCode
      // this.getNewToken(accessCode, 'access')
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

  grabLocalCredentials() {
    return new Promise((resolve, reject) => {
      fs.readFile(CLIENT_DETAILS, (err, content) => {
        if (err) {
          reject(`Error loading client secret file: '${err}`)
        }
        this.config = JSON.parse(content).installed
        resolve()
      })
    })
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      // Load client secrets from a local file.
      this.checkStoredAccessToken()
        .then(token => {
          this.oauth2Client.setCredentials(token)
          this.checkAccessTokenExpiration(token)
            .then(() => {
              resolve(this.oauth2Client)
            })
        })
        .catch(err => {
          // It ends here, the user needs to authenticate.
          reject(err)
          console.log(`User needs to authenticate Google, error report: ${err} `)
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
          const tokenToPass = JSON.parse(token)
          resolve(tokenToPass)
          // We have a processed token stored, first check if it's expired.
          // this.checkAccessTokenExpiration(resolve, reject, JSON.parse(token))
        }
      })
    })
  }

  checkAccessTokenExpiration(tokenDetails) {
    console.log('tokenDetails.expiry_date', tokenDetails.expiry_date)
    console.log('new Date().getTime()', new Date().getTime())
    return new Promise((resolve, reject) => {
      if (tokenDetails.expiry_date > new Date().getTime()) {
        // Token still fine, send it back
        resolve()
      } else {
        // Token expired
        console.log('token expired, get new token using refresh token')
        // Get a new token using the refresh token
        this.getNewToken(tokenDetails.refresh_token, 'refresh')
          .then(tokenDetails => {
            this.storeToken(tokenDetails)
            resolve(tokenDetails)
          })
          .catch(error => {
            console.log('checkAccessTokenExpiration error: ', error)
            reject(error)
          })
      }
    })
  }

  loadUpOauthClient() {
    this.auth = new googleAuth()
    this.oauth2Client = new this.auth.OAuth2(this.config.client_id, this.config.client_secret, this.config.redirect_uris)
    console.log('setupExternalAuthUrl')
    this.authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
    // this.authUrl = `${HARVEST_HOST}/oauth2/authorize?client_id=${this.config.client_id}&redirect_uri=${this.config.redirect_uri}&state=optional-csrf-token&response_type=code`
    console.log('this.authUrl', this.authUrl)
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  getNewToken(code, requstType) {
    console.log('--GET NEW TOKEN--')
    console.log('code', code)
    // console.log('getNewToken. oauth2Client: ', oauth2Client)
    return new Promise((resolve, reject) => {
      // PULL NEW CODE FROM URL PARAM
      if (requstType === 'refresh') {
        console.log('getting refresh token')
        console.log('this.oauth2Client', this.oauth2Client)
        this.oauth2Client.refreshAccessToken((err, tokens) => {
          // your access_token is now refreshed and stored in oauth2Client
          // store these new tokens in a safe place (e.g. database)
          if (err) {
            reject(err) // reject
          } else {
            resolve(tokens)
          }
        })
      } else {
        this.oauth2Client.getToken(code, (err, token) => {
          if (err) {
            console.log('Error while trying to retrieve access token', err)
            // const reason = new Error({ status: 'error', data: err })
            reject(err) // reject
          } else {
            resolve(token) // fulfilled
          }
          // callback(oauth2Client);
        })
      }
    })
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  storeToken(token) {
    console.log('--STORE TOKEN RUNNING--')
    fs.writeFile(TOKEN_PATH, JSON.stringify(token))
    console.log(`Token stored to ${TOKEN_PATH} 💾`)
  }

  /**
   * Lists the next 10 events on the user's primary calendar.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  getUsers(users) {
    return new Promise((resolve, reject) => {
      this.checkAuth().then(auth => {
        const service = google.admin('directory_v1')
        // console.log('google getUsers users: ', users)
        // WEBHOOK CHANNEL PULL RESOURCES
        // http://stackoverflow.com/questions/38447589/synchronize-resources-with-google-calendar-for-node-js
        // http://stackoverflow.com/questions/35048160/googleapi-nodejs-calendar-events-watch-gets-error-push-webhookurlnothttps-or-pu
        // http://stackoverflow.com/questions/35434828/google-api-calendar-watch-doesnt-work-but-channel-is-created
        let i
        const userRequests = []
        // const userInfo = []
        for (i = 0; i < users.length; i += 1) {
          userRequests[i] = Promise.all([
            this.getUserNames(service, auth, users[i]).catch((Error) => Error),
            this.getUsersPictures(service, auth, users[i]).catch((Error) => Error),
          ]).then(values => {
            // console.log('values[0] unfiltered: ', values[0])
            // const cleanValues = values.map((value) => {
            //   // console.log(value instanceof Error)
            //   if (value.status instanceof Error) {
            //     return ''
            //   }
            //   return value
            // })
            // // console.log('values[0] filtered: ', values[0])
            return Object.assign({}, { name: values[0].name }, { image: values[1].image }, { email: values[0].email })
          })
        }

        Promise.all(userRequests).then(values => {
          // console.log('overall userRequests promise all complete', values[0].name.fullName)
          resolve(values)
        }).catch(err => {
          // console.log(reason)
        })
      })
    })
    // this.socket.emit('google-got-users', userInfo)
  }

  getUserNames(service, auth, user) {
    return new Promise((resolve, reject) => {
      service.users.get({
        auth,
        customer: 'my_customer',
        maxResults: 10,
        orderBy: 'email',
        userKey: user,
      }, (err, response) => {
        if (err) {
          // console.log(`The API returned an error trying to get ${user}'s info: ${err}`)
          reject({ name: '', email: '', status: new Error(err) })
        } else {
          // console.log('response', response)
          resolve({
            name: Object.assign({}, response.name,
              { initals: `${response.name.givenName.charAt(0)}${response.name.familyName.charAt(0)}` }
            ),
            email: response.primaryEmail,
            status: 'good',
          })
        }
        // console.log(response)
        // this.socket.emit('google-got-users', response)
        // console.log('google-got-users emiited')
        // ADD SYNC HERE
      })
    })
  }

  getUsersPictures(service, auth, user) {
    const imageLocation = 'public/google-user-pics/'
    return new Promise((resolve, reject) => {
      service.users.photos.get({
        auth,
        customer: 'my_customer',
        maxResults: 10,
        orderBy: 'email',
        userKey: user,
      }, (err, response) => {
        if (err) {
          // console.log(`The API returned an error trying to get ${user}'s photo: ${err}`)
          reject({ image: '', status: new Error(err) })
        } else {
          // TODO: Check to see if image already exists (or has been updated)
          const userProfileBaseImage = new Buffer(response.photoData, 'base64')
          fs.writeFileSync(`${imageLocation}${response.id}.jpg`, userProfileBaseImage)
          resolve({ image: `${imageLocation}${response.id}.jpg`, status: 'good' })
        }
        // console.log('response', response)
      })
    })
  }

  calendar() {
    const calendarId = 'interstateteam.com_qondup0hrj9n1n52e5r1plr1kk@group.calendar.google.com'
    return new Promise((resolve, reject) => {
      this.ftechCalendarInfo(calendarId, resolve, reject)
    })
  }

  outOfOfficeCalendar() {
    const calendarId = 'interstateteam.com_d8s8ru8nrc3ifri2vb0o6jesvc@group.calendar.google.com'
    return new Promise((resolve, reject) => {
      this.ftechCalendarInfo(calendarId, resolve, reject)
    })
  }

  inOfficeCalendar() {
    const calendarId = 'interstateteam.com_fp9tqps7m6m0fo54eo89s9dabo@group.calendar.google.com'
    return new Promise((resolve, reject) => {
      this.ftechCalendarInfo(calendarId, resolve, reject)
    })
  }

  ftechCalendarInfo(calendarId, resolve, reject) {
    this.checkAuth().then(auth => {
      const calendar = google.calendar('v3')
      calendar.events.list({
        auth,
        calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, response) => {
        if (err) {
          console.log(`CalendarError: ${err}`)
          reject(err)
        } else {
          const events = response.items
          if (events.length === 0) {
            reject('No events were found!')
          } else {
            resolve(events)
          }
        }
      })
    }).catch(error => {
      console.log('CalendarError', error)
    })
  }
}

module.exports = Google
