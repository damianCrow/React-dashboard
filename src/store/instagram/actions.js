export const REQUEST_INSTAGRAM = 'REQUEST_INSTAGRAM'
export const INVALIDATE_INSTAGRAM = 'INVALIDATE_INSTAGRAM'

export const INSTAGRAM_UNAUTHORIZED = 'INSTAGRAM_UNAUTHORIZED'

// Server actions.
export const INSTAGRAM_NEW_POSTS = 'INSTAGRAM_NEW_POSTS'
export const INSTAGRAM_NEW_POSTS_ERROR = 'INSTAGRAM_NEW_POSTS_ERROR'
export const RECEIVE_INSTAGRAM_POSTS_ERROR = 'RECEIVE_INSTAGRAM_POSTS_ERROR'
export const NEED_TO_AUTH_INSTAGRAM = 'NEED_TO_AUTH_INSTAGRAM'

// export const invalidateSonosData = ({
//   type: INVALIDATE_INSTAGRAM
// })

export const newInstagramPosts = (posts) => ({
  type: INSTAGRAM_NEW_POSTS,
  posts: posts.posts,
})

export const newInstagramPostsError = (err) => ({
  type: INSTAGRAM_NEW_POSTS_ERROR,
  message: err,
})

export const instagramUnauthorized = () => ({
  type: INSTAGRAM_UNAUTHORIZED,
})
