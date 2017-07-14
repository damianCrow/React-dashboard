export const initialState = {
  fetching: false,
  playlist: [],
}

export const getInstagramData = (state = initialState) => state.instagram || []
