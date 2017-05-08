export const initialState = {
  connected: false,
  requested: false,
  speakers: [],
}

export const getList = (state = initialState) => state.list || initialState.list
export const getDetail = (state = initialState) => state.detail || initialState.detail
