export const REQUEST_SONOS = 'REQUEST_SONOS'
export const INVALIDATE_SONOS = 'INVALIDATE_SONOS'

// Server actions.
export const SERVER_PULL_SONOS = 'SERVER_PULL_SONOS'

export const RECEIVE_SONOS_GROUPS = 'RECEIVE_SONOS_GROUPS'
export const RECEIVE_SONOS_STATE = 'RECEIVE_SONOS_STATE'

export const RECEIVE_SONOS_POSTS_ERROR = 'RECEIVE_SONOS_POSTS_ERROR'
export const NEED_TO_AUTH_SONOS = 'NEED_TO_AUTH_SONOS'

// export const invalidateSonosData = ({
//   type: INVALIDATE_SONOS
// })

const fetchPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullSonosPosts)
  dispatch({ type: REQUEST_SONOS })

  dispatch({ type: SERVER_PULL_SONOS })
}

const shouldFetchPosts = (state) => {
  const posts = state.sonos.sonosProcess.sonosDetails
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchSonosDataIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
