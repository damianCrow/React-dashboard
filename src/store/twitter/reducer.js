import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { slideshowState } from '../slideshow/reducer'

import {
  TWITTER_NEW_POSTS,
  TWITTER_NEW_POSTS_ERROR,
  TWITTER_UNAUTHORIZED,
} from './actions'

function twitterReducerWrapper() {
  return function (state = initialState, action) {
    switch (action.type) {

      case TWITTER_NEW_POSTS:
        return {
          ...state,
          posts: action.posts,
          status: 'success',
        }

      case TWITTER_NEW_POSTS_ERROR:
        return {
          ...state,
          message: action.message,
        }

      case TWITTER_UNAUTHORIZED:
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
  data: twitterReducerWrapper(),
  slideshow: slideshowState('TWITTER'),
})
