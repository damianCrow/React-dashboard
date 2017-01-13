import { combineReducers } from 'redux'
import { INVALIDATE_INSTAGRAM, REQUEST_INSTAGRAM, RECEIVE_INSTAGRAM_POSTS, RECEIVE_INSTAGRAM_POSTS_ERROR } from '../actions'

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
  items: [],
  status: ''
}, action) => {
  switch (action.type) {
    case INVALIDATE_INSTAGRAM:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_INSTAGRAM:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_INSTAGRAM_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        status: action.data,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_INSTAGRAM_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.data.data,
        status: action.data.status,
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

const instagramProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_INSTAGRAM:
    case REQUEST_INSTAGRAM:
    case RECEIVE_INSTAGRAM_POSTS_ERROR:
    case RECEIVE_INSTAGRAM_POSTS:
      return {
        ...state,
        instagramDetails: posts(state.instagramDetails, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  instagramProcess
})

export default rootReducer
