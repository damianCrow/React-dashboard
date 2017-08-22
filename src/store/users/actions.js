export const REQUEST_GOOGLE = 'REQUEST_GOOGLE'
export const GOOGLE_GET_USERS = 'GOOGLE_GET_USERS'

// Server actions.
export const SOCKET_GOOGLE_PULL_GETUSERS_SUCCESS = 'SOCKET_GOOGLE_PULL_GETUSERS_SUCCESS'
export const GOOGLE_GET_USERS_REQUEST = 'GOOGLE_GET_USERS_REQUEST'

export const getGoogleUsers = users => {
  return {
    type: GOOGLE_GET_USERS,
    users,
  }
}

export const googleGetUsersRequest = users => ({
  type: GOOGLE_GET_USERS_REQUEST,
  users,
})

