export const initialState = {
  playlist: [],
  saved: true,
  uploadedFiles: [],
}

export const getSaveState = (state = initialState) => state.saved || initialState.saved
