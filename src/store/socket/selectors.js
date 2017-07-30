export const initialState = {
  connected: false,
  requested: false,
}

export const getSocketConnection = (state = initialState) => state.socket.connection || initialState.socket.connection
export const isSocketRequested = (state = initialState) => state.socket.requested || initialState.socket.requested
