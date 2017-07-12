import { initialState } from './selectors'
import { GOT_NEW_PLAYLIST } from '../admin/actions'

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_NEW_PLAYLIST:
      return {
        ...state,
        fetching: false,
        playlist: action.playlist,
      }
    default:
      return state
  }
}
