export const REQUEST_SHOWCASE = 'REQUEST_SHOWCASE'
export const INVALIDATE_SHOWCASE = 'INVALIDATE_SHOWCASE'

// Server actions.
export const SHOWCASE_NEW_POSTS = 'SHOWCASE_NEW_POSTS'
export const SHOWCASE_NEW_POSTS_ERROR = 'SHOWCASE_NEW_POSTS_ERROR'

export const storeServerPlaylist = (playlist) => ({
  type: SHOWCASE_NEW_POSTS,
  playlist,
})

export const newShowcasePostsError = (err) => ({
  type: SHOWCASE_NEW_POSTS_ERROR,
  message: err,
})

