export const initialState = {
  message: '',
  status: '',
  data: [],
}

export const getInstagramData = (state = initialState) => state.instagram || []
