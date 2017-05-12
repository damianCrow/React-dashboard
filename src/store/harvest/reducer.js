import { combineReducers } from 'redux'
import orderBy from 'lodash/orderBy'
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
        posts: orderBy(action.posts.users, [(o) => { return o.user.total_hours }], ['desc']),
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
