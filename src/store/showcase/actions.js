export const REQUEST_SHOWCASE = 'REQUEST_SHOWCASE'
export const INVALIDATE_SHOWCASE = 'INVALIDATE_SHOWCASE'
export const SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED = 'SOCKET_ADMIN_EMIT_PLAYLIST_RECEIVED'
export const SHOWCASE_NEW_POSTS = 'SHOWCASE_NEW_POSTS'
export const SHOWCASE_NEW_POSTS_ERROR = 'SHOWCASE_NEW_POSTS_ERROR'

export const SHOWCASE_FETCH_PLAYLIST = 'SHOWCASE_FETCH_PLAYLIST'
export const SHOWCASE_RECIEVE_PLAYLIST = 'SHOWCASE_RECIEVE_PLAYLIST'
export const SHOWCASE_FETCH_PLAYLIST_ERROR = 'SHOWCASE_FETCH_PLAYLIST_ERROR'

export const storeServerPlaylist = (playlist) => ({
  type: SHOWCASE_NEW_POSTS,
  playlist,
})

export const errorFetchingInitalPlaylist = err => ({
  type: SHOWCASE_FETCH_PLAYLIST_ERROR,
  message: err,
})

export const pullInitalPlaylist = () => ({
  type: SHOWCASE_FETCH_PLAYLIST,
})

export const recievePlaylist = playlist => ({
  type: SHOWCASE_RECIEVE_PLAYLIST,
  fetching: false,
  playlist,
})

