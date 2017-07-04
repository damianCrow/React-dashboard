export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const UPDATE_SAVE_STATE = 'UPDATE_SAVE_STATE'
export const PUBLISH_PLAYLIST = 'PUBLISH_PLAYLIST'

export const updatePlaylist = (playlist, savedState) => ({
  type: UPDATE_PLAYLIST,
  playlist,
  saved: savedState,
})

// export const updateSaveState = (playlist) => ({
//   type: UPDATE_SAVE_STATE,
//   playlist,
// })

export const publishPlaylist = (playlist) => ({
  type: PUBLISH_PLAYLIST,
  playlist,
})
