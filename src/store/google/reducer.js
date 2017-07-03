import { initialState } from './selectors'

import {
  GOOGLE_GOT_USERS,
  GOOGLE_GET_USERS_REQUEST,
  GOOGLE_UNAUTHORIZED,
} from './actions'

const google = (state = initialState, action) => {
  switch (action.type) {

    case GOOGLE_GOT_USERS:
      return {
        ...state,
        users: action.users,
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
