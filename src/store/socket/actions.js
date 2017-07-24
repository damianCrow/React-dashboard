export const SOCKET_CONNECT = 'SOCKET_CONNECT'
export const SOCKET_CONNECT_REQUEST = 'SOCKET_CONNECT_REQUEST'
export const SOCKET_CONNECT_SUCCESS = 'SOCKET_CONNECT_SUCCESS'
export const SOCKET_CONNECT_FAILURE = 'SOCKET_CONNECT_FAILURE'

export const SOCKET_DATA_REQUEST = 'SOCKET_DATA_REQUEST'

// Gets fired by saga on first socketDataRequest dispatch
export const socketConnectSuccess = connected => ({
  type: SOCKET_CONNECT_SUCCESS,
  connected,
})

// Data example: { service: 'INSTAGRAM', request: 'grabPosts' }
export const socketDataRequest = (data) => ({
  type: SOCKET_DATA_REQUEST,
  data,
})

// eg: 'SOCKET_INSTAGRAM_GRABPOSTS_SUCCESS'
export const socketDataSuccess = (service, serverAction, request, id, payload) => {
  return {
    type: `SOCKET_${service}_${serverAction}_${request}_SUCCESS`,
    id,
    payload,
  }
}

export const socketDataFailed = (service, serverAction, request, id, message) => ({
  type: `SOCKET_${service}_${serverAction}_${request}_FAILED`,
  id,
  message,
})

// eg: 'SOCKET_INSTAGRAM_GRABPOSTS_SUCCESS'
export const socketEmitReceived = (service, description, payload) => {
  // console.log('socketEmitReceived, service', service)
  // console.log('socketEmitReceived, description', description)
  // console.log('socketEmitReceived, payload', payload)
  // console.log(`SOCKET_${service}_EMIT_${description}_RECEIVED`)
  return {
    type: `SOCKET_${service}_EMIT_${description}_RECEIVED`,
    payload,
  }
}
