import fs from 'fs'
import google from 'googleapis'
import googleAuth from 'google-auth-library'

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const TOKEN_DIR = `./.credentials/`
const TOKEN_PATH = `${TOKEN_DIR}calendar_token.json`

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
export default class GoogleCalendar {

  constructor (app, socket) {
    this.app = app
    this.socket = socket
  }

  checkAuth () {
    return new Promise((resolve, reject) => {
      console.log('GoogleCalendar checkAuth')
      // console.log('GoogleCalendar this: ', this)
      // Load client secrets from a local file.
      fs.readFile('./.credentials/client_secret.json',
        function processClientSecrets (err, content) {
          if (err) {
            reject('Error loading client secret file: ' + err)
          }
          // Authorize a client with the loaded credentials, then call the
          // Google Calendar API.
          const CREDENTIALS = JSON.parse(content)
          console.log('CREDENTIALS', JSON.parse(content))

          this.authorize(CREDENTIALS)
            .then(function (oauth2Client) {
              resolve(oauth2Client)
            })
            .catch(function (error) {
              console.log(error)
            })
        }.bind(this)
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
  authorize (credentials) {
    const clientSecret = credentials.installed.client_secret
    const clientId = credentials.installed.client_id
    const redirectUrl = credentials.installed.redirect_uris[0]

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

    this.app.get('/authorize_calendar', (req, res) => {
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })

    this.app.get('/handle_calendar_auth', (req, res) => {
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
  getNewToken (oauth2Client, authCode) {
    console.log('--GET NEW TOKEN--')
    // console.log('getNewToken. oauth2Client: ', oauth2Client)
    return new Promise((resolve, reject) => {
      // PULL NEW CODE FROM URL PARAM
      oauth2Client.getToken(authCode, function (err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err)
          var reason = new Error({ status: 'error', data: err })
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
  storeToken (token) {
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
  listEvents () {
    const calendar = google.calendar('v3')

    // WEBHOOK CHANNEL PULL RESOURCES
    // http://stackoverflow.com/questions/38447589/synchronize-resources-with-google-calendar-for-node-js
    // http://stackoverflow.com/questions/35048160/googleapi-nodejs-calendar-events-watch-gets-error-push-webhookurlnothttps-or-pu
    // http://stackoverflow.com/questions/35434828/google-api-calendar-watch-doesnt-work-but-channel-is-created

    this.checkAuth().then(auth => {
      calendar.events.list({
        auth,
        calendarId: 'interstateteam.com_qondup0hrj9n1n52e5r1plr1kk@group.calendar.google.com',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        resource: {
          id: channel_id,
          token: 'email=' + _token.provider_email,
          address: 'https://dev-api.mycompany/google-watch/',
          type: 'web_hook',
          params: {
            ttl: '36000'
          }
        }
      }, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`)
          return
        }
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
            data: events
          })
        }
        // ADD SYNC HERE
      })
    }).catch(function (error) {
      console.log('error', error)
    })
  }

}
