import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as actions from './actions'
import { maxSlideshow, currentSlideshow } from './selectors'

function* nextSlide(action, delayTime = 15000) {
  // yield put(actions.startServiceSlideshow(action.service, action.max))
  const service = action.service
  const max = yield select(maxSlideshow(service))
  const current = yield select(currentSlideshow(service))
  yield delay(delayTime)
  // TODO: Make this a seperate async func
  if (current !== max) {
    yield put(actions.incrementServiceSlideshow(service))
  } else {
    yield put(actions.restartServiceSlideshow(service))
    yield fork(nextSlide, action)
  }
}

function* playingCarousel(action) {
  yield takeEvery(actions.incrementServiceSlideshow(action.service).type, nextSlide)
}

function* runCarousel(action) {
  const slidePlaying = yield fork(playingCarousel, action)
  yield take(actions.pauseServiceSlideshow(action.service).type)
  yield cancel(slidePlaying)
}

function* resumeSlides(action) {
  while (yield take(actions.resumeServiceSlideshow(action.service).type)) {
    yield fork(runCarousel, action)
    yield fork(nextSlide, action, 0)
  }
}

function* beginSlides(action) {
  yield fork(runCarousel, action)
  yield fork(resumeSlides, action)
  // For the sake of the dispatcher
  yield put(actions.startServiceSlideshow(action.service, action.max))
  yield delay(15000)
  yield put(actions.incrementServiceSlideshow(action.service))
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SLIDESHOW_START', beginSlides)
}
