import { initialState } from './selectors'

import {
  UPDATE_PLAYLIST,
  PUBLISH_PLAYLIST,
} from './actions'

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
        saved: action.saved,
      }

    case PUBLISH_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
      }

    default:
      return state
  }
}

export default adminReducer
