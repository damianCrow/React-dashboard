export const REQUEST_INSTAGRAM = 'REQUEST_INSTAGRAM'
export const RECEIVE_INSTAGRAM_POSTS = 'RECEIVE_INSTAGRAM_POSTS'
export const INVALIDATE_INSTAGRAM = 'INVALIDATE_INSTAGRAM'

export const UPDATE_INSTAGRAM_SLIDESHOW = 'UPDATE_INSTAGRAM_SLIDESHOW'

// Server actions.
export const SERVER_PULL_INSTAGRAM = 'SERVER_PULL_INSTAGRAM'
export const RECEIVE_INSTAGRAM_POSTS_ERROR = 'RECEIVE_INSTAGRAM_POSTS_ERROR'
export const NEED_TO_AUTH_INSTAGRAM = 'NEED_TO_AUTH_INSTAGRAM'

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

export const updateSlideshow = (slideShow) => ({
  type: UPDATE_INSTAGRAM_SLIDESHOW,
  slideShow
})

const fetchPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullInstagramPosts)
  dispatch(requestInstagramPosts)

  dispatch(pullInstagramPosts)
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

export const startInstagramSlideshow = allPosts => (dispatch, getState) => {
  let currentInt = getState().instagram.instagramProcess.instagramDetails.slideShow.currentInt

  setTimeout(() => {
    if (currentInt === (allPosts.length - 1)) {
      currentInt = 0
    } else {
      currentInt++
    }

    dispatch(updateSlideshow({
      currentPost: allPosts[currentInt],
      currentInt
    }))
  }, 5000)
}

export const fetchInstagramIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
