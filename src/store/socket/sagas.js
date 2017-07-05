import { take, takeLatest, takeEvery, put, call, fork, select } from 'redux-saga/effects'
import io from 'socket.io-client'
import * as actions from './actions'
import { getSocketConnection } from './selectors'


function connect() {
  const socket = io()
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

function serverRequest(socket, createAction) {
  const { request } = createAction
  // console.log('socket createRequest fired')
  // console.log('socket, ', socket)
  // console.log('request', request)
  // console.log(`successful.create-request.${request}`)
  socket.emit('create-request', { request })
  return new Promise((resolve, reject) => {
    // console.log('request', request)
    socket.on(`successful.create-request.${request}`, (result) => {
      // console.log(result)
      resolve(result)
    })
    socket.on(`unsuccessful.create-request.${request}`, (result) => {
      reject(result)
    })
  })
}

export function* createServerRequest(socket, createAction) {
  // console.log('createServerRequest socket', socket)
  // console.log('createServerRequest createAction', createAction)
  try {
    yield call(serverRequest, socket, createAction)
    yield put(actions.serviceSuccess(createAction.request))
  } catch (e) {
    yield put(actions.serviceFailure(e))
  }
}


// // Handles connecting, message processing and disconnecting
// export default function* () {
//   yield take(actions.SOCKET_CONNECT_REQUEST) // Blocking: will wait for the action
//   const socket = yield call(connect) // Blocking: will wait for connect (If connect returns a Promise)
//   yield put(actions.socketConnectSuccess(socket))
// }

function* serviceRequestWatch() {
  // console.log('serviceRequestWatch, socket:', socket)
  yield takeEvery('SERVICE_REQUEST', function* logger(action) {
    // const state = yield select()
    // const createAction = yield take(action.serviceRequest) // Blocking: will wait for the action
    const socket = yield select(getSocketConnection)
    yield call(createServerRequest, socket, action)
    // console.log('action', action)
    // console.log('state after', state)
  })
}


function* flow() {
  while (true) {
    yield take(actions.SOCKET_CONNECT_REQUEST) // Blocking: will wait for the action
    const socket = yield call(connect) // Blocking: will wait for connect (If connect returns a Promise)
    yield put(actions.socketConnectSuccess(socket))
  }
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(flow)
  yield fork(serviceRequestWatch)
}

