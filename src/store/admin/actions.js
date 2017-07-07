export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const DELETE_PLAYLIST_ITEM = 'DELETE_PLAYLIST_ITEM'
export const PUBLISH_PLAYLIST = 'PUBLISH_PLAYLIST'
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
export const ADD_ENTRY_TO_PLAYLIST = 'ADD_ENTRY_TO_PLAYLIST'
export const RECIEVED_PLAYLIST_FROM_SERVER = 'RECIEVED_PLAYLIST_FROM_SERVER'

export const updatePlaylist = (playlist, savedState) => ({
  type: UPDATE_PLAYLIST,
  playlist,
  payload: savedState,
})

export const deletePlaylistItem = (playlist, item) => ({
  type: DELETE_PLAYLIST_ITEM,
  playlist,
  payload: item.target.id,
})

export const publishPlaylist = (playlist) => ({
  type: PUBLISH_PLAYLIST,
  playlist,
})

export const uploadImage = (formData) => ({
  type: UPLOAD_IMAGE,
  payload: formData,
})

export const addEntryToPlaylist = (entryObj) => ({
  type: ADD_ENTRY_TO_PLAYLIST,
  payload: entryObj,
})

export const recievedPlaylistFromServer = (playlistFromServer) => ({
  type: RECIEVED_PLAYLIST_FROM_SERVER,
  payload: playlistFromServer,
})
