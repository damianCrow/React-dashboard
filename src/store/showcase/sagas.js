import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as actions from '../slideshow/actions'
import { maxSlideshow, currentSlideshow } from './selectors'

function* checkOverride(action) {
  if(action.payload.overideQueue) {
    yield put(actions.pauseServiceSlideshow('SHOWCASE'))
    yield put(actions.restartServiceSlideshow('SHOWCASE'))
    yield put(actions.incrementServiceSlideshow('SHOWCASE'))
  }
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED', checkOverride)
}
