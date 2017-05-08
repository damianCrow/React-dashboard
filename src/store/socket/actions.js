export const SOCKET_CONNECT = 'SOCKET_CONNECT'
export const SOCKET_CONNECT_REQUEST = 'SOCKET_CONNECT_REQUEST'
export const SOCKET_CONNECT_SUCCESS = 'SOCKET_CONNECT_SUCCESS'
export const SOCKET_CONNECT_FAILURE = 'SOCKET_CONNECT_FAILURE'

export const socketConnectRequest = (data, resolve, reject) => ({
  type: SOCKET_CONNECT_REQUEST,
  data,
  resolve,
  reject,
})

export const socketConnectSuccess = socket => ({
  type: SOCKET_CONNECT_SUCCESS,
  socket,
})

export const socketConnectFailure = error => ({
  type: SOCKET_CONNECT_FAILURE,
  error,
})

export const SERVICE_REQUEST = 'SERVICE_REQUEST'
export const SERVICE_SUCCESS = 'SERVICE_SUCCESS'
export const SERVICE_FAILURE = 'SERVICE_FAILURE'

export const serviceRequest = (request) => ({
  type: SERVICE_REQUEST,
  request,
})

export const serviceSuccess = (service) => ({
  type: `${service}_SERVICE_SUCCESS`,
})

export const serviceFailure = error => ({
  type: SERVICE_FAILURE,
  error,
})

