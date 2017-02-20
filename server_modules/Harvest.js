import fs from 'fs'
import Harvest from 'harvest'
import restler from 'restler'
import moment from 'moment'

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
    return new Promise((resolve, reject) => {
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          // No token stored, so get a new one.
          // Setup to catch authorize user in the consuctor
          this.setupAccessForNewToken()
          reject(err)
        } else {
          // We have a processed token stored and ready to go, use it.
          // harvest.parseAccessCode(JSON.parse(token))
          this.checkAccessToken(resolve, reject, JSON.parse(token))
          // resolveAuth(JSON.parse(token).access_token)
        }
      })
    })
  }

  checkAccessToken (resolveAuth, rejectAuth, tokenDetails) {
    let date = new Date()
    console.log('tokenDetails.expires_at', tokenDetails.expires_at)
    console.log('date.getTime', date.getTime())

    if (tokenDetails.expires_at > date.getTime()) {
      this.getNewToken(tokenDetails.refresh_token, 'refresh')
        .then(tokenDetails => {
          this.storeToken(tokenDetails)
          resolveAuth(tokenDetails.access_token)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      this.setupAccessForNewToken()
      rejectAuth('access token expired')
    }
  }

  setupAccessForNewToken () {
    // Dispatch a frontend action to push the auth link!!!!!!!!!
    this.socket.emit('action', {type: 'NEED_TO_AUTH_HARVEST',
      data: {status: 'auth-failed'}}
    )

    // Send the user to harvest.getAccessTokenURL()) and grab the access code passed as a get parameter
    // e.g. By running an express.js server at redirect_url
    // const accessCode = req.query.code

    const authUrl = HARVEST_HOST + '/oauth2/authorize?client_id='
    + this.credentials.client_id + '&redirect_uri=' + this.credentials.redirect_uri +
    '&state=optional-csrf-token&response_type=code'

    this.app.get('/authorize_harvest', (req, res) => {
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })

    this.app.get('/harvest_auth', function (req, res) {
      const accessCode = req.query.code
      // This needs to go back to autherise and fire our request with sucess
      this.getNewToken(accessCode, 'access')
        .then(tokenDetails => {
          this.storeToken(tokenDetails)
          res.redirect('/')
        })
        .catch(error => {
          console.log(error)
        })
    }.bind(this))
  }

  /**
   * Get a new token with either a refresh token or access code.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  getNewToken (code, codeType) {
    return new Promise((resolve, reject) => {
      console.log('--GET NEW ACCESS TOKEN WITH ACCESS CODE--')
      console.log('accessCode', code)

      let tokenOptions = {
        'client_id': this.credentials.client_id,
        'client_secret': this.credentials.secret
      }

      var harvest = new Harvest({
        subdomain: this.credentials.subdomain,
        redirect_uri: this.credentials.redirect_uri,
        identifier: this.credentials.client_id,
        secret: this.credentials.secret,
        debug: true
      })

      if (codeType === 'refresh') {
        tokenOptions['refresh_token'] = code
        tokenOptions['grant_type'] = 'refresh_token'
      } else if (codeType === 'access') {
        tokenOptions['code'] = code
        tokenOptions['grant_type'] = 'authorization_code'
        tokenOptions['redirect_uri'] = this.credentials.redirect_uri
      }

      restler.post(harvest.host + '/oauth2/token', {
        data: tokenOptions
      }).on('complete', response => {
        if (!response.access_token) {
          reject('Provided access code was rejected by Harvest, no token was returned')
        } else {
          let date = new Date()
          response['expires_at'] = date.getTime() + (response.expires_in * 1000)
          resolve(response)
          console.log('response', response)
        }

        // cb(self.access_token);
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
    // try {
    //   fs.mkdirSync(TOKEN_PATH)
    // } catch (err) {
    //   if (err.code !== 'EEXIST') {
    //     throw err
    //   }
    // }
    // console.log('NEW TOKEN: ', token)
    // console.log('NEW TOKEN JSON: ', JSON.stringify(token))
    fs.writeFile(TOKEN_PATH, JSON.stringify(token))
    console.log(`Token stored to ${TOKEN_PATH} 💾`)
  }

  getUsersAndTimes () {
    this.checkAuth().then((accessToken) => {
      console.log('--AUTH FINE GETTING DATA--')

      const harvest = new Harvest({
        subdomain: this.credentials.subdomain,
        access_token: accessToken
      })

      // const TimeTracking = harvest.TimeTracking

      // let usersAndHours = []
      // let usersHours = []
      let userAndTimeLink = []
      let allUsers = []

      this.getUserList(harvest)
        .then(users => {
          allUsers = users
          for (var i = 0, len = allUsers.length; i < len; i++) {
            // console.log('allUsers[i]', allUsers[i])
            userAndTimeLink[i] = this.getUserTime(harvest, users[i].user.id)
          }
          console.log('BEFORE PROMISE ALL')
          Promise.all(userAndTimeLink)
            .then(values => {
              // console.log('values', values)
              // console.log('values[2]', values[2](users, 2))
              // console.log('promise all values: ', values[2]())
              for (var i = 0, len = users.length; i < len; i++) {
                users[i].user['entries'] = values[i]
              }
              console.log('users[3].user.entries', users[3].user.entries)
              console.log('users[3].user.entries[1]', users[3].user.entries[1])

              // console.log('values[2][0].day_entry', values[2][0].day_entry)
              // console.log('values[3][0].day_entry', values[3][0].day_entry)
              // console.log('values[4][0].day_entry', values[4][0].day_entry)
              // console.log('values[5][0].day_entry', values[5][0].day_entry)

              // this.socket.emit('action', {
              //   type: 'RECEIVE_HARVEST_POSTS',
              //   data: users
              // })
            })
            .catch(reason => {
              console.log(reason)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }).catch(function (error) {
      console.log('error', error)
    })
  }

  getUserList (harvest) {
    return new Promise((resolve, reject) => {
      const People = harvest.People
      People.list({}, function (err, users) {
        if (err) {
          reject(JSON.stringify(err))
        } else {
          resolve(users)
        }
      })
    })
  }

  getUserTime (harvest, userId) {
    console.log('getUserTime fired: ', userId)
    console.log('moment().format()', moment().format('YYYYMMDD'))
    return new Promise((resolve, reject) => {
      // restler.get(harvest.host + '/people/' + userId + '/entries?from=20170210&to=20170219' + '&access_token=jNL7kkpYcZMkLwAKVA30gERdtN6mYZTD2dOAL6PBdmhrV3ZnJj9fIcfpKZIKWNafXVn27WnWYU0maXDbQ0HSsQ', {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json'
      // }).on('complete', response => {
      //   if (!response) {
      //     reject('Provided access code was rejected by Harvest, no token was returned')
      //   } else {
      //     resolve(response)
      //     console.log('response', response)
      //   }
      //   // cb(self.access_token);
      // })
      const Reports = harvest.Reports
      Reports.timeEntriesByUser({
        user_id: userId,
        from: moment().startOf('week').format('YYYYMMDD'),
        to: moment().format('YYYYMMDD')
      }, function (err, users) {
        if (err) {
          reject(JSON.stringify(err))
        } else {
          resolve(users)
        }
      })
    })
  }

}
