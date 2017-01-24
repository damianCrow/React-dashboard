import { combineReducers } from 'redux'
import {
  INVALIDATE_CALENDAR,
  REQUEST_CALENDAR,
  RECEIVE_CALENDAR_POSTS,
  RECEIVE_CALENDAR_POSTS_ERROR,
  NEED_TO_AUTH_CALENDAR,
  UPDATE_CALENDAR_SLIDESHOW
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
    case INVALIDATE_CALENDAR:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CALENDAR:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CALENDAR_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        status: action.data.status,
        message: action.data.err,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_CALENDAR_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        allPosts: action.data.data,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case NEED_TO_AUTH_CALENDAR:
      return {
        ...state,
        status: action.data.status,
        lastUpdated: action.receivedAt
      }
    case UPDATE_CALENDAR_SLIDESHOW:
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

const calendarProcess = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_CALENDAR:
    case REQUEST_CALENDAR:
    case RECEIVE_CALENDAR_POSTS_ERROR:
    case RECEIVE_CALENDAR_POSTS:
    case NEED_TO_AUTH_CALENDAR:
    case UPDATE_CALENDAR_SLIDESHOW:
      return {
        ...state,
        calendarDetails: posts(state.calendarDetails, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  calendarProcess
})

export default rootReducer
