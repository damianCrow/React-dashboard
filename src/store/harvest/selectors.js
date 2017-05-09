export const initialState = {
  posts: [],
  message: '',
  status: '',
}

export const getInstagramData = (state = initialState) => state.instagram || []
