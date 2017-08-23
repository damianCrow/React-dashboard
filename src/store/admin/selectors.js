export const initialState = {
  currentPlaylist: {
	  name: '',
	  id: '',
	  data: [],
  },
  allAvailablePlaylists: [],
  saved: true,
  uploadedFiles: [],
  fetching: false,
}

export const getSaveState = (state = initialState) => state.saved || initialState.saved
