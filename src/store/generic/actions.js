export const GET_SONOS_DATA = 'GET_SONOS_DATA'
export const GENERIC_UPDATE = 'GENERIC_UPDATE'
export const GENERIC_DELETE = 'GENERIC_DELETE'

export const genericCreate = (data) => ({
  type: GET_SONOS_DATA,
  data
})

export const genericUpdate = (data, newData) => ({
  type: GENERIC_UPDATE,
  data,
  newData
})

export const genericDelete = (data) => ({
  type: GENERIC_DELETE,
  data
})
