import { eventChannel } from 'redux-saga'
import { take, select, put, call, fork, cancel } from 'redux-saga/effects'
import * as actions from './actions'
import { getSocketConnection } from '../socket/selectors'

// Socket listeners from server actions.
function connectStream(socket) {
  console.log('connect-request')
  // Tell the server we want to connect the "stream"
  socket.emit('connect-request', 'TWITTER')
  // Return redux-saga's eventChannel which handles socket actions
  return eventChannel(emit => {
    socket.on('twitter-new-posts', (posts) => {
      console.log('twitter-new-posts received, posts: ', posts)
      emit(actions.newTwitterPosts(posts))
    })

    socket.on('twitter-new-posts-error', (message) => {
      console.log('twitter-new-posts-error received')
      emit(actions.twitterUnauthorized(message))
    })
    return () => {}
  })
}

export function* connectService(socket) {
  console.log('connectService')
  // Load the connectStream func into channel to be watched
  const channel = yield call(connectStream, socket)
  while (true) {
    // Watch the channel for any chances and load them into an action
    const action = yield take(channel)
    // Fire whatever actions come from the channel
    yield put(action)
  }
}

function* flow() {
  while (true) {
    // Wait to see if the server is happy to provide data
    yield take('TWITTER_SERVICE_SUCCESS')
    // Grab socket details from the store
    const socket = yield select(getSocketConnection)
    // Connect the Sonos stream to start reciving data, with the socket
    yield fork(connectService, socket)
  }
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(flow)
}

