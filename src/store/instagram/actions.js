export const REQUEST_INSTAGRAM = 'REQUEST_INSTAGRAM'
export const RECEIVE_INSTAGRAM_POSTS = 'RECEIVE_INSTAGRAM_POSTS'
export const INVALIDATE_INSTAGRAM = 'INVALIDATE_INSTAGRAM'

// Server actions.
export const SERVER_PULL_INSTAGRAM = 'SERVER_PULL_INSTAGRAM'
export const RECEIVE_INSTAGRAM_POSTS_ERROR = 'RECEIVE_INSTAGRAM_POSTS_ERROR'

export const invalidateSonosData = ({
  type: INVALIDATE_INSTAGRAM
})

export const requestTweets = ({
  type: RECEIVE_INSTAGRAM_POSTS
})

export const requestInstagramPosts = ({
  type: REQUEST_INSTAGRAM
})

export const pullInstagramPosts = ({
  type: SERVER_PULL_INSTAGRAM
})

const fetchPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullInstagramPosts)
  dispatch(requestInstagramPosts)

  dispatch(pullInstagramPosts)
  // Listen for response, then return data
  // return fetch(`https://www.reddit.com/r/${reddit}.json`)
  //   .then(response => response.json())
  //   .then(json => dispatch(receivePosts(reddit, json)))
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

export const fetchInstagramIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
