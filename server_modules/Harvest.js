import fs from 'fs'
import Harvest from 'harvest'

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const CRED_DIR = `./.credentials/harvest/`
const HARVEST_HOST = `https://api.harvestapp.com`
const TOKEN_PATH = `${CRED_DIR}harvest_token.json`
const CLIENT_DETAILS = `${CRED_DIR}config.json`

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
export default class HarvestTimesheets {

  constructor (app, socket) {
    this.app = app
    this.socket = socket
    this.credentials = {}
  }

  checkAuth () {
    return new Promise((resolve, reject) => {
      console.log('HarvestTimesheets checkAuth')

      // Load client secrets from a local file.
      fs.readFile(CLIENT_DETAILS,
        function processClientSecrets (err, content) {
          if (err) {
            reject('Error loading client secret file: ' + err)
          }

          // Authorize a client with the loaded credentials, then call the
          // Google Calendar API.
          this.credentials = JSON.parse(content)
          // console.log('CREDENTIALS', JSON.parse(content))

          this.authorize()
            .then(function (token) {
              resolve(token)
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
  authorize () {
    // let harvest = new Harvest({
    //   subdomain: credentials.subdomain,
    //   redirect_uri: credentials.redirect_uri,
    //   identifier: credentials.client_id,
    //   secret: credentials.secret
    // })
    // const clientSecret = credentials.installed.client_secret
    // const clientId = credentials.installed.client_id
    // const redirectUrl = credentials.installed.redirect_uris[0]
    // const auth = new googleAuth()
    // const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    return new Promise((resolve, reject) => {
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          // No token stored, so get a new one.
          // Setup to catch authorize user in the consuctor
          this.setupForNewToken()
          reject(err)
        } else {
          // We have a processed token stored and ready to go, use it.
          // harvest.parseAccessCode(JSON.parse(token))
          resolve(JSON.parse(token))
        }
      })
    })
  }

  setupForNewToken () {
    // Dispatch a frontend action to push the auth link!!!!!!!!!
    this.socket.emit('action', {type: 'NEED_TO_AUTH_HARVEST',
      data: {status: 'auth-failed'}}
    )

    // Send the user to harvest.getAccessTokenURL()) and grab the access code passed as a get parameter
    // e.g. By running an express.js server at redirect_url
    // const accessCode = req.query.code

    const authUrl = HARVEST_HOST + '/oauth2/authorize?client_id=' + this.credentials.client_id + '&redirect_uri=' + this.credentials.redirect_uri + '&state=optional-csrf-token&response_type=code';

    this.app.get('/authorize_harvest', function (req, res) {
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })

    this.app.get('/harvest_auth', function (req, res) {
      const accessCode = req.query.code
      // This needs to go back to autherise and fire our request with sucess
      this.storeToken(this.getNewToken(accessCode))
      res.redirect('/')
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
  getNewToken (accessCode) {
    console.log('--GET NEW ACCESS TOKEN WITH ACCESS CODE--')
    // console.log('getNewToken. oauth2Client: ', oauth2Client)
    // console.log('this.credentials', this.credentials)
    console.log('accessCode', accessCode)

    var harvest = new Harvest({
      subdomain: this.credentials.subdomain,
      redirect_uri: this.credentials.redirect_uri,
      identifier: this.credentials.client_id,
      secret: this.credentials.secret,
      debug: true
    })

    console.log('harvest', harvest)
    console.log('harvest.secret', harvest.secret)
    console.log('harvest.redirect_uri', harvest.redirect_uri)
    console.log('harvest.identifier', harvest.identifier)
    console.log('harvest.subdomain', harvest.subdomain)

    harvest.parseAccessCode(accessCode, function (access_token) {
      this.storeToken(access_token)
    }.bind(this))
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  storeToken (token) {
    console.log('--STORE TOKEN RUNNING--')
    // try {
    //   fs.mkdirSync(TOKEN_PATH)
    // } catch (err) {
    //   if (err.code !== 'EEXIST') {
    //     throw err
    //   }
    // }
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
  listUsers () {
    // const calendar = google.calendar('v3')

    this.checkAuth().then((accessToken) => {
      const harvest = new Harvest({
        subdomain: this.credentials.subdomain,
        access_token: accessToken
      })

      var People = harvest.People

      People.list({}, function (err, users) {
        if (err) throw new Error(err)

        console.log('Loaded tasks using passed in auth_token!')
        console.log('tasks', users)

        this.socket.emit('action', {
          type: 'RECEIVE_HARVEST_POSTS',
          data: users
        })
      }.bind(this))

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
