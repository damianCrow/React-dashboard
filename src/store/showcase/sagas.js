import { delay } from 'redux-saga'
import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as slideshowActions from '../slideshow/actions'
import * as actions from './actions'

// TODO: Move this whole thing to the container.
function* checkOverride(action) {
  if (action.payload.overideQueue) {
    yield put(slideshowActions.restartServiceSlideshow('SHOWCASE'))
    yield put(slideshowActions.pauseServiceSlideshow('SHOWCASE'))
    console.log('checkOverride action.payload = ', action.payload.playlist[0].type)
    if (action.payload.playlist[0].type !== 'Video') {
      yield put(slideshowActions.resumeServiceSlideshow('SHOWCASE', 15000))
    }
  }
  // if(action.payload.playlist[0].type !== 'Image') {
  //   yield put(slideshowActions.resumeServiceSlideshow('SHOWCASE', 15000))
  //   yield fork(runCarousel, action)
  // }
}

function* pullInitalPlaylist() {
  try {
    // Tell redux-saga to call fetch with the specified options
    const response = yield call(fetch, '/public/user-data/showcase-media.json', { method: 'GET' })
    const playlist = yield response.json()
    // Tell redux-saga to dispatch the recieveInitalPlaylist action
    yield put(actions.recieveInitalPlaylist(playlist.playlist))
  } catch (err) {
    // You get it
    yield put(actions.errorFetchingInitalPlaylist(err))
  }
}


// TODO: Make these pick up the service actions.
// Handles connecting, message processing and disconnecting
export default function* () {
  yield takeEvery('SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED', checkOverride)
  yield takeEvery(actions.pullInitalPlaylist().type, pullInitalPlaylist)
}
