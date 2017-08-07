import { combineReducers } from 'redux'
import { initialState } from './selectors'

import {
  SOCKET_GOOGLE_PULL_OUTOFOFFICECALENDAR_SUCCESS,
  SOCKET_GOOGLE_PULL_CALENDAR_SUCCESS,
} from './actions'

function meetingsCalendarReducer() {
  return (state = initialState, action) => {
    switch (action.type) {

      case SOCKET_GOOGLE_PULL_CALENDAR_SUCCESS:
        return {
          ...state,
          data: action.payload,
          status: 'success',
        }

      default:
        return state
    }
  }
}

function outOfOfficeCalendarReducer() {
  return (state = initialState, action) => {
    switch (action.type) {

      case SOCKET_GOOGLE_PULL_OUTOFOFFICECALENDAR_SUCCESS:
        return {
          ...state,
          data: action.payload,
          status: 'success',
        }

      default:
        return state
    }
  }
}

export default combineReducers({
  meetings: meetingsCalendarReducer(),
  outOfOffice: outOfOfficeCalendarReducer(),
})
