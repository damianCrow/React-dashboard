import fs from 'fs'
import Twitter from 'twitter'

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
const SCOPES = ['likes', 'follower_list', 'basic', 'public_content']
const CRED_DIR = `./.credentials/twitter/`
const STORED_CREDENTIALS = `${CRED_DIR}credentials.json`
const STORED_TOKEN = `${CRED_DIR}token.json`

// https://www.twitter.com/psysize/
// const TWITTER_USER_ID = '30605504'

// https://www.twitter.com/interstateteam/
const TWITTER_USER_NAME = 'interstateteam'

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
export default class TwitterApi {

  constructor (app, socket, port) {
    this.app = app
    this.socket = socket
    this.port = port
  }

  checkAuth () {
    return new Promise((resolve, reject) => {
      console.log('Twitter checkAuth')
      // console.log('GoogleCalendar this: ', this)
      // Load client secrets from a local file.
      fs.readFile(STORED_CREDENTIALS,
        function processClientSecrets (err, content) {
          if (err) {
            reject('Error loading client secret file: ' + err)
          }
          // Authorize a client with the loaded credentials, then call the
          // Twitter API.
          const CREDENTIALS = JSON.parse(content)
          // console.log('CREDENTIALS', JSON.parse(content))

          // this.authorize(CREDENTIALS)
          //   .then(function (twitter) {
          //     resolve(twitter)
          //   })
          //   .catch(function (error) {
          //     console.log(error)
          //   })

          resolve(this.authorize(CREDENTIALS))
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
    const twitter = new Twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.access_token_key,
      access_token_secret: credentials.access_token_secret
    })

    return twitter

    // return new Promise((resolve, reject) => {
    //   console.log('autherorize credentials', credentials)
    //   // Check if we have previously stored a token.
    //   fs.readFile(STORED_TOKEN, (err, token) => {
    //     if (err) {
    //       // No token stored, so get a new one.
    //       // Setup to catch authorize user in the consuctor
    //       this.setupForNewToken(twitter)
    //       reject(err)
    //     } else {
    //       // We have a processed token stored and ready to go, use it.
    //       twitter.use({ access_token: JSON.parse(token) })
    //       resolve(twitter)
    //     }
    //   })
    // })
  }

  setupForNewToken (twitter) {
    const REDIRECT_URL = 'http://' + 'localhost' + ':' + this.port + '/handle_twitter_auth'

    const authUrl = twitter.get_authorization_url(REDIRECT_URL, {
      scope: SCOPES,
      state: 'a state'
    })

    console.log('Authorize this app by visiting this url: ', authUrl)

    // Dispatch a frontend action to push the auth link!!!!!!!!!
    this.socket.emit('action', {type: 'NEED_TO_AUTH_TWITTER',
      data: {status: 'auth-failed'}}
    )

    this.app.get('/authorize_twitter', (req, res) => {
      // This will redirect back to our setup '/handle_calendar_auth' with the code
      res.redirect(authUrl)
    })

    this.app.get('/handle_twitter_auth', (req, res) => {
      const authCode = req.query.code
      // This needs to go back to autherise and fire our request with sucess
      this.getNewToken(twitter, authCode, REDIRECT_URL)
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
  getNewToken (twitter, authCode, redirectUrl) {
    console.log('--GET NEW TOKEN--')
    // console.log('getNewToken. oauth2Client: ', oauth2Client)
    return new Promise((resolve, reject) => {
      // PULL NEW CODE FROM URL PARAM
      // Not sure why redirectUrl is needed, but docs say so.
      twitter.authorize_user(authCode, redirectUrl, (err, result) => {
        if (err) {
          console.log(err.body)
          reject(err.body)
        } else {
          console.log(`Yay! Access token is ${result.access_token}`)
          resolve(result.access_token) // fulfilled
        }
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
      fs.mkdirSync(CRED_DIR)
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
    console.log('NEW TOKEN JSON: ', JSON.stringify(token))
    fs.writeFile(STORED_TOKEN, JSON.stringify(token))
    console.log(`Token stored to ${STORED_TOKEN} 💾`)
  }

  /**
   * Lists the next 10 events on the user's primary calendar.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  grabPosts () {
    this.checkAuth().then(twitter => {
      twitter.get('statuses/user_timeline', {screen_name: TWITTER_USER_NAME}, (error, tweets, response) => {
        if (!error) {
          this.socket.emit('action', {
            type: 'RECEIVE_TWITTER_POSTS',
            data: {status: 'success', data: tweets}
          })
        } else {
          this.socket.emit('action', {
            type: 'RECEIVE_TWITTER_POSTS_ERROR',
            data: {status: 'error', data: error}
          })
        }
      })
    }).catch(function (error) {
      console.log('error', error)
    })
  }

}
