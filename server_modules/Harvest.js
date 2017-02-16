import fs from 'fs'
import Harvest from 'harvest'

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const CRED_DIR = `./.credentials/harvest/`
const TOKEN_PATH = `${CRED_DIR}harvest_token.json`
const CLIENT_DETAILS = `${CRED_DIR}config.json`

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
export default class HarvestTimesheets {

  constructor (app, socket) {
    this.app = app
    this.socket = socket
  }

  checkAuth () {
    return new Promise((resolve, reject) => {
      console.log('GoogleCalendar checkAuth')

      // Load client secrets from a local file.
      fs.readFile(CLIENT_DETAILS,
        function processClientSecrets (err, content) {
          if (err) {
            reject('Error loading client secret file: ' + err)
          }
          // Authorize a client with the loaded credentials, then call the
          // Google Calendar API.
          const CREDENTIALS = JSON.parse(content)
          console.log('CREDENTIALS', JSON.parse(content))

          this.authorize(CREDENTIALS)
            .then(function (harvest, token) {
              resolve(harvest, token)
            })
            .catch(function (error) {
              // It ends here, the user needs to authenticate.
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
    const harvest = new Harvest({
      subdomain: credentials.subdomain,
      redirect_uri: credentials.redirect_uri,
      identifier: credentials.client_id,
      secret: credentials.secret
    })

    // const clientSecret = credentials.installed.client_secret
    // const clientId = credentials.installed.client_id
    // const redirectUrl = credentials.installed.redirect_uris[0]
    // const auth = new googleAuth()
    // const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    return new Promise((resolve, reject) => {
      console.log('autherorize credentials', credentials)
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          // No token stored, so get a new one.

          // Setup to catch authorize user in the consuctor
          this.setupForNewToken(harvest)
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
          // harvest.parseAccessCode(JSON.parse(token))
          resolve(harvest, JSON.parse(token))
        }
      })
    })
  }

  setupForNewToken (oauth2Client) {

    // Send the user to harvest.getAccessTokenURL()) and grab the access code passed as a get parameter
    // e.g. By running an express.js server at redirect_url
    const accessCode = req.query.code


    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })

    console.log('Authorize this app by visiting this url: ', authUrl)

    // Dispatch a frontend action to push the auth link!!!!!!!!!
    this.socket.emit('action', {type: 'NEED_TO_AUTH_CALENDAR',
      data: {status: 'auth-failed'}}
    )

    this.app.get('/authorize_calendar', function (req, res) {
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })

    this.app.get('/handle_calendar_auth', function (req, res) {
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
    }.bind(this))
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

      // See https://platform.harvestapp.com/oauth2_clients to get these

      // Send the user to harvest.getAccessTokenURL()) and grab the access code passed as a get parameter
      // e.g. By running an express.js server at redirect_url
      var access_code = req.query.code;

      harvest.parseAccessCode(access_code, function(access_token) {
        console.log('Grabbed the access token to save', access_token);

        var TimeTracking = harvest.TimeTracking;

        TimeTracking.daily({}, function(err, tasks) {
          if (err) throw new Error(err);

          console.log('Loaded tasks using oauth!');
        });
      });

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
    // const calendar = google.calendar('v3')

    this.checkAuth().then((harvest, token) => {
      harvest.parseAccessCode(token, function (token) {
        console.log('Grabbed the access token to save', token)

        var TimeTracking = harvest.TimeTracking

        TimeTracking.daily({}, function (err, tasks) {
          if (err) throw new Error(err)

          console.log('Loaded tasks using oauth!')
        })
      })

      // calendar.events.list({
      //   auth,
      //   calendarId: 'interstateteam.com_qondup0hrj9n1n52e5r1plr1kk@group.calendar.google.com',
      //   timeMin: (new Date()).toISOString(),
      //   maxResults: 10,
      //   singleEvents: true,
      //   orderBy: 'startTime'
      // }, (err, response) => {
      //   if (err) {
      //     console.log(`The API returned an error: ${err}`)
      //     return
      //   }
      //   const events = response.items
      //   if (events.length === 0) {
      //     console.log('No upcoming events found.')
      //   } else {
      //     console.log('Upcoming 10 events:')

      //     for (const event of events) {
      //       const start = event.start.dateTime || event.start.date
      //       console.log('%s - %s', start, event.summary)
      //     }

      //     this.socket.emit('action', {
      //       type: 'RECEIVE_CALENDAR_POSTS',
      //       data: events
      //     })
      //   }
      // })
    }).catch(function (error) {
      console.log('error', error)
    })
  }

}
