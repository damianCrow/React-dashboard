import { combineReducers } from 'redux'
import { initialState } from './selectors'
import {
  HARVEST_NEW_POSTS,
  HARVEST_NEW_POSTS_ERROR,
  HARVEST_UNAUTHORIZED,
} from './actions'

const harvestProcess = (state = initialState, action) => {
  switch (action.type) {
    case HARVEST_NEW_POSTS:
      return {
        ...state,
        posts: action.posts.users,
        status: 'success',
      }

    case HARVEST_NEW_POSTS_ERROR:
      return {
        ...state,
        message: action.message,
      }

    case HARVEST_UNAUTHORIZED:
      return {
        ...state,
        status: 'auth-failed',
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({ data: harvestProcess })

export default rootReducer
