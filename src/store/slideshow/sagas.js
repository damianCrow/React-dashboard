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
    // yield fork(nextSlide, action)
  }
}

function* listenForIncrement(action) {
  yield takeEvery(actions.incrementServiceSlideshow(action.service).type, nextSlide)
}

function* runCarousel(action) {
  const slidePlaying = yield fork(listenForIncrement, action)
  yield take(actions.pauseServiceSlideshow(action.service).type)
  yield cancel(slidePlaying)
}

function* resumeSlides(action, resumeOptions) {
  // const resumeSlideshowSettings = yield takeLatest(actions.resumeServiceSlideshow(action.service).type)
  console.log('resumeSlideshowSettings resumeOptions = ', resumeOptions)
  console.log('resumeSlideshowSettings action = ', action)
  yield fork(runCarousel, action)
  yield fork(nextSlide, action, resumeOptions.delay)
}

function* listenForResume(action) {
  yield takeLatest(actions.resumeServiceSlideshow(action.service).type, resumeSlides, action)
}

function* beginSlides(action) {
  yield fork(runCarousel, action)
  // For the sake of the dispatcher
  yield put(actions.startServiceSlideshow(action.service, action.max))
  yield call(resumeSlides, action, { delayTime: 15000 })
  yield fork(listenForResume, action)
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SLIDESHOW_START', beginSlides)
}
