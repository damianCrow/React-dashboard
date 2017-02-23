import { combineReducers } from 'redux'
import {
  INVALIDATE_SONOS,
  REQUEST_SONOS,
  RECEIVE_SONOS_GROUPS,
  RECEIVE_SONOS_STATE,
  RECEIVE_SONOS_POSTS_ERROR,
  UPDATE_SONOS_STATES,
  NEED_TO_AUTH_SONOS
} from '../actions'

const posts = (state = {
  didInvalidate: false,
  isFetching: false,
  message: '',
  status: '',
  groups: [],
  newSonosState: {},
  sonosStates: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SONOS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_SONOS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_SONOS_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        status: action.data.status,
        message: action.data.err,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_SONOS_GROUPS:
      return {
        ...state,
        groups: action.data.data,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_SONOS_STATE:
      return {
        ...state,
        newSonosState: action.data.data,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case UPDATE_SONOS_STATES:
      return {
        ...state,
        sonosStates: action.data
      }
    case NEED_TO_AUTH_SONOS:
      return {
        ...state,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const sonosProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SONOS:
    case REQUEST_SONOS:
    case RECEIVE_SONOS_POSTS_ERROR:
    case RECEIVE_SONOS_GROUPS:
    case RECEIVE_SONOS_STATE:
    case UPDATE_SONOS_STATES:
    case NEED_TO_AUTH_SONOS:
      return {
        ...state,
        sonosDetails: posts(state.sonosDetails, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sonosProcess
})

export default rootReducer
