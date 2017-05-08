export const SONOS_CREATE = 'SONOS_CREATE'
export const SONOS_PULL_REQUEST = 'SONOS_PULL_REQUEST'
export const SONOS_CREATE_SUCCESS = 'SONOS_CREATE_SUCCESS'
export const SONOS_CREATE_FAILURE = 'SONOS_CREATE_FAILURE'
export const SERVER_REQUEST_SUCCESS = 'SERVER_REQUEST_SUCCESS'


export const sonosCreateRequest = (request) => ({
  type: SONOS_PULL_REQUEST,
  request,
})

export const sonosCreateSuccess = () => ({
  type: SONOS_CREATE_SUCCESS,
})

export const sonosCreateFailure = error => ({
  type: SONOS_CREATE_FAILURE,
  error,
})


export const SONOS_DETAIL_READ = 'SONOS_DETAIL_READ'
export const SONOS_READ_REQUEST = 'SONOS_READ_REQUEST'
export const SONOS_READ_SUCCESS = 'SONOS_READ_SUCCESS'
export const SONOS_READ_FAILURE = 'SONOS_READ_FAILURE'
export const SONOS_NEW_STATE = 'SONOS_NEW_STATE'
export const SONOS_NEW_TOPOLOGY = 'SONOS_NEW_TOPOLOGY'


export const sonosReadRequest = () => ({
  type: SONOS_READ_REQUEST,
  requested: true,
})

export const sonosReadSuccess = (speakers) => ({
  type: SONOS_READ_SUCCESS,
  speakers,
})

export const sonosReadFailure = (needle, error) => ({
  type: SONOS_READ_FAILURE,
  needle,
  error,
})

export const sonosNewState = (speakers) => ({
  type: SONOS_NEW_STATE,
  speakers,
})

export const sonosNewTopology = (speakers) => ({
  type: SONOS_NEW_TOPOLOGY,
  speakers,
})
