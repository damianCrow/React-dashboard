import { eventChannel } from 'redux-saga'
import { take, takeLatest, takeEvery, put, call, fork, select } from 'redux-saga/effects'
import io from 'socket.io-client'
import shortid from 'shortid'

import * as actions from './actions'

// import { getSocketConnection } from './selectors'

const socket = io()

function connect() {
  if (socket.connected) {
    return socket
  }
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

// Socket listeners from server actions.
function requestAndReceive(socket, actionRequest) {
  // Tell the server we want to connect the "stream"
  // socket.emit('SOCKET_DATA_REQUEST', { service: 'INSTAGRAM', request: '', package: {} })
  const channelId = shortid.generate()
  socket.emit('SOCKET_DATA_REQUEST', { ...actionRequest, id: channelId })
  // Return redux-saga's eventChannel which handles socket actions
  return eventChannel(emit => {
    const sucessHandler = (event) => {
      // console.log('event', event)
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(actions.socketDataSuccess(event.service, event.serverAction, event.request, event.id, event.payload))
    }

    const failureHandler = (event) => {
      // console.log('event', event)
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(actions.socketDataFailed(event.service, event.serverAction, event.request, event.id, event.payload))
    }

    socket.on('SOCKET_DATA_REQUEST_SUCCESSFUL', sucessHandler)
    socket.on('SOCKET_DATA_REQUEST_UNSUCCESSFUL', failureHandler)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    // TODO: Does this ever fire doe? ¯\_(ツ)_/¯
    const unsubscribe = () => {
      socket.off('SOCKET_DATA_REQUEST_SUCCESSFUL', sucessHandler)
      socket.off('SOCKET_DATA_REQUEST_UNSUCCESSFUL', failureHandler)
    }

    return unsubscribe
  }, undefined, (recivedAction) => recivedAction.id === channelId
  )
}

function listenForUpdates(socket) {
  // Tell the server we want to connect the "stream"
  // Return redux-saga's eventChannel which handles socket actions
  return eventChannel(emit => {
    const sucessHandler = (event) => {
      // console.log('event', event)
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      console.log('SOCKET_DATA_EMIT recived, event: ', event)
      emit(actions.socketEmitReceived(event.service, event.description, event.payload))
    }

    socket.on('SOCKET_DATA_EMIT', sucessHandler)
    // socket.on('SOCKET_DATA_REQUEST_UNSUCCESSFUL', failureHandler)

    return () => {}
  })
}

export function* processServerRequestChannel(socket, actionRequest) {
  const channel = yield call(requestAndReceive, socket, actionRequest)
  while (true) {
    // Watch the channel for any chances and load them into an action
    const action = yield take(channel)
    // Fire whatever actions come from the channel
    yield put(action)
    // console.log('channel', channel)
    channel.close()
  }
}

export function* processListenChannel(socket) {
  const channel = yield call(listenForUpdates, socket)
  while (true) {
    // Watch the channel for any chances and load them into an action
    const action = yield take(channel)
    // Fire whatever actions come from the channel
    yield put(action)
  }
}

// This 💩 here, requests 💩 from the node server and gives back some results 👍📊
function* requestChannel() {
  yield takeEvery(actions.SOCKET_DATA_REQUEST, function* logger(action) {
    const socket = yield call(connect)
    yield put(actions.socketConnectSuccess(socket.connected))
    yield call(processServerRequestChannel, socket, action)
  })
}

// This 💩 listens for 💩 from the node server
function* listenChannel() {
  const socket = yield call(connect)
  yield put(actions.socketConnectSuccess(socket.connected))
  yield call(processListenChannel, socket)
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(requestChannel)
  yield fork(listenChannel)
}
