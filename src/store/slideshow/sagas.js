import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as actions from './actions'

function* componentTimeout(action, delayTime = 5000) {
  const service = action.service
  yield delay(delayTime)
  yield put(actions.nextComponentSlideshow(service))
}

// function* cancelTimeout(task) {
//   yield cancel(task)
//   yield fork(startComponentTimeout, action)
// }

function* startComponentTimeout(action) {
  const currentTimeout = yield takeLatest(actions.startComponentTimeout(action.service).type, componentTimeout)
  yield takeLatest(actions.clearComponentTimeout(action.service).type, function* logger() {
    yield cancel(currentTimeout)
    yield fork(startComponentTimeout, action)
  })
}

function* beginSlides(action) {
  yield fork(startComponentTimeout, action)
  yield put(actions.slideshowMeta(action.service, action.max))
}

export default function* () {
  yield takeEvery('SLIDESHOW_START', beginSlides)
}
