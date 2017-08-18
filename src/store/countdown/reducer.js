import moment from 'moment'

import { combineReducers } from 'redux'
import { initialState } from './selectors'
import { slideshowState } from '../slideshow/reducer'

import {
  FETCH_COUNTDOWN,
  FETCH_COUNTDOWN_SUCCESSFUL,
  FETCH_COUNTDOWN_FAILED,
} from './actions'

function sortEvents(events) {
  events.sort((a, b) => (moment(a.endDateTime, 'DD-MM-YYYY HH:mm:ss').unix() - moment(b.endDateTime, 'DD-MM-YYYY HH:mm:ss').unix()))
  events.map(event => {
    const eventUnix = event
    eventUnix.unixStart = moment(event.startDateTime, 'DD-MM-YYYY HH:mm:ss').unix()
    return eventUnix
  })
  return events
}

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
          events: sortEvents(action.data.events),
          fetching: false,
        }

      case FETCH_COUNTDOWN_FAILED:
        return {
          ...state,
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
