export const REQUEST_SHOWCASE = 'REQUEST_SHOWCASE'
export const INVALIDATE_SHOWCASE = 'INVALIDATE_SHOWCASE'
export const UPDATE_COUNTDOWN = 'UPDATE_COUNTDOWN'
export const SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED = 'SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED'
export const SHOWCASE_NEW_POSTS = 'SHOWCASE_NEW_POSTS'
export const SHOWCASE_NEW_POSTS_ERROR = 'SHOWCASE_NEW_POSTS_ERROR'

export const storeServerPlaylist = (playlist) => ({
  type: SHOWCASE_NEW_POSTS,
  playlist,
})

export const updateCountdown = (newTime) => ({
  type: UPDATE_COUNTDOWN,
  payload: newTime,
})

export const newShowcasePostsError = (err) => ({
  type: SHOWCASE_NEW_POSTS_ERROR,
  message: err,
})