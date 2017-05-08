import unionBy from 'lodash/unionBy'
import { initialState } from './selectors'
import {
  SONOS_PULL_REQUEST,
  SONOS_READ_REQUEST,
  SONOS_READ_SUCCESS,
  SONOS_CREATE_SUCCESS,
  SONOS_NEW_STATE,
  SONOS_NEW_TOPOLOGY,
} from './actions'

export default (state = initialState, action) => {
  switch (action.type) {

    case SONOS_CREATE_SUCCESS:
      return {
        ...state,
        connected: true,
      }

    case SONOS_PULL_REQUEST:
      return {
        ...state,
        requested: true,
      }

    case SONOS_READ_REQUEST:
      return {
        ...state,
        speakers: [action.speakers],
      }

    case SONOS_READ_SUCCESS:
      return {
        ...state,
        speakers: [action.speakers],
      }

      // Check if exists in array and merge
    case SONOS_NEW_STATE:
      return {
        ...state,
        speakers: unionBy([action.speakers], state.speakers, 'uuid'),
      }

    case SONOS_NEW_TOPOLOGY:
      return {
        ...state,
        speakers: action.speakers,
      }


    default:
      return state
  }
}
