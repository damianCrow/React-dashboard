export const initialState = {
  playlist: [],
  saved: true,
  uploadedFiles: [],
  fetching: false,
}

export const getSaveState = (state = initialState) => state.saved || initialState.saved
