export const REQUEST_HARVEST = 'REQUEST_HARVEST'
export const INVALIDATE_HARVEST = 'INVALIDATE_HARVEST'

// export const UPDATE_INSTAGRAM_SLIDESHOW = 'UPDATE_INSTAGRAM_SLIDESHOW'

// Server actions.
export const SERVER_PULL_HARVEST = 'SERVER_PULL_HARVEST'
export const RECEIVE_HARVEST_POSTS = 'RECEIVE_HARVEST_POSTS'
export const RECEIVE_HARVEST_POSTS_ERROR = 'RECEIVE_HARVEST_POSTS_ERROR'
export const NEED_TO_AUTH_HARVEST = 'NEED_TO_AUTH_HARVEST'

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

export const fetchHarvestIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchHarvestPosts())
  }
}
