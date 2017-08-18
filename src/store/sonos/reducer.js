// import merge from 'lodash/merge'
import merge from 'deepmerge'

import { initialState, initialCoordinatorState } from './selectors'
import {
  SOCKET_SONOS_PULL_ZONES_SUCCESS,
  SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED,
  SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED,
} from './actions'

function mergeSonos(newState, oldState) {
  // console.log(newState, oldState, key)
  return oldState.map(oldZone => {
    if (oldZone.coordinator.coordinator === newState.coordinator) {
      return {
        ...oldZone,
        coordinator: merge(initialCoordinatorState, {
          ...newState,
          state: {
            ...newState.state,
            previousTrack: oldZone.coordinator.state.currentTrack,
          },
        }),
      }
    }
    return oldZone
  })
}

const buildZoneObject = newZones => newZones.map(zone => merge({ coordinator: initialCoordinatorState }, zone))

export default (state = initialState, action) => {
  switch (action.type) {

    case SOCKET_SONOS_PULL_ZONES_SUCCESS:
      return {
        ...state,
        speakerZones: buildZoneObject(action.payload),
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
        speakerZones: buildZoneObject(action.payload),
      }

    default:
      return state
  }
}
