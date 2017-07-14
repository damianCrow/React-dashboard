import { take, put, call, apply, fork, select, takeEvery } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'
import { getSocketConnection } from '../socket/selectors'

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket, action) {
  // console.log('action', action)
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {
    const pingHandler = (event) => {
      // console.log('event', event)
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event)
    }

    // setup the subscription
    socket.on('google-got-users', pingHandler)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      console.log('unsubscribe fired')
      socket.off('google-got-users', pingHandler)
    }

    return unsubscribe
  }, undefined, (recivedAction) => {
    // console.log(recivedAction.map((user) => user.email === action.users[0])[0])
    return recivedAction.map((user) => user.email === action.users[0])[0]
  })

  // }, undefined, (action) => {console.log('action', action) return action.map((user) => user.email === action[0].email)})
}

// reply with a `pong` message by invoking `socket.emit('pong')`
// function* pong(socket) {
//   yield call(delay, 5000)
//   yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context
// }

function* processRequest(action) {
  const socket = yield select(getSocketConnection)
  const socketChannel = yield call(createSocketChannel, socket, action)
  // console.log('action', action)
  yield apply(socket, socket.emit, ['pull-request', { service: 'GOOGLE', request: 'GET_USERS', package: action.users }]) // call `emit` as a method with `socket` as context

  const payload = yield take(socketChannel)
  // console.log('payload', payload)
  // yield put({ type: INCOMING_PONG_PAYLOAD, payload })
  yield put({ type: 'GOOGLE_GOT_USERS', users: payload })
}

export function* watchOnPings() {
  // while (true) {
    // yield fork(pong, socket)
  yield takeEvery('GOOGLE_GET_USERS', processRequest)
  // }
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(watchOnPings)
}
