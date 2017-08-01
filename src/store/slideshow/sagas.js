import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as actions from './actions'

function* componentTimeout(action, delayTime = 15000) {
  const service = action.service
  yield delay(delayTime)
  yield put(actions.nextComponentSlideshow(service))
}

function* cancelTimeout(task) {
  yield cancel(task)
}

function* startComponentTimeout(action) {
  const currentTimeout = yield takeLatest(actions.startComponentTimeout(action.service).type, componentTimeout)
  yield takeLatest(actions.clearComponentTimeout(action.service).type, cancelTimeout, currentTimeout)
}

function* beginSlides(action) {
  yield put(actions.slideshowMeta(action.service, action.max))
  yield fork(startComponentTimeout, action)
}

export default function* () {
  yield takeEvery('SLIDESHOW_START', beginSlides)
}
