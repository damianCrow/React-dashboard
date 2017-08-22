import { combineReducers } from 'redux'
// import orderBy from 'lodash/orderBy'
import { statusInitialState, dataInitialState } from './selectors'
import {
  HARVEST_NEW_POSTS_ERROR,
  HARVEST_PULL_GETUSERSANDTIMES_SUCCESS,
  HARVEST_PULL_GETUSERSANDTIMES_ERROR,
  UPDATE_HARVEST_SORTING,
} from './actions'

const harvestStatus = (state = statusInitialState, action) => {
  switch (action.type) {
    case HARVEST_PULL_GETUSERSANDTIMES_SUCCESS:
      return {
        ...state,
        status: 'success',
      }

    case HARVEST_NEW_POSTS_ERROR:
      return {
        ...state,
        message: action.message,
      }

    case HARVEST_PULL_GETUSERSANDTIMES_ERROR:
      return {
        ...state,
        status: action.message,
      }

    case UPDATE_HARVEST_SORTING:
      return {
        ...state,
        sortBy: action.payload,
      }

    default:
      return state
  }
}

const harvestProcess = (state = dataInitialState, action) => {
  switch (action.type) {
    case HARVEST_PULL_GETUSERSANDTIMES_SUCCESS:
      return {
        ...state,
        users: action.users,
      }

    case HARVEST_PULL_GETUSERSANDTIMES_ERROR:
      return {
        ...state,
        message: action.message,
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({ data: harvestProcess, status: harvestStatus })

export default rootReducer
