import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as actions from './actions'
import { maxSlideshow, currentSlideshow } from './selectors'

function* nextSlide(action, delayTime = 15000) {
  console.log('nextSlide')

  // yield put(actions.startServiceSlideshow(action.service, action.max))
  const service = action.service
  const max = yield select(maxSlideshow(service))
  const current = yield select(currentSlideshow(service))
  yield delay(delayTime)
  console.log('current saga: ', current)
  console.log('max saga: ', max)
  // TODO: Make this a seperate async func
  if (current !== max) {
    yield put(actions.incrementServiceSlideshow(service))
  } else {
    yield put(actions.restartServiceSlideshow(service))
    yield fork(nextSlide, action)
  }
}

// function* pauseSlideshow() {
//   yield cancel(nextSlide)
// }

// function* incrementSlides(action) {
//   yield takeLatest(actions.incrementServiceSlideshow(action.service).type, nextSlide)
//   // yield takeLatest(actions.pauseServiceSlideshow(action.service).type, pauseSlideshow)
// }

function* playingCarousel(action) {
  yield takeEvery(actions.incrementServiceSlideshow(action.service).type, nextSlide)
}

function* runCarousel(action) {
  // const incrementalService = takeEvery(actions.incrementServiceSlideshow(action.service).type, nextSlide)
  // yield take(actions.pauseServiceSlideshow(action.service).type)
  // yield cancel(incrementalService)
  const slidePlaying = yield fork(playingCarousel, action)
  yield take(actions.pauseServiceSlideshow(action.service).type)
  yield cancel(slidePlaying)

  // while (yield take(actions.incrementServiceSlideshow(action.service).type)) {
  //   const slidePlaying = yield fork(nextSlide, action)
  //   yield take(actions.pauseServiceSlideshow(action.service).type)
  //   yield cancel(slidePlaying)
  // }
}

// function* startSlides(action) {
//   yield put(actions.startServiceSlideshow(action.service, action.max))
//   yield put(actions.incrementServiceSlideshow(action.service))

//   // yield takeLatest(actions.startServiceSlideshow(action.service).type, nextSlide)
// }

function* resumeSlides(action) {
  while (yield take(actions.resumeServiceSlideshow(action.service).type)) {
    yield fork(runCarousel, action)
    yield fork(nextSlide, action, 0)

    // This means the reducer will always increase even at the end.
    // yield put(actions.incrementServiceSlideshow(action.service))
  }
  // yield takeLatest(actions.startServiceSlideshow(action.service).type, nextSlide)
}

function* beginSlides(action) {
  yield fork(runCarousel, action)
  yield fork(resumeSlides, action)

  // For the sake of the dispatcher
  yield put(actions.startServiceSlideshow(action.service, action.max))

  yield delay(15000)
  yield put(actions.incrementServiceSlideshow(action.service))
  // yield fork(incrementSlides, action)

  // yield take(actions.incrementServiceSlideshow(action.service, action.max).type)
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  // yield takeEvery('SLIDESHOW_INCREMENT', playSlides)
  yield takeEvery('SLIDESHOW_START', beginSlides)
  // yield takeLatest('SLIDESHOW_PAUSE', pauseSlideshow)
}
