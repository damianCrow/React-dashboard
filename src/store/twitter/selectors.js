export const initialState = {
  posts: [],
  message: '',
  status: '',
}

export const getTwitterData = (state = initialState) => state.twitter || []
