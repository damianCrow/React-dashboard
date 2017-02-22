import { combineReducers } from 'redux'
import {
  INVALIDATE_SHOWCASE,
  REQUEST_SHOWCASE,
  RECEIVE_SHOWCASE_POSTS,
  RECEIVE_SHOWCASE_POSTS_ERROR,
  NEED_TO_AUTH_SHOWCASE,
  UPDATE_SHOWCASE_SLIDESHOW
} from '../actions'

const posts = (state = {
  didInvalidate: false,
  isFetching: false,
  livePlaylistItems: [],
  message: '',
  slideShow: {currentPost: {}, currentInt: 0, mediaType: ''},
  status: ''
}, action) => {
  switch (action.type) {
    case INVALIDATE_SHOWCASE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_SHOWCASE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_SHOWCASE_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        status: action.data.status,
        message: action.data.err,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_SHOWCASE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        livePlaylistItems: action.data.livePlaylist.media,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case NEED_TO_AUTH_SHOWCASE:
      return {
        ...state,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case UPDATE_SHOWCASE_SLIDESHOW:
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

const showcaseProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SHOWCASE:
    case REQUEST_SHOWCASE:
    case RECEIVE_SHOWCASE_POSTS_ERROR:
    case RECEIVE_SHOWCASE_POSTS:
    case NEED_TO_AUTH_SHOWCASE:
    case UPDATE_SHOWCASE_SLIDESHOW:
      return {
        ...state,
        showcaseDetails: posts(state.showcaseDetails, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  showcaseProcess
})

export default rootReducer
