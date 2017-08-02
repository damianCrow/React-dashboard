export const initialState = {
  message: '',
  status: '',
  meetings: [],
  outOfOffice: [],
}

export const getInstagramData = (state = initialState) => state.instagram || []
