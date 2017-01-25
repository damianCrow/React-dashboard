export const REQUEST_CALENDAR = 'REQUEST_CALENDAR'
export const INVALIDATE_CALENDAR = 'INVALIDATE_CALENDAR'

// export const UPDATE_INSTAGRAM_SLIDESHOW = 'UPDATE_INSTAGRAM_SLIDESHOW'

// Server actions.
export const SERVER_PULL_CALENDAR = 'SERVER_PULL_CALENDAR'
export const RECEIVE_CALENDAR_POSTS = 'RECEIVE_CALENDAR_POSTS'
export const RECEIVE_CALENDAR_POSTS_ERROR = 'RECEIVE_CALENDAR_POSTS_ERROR'
export const NEED_TO_AUTH_CALENDAR = 'NEED_TO_AUTH_CALENDAR'

// export const invalidateSonosData = ({
//   type: INVALIDATE_INSTAGRAM
// })

// export const requestTweets = ({
//   type: RECEIVE_INSTAGRAM_POSTS
// })

// export const updateSlideshow = (slideShow) => ({
//   type: UPDATE_INSTAGRAM_SLIDESHOW,
//   slideShow
// })

export const fetchPosts = reddit => dispatch => {
  // SEND SOCKET REQUEST TO DISTACH FETCH with callback like dispatch(requestPosts(reddit))

  // Move this so it dispatchs from the server (on pullInstagramPosts)
  dispatch({ type: REQUEST_CALENDAR })

  dispatch({ type: SERVER_PULL_CALENDAR })
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

// export const loadNextInstagramMedia = allPosts => (dispatch, getState) => {
//   let slideShowData = getState().instagram.instagramProcess.instagramDetails.slideShow
//   let currentInt = slideShowData.currentInt

//   console.log('loadNextInstagramMedia')

//   if (currentInt === (allPosts.length - 1)) {
//     currentInt = 0
//   } else {
//     currentInt++
//   }
//   // console.log('changing slide...')

//   // console.log('allPosts[currentInt].type ', allPosts[currentInt].type)

//   dispatch(updateSlideshow({
//     currentPost: allPosts[currentInt],
//     currentInt,
//     mediaType: allPosts[currentInt].type
//   }))
// }

// export const startInstagramSlideshow = allPosts => (dispatch, getState) => {
//   setTimeout(() => {
//     console.log('startInstagramSlideshow')

//     dispatch(loadNextInstagramMedia(allPosts))
//   }, 5000)
// }

export const fetchCalendarIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
