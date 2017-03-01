export const REQUEST_TWITTER = 'REQUEST_TWITTER'
export const INVALIDATE_TWITTER = 'INVALIDATE_TWITTER'

export const UPDATE_TWITTER_SLIDESHOW = 'UPDATE_TWITTER_SLIDESHOW'

// Server actions.
export const SERVER_PULL_TWITTER = 'SERVER_PULL_TWITTER'
export const RECEIVE_TWITTER_POSTS = 'RECEIVE_TWITTER_POSTS'
export const RECEIVE_TWITTER_POSTS_ERROR = 'RECEIVE_TWITTER_POSTS_ERROR'
export const NEED_TO_AUTH_TWITTER = 'NEED_TO_AUTH_TWITTER'

// export const invalidateSonosData = ({
//   type: INVALIDATE_TWITTER
// })

export const requestTweets = ({
  type: RECEIVE_TWITTER_POSTS
})

export const updateTwitterSlideshow = (slideShow) => ({
  type: UPDATE_TWITTER_SLIDESHOW,
  slideShow
})

const fetchPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullTwitterPosts)
  dispatch({ type: REQUEST_TWITTER })

  dispatch({ type: SERVER_PULL_TWITTER })
}

const shouldFetchPosts = (state) => {
  const posts = state.twitter.twitterProcess.twitterDetails
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const loadNextTwitterMedia = allPosts => (dispatch, getState) => {
  let slideShowData = getState().twitter.twitterProcess.twitterDetails.slideShow
  let currentInt = slideShowData.currentInt

  console.log('loadNextTwitterMedia')

  if (currentInt === (allPosts.length - 1)) {
    currentInt = 0
  } else {
    currentInt++
  }
  // console.log('changing slide...')

  // console.log('allPosts[currentInt].type ', allPosts[currentInt].type)

  dispatch(updateTwitterSlideshow({
    currentPost: allPosts[currentInt],
    currentInt
  }))
}

export const startTwitterSlideshow = allPosts => (dispatch, getState) => {
  setTimeout(() => {
    console.log('startTwitterSlideshow')

    dispatch(loadNextTwitterMedia(allPosts))
  }, 20000)
}

export const fetchTwitterIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
