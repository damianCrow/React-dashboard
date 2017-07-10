import { initialState } from './selectors'

import {
  UPDATE_PLAYLIST,
  PUBLISH_PLAYLIST,
  DELETE_PLAYLIST_ITEM,
  IMAGE_UPLOADED,
  ADD_ENTRY_TO_PLAYLIST,
  RECIEVED_PLAYLIST_FROM_SERVER,
} from './actions'

const publishPlaylist = (playlist) => {
  return fetch('/admin/playlist-update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  }).then((response) => response.json()).then(() => {
    fetch('/public/user-data/showcase-media.json')
      .then((response) => response.json())
      .then((j) => localStorage.setItem('playList', JSON.stringify(j.playlist)))
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
      publishPlaylist(state.playlist)
      return {
        ...state,
        saved: true,
      }

    case DELETE_PLAYLIST_ITEM:
      return {
        ...state,
        playlist: action.playlist.filter((item) => item.id !== action.payload),
        saved: false,
      }

    case IMAGE_UPLOADED:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
        saved: false,
        playlist: [...state.playlist, action.payload],
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
