export const initialState = {
  posts: [],
  message: '',
  status: '',
}

export const getGoogleData = (state = initialState) => state.google || []
