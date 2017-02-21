import { combineReducers } from 'redux'
import {
  INVALIDATE_HARVEST,
  REQUEST_HARVEST,
  RECEIVE_HARVEST_POSTS,
  RECEIVE_HARVEST_POSTS_ERROR,
  NEED_TO_AUTH_HARVEST,
  UPDATE_HARVEST_SLIDESHOW
} from '../actions'

const posts = (state = {
  didInvalidate: false,
  isFetching: false,
  allPosts: [],
  message: '',
  slideShow: {currentPost: {}, currentInt: 0, mediaType: ''},
  status: ''
}, action) => {
  switch (action.type) {
    case INVALIDATE_HARVEST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_HARVEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_HARVEST_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        status: action.data.status,
        message: action.data.err,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_HARVEST_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        allPosts: action.data,
        lastUpdated: action.receivedAt
      }
    case NEED_TO_AUTH_HARVEST:
      return {
        ...state,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case UPDATE_HARVEST_SLIDESHOW:
      return {
        ...state,
        slideShow: {
          currentPost: action.slideShow.currentPost,
          currentInt: action.slideShow.currentInt,
          mediaType: action.slideShow.mediaType
        }
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

const harvestProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_HARVEST:
    case REQUEST_HARVEST:
    case RECEIVE_HARVEST_POSTS_ERROR:
    case RECEIVE_HARVEST_POSTS:
    case NEED_TO_AUTH_HARVEST:
    case UPDATE_HARVEST_SLIDESHOW:
      return {
        ...state,
        harvestDetails: posts(state.harvestDetails, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  harvestProcess
})

export default rootReducer
