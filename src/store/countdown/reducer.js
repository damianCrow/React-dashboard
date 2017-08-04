import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { slideshowState } from '../slideshow/reducer'

import {
  FETCH_COUNTDOWN,
  FETCH_COUNTDOWN_SUCCESSFUL,
  FETCH_COUNTDOWN_FAILED,
} from './actions'

function countdownReducerWrapper() {
  return (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COUNTDOWN:
        return {
          ...state,
          fetching: true,
        }

      case FETCH_COUNTDOWN_SUCCESSFUL:
        return {
          ...state,
          events: action.data.events,
          fetching: false,
        }

      case FETCH_COUNTDOWN_FAILED:
        return {
          ...state,
          // message: action.message,
          fetching: false,
          message: action.reason,
        }

      default:
        return state
    }
  }
}

// TODO: Spread (...) instragramReducerWrapper(), not in 'data'
export default combineReducers({
  data: countdownReducerWrapper(),
  slideshow: slideshowState('COUNTDOWN'),
})
