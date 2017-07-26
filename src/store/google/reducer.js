import unionBy from 'lodash/unionBy'
import { initialState } from './selectors'


import {
  SOCKET_GOOGLE_PULL_GETUSERS_SUCCESS,
  GOOGLE_GET_USERS_REQUEST,
  GOOGLE_UNAUTHORIZED,
} from './actions'

const google = (state = initialState, action) => {
  switch (action.type) {

    case SOCKET_GOOGLE_PULL_GETUSERS_SUCCESS:
      return {
        ...state,
        users: unionBy(action.payload, state.users, 'email'),
        status: 'request',
      }

    case GOOGLE_GET_USERS_REQUEST:
      return {
        ...state,
        message: action.message,
      }

    case GOOGLE_UNAUTHORIZED:
      return {
        ...state,
        // message: action.message,
        status: 'auth-failed',
      }

    default:
      return state
  }
}


// TODO: Spread (...) instragramReducerWrapper(), not in 'data'
export default google
