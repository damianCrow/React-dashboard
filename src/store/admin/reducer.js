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
  GET_NEW_PLAYLIST,
  SHOW_HIDE_PLATLIST_ITEM,
} from './actions'

const publishPlaylist = (overideQueue, playlist) => {
  const obj = {
    overideQueue,
    playlist,
  }
  localStorage.setItem('playList', JSON.stringify(playlist))
  return fetch('/admin/playlist-update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
}

const updateServerFilesIndex = newUploadObj => {
  return fetch('/admin/files-index-update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUploadObj),
  })
}

const showHidePlaylistItem = (action) => {
  let updatedPlaylist
  action.playlist.map((item, idx) => {
    if (item.id === action.payload) {
      if (item.hidden === true) {
        item.hidden = false
        action.playlist.splice(idx, 1)

        updatedPlaylist = [...action.playlist.filter(item => item.hidden === false), item, ...action.playlist.filter(item => item.hidden === true)]
      } else {
        item.hidden = true
        action.playlist.splice(idx, 1)
        updatedPlaylist = [...action.playlist, item]
      }
    }
  })
  return updatedPlaylist
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SOCKET_ADMIN_PUSHPLAYLISTTOFRONT_SUCCESS':
      console.log('SOCKET_ADMIN_PUSHPLAYLISTTOFRONT_SUCCESS action', action)
      return {
        ...state,
        fetching: false,
      }

    case GET_NEW_PLAYLIST:
      return {
        ...state,
        fetching: true,
      }

    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
        saved: action.payload,
      }

    case PUBLISH_PLAYLIST:
      publishPlaylist(action.overideQueue, state.playlist)
      return {
        ...state,
        saved: true,
      }

    case DELETE_PLAYLIST_ITEM:
      return {
        ...state,
        playlist: action.playlist.filter(item => item.id !== action.payload),
        saved: false,
      }

    case SHOW_HIDE_PLATLIST_ITEM:
      return {
        ...state,
        playlist: showHidePlaylistItem(action),
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
        playlist: [...state.playlist, ...action.payload.filter(item => item.hidden === false), ...action.payload.filter(item => item.hidden === true)],
        saved: true,
      }

    default:
      return state
  }
}

export default adminReducer
