export const REQUEST_INSTAGRAM = 'REQUEST_INSTAGRAM'
export const INVALIDATE_INSTAGRAM = 'INVALIDATE_INSTAGRAM'

export const UPDATE_INSTAGRAM_SLIDESHOW = 'UPDATE_INSTAGRAM_SLIDESHOW'

// Server actions.
export const SERVER_PULL_INSTAGRAM = 'SERVER_PULL_INSTAGRAM'
export const RECEIVE_INSTAGRAM_POSTS = 'RECEIVE_INSTAGRAM_POSTS'
export const RECEIVE_INSTAGRAM_POSTS_ERROR = 'RECEIVE_INSTAGRAM_POSTS_ERROR'
export const NEED_TO_AUTH_INSTAGRAM = 'NEED_TO_AUTH_INSTAGRAM'

// export const invalidateSonosData = ({
//   type: INVALIDATE_INSTAGRAM
// })

export const requestTweets = ({
  type: RECEIVE_INSTAGRAM_POSTS
})

export const updateSlideshow = (slideShow) => ({
  type: UPDATE_INSTAGRAM_SLIDESHOW,
  slideShow
})

const fetchPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullInstagramPosts)
  dispatch({ type: REQUEST_INSTAGRAM })

  dispatch({ type: SERVER_PULL_INSTAGRAM })
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

const loadNextInstagramMedia = allPosts => (dispatch, getState) => {
  let slideShowData = getState().instagram.instagramProcess.instagramDetails.slideShow
  let currentInt = slideShowData.currentInt

  console.log('loadNextInstagramMedia')

  if (currentInt === (allPosts.length - 1)) {
    currentInt = 0
  } else {
    currentInt++
  }
  // console.log('changing slide...')

  // console.log('allPosts[currentInt].type ', allPosts[currentInt].type)

  dispatch(updateSlideshow({
    currentPost: allPosts[currentInt],
    currentInt,
    mediaType: allPosts[currentInt].type
  }))
}

export const startInstagramSlideshow = allPosts => (dispatch, getState) => {
  setTimeout(() => {
    console.log('startInstagramSlideshow')

    dispatch(loadNextInstagramMedia(allPosts))
  }, 5000)
}

export const fetchInstagramIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
