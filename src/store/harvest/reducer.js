import { combineReducers } from 'redux'
// import orderBy from 'lodash/orderBy'
import { statusInitialState, dataInitialState } from './selectors'
import {
  HARVEST_NEW_POSTS,
  HARVEST_NEW_POSTS_ERROR,
  HARVEST_UNAUTHORIZED,
} from './actions'

const harvestStatus = (state = statusInitialState, action) => {
  switch (action.type) {
    case HARVEST_NEW_POSTS:
      return {
        ...state,
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

const harvestProcess = (state = dataInitialState, action) => {
  switch (action.type) {
    case HARVEST_NEW_POSTS:
      return {
        ...state,
        users: action.users.users,
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({ data: harvestProcess, status: harvestStatus })

export default rootReducer
