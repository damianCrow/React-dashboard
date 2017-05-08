import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { slideshowState } from '../slideshow/reducer'

import {
  INSTAGRAM_NEW_POSTS,
  INSTAGRAM_NEW_POSTS_ERROR,
  INSTAGRAM_UNAUTHORIZED,
} from './actions'

function instagramReducerWrapper() {
  return function (state = initialState, action) {
    switch (action.type) {

      case INSTAGRAM_NEW_POSTS:
        return {
          ...state,
          posts: action.posts,
          status: 'success',
        }

      case INSTAGRAM_NEW_POSTS_ERROR:
        return {
          ...state,
          message: action.message,
        }

      case INSTAGRAM_UNAUTHORIZED:
        return {
          ...state,
          // message: action.message,
          status: 'auth-failed',
        }

      default:
        return state
    }
  }
}

// TODO: Spread (...) instragramReducerWrapper(), not in 'data'
export default combineReducers({
  data: instagramReducerWrapper(),
  slideshow: slideshowState('INSTAGRAM'),
})
