import { combineReducers } from 'redux'
import { INVALIDATE_SONOS, REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions'

// const selectedReddit = (state = 'reactjs', action) => {
//   switch (action.type) {
//     case SELECT_REDDIT:
//       return action.reddit
//     default:
//       return state
//   }
// }

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
    case REQUEST_TWEETS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TWEETS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

// const sonosInfoStream = (state = { }, action) => {
//   switch (action.type) {
//     case MESSAGE:
//       return Object.assign({}, {
//         message: action.data
//       })
//     default:
//       return state
//   }
// }

const twitterProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SONOS:
    case REQUEST_TWEETS:
    case RECEIVE_TWEETS:
      return {
        ...state,
        twitterDetails: posts(state.twitterDetails, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  twitterProcess
})

export default rootReducer
