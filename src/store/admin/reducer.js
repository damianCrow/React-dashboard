import { initialState } from './selectors'

import {
  UPDATE_PLAYLIST,
  PUBLISH_PLAYLIST,
  DELETE_PLAYLIST_ITEM,
  IMAGE_UPLOADED,
  ADD_ENTRY_TO_PLAYLIST,
  RECIEVED_PLAYLIST_FROM_SERVER,
  UPLOAD_AND_OVERIDE_QUEUE,
  OVERIDE_QUEUE,
} from './actions'

const publishPlaylist = (playlist) => {
  localStorage.setItem('playList', JSON.stringify(playlist))
  return fetch('/admin/playlist-update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  }).then((response) => response.json()).then((res) => {
    console.log(res)
  })
}

const updateServerFilesIndex = (newUploadObj) => {
  return fetch('/admin/files-index-update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUploadObj),
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
      updateServerFilesIndex(action.payload)
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
        saved: false,
        playlist: [...state.playlist, action.payload],
      }

    case UPLOAD_AND_OVERIDE_QUEUE:
      updateServerFilesIndex(action.payload)
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
        saved: true,
        playlist: [action.payload, ...state.playlist],
      }

    case OVERIDE_QUEUE:
      return {
        ...state,
        saved: true,
        playlist: [action.payload, ...state.playlist],
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
