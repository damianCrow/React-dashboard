export const SONOS_CREATE = 'SONOS_CREATE'
export const SONOS_PULL_REQUEST = 'SONOS_PULL_REQUEST'
export const SONOS_CREATE_SUCCESS = 'SONOS_CREATE_SUCCESS'
export const SONOS_CREATE_FAILURE = 'SONOS_CREATE_FAILURE'
export const SERVER_REQUEST_SUCCESS = 'SERVER_REQUEST_SUCCESS'
export const SOCKET_SONOS_PULL_ZONES_SUCCESS = 'SOCKET_SONOS_PULL_ZONES_SUCCESS'
export const SOCKET_SONOS_PULL_PLAYERS_SUCCESS = 'SOCKET_SONOS_PULL_PLAYERS_SUCCESS'
export const SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED = 'SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED'
export const SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED = 'SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED'

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


export const sonosReadRequest = () => ({
  type: SONOS_READ_REQUEST,
  requested: true,
})

export const sonosReadSuccess = (speakers, speakerNames) => ({
  type: SONOS_READ_SUCCESS,
  speakers: speakers.state,
  speakerNames: speakers.speakerNames,
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

export const sonosNewTopology = (topology) => ({
  type: SONOS_NEW_TOPOLOGY,
  topology,
})

export const sonosZonesReceived = (zones) => ({
  type: SONOS_ZONES_RECEIVED,
  zones,
})
