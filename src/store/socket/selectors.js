export const initialState = {
  connected: false,
  requested: false,
}

export const getSocketConnection = (state = initialState) => state.socket.connection || initialState.socket.connection
