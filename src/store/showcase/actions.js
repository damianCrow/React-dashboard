export const REQUEST_SHOWCASE = 'REQUEST_SHOWCASE'
export const INVALIDATE_SHOWCASE = 'INVALIDATE_SHOWCASE'
export const UPDATE_COUNTDOWN = 'UPDATE_COUNTDOWN'

// Server actions.
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

