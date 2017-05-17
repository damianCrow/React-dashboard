export const REQUEST_HARVEST = 'REQUEST_HARVEST'
export const INVALIDATE_HARVEST = 'INVALIDATE_HARVEST'

export const HARVEST_UNAUTHORIZED = 'HARVEST_UNAUTHORIZED'

// Server actions.
export const HARVEST_NEW_POSTS = 'HARVEST_NEW_POSTS'
export const HARVEST_NEW_POSTS_ERROR = 'HARVEST_NEW_POSTS_ERROR'
export const RECEIVE_HARVEST_POSTS_ERROR = 'RECEIVE_HARVEST_POSTS_ERROR'
export const NEED_TO_AUTH_HARVEST = 'NEED_TO_AUTH_HARVEST'

// export const invalidateSonosData = ({
//   type: INVALIDATE_HARVEST
// })

export const newHarvestPosts = (users) => ({
  type: HARVEST_NEW_POSTS,
  users,
})

export const newHarvestPostsError = (err) => ({
  type: HARVEST_NEW_POSTS_ERROR,
  message: err,
})

export const harvestUnauthorized = () => ({
  type: HARVEST_UNAUTHORIZED,
})
