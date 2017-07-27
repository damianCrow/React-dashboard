import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as actions from '../slideshow/actions'

function* checkOverride(action) {
  if (action.payload.overideQueue) {
    yield put(actions.restartServiceSlideshow('SHOWCASE'))
    yield put(actions.pauseServiceSlideshow('SHOWCASE'))
    console.log('checkOverride action.payload.type = ', action.payload.type)
    if (action.payload.type !== 'Video') {
      yield put(actions.resumeServiceSlideshow('SHOWCASE', 15000))
    }
  }
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED', checkOverride)
}
