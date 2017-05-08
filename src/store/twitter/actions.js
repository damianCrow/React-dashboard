export const REQUEST_TWITTER = 'REQUEST_TWITTER'
export const INVALIDATE_TWITTER = 'INVALIDATE_TWITTER'

export const TWITTER_UNAUTHORIZED = 'TWITTER_UNAUTHORIZED'

// Server actions.
export const TWITTER_NEW_POSTS = 'TWITTER_NEW_POSTS'
export const TWITTER_NEW_POSTS_ERROR = 'TWITTER_NEW_POSTS_ERROR'
export const RECEIVE_TWITTER_POSTS_ERROR = 'RECEIVE_TWITTER_POSTS_ERROR'
export const NEED_TO_AUTH_TWITTER = 'NEED_TO_AUTH_TWITTER'

// export const invalidateSonosData = ({
//   type: INVALIDATE_TWITTER
// })

export const newTwitterPosts = (posts) => ({
  type: TWITTER_NEW_POSTS,
  posts: posts.posts,
})

export const newTwitterPostsError = (err) => ({
  type: TWITTER_NEW_POSTS_ERROR,
  message: err,
})

export const twitterUnauthorized = () => ({
  type: TWITTER_UNAUTHORIZED,
})
