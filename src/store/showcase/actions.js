export const REQUEST_SHOWCASE = 'REQUEST_SHOWCASE'
export const INVALIDATE_SHOWCASE = 'INVALIDATE_SHOWCASE'

export const UPDATE_SHOWCASE_SLIDESHOW = 'UPDATE_SHOWCASE_SLIDESHOW'

// Server actions.
export const SERVER_PULL_SHOWCASE = 'SERVER_PULL_SHOWCASE'
export const RECEIVE_SHOWCASE_POSTS = 'RECEIVE_SHOWCASE_POSTS'
export const RECEIVE_SHOWCASE_POSTS_ERROR = 'RECEIVE_SHOWCASE_POSTS_ERROR'
export const NEED_TO_AUTH_SHOWCASE = 'NEED_TO_AUTH_SHOWCASE'

// export const invalidateSonosData = ({
//   type: INVALIDATE_SHOWCASE
// })

export const requestTweets = ({
  type: RECEIVE_SHOWCASE_POSTS
})

export const updateSlideshow = (slideShow) => ({
  type: UPDATE_SHOWCASE_SLIDESHOW,
  slideShow
})

export const fetchShowcasePosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullShowcasePosts)
  dispatch({ type: REQUEST_SHOWCASE })

  dispatch({ type: SERVER_PULL_SHOWCASE })
}

const shouldFetchPosts = (state) => {
  const posts = state.showcase.showcaseProcess.showcaseDetails
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const loadNextShowcaseMedia = livePlaylistItems => (dispatch, getState) => {
  let slideShowData = getState().showcase.showcaseProcess.showcaseDetails.slideShow
  let currentInt = slideShowData.currentInt

  console.log('loadNextShowcaseMedia')

  if (currentInt === (livePlaylistItems.length - 1)) {
    currentInt = 0
  } else {
    currentInt++
  }

  dispatch(updateSlideshow({
    currentPost: livePlaylistItems[currentInt],
    currentInt,
    mediaType: livePlaylistItems[currentInt].type
  }))
}

export const startShowcaseSlideshow = allPosts => (dispatch, getState) => {
  setTimeout(() => {
    console.log('startShowcaseSlideshow')

    dispatch(loadNextShowcaseMedia(allPosts))
  }, 5000)
}

export const fetchShowcaseIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchShowcasePosts())
  }
}
