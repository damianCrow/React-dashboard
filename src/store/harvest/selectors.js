export const statusInitialState = {
  message: '',
  status: '',
}

export const dataInitialState = {
  users: [{
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    totalHours: {
      lastWorkDay: 0,
      thisWorkWeek: 0,
      lastWorkWeek: 0,
    },
  }],
}

export const getHarvestData = (state = initialState) => state.harvest || []
