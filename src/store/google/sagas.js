// FIX WITH THIS:
// https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md#using-the-eventchannel-factory-to-connect-to-external-events

import { eventChannel } from 'redux-saga'
import { take, select, put, call, fork, cancel } from 'redux-saga/effects'
import * as actions from './actions'
import { getSocketConnection } from '../socket/selectors'

// Socket listeners from server actions.
function connectStream(socket, packageForServer) {
  // Tell the server we want to connect the "stream"
  socket.emit('pull-request', { service: 'GOOGLE', request: 'GET_USERS', package: packageForServer })
  // Return redux-saga's eventChannel which handles socket actions
  return eventChannel(emit => {
    socket.on('google-got-users', (users) => {
      console.log('got users from server')
      emit(actions.gotGoogleUsers(users))
    })

    // socket.on('google-getting-users-error', (message) => {
    //   emit(actions.googleUnauthorized(message))
    // })

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      console.log('unsubscribe')
      socket.off('google-got-users')
    }

    return unsubscribe
  })
}

export function* connectService(socket, packageForServer) {
  console.log('google connectService!!, users: ', packageForServer)
  // Load the connectStream func into channel to be watched
  const channel = yield call(connectStream, socket, packageForServer)
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
    const packageForServer = yield take('GOOGLE_GET_USERS')
    // Grab socket details from the store
    const socket = yield select(getSocketConnection)
    // Connect the Sonos stream to start reciving data, with the socket
    yield fork(connectService, socket, packageForServer)
  }
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(flow)
}

