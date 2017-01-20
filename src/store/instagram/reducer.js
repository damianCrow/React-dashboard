import { combineReducers } from 'redux'
import {
  INVALIDATE_INSTAGRAM,
  REQUEST_INSTAGRAM,
  RECEIVE_INSTAGRAM_POSTS,
  RECEIVE_INSTAGRAM_POSTS_ERROR,
  NEED_TO_AUTH_INSTAGRAM,
  UPDATE_INSTAGRAM_SLIDESHOW
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
        status: action.data.status,
        message: action.data.err,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_INSTAGRAM_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        allPosts: action.data.data,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case NEED_TO_AUTH_INSTAGRAM:
      return {
        ...state,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case UPDATE_INSTAGRAM_SLIDESHOW:
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

const instagramProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_INSTAGRAM:
    case REQUEST_INSTAGRAM:
    case RECEIVE_INSTAGRAM_POSTS_ERROR:
    case RECEIVE_INSTAGRAM_POSTS:
    case NEED_TO_AUTH_INSTAGRAM:
    case UPDATE_INSTAGRAM_SLIDESHOW:
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
