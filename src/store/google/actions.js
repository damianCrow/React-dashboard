export const REQUEST_GOOGLE = 'REQUEST_GOOGLE'
export const INVALIDATE_GOOGLE = 'INVALIDATE_GOOGLE'

export const GOOGLE_UNAUTHORIZED = 'GOOGLE_UNAUTHORIZED'

export const GOOGLE_GET_USERS = 'GOOGLE_GET_USERS'

// Server actions.
export const SOCKET_GOOGLE_PULL_GETUSERS_SUCCESS = 'SOCKET_GOOGLE_PULL_GETUSERS_SUCCESS'
export const GOOGLE_GET_USERS_REQUEST = 'GOOGLE_GET_USERS_REQUEST'
export const GOOGLE_NEW_POSTS_ERROR = 'GOOGLE_NEW_POSTS_ERROR'
export const RECEIVE_GOOGLE_POSTS_ERROR = 'RECEIVE_GOOGLE_POSTS_ERROR'
export const NEED_TO_AUTH_GOOGLE = 'NEED_TO_AUTH_GOOGLE'

// export const invalidateSonosData = ({
//   type: INVALIDATE_GOOGLE
// })

export const getGoogleUsers = (users) => {
  // console.log('getGoogleUsers action fired')
  return {
    type: GOOGLE_GET_USERS,
    users,
  }
}

// export const gotGoogleUsers = (users) => ({
//   type: GOOGLE_GOT_USERS,
//   users,
// })

export const googleGetUsersRequest = (users) => ({
  type: GOOGLE_GET_USERS_REQUEST,
  users,
})

export const newGooglePostsError = (err) => ({
  type: GOOGLE_NEW_POSTS_ERROR,
  message: err,
})

export const googleUnauthorized = () => ({
  type: GOOGLE_UNAUTHORIZED,
})
