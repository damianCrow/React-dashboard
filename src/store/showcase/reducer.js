import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { SHOWCASE_NEW_POSTS } from './actions'
import { GOT_NEW_PLAYLIST } from '../admin/actions'
import { slideshowState } from '../slideshow/reducer'

function showcaseReducerWrapper() {
  return (state = initialState, action) => {
    switch (action.type) {
      case GOT_NEW_PLAYLIST:
        return {
          ...state,
          fetching: false,
          playlist: action.payload.playlist,
        }
      case SHOWCASE_NEW_POSTS:
        return {
          ...state,
          playlist: action.playlist,
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
