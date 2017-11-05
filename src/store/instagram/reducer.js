import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { slideshowState } from '../slideshow/reducer'

import {
  SOCKET_INSTAGRAM_PULL_POSTS_SUCCESS,
  SOCKET_INSTAGRAM_EMIT_POSTS_RECEIVED,
} from './actions'

function instagramReducerWrapper() {
  return (state = initialState, action) => {
    switch (action.type) {
      case SOCKET_INSTAGRAM_PULL_POSTS_SUCCESS:
        return {
          ...state,
          posts: action.payload,
          status: 'success',
        }

      case SOCKET_INSTAGRAM_EMIT_POSTS_RECEIVED:
        return {
          ...state,
          posts: action.payload,
          status: 'success',
        }

      default:
        return state
    }
  }
}

// TODO: Spread (...) instragramReducerWrapper(), not in 'data'
export default combineReducers({
  data: instagramReducerWrapper(),
  slideshow: slideshowState('INSTAGRAM', 'CAROUSEL'),
})
