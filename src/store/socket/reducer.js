import { initialState } from './selectors'
import {
  SOCKET_CONNECT_REQUEST,
  SOCKET_CONNECT_SUCCESS,
} from './actions'

export default (state = initialState, action) => {
  switch (action.type) {

    case SOCKET_CONNECT_REQUEST:
      return {
        ...state,
        requested: true,
      }

    case SOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        connected: true,
        connection: action.socket,
      }

    default:
      return state
  }
}
