export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const DELETE_PLAYLIST_ITEM = 'DELETE_PLAYLIST_ITEM'
export const PUBLISH_PLAYLIST = 'PUBLISH_PLAYLIST'

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
