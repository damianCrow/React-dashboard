const fs = require('fs')
const Harvest = require('harvest')
const restler = require('restler')
const moment = require('moment')

const sumBy = require('lodash/sumBy')


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const CRED_DIR = './.credentials/harvest/'
const HARVEST_HOST = 'https://api.harvestapp.com'
const TOKEN_PATH = `${CRED_DIR}harvest_token.json`
const CLIENT_DETAILS = `${CRED_DIR}config.json`

// A base class is defined using the new reserved 'class' keyword
class HarvestTimesheets {

  constructor(app, socket) {
    this.app = app
    this.socket = socket
    this.credentials = {}
  }

  request() {
    this.checkAuth().then(
      this.socket.emit('successful.create-request.HARVEST')
    )
  }

  checkAuth() {
    return new Promise((resolve, reject) => {

      // Load client secrets from a local file.
      fs.readFile(CLIENT_DETAILS, (err, content) => {
        if (err) {
          reject(`Error loading client secret file: '${err}`)
        }

        // Authorize a client with the loaded credentials, then call the
        // Google Calendar API.
        this.credentials = JSON.parse(content)
        // console.log('CREDENTIALS', JSON.parse(content))

        this.authorize()
          .then((token) => {
            resolve(token)
          })
          .catch((error) => {
            // It ends here, the user needs to authenticate.
            console.log(`User needs to authenticate Harvest, error report: ${error} `)
          })
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
  authorize() {
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

  checkAccessToken(resolveAuth, rejectAuth, tokenDetails) {
    const date = new Date()
    // console.log('tokenDetails.expires_at', tokenDetails.expires_at)
    // console.log('date.getTime', date.getTime())

    if (tokenDetails.expires_at > date.getTime()) {
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

  setupAccessForNewToken() {
    console.log('setupAccessForNewToken')
    // Dispatch a frontend action to push the auth link!!!!!!!!!
    this.socket.emit('action', {
      type: 'NEED_TO_AUTH_HARVEST',
      data: { status: 'auth-failed' },
    })

    // Send the user to harvest.getAccessTokenURL()) and grab the access code passed as a get parameter
    // e.g. By running an express.js server at redirect_url
    // const accessCode = req.query.code

    const authUrl = `${HARVEST_HOST}'/oauth2/authorize?client_id=${this.credentials.client_id}&redirect_uri=${this.credentials.redirect_uri}&state=optional-csrf-token&response_type=code`

    this.app.get('/authorize_harvest', (req, res) => {
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })

    this.app.get('/harvest_auth', (req, res) => {
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
    })
  }

  /**
   * Get a new token with either a refresh token or access code.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  getNewToken(code, codeType) {
    return new Promise((resolve, reject) => {
      // console.log(`--GET NEW ACCESS TOKEN WITH ${codeType} CODE--`)
      // console.log('accessCode', code)
      console.log('getNewToken')
      console.log('code', code)
      console.log('codeType', codeType)

      const tokenOptions = {
        client_id: this.credentials.client_id,
        client_secret: this.credentials.secret,
      }

      const harvest = new Harvest({
        subdomain: this.credentials.subdomain,
        redirect_uri: this.credentials.redirect_uri,
        identifier: this.credentials.client_id,
        secret: this.credentials.secret,
        debug: true,
      })

      if (codeType === 'refresh') {
        tokenOptions.refresh_token = code
        tokenOptions.grant_type = 'refresh_token'
      } else if (codeType === 'access') {
        tokenOptions.code = code
        tokenOptions.grant_type = 'authorization_code'
        tokenOptions.redirect_uri = this.credentials.redirect_uri
      }

      // TODO: Does this do anything?
      restler.post(`${harvest.host}/oauth2/token`, {
        data: tokenOptions,
      }).on('complete', response => {
        console.log('restler response', response)
        if (!response.access_token) {
          console.log('restler rejected')
          reject('Provided access code was rejected by Harvest, no token was returned')
        } else {
          const date = new Date()
          response.expires_at = date.getTime() + (response.expires_in * 1000)
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
  storeToken(token) {
    console.log('--STORE TOKEN RUNNING--')
    fs.writeFile(TOKEN_PATH, JSON.stringify(token))
    console.log(`Token stored to ${TOKEN_PATH} 💾`)
  }

  getUsersAndTimes() {
    this.checkAuth().then((accessToken) => {
      console.log('--AUTH FINE GETTING DATA--')

      const harvest = new Harvest({
        subdomain: this.credentials.subdomain,
        access_token: accessToken,
      })

      console.log('about to fire getUserList')
      this.getUserList(harvest)
        .then(users => {
          const userEntryRequests = users.map((user) => this.getUserTime(harvest, user.user))
          console.log('BEFORE PROMISE ALL')
          Promise.all(userEntryRequests)
            .then(userWithEntries => {
              this.socket.emit('harvest-new-posts', {
                users: this.calculateUserTime(userWithEntries),
              })
            })
            .catch(reason => {
              console.log(reason)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }).catch((error) => {
      console.log('error', error)
    })
  }

  getUserList(harvest) {
    return new Promise((resolve, reject) => {
      const People = harvest.People
      People.list({}, (err, users) => {
        if (err) {
          reject(JSON.stringify(err))
        } else {
          resolve(users)
        }
      })
    })
  }

  getUserTime(harvest, user) {
    // console.log('getUserTime user: ', user)
    return new Promise((resolve, reject) => {
      const Reports = harvest.Reports
      Reports.timeEntriesByUser({
        user_id: user.id,
        from: moment().subtract(14, 'd').format('YYYYMMDD'),
        to: moment().format('YYYYMMDD'),
      }, (err, userEntries) => {
        if (err) {
          reject(JSON.stringify(err))
        } else {
          resolve({ user, entries: userEntries })
        }
      })
    })

    // return new Promise((resolve, reject) => {
    //   const Reports = harvest.Reports
    //   Reports.timeEntriesByUser({
    //     user_id: userId,
    //     from: moment().startOf('week').format('YYYYMMDD'),
    //     to: moment().format('YYYYMMDD'),
    //   }, (err, users) => {
    //     if (err) {
    //       reject(JSON.stringify(err))
    //     } else {
    //       resolve(users)
    //     }
    //   })
    // })
  }

  currentTimings() {
    const startOfTheWeek = moment().startOf('isoWeek')
    const startOfLastWeek = moment().startOf('isoWeek').subtract(7, 'days')

    function weekDates(startDate, endDate) {
      const dates = []
      const currDate = startDate.clone()
      const lastDate = endDate.clone()
      while (currDate.add(1, 'days').diff(lastDate) < 1) {
        dates.push(currDate.clone().format('YYYY-MM-DD'))
      }
      dates.push(lastDate.clone().format('YYYY-MM-DD'))
      return dates
    }

    const workDay = (last) => {
      switch (moment().day()) {
        // If it is Monday (1),Saturday(6), or Sunday (0), Get the previous Friday (5)
        // and ensure we are on the previous week
        case 0:
        case 1:
        case 6:
          return moment().subtract(6, 'days').day(5)
        // If it any other weekend, just return the previous day
        default:
          return moment().day(((last) ? -1 : 0))
      }
    }
    // TODO: Later check that there are at least two entires for this.
    const thisWorkWeekDays = weekDates(startOfTheWeek.clone(), startOfTheWeek.clone().add(4, 'days'))
    const lastWorkWeekDays = weekDates(startOfLastWeek.clone(), startOfLastWeek.clone().add(4, 'days'))

    return {
      lastWorkDay: workDay(true).format('YYYY-MM-DD'),
      thisWorkWeekDays,
      lastWorkWeekDays,
    }
  }

  calculateUserTime(userWithEntries) {
    // Remove empty entires
    const activeUsersWithEntries = userWithEntries.filter((user) => {
      return user.entries.length > 0
    })

    return activeUsersWithEntries.map((user) => {
      // Filter only entries which match the last working day,
      // then, of those entries, sum up alcalculateUserTimel the hours.
      const lastWorkDay = (entries) => sumBy(entries.filter((entry) => {
        return this.currentTimings().lastWorkDay === entry.day_entry.spent_at
      }), (entry) => entry.day_entry.hours)

      const thisWorkWeek = (entries) => sumBy(entries.filter((entry) => {
        return this.currentTimings().thisWorkWeekDays.includes(entry.day_entry.spent_at)
      }), (entry) => entry.day_entry.hours)

      const lastWorkWeek = (entries) => sumBy(entries.filter((entry) => {
        return this.currentTimings().lastWorkWeekDays.includes(entry.day_entry.spent_at)
      }), (entry) => entry.day_entry.hours)


      return {
        firstName: user.user.first_name,
        lastName: user.user.last_name,
        id: user.user.id,
        email: user.user.email,
        totalHours: {
          lastWorkDay: lastWorkDay(user.entries),
          thisWorkWeek: thisWorkWeek(user.entries),
          lastWorkWeek: lastWorkWeek(user.entries),
        },
      }
    })
    // console.log('HARVEST DATA', users )
  }

}

module.exports = HarvestTimesheets
