export const initialState = {
  connected: false,
  requested: false,
  speakers: [],
  speakerZones: [],
  previousTracksObj: {
    RINCON_949F3E700D8001400: [],
    RINCON_949F3E65A7C501400: [],
    RINCON_949F3E700DEE01400: [],
    RINCON_B8E937D42D9E01400: [],
  },
}

export const getList = (state = initialState) => state.list || initialState.list
export const getDetail = (state = initialState) => state.detail || initialState.detail
