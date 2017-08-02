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
        this.credentials = JSON.parse(content).installed
        resolve()
      })
    })
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      // Load client secrets from a local file.
      this.checkStoredAccessToken()
        .then(token => {
          this.oauth2Client.credentials = token
          resolve(this.oauth2Client)
        })
        .catch(err => {
          // It ends here, the user needs to authenticate.
          reject(err)
          console.log(`User needs to authenticate Google, error report: ${err} `)
        })
    })
  }

  // checkAuth() {
  //   return new Promise((resolve, reject) => {
  //     // console.log('Google checkAuth')
  //     // console.log('GoogleCalendar this: ', this)
  //     // Load client secrets from a local file.
  //     fs.readFile(CLIENT_DETAILS,
  //       (err, content) => {
  //         if (err) {
  //           reject(`Error loading client secret file: ${err}`)
  //         }
  //         // Authorize a client with the loaded credentials, then call the
  //         // Google Calendar API.
  //         const CREDENTIALS = JSON.parse(content)
  //         // console.log('CREDENTIALS', JSON.parse(content))

  //         this.authorize(CREDENTIALS)
  //           .then((oauth2Client) => {
  //             resolve(oauth2Client)
  //           })
  //           .catch((error) => {
  //             console.log(error)
  //           })
  //       }
  //     )
  //   })
  // }

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
          // We have a processed token stored, first check if it's expired.
          this.checkAccessTokenExpiration(resolve, reject, JSON.parse(token))
        }
      })
    })
  }

  checkAccessTokenExpiration(resolveAuth, rejectAuth, tokenDetails) {
    // console.log('tokenDetails.expires_at', tokenDetails.expires_at)
    // console.log('new Date().getTime()', new Date().getTime())
    if (tokenDetails.expiry_date > new Date().getTime()) {
      // Token still fine, send it back
      resolveAuth(tokenDetails)
    } else {
      // Token expired
      console.log('token expired, get new token using refresh token')
      // Get a new token using the refresh token
      this.getNewToken(tokenDetails.refresh_token, 'refresh')
        .then(tokenDetails => {
          this.storeToken(tokenDetails)
          resolveAuth(tokenDetails)
        })
        .catch(error => {
          console.log(error)
          rejectAuth(error)
        })
    }
  }

  setupExternalAuthUrl() {
    console.log('setupExternalAuthUrl')
    this.auth = new googleAuth()
    this.oauth2Client = new this.auth.OAuth2(this.credentials.client_id, this.credentials.client_secret, this.credentials.redirect_uris)
    this.authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
    // this.authUrl = `${HARVEST_HOST}/oauth2/authorize?client_id=${this.credentials.client_id}&redirect_uri=${this.credentials.redirect_uri}&state=optional-csrf-token&response_type=code`
    console.log('this.authUrl', this.authUrl)
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  // authorize(credentials) {
  //   const clientSecret = credentials.installed.client_secret
  //   const clientId = credentials.installed.client_id
  //   const redirectUrl = 'http://localhost:3000/handle_calendar_auth'

  //   console.log('clientId', clientId)
  //   console.log('clientSecret', clientSecret)
  //   console.log('redirectUrl', redirectUrl)

  //   const auth = new googleAuth()
  //   const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

  //   return new Promise((resolve, reject) => {
  //     // console.log('autherorize credentials', credentials)
  //     // Check if we have previously stored a token.
  //     fs.readFile(TOKEN_PATH, (err, token) => {
  //       if (err) {
  //         // No token stored, so get a new one.

  //         // Setup to catch authorize user in the consuctor
  //         this.setupForNewToken(oauth2Client)
  //         reject(err)

  //         // this.getNewToken(oauth2Client)
  //         // .then((oauth2Client, token) => {
  //         //   this.storeToken(token)
  //         //   resolve(oauth2Client)
  //         // })
  //         // .catch(error => {
  //         //   reject(error)
  //         // })
  //       } else {
  //         // We have a processed token stored and ready to go, use it.
  //         oauth2Client.credentials = JSON.parse(token)
  //         resolve(oauth2Client)
  //       }
  //     })
  //   })
  // }

  // setupForNewToken(oauth2Client) {
  //   console.log('setupForNewToken')
  //   const authUrl = oauth2Client.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES,
  //   })

  //   console.log('Authorize this app by visiting this url: ', authUrl)

  //   // Dispatch a frontend action to push the auth link!!!!!!!!!
  //   this.socket.emit('action', {
  //     type: 'NEED_TO_AUTH_CALENDAR',
  //     data: { status: 'auth-failed' },
  //   })

  //   console.log('just before express route')
  //   this.app.get('/authorize_calendar', (req, res) => {
  //     console.log('autherise calendar')
  //     // This will redirect back to our setup '/handle_calendar_auth' with the code
  //     res.redirect(authUrl)
  //   })


  //   this.app.get('/handle_calendar_auth', (req, res) => {
  //     console.log('handle_calendar_auth')
  //     const authCode = req.query.code
  //     // This needs to go back to autherise and fire our request with sucess
  //     this.getNewToken(oauth2Client, authCode)
  //       .then((token) => {
  //         this.storeToken(token)
  //         res.redirect('/')
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   })
  // }

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
    // WEBHOOK CHANNEL PULL RESOURCES - THIS NEEDS HTTPS TO FUNCTION
    // http://stackoverflow.com/questions/38447589/synchronize-resources-with-google-calendar-for-node-js
    // http://stackoverflow.com/questions/35048160/googleapi-nodejs-calendar-events-watch-gets-error-push-webhookurlnothttps-or-pu
    // http://stackoverflow.com/questions/35434828/google-api-calendar-watch-doesnt-work-but-channel-is-created
    return new Promise((resolve, reject) => {
      this.checkAuth().then(auth => {
        console.log('calendar auth', auth)
        const calendar = google.calendar('v3')
        calendar.events.list({
          auth,
          calendarId: 'interstateteam.com_qondup0hrj9n1n52e5r1plr1kk@group.calendar.google.com',
          timeMin: (new Date()).toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        }, (err, response) => {
          if (err) {
            console.log(`The API returned an error: ${err}`)
            reject(err)
          } else {
            console.log('response', response)
            const events = response.items
            resolve(events)

            if (events.length === 0) {
              console.log('No upcoming events found.')
            } else {
              console.log('Upcoming 10 events:')
              for (let i = 0; i < events.length; i += 1) {
                const event = events[i]
                const start = event.start.dateTime || event.start.date
                console.log('%s - %s', start, event.summary)
              }
            }
          }

        })
      }).catch(error => {
        console.log('error', error)
      })
    })
  }
}

module.exports = Google
