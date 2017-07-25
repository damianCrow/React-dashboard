export const initialState = {
  fetching: false,
  playlist: [],
  countDown: 'Loading...',
}

export const getInstagramData = (state = initialState) => state.instagram || []
