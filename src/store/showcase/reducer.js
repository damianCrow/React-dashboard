import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { SHOWCASE_FETCH_PLAYLIST, SHOWCASE_RECIEVE_PLAYLIST, UPDATE_COUNTDOWN } from './actions'
import { SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED } from '../admin/actions'
import { slideshowState } from '../slideshow/reducer'

function showcaseReducerWrapper() {
  return (state = initialState, action) => {
    switch (action.type) {
      case SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED:
        return {
          ...state,
          playlist: action.payload.playlist,
          fetching: false,
        }
      case SHOWCASE_FETCH_PLAYLIST:
        return {
          ...state,
          fetching: true,
        }
      case SHOWCASE_RECIEVE_PLAYLIST:
        return {
          ...state,
          playlist: action.playlist,
          fetching: false,
        }
      case UPDATE_COUNTDOWN:
        // console.log('new countdown', action.payload)
        return {
          ...state,
          countDown: action.payload,
        }
      default:
        return state
    }
  }
}

// TODO: Spread (...) instragramReducerWrapper(), not in 'data'
export default combineReducers({
  data: showcaseReducerWrapper(),
  slideshow: slideshowState('SHOWCASE'),
})
