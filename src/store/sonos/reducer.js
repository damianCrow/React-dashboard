import { initialState } from './selectors'
import {
  SOCKET_SONOS_PULL_ZONES_SUCCESS,
  SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED,
  SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED,
} from './actions'

function mergeSonos(newState, oldState) {
  // console.log(newState, oldState, key)
  const mergedState = oldState

  return mergedState.map(zone => {
    if (zone.coordinator.coordinator === newState.coordinator) {
      return { ...zone, coordinator: { ...newState, state: { ...newState.state, previousTrack: zone.coordinator.state.currentTrack } } }
    }
    return zone
  })
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SOCKET_SONOS_PULL_ZONES_SUCCESS:
      return {
        ...state,
        speakerZones: action.payload,
      }

      // Check if exists in array and merge
    case SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED:
      return {
        ...state,
        speakerZones: mergeSonos(action.payload, state.speakerZones),
      }

    case SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED:
      return {
        ...state,
        speakerZones: action.payload,
      }

    default:
      return state
  }
}
