import { combineReducers } from 'redux'
import { INVALIDATE_SONOS, REQUEST_POSTS, RECEIVE_POSTS, MESSAGE } from '../actions'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SONOS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case MESSAGE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [action.data],
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const musicInfoFromSonos = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SONOS:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case MESSAGE:
      return {
        ...state,
        sonosData: posts(state.sonosData, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  musicInfoFromSonos
})

export default rootReducer
