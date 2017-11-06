import { initialState } from './selectors'

import {
  UPDATE_PLAYLIST,
  PUBLISH_PLAYLIST,
  SAVE_PLAYLIST,
  DELETE_PLAYLIST_ITEM,
  IMAGE_UPLOADED,
  ADD_ENTRY_TO_PLAYLIST,
  RECIEVED_PLAYLIST_FROM_SERVER,
  UPLOAD_AND_OVERIDE_QUEUE,
  OVERIDE_QUEUE,
  GET_NEW_PLAYLIST,
  SHOW_HIDE_PLATLIST_ITEM,
  STORE_ALL_PLAYLISTS,
  ADD_NEW_PLAYLIST_TO_STORE,
} from './actions'

const saveOrPublishPlaylist = (playlist, overideQueue) => {
  let obj

  if(overideQueue) {
    playlist.isCurrent = true
    obj = {
      overideQueue,
      playlist,
    }
  } else {
    obj = {
      playlist,
    }
  }
  
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

    case GET_NEW_PLAYLIST:
      return {
        ...state,
        fetching: true,
      }

    case STORE_ALL_PLAYLISTS:
      return {
        ...state,
        allAvailablePlaylists: action.payload,
      }

    case ADD_NEW_PLAYLIST_TO_STORE:
      return {
        ...state,
        allAvailablePlaylists: [...state.allAvailablePlaylists, action.payload],
        currentPlaylist: {
          name: action.payload.name,
          id: action.payload.id,
          data: action.payload.data,
        },
      }

    case UPDATE_PLAYLIST:
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, data: action.playlist },
        saved: action.payload,
      }

    case PUBLISH_PLAYLIST:
      saveOrPublishPlaylist(state.currentPlaylist, action.overideQueue)
      
      return {
        ...state,
        saved: true,
        allAvailablePlaylists: [state.currentPlaylist, ...state.allAvailablePlaylists.filter(playlist => playlist.id !== state.currentPlaylist.id).map(list => Object.assign(list, {isCurrent: false}))],
      }

    case SAVE_PLAYLIST:
      saveOrPublishPlaylist(state.currentPlaylist)

      return {
        ...state,
        saved: true,
        allAvailablePlaylists: [...state.allAvailablePlaylists.filter(playlist => playlist.id !== state.currentPlaylist.id), state.currentPlaylist],
      }

    case DELETE_PLAYLIST_ITEM:
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, data: action.playlist.filter(item => item.id !== action.payload) },
        saved: false,
      }

    case SHOW_HIDE_PLATLIST_ITEM:
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, data: showHidePlaylistItem(action) },
        saved: false,
      }

    case IMAGE_UPLOADED:
      updateServerFilesIndex(action.payload)
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
        saved: false,
        currentPlaylist: { ...state.currentPlaylist, data: [...state.currentPlaylist.data, action.payload] },
      }

    case UPLOAD_AND_OVERIDE_QUEUE:
      updateServerFilesIndex(action.payload)
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
        saved: true,
        currentPlaylist: { ...state.currentPlaylist, data: [action.payload, ...state.currentPlaylist.data] },
      }

    case OVERIDE_QUEUE:
      return {
        ...state,
        saved: true,
        currentPlaylist: { ...state.currentPlaylist, data: [action.payload, ...state.currentPlaylist.data] },
      }

    case ADD_ENTRY_TO_PLAYLIST:
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, data: [...state.currentPlaylist.data, action.payload] },
        saved: false,
      }

    case RECIEVED_PLAYLIST_FROM_SERVER:
      return {
        ...state,
        currentPlaylist: {
          ...state.currentPlaylist,
          name: action.payload.name,
          id: action.payload.id,
          data: [...action.payload.data.filter(item => item.hidden === false), ...action.payload.data.filter(item => item.hidden === true)],
        },
        saved: true,
      }

    default:
      return state
  }
}

export default adminReducer
