import { initialState } from './selectors'

import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESSFUL,
  FETCH_WEATHER_FAILED,
} from './actions'

const weather = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_WEATHER:
      return {
        ...state,
        fetching: true,
      }

    case FETCH_WEATHER_SUCCESSFUL:
      return {
        ...state,
        data: action.data,
        fetching: false,
      }

    case FETCH_WEATHER_FAILED:
      return {
        ...state,
        // message: action.message,
        fetching: false,
        reason: action.reason,
      }

    default:
      return state
  }
}

export default weather
