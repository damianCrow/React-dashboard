const fs = require('fs')
const google = require('googleapis')
const googleAuth = require('google-auth-library')

// Modify this for this:
// https://developers.google.com/admin-sdk/directory/v1/guides/manage-users#retrieve_users_non_admin

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json

// TODO: Make this open to other Google modules (calendar etc)
const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user.readonly']
const TOKEN_DIR = './.credentials/google/'
const TOKEN_PATH = `${TOKEN_DIR}token.json`

// Example 1: Creating a new class (declaration-form)
// ===============================================================

class Google {

  constructor(app, socket) {
    this.app = app
    this.socket = socket

    console.log('app', app)
  }

  handleRequests(request, payloadPackage) {
    this.checkAuth().then((auth) => {
      // this.socket.emit('successful.create-request.GOOGLE')
      // console.log('google handleRequests: request = ', request)
      switch (request) {
        case 'GET_USERS':
          this.getUsersPictures(auth, payloadPackage.users)
          break
        default:
          break
      }
    })
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      console.log('GoogleCalendar checkAuth')
      // console.log('GoogleCalendar this: ', this)
      // Load client secrets from a local file.
      fs.readFile('./.credentials/google/client_secret.json',
        (err, content) => {
          if (err) {
            reject(`Error loading client secret file: ${err}`)
          }
          // Authorize a client with the loaded credentials, then call the
          // Google Calendar API.
          const CREDENTIALS = JSON.parse(content)
          console.log('CREDENTIALS', JSON.parse(content))

          this.authorize(CREDENTIALS)
            .then((oauth2Client) => {
              resolve(oauth2Client)
            })
            .catch((error) => {
              console.log(error)
            })
        }
      )
    })
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  authorize(credentials) {
    const clientSecret = credentials.installed.client_secret
    const clientId = credentials.installed.client_id
    const redirectUrl = 'http://localhost:3000/handle_calendar_auth'

    const auth = new googleAuth()
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    return new Promise((resolve, reject) => {
      console.log('autherorize credentials', credentials)
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          // No token stored, so get a new one.

          // Setup to catch authorize user in the consuctor
          this.setupForNewToken(oauth2Client)
          reject(err)

          // this.getNewToken(oauth2Client)
          // .then((oauth2Client, token) => {
          //   this.storeToken(token)
          //   resolve(oauth2Client)
          // })
          // .catch(error => {
          //   reject(error)
          // })
        } else {
          // We have a processed token stored and ready to go, use it.
          oauth2Client.credentials = JSON.parse(token)
          resolve(oauth2Client)
        }
      })
    })
  }

  setupForNewToken(oauth2Client) {
    console.log('setupForNewToken')
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })

    console.log('Authorize this app by visiting this url: ', authUrl)

    // Dispatch a frontend action to push the auth link!!!!!!!!!
    this.socket.emit('action', {
      type: 'NEED_TO_AUTH_CALENDAR',
      data: { status: 'auth-failed' },
    })

    console.log('just before express route')
    this.app.get('/authorize_calendar', (req, res) => {
      console.log('autherise calendar')
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })


    this.app.get('/handle_calendar_auth', (req, res) => {
      console.log('handle_calendar_auth')
      const authCode = req.query.code
      // This needs to go back to autherise and fire our request with sucess
      this.getNewToken(oauth2Client, authCode)
        .then((token) => {
          this.storeToken(token)
          res.redirect('/')
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  getNewToken(oauth2Client, authCode) {
    console.log('--GET NEW TOKEN--')
    // console.log('getNewToken. oauth2Client: ', oauth2Client)
    return new Promise((resolve, reject) => {
      // PULL NEW CODE FROM URL PARAM
      oauth2Client.getToken(authCode, (err, token) => {
        if (err) {
          console.log('Error while trying to retrieve access token', err)
          const reason = new Error({ status: 'error', data: err })
          reject(reason) // reject
        } else {
          oauth2Client.credentials = token
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
    try {
      fs.mkdirSync(TOKEN_DIR)
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
    console.log('NEW TOKEN: ', token)
    console.log('NEW TOKEN JSON: ', JSON.stringify(token))
    fs.writeFile(TOKEN_PATH, JSON.stringify(token))
    console.log(`Token stored to ${TOKEN_PATH} 💾`)
  }

  /**
   * Lists the next 10 events on the user's primary calendar.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  getUsers() {
    const service = google.admin('directory_v1')

    // WEBHOOK CHANNEL PULL RESOURCES
    // http://stackoverflow.com/questions/38447589/synchronize-resources-with-google-calendar-for-node-js
    // http://stackoverflow.com/questions/35048160/googleapi-nodejs-calendar-events-watch-gets-error-push-webhookurlnothttps-or-pu
    // http://stackoverflow.com/questions/35434828/google-api-calendar-watch-doesnt-work-but-channel-is-created

    this.checkAuth().then(auth => {
      console.log('service.users', service.users)

      service.users.list({
        auth,
        customer: 'my_customer',
        maxResults: 10,
        orderBy: 'email',
      }, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`)
          return
        }
        console.log('response.users[2]', response.users[2])
        const events = response.items
        if (events.length === 0) {
          console.log('No upcoming events found.')
        } else {
          console.log('Upcoming 10 events:')

          for (const event of events) {
            const start = event.start.dateTime || event.start.date
            console.log('%s - %s', start, event.summary)
          }

          this.socket.emit('action', {
            type: 'RECEIVE_CALENDAR_POSTS',
            data: events,
          })
        }
        // ADD SYNC HERE
      })

    }).catch((error) => {
      console.log('error', error)
    })
  }

  getUsersPictures(auth, users) {
    const service = google.admin('directory_v1')
    console.log('getUsersPictures users = ', users)
    let i
    for (i = 0; i < users.length; i += 1) {
      service.users.photos.get({
        auth,
        customer: 'my_customer',
        maxResults: 10,
        orderBy: 'email',
        userKey: users[i],
      }, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`)
          return
        }
        console.log('response', response)
        this.socket.emit('google-got-users', response)

        const userProfileBaseImage = new Buffer(response.photoData, 'base64')
        fs.writeFileSync(`public/google-user-pics/${response.id}.jpg`, userProfileBaseImage)

        // this.socket.emit('action', {
        //   type: 'RECEIVE_CALENDAR_POSTS',
        //   data: events,
        // })
      })

      // service.users.get({
      //   auth,
      //   customer: 'my_customer',
      //   maxResults: 10,
      //   orderBy: 'email',
      //   userKey: users[i],
      // }, (err, response) => {
      //   if (err) {
      //     console.log(`The API returned an error: ${err}`)
      //     return
      //   }

      //   console.log('response')


      //   this.socket.emit('google-got-users', response)
      //   console.log('google-got-users emiited')
      //   // ADD SYNC HERE
      // })
    }
  }
}

module.exports = Google
