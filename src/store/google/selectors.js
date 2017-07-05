export const initialState = {
  users: [{
    name: {
      givenName: '',
      familyName: '',
      fullName: '',
      initals: '',
    },
    image: '',
    email: '',
  }],
  message: '',
  status: '',
}

export const getGoogleData = (state = initialState) => state.google || []
