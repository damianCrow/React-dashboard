import { combineReducers } from 'redux'
// import orderBy from 'lodash/orderBy'
import { statusInitialState, dataInitialState } from './selectors'
import {
  HARVEST_NEW_POSTS_ERROR,
  SOCKET_HARVEST_PULL_GETUSERSANDTIMES_SUCCESS,
  SOCKET_HARVEST_PULL_GETUSERSANDTIMES_FAILED,
} from './actions'

const harvestStatus = (state = statusInitialState, action) => {
  switch (action.type) {
    case SOCKET_HARVEST_PULL_GETUSERSANDTIMES_SUCCESS:
      return {
        ...state,
        status: 'success',
      }

    case HARVEST_NEW_POSTS_ERROR:
      return {
        ...state,
        message: action.message,
      }

    case SOCKET_HARVEST_PULL_GETUSERSANDTIMES_FAILED:
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
    case SOCKET_HARVEST_PULL_GETUSERSANDTIMES_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({ data: harvestProcess, status: harvestStatus })

export default rootReducer
