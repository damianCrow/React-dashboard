export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const DELETE_PLAYLIST_ITEM = 'DELETE_PLAYLIST_ITEM'
export const PUBLISH_PLAYLIST = 'PUBLISH_PLAYLIST'
export const GET_NEW_PLAYLIST = 'GET_NEW_PLAYLIST'
export const GOT_NEW_PLAYLIST = 'GOT_NEW_PLAYLIST'
export const IMAGE_UPLOADED = 'IMAGE_UPLOADED'
export const ADD_ENTRY_TO_PLAYLIST = 'ADD_ENTRY_TO_PLAYLIST'
export const RECIEVED_PLAYLIST_FROM_SERVER = 'RECIEVED_PLAYLIST_FROM_SERVER'
export const UPLOAD_AND_OVERIDE_QUEUE = 'UPLOAD_AND_OVERIDE_QUEUE'
export const OVERIDE_QUEUE = 'OVERIDE_QUEUE'
export const SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED = 'SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED'

export const getNewPlaylist = () => ({
  type: GET_NEW_PLAYLIST,
  fetching: true,
})

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

export const publishPlaylist = (overideQueue) => ({
  type: PUBLISH_PLAYLIST,
  overideQueue,
})

export const imageUploaded = (newImageObj) => ({
  type: IMAGE_UPLOADED,
  payload: newImageObj,
})

export const addEntryToPlaylist = (entryObj) => ({
  type: ADD_ENTRY_TO_PLAYLIST,
  payload: entryObj,
})

export const recievedPlaylistFromServer = (playlistFromServer) => ({
  type: RECIEVED_PLAYLIST_FROM_SERVER,
  payload: playlistFromServer,
})

export const uploadAndOverideQueue = (newItem) => ({
  type: UPLOAD_AND_OVERIDE_QUEUE,
  payload: newItem,
})

export const overideQueue = (newItem) => ({
  type: OVERIDE_QUEUE,
  payload: newItem,
})
