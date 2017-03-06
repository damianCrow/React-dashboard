export const REQUEST_HARVEST = 'REQUEST_HARVEST'
export const INVALIDATE_HARVEST = 'INVALIDATE_HARVEST'

// export const UPDATE_INSTAGRAM_SLIDESHOW = 'UPDATE_INSTAGRAM_SLIDESHOW'

// Server actions.
export const SERVER_PULL_HARVEST = 'SERVER_PULL_HARVEST'
export const RECEIVE_HARVEST_POSTS = 'RECEIVE_HARVEST_POSTS'
export const RECEIVE_HARVEST_POSTS_ERROR = 'RECEIVE_HARVEST_POSTS_ERROR'
export const NEED_TO_AUTH_HARVEST = 'NEED_TO_AUTH_HARVEST'

export const fetchHarvestPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullInstagramPosts)
  dispatch({ type: REQUEST_HARVEST })

  console.log('calling SERVER_PULL_HARVEST')
  dispatch({ type: SERVER_PULL_HARVEST })
}

const shouldFetchPosts = (state) => {
  const posts = state.instagram.instagramProcess.instagramDetails
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchHarvestIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchHarvestPosts())
  }
}
