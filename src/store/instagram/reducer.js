import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { slideshowState } from '../slideshow/reducer'

import {
  SOCKET_INSTAGRAM_PULL_POSTS_SUCCESS,
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

      // case INSTAGRAM_NEW_POSTS_ERROR:
      //   return {
      //     ...state,
      //     message: action.message,
      //   }

      // case INSTAGRAM_UNAUTHORIZED:
      //   return {
      //     ...state,
      //     // message: action.message,
      //     status: 'auth-failed',
      //   }

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
