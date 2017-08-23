import { take, takeLatest, takeEvery, put, fork, select, cancel, call } from 'redux-saga/effects'
import * as slideshowActions from '../slideshow/actions'
import * as actions from './actions'

// TODO: Move this whole thing to the container. -- Why?
function* checkOverride(action) {
  yield put(slideshowActions.slideshowMeta('showcase', action.payload.playlist.length))
  yield put(actions.recievePlaylist(action.payload.playlist))
  if (action.payload.overideQueue) {
    yield put(slideshowActions.restartSlideshow('showcase'))
  }
}

function* pullInitalPlaylist() {
  try {
    // Tell redux-saga to call fetch with the specified options
    const response = yield call(fetch, '/public/user-data/showcase-media.json', { method: 'GET' })
    const reponse = yield response.json()
    const playlist = reponse.playlists[0].data.filter(item => !item.hidden)
    // Tell redux-saga to dispatch the recieveInitalPlaylist action
    yield put(slideshowActions.startSlideshowLogic('SHOWCASE', playlist.length))
    yield put(actions.recievePlaylist(playlist))
  } catch (err) {
    // You get it
    yield put(actions.errorFetchingInitalPlaylist(err))
  }
}


// TODO: Make these pick up the service actions.
export default function* () {
  yield takeEvery('SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED', checkOverride)
  yield takeEvery(actions.pullInitalPlaylist().type, pullInitalPlaylist)
}
