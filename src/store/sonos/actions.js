export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_SONOS = 'INVALIDATE_SONOS'

export const invalidateSonosData = ({
  type: INVALIDATE_SONOS
})

export const requestPosts = ({
  type: REQUEST_POSTS
})

export const receivePosts = function receivePosts (json) {
  console.log('json[0]', json[0])
  return {
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}

const fetchPosts = () => dispatch => {
  console.log(dispatch)
  dispatch(requestPosts)
  return fetch(`http://localhost:5005/zones`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
}

const shouldFetchPosts = (state) => {
  const posts = state.musicInfoFromSonos
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
    console.log(dispatch)
    return dispatch(fetchPosts())
  }
}
