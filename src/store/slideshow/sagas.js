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

// function* listenForIncrement(action) {
//   yield 
// }

function* cancelTicking(task) {
  console.log('canceling a task')
  yield cancel(task)
}

function* runCarousel(action) {
  const slidePlaying = yield takeEvery(actions.incrementServiceSlideshow(action.service).type, nextSlide)
  // yield take(actions.pauseServiceSlideshow(action.service).type)
  yield takeLatest(actions.pauseServiceSlideshow(action.service).type, cancelTicking, slidePlaying)
  // console.log(`${action.service}: canceling last ilteration from startCarousel`)
}

function* startCarousel(action) {
  yield fork(runCarousel, action)
  const slidePlaying = yield takeEvery(actions.startServiceSlideshow(action.service).type, nextSlide)
  yield takeLatest(actions.pauseServiceSlideshow(action.service).type, cancelTicking, slidePlaying)
  // console.log(`${action.service}: canceling last ilteration from startCarousel`)
}

function* resumeSlides(action, andNext) {
  console.log('resumeSlides')
  // const resumeSlideshowSettings = yield takeLatest(actions.resumeServiceSlideshow(action.service).type)
  console.log('resumeSlideshowSettings andNext = ', andNext)
  console.log('resumeSlideshowSettings action = ', action)
  yield fork(runCarousel, action)
  yield put(actions.incrementServiceSlideshow(action.service))
  // yield fork(nextSlide, action, resumeOptions.delay)
}

// function* resetDelayTimer(action) {
//   yield fork(runCarousel, action)
//   const slidePlaying = call(nextSlide, action)
//   yield takeLatest(actions.pauseServiceSlideshow(action.service).type, cancelTicking, slidePlaying)
// }

function* listenForResume(action) {
  yield takeLatest(actions.resumeServiceSlideshow(action.service).type, resumeSlides, action)
}

function* beginSlides(action) {
  console.log('beginSlides')
  yield fork(startCarousel, action)
  // For the sake of the dispatcher
  yield put(actions.startServiceSlideshow(action.service, action.max))
  // yield call(resumeSlides, action, true)
  yield fork(listenForResume, action)
}

// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SLIDESHOW_START', beginSlides)
}
