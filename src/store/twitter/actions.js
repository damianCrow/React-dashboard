export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_TWEETS = 'REQUEST_TWEETS'
export const INVALIDATE_SONOS = 'INVALIDATE_SONOS'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

export const invalidateSonosData = ({
  type: INVALIDATE_SONOS
})

export const requestTweets = ({
  type: REQUEST_TWEETS
})

export const socketTransport = ({
  type: REQUEST_POSTS
})

// export const receivePosts = function receivePosts (json) {
//   console.log('json[0]', json[0])
//   return {
//     type: RECEIVE_POSTS,
//     posts: json,
//     receivedAt: Date.now()
//   }
// }
