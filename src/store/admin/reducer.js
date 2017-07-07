import { initialState } from './selectors'

import {
  UPDATE_PLAYLIST,
  PUBLISH_PLAYLIST,
  DELETE_PLAYLIST_ITEM,
  UPLOAD_IMAGE,
  ADD_ENTRY_TO_PLAYLIST,
  RECIEVED_PLAYLIST_FROM_SERVER,
} from './actions'

// const deleteListItem = (playlist, itemId) => playlist.filter((item) => item.id !== itemId)

const processImageUpload = (formData) => {
  fetch('/admin/upload', {
    method: 'post',
    body: formData,
  }).then((res) => {
    console.log(res)
  })
}

const publishPlaylist = (playlist) => {
  console.log('hgweigiweg')
  fetch('/admin/playlist-update', {
    method: 'post',
    body: playlist,
  }).then((res) => {
    console.log(res)
  })
}

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
        playlist: publishPlaylist(action.playlist),
      }

    case DELETE_PLAYLIST_ITEM:
      return {
        ...state,
        playlist: action.playlist.filter((item) => item.id !== action.payload),
        saved: false,
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadedFiles: processImageUpload(action.payload),
        saved: false,
      }
    case ADD_ENTRY_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
        saved: false,
      }
    case RECIEVED_PLAYLIST_FROM_SERVER:
      return {
        ...state,
        playlist: [...state.playlist, ...action.payload],
        saved: true,
      }

    default:
      return state
  }
}

export default adminReducer
