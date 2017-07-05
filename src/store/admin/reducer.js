import { initialState } from './selectors'

import {
  UPDATE_PLAYLIST,
  PUBLISH_PLAYLIST,
  DELETE_PLAYLIST_ITEM,
} from './actions'

// const deleteListItem = (playlist, itemId) => playlist.filter((item) => item.id !== itemId)


const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
        saved: action.payload,
      }

    case PUBLISH_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
      }

    case DELETE_PLAYLIST_ITEM:
      return {
        ...state,
        playlist: action.playlist.filter((item) => item.id !== action.payload),
        saved: false,
      }

    default:
      return state
  }
}
// function reducer (state = initialState, action){
//     switch(action.type){
//         case NEW_NOTIFICATION:
//         return Object.assign({}, state, {
//             playlist: [ ...state.playlist, action.payload ]
//         });
//         case CLEAR_SINGLE_NOTIFICATION:
//         return Object.assign({}, state, {
//             playlist: deleteSingleNotification(state.playlist, action.payload)
//         });
//         case CLEAR_ALL_playlist:
//         return Object.assign({}, state, {
//             playlist: []
//         });
//         default:
//         return state;
//     }
// }

export default adminReducer
