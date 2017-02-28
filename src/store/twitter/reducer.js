import { combineReducers } from 'redux'
import {
  INVALIDATE_TWITTER,
  REQUEST_TWITTER,
  RECEIVE_TWITTER_POSTS,
  RECEIVE_TWITTER_POSTS_ERROR,
  NEED_TO_AUTH_TWITTER,
  UPDATE_TWITTER_SLIDESHOW
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
    case INVALIDATE_TWITTER:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_TWITTER:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TWITTER_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        status: action.data.status,
        message: action.data.err,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_TWITTER_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        allPosts: action.data.data,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case NEED_TO_AUTH_TWITTER:
      return {
        ...state,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case UPDATE_TWITTER_SLIDESHOW:
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

const twitterProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_TWITTER:
    case REQUEST_TWITTER:
    case RECEIVE_TWITTER_POSTS_ERROR:
    case RECEIVE_TWITTER_POSTS:
    case NEED_TO_AUTH_TWITTER:
    case UPDATE_TWITTER_SLIDESHOW:
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
