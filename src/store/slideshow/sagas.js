import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel } from 'redux-saga/effects'
import * as actions from './actions'
import { maxSlideshow, currentSlideshow } from './selectors'

function* nextSlide(action) {
  // yield put(actions.startServiceSlideshow(action.service, action.max))
  console.log('nextSlide: action', action)
  const service = action.service
  const max = yield select(maxSlideshow(service))
  const current = yield select(currentSlideshow(service))
  yield delay(12000)

  // TODO: Make this a seperate async func
  if (current !== (max - 1)) {
    yield put(actions.incrementServiceSlideshow(service))
  } else {
    yield put(actions.restartServiceSlideshow(service))
    yield put(actions.incrementServiceSlideshow(service))
  }
}

function* controlSlides(action) {
  yield takeLatest(actions.startServiceSlideshow(action.service).type, nextSlide)
  yield takeLatest(actions.incrementServiceSlideshow(action.service).type, nextSlide)

  // yield put(actions.incrementServiceSlideshow(action.service, action.max))
  // yield fork(nextSlide(action))
  // yield take(actions.incrementServiceSlideshow(action.service, action.max).type)
}

function* startSlides(action) {
  yield fork(controlSlides, action)
  yield put(actions.startServiceSlideshow(action.service, action.max))
  // yield take(actions.incrementServiceSlideshow(action.service, action.max).type)
}

function* pauseSlideshow() {
  yield cancel(nextSlide)
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SLIDESHOW_INCREMENT', nextSlide)
  yield takeEvery('SLIDESHOW_START', startSlides)
  // yield takeLatest('SLIDESHOW_PAUSE', pauseSlideshow)
}
