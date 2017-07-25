import unionBy from 'lodash/unionBy'
import merge from 'lodash/merge'
import find from 'lodash/find'
import { initialState } from './selectors'
import {
  SONOS_PULL_REQUEST,
  SONOS_READ_REQUEST,
  SONOS_READ_SUCCESS,
  SOCKET_SONOS_PULL_ZONES_SUCCESS,
  SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED,
  SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED,
  SONOS_ZONES_RECEIVED,
} from './actions'


// function mergeByKey(arr1, arr2, key) {
//   console.log('arr1', arr1)
//   console.log('arr2', arr2)
//   if (!isEmpty(arr1) && !isEmpty(arr2)) {
//     return arr1.map((member) => {
//       return arr2.forEach((memberTwo) => {
//         // console.log('member', member)
//         // console.log('memberTwo', memberTwo)
//         if (memberTwo[key] === member[key]) {
//           return merge(member, memberTwo)
//         }
//         return null
//       })
//     })
//   } else if (isEmpty(arr1) && !isEmpty(arr2)) {
//     return arr2
//   } else if (isEmpty(arr2) && !isEmpty(arr1)) {
//     return arr1
//   }
//   return []
// }

// function mergeByKey(arr1, arr2, key) {
//   return arr1.map((item) => {
//     return merge(item, find(arr2, { [key]: item[key] }))
//   })
// }

function mergeByKey(arr1, arr2, key) {
  // console.log('merging arr1', arr1)
  // console.log('with arr2', arr2)
  const result = arr1.map((item) => {
    // add the properties from second array matching the userID
    // to the object from first array and return the updated object
    return merge(item, find(arr2, { [key]: item[key] }))
  })
  // console.log('result', result)
  return result
}

function mergeSonos(newState, oldState, key) {
  // console.log(newState, oldState, key)
  return unionBy(newState, oldState, key)
}

// TODO: Write this better.
function mergeTop(newState, oldState, key) {
  // console.log('MERGE topology')
  // console.log(newState, oldState, key)
  const newArray = []
  newState.forEach((group, index) => {
    // const speakersNames = group.members.map((member) => member.roomName)
    // const groupMod = group
    // groupMod.members = group.members.map((member) => member.roomName)
    oldState.forEach((existingGroup, index) => {
      if (group[key] === existingGroup[key]) {
        const groupMod = group
        // console.log('groupMod.members', groupMod.members)
        // groupMod.members = group.members.map((member) => member.roomName)
        newArray[index] = (merge(group, existingGroup))
        newArray[index].members = group.members.map((member) => member.roomName)
      }
    })
    // newArray[index].members = group.members.map((member) => member.roomName)
  })
  // console.log('newArray', newArray)
  return newArray
}

const updatePreviousTrack = (action, state) => {
  let updateObj = {}

  if (!action.speakers) {
    action.speakers = action.payload
  }

  Object.keys(state.previousTracksObj).forEach((key) => {
    if (action.speakers.uuid === key) {
      if (state.previousTracksObj[key].length > 5) {
        state.previousTracksObj[key].splice(0, state.previousTracksObj[key].length - 2)
      }
      updateObj = {
        ...state.previousTracksObj,
        [action.speakers.uuid]: [...state.previousTracksObj[action.speakers.uuid], action.speakers.state.currentTrack],
      }
      return updateObj
    }
  })
  return updateObj
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SOCKET_SONOS_PULL_ZONES_SUCCESS:
      return {
        ...state,
        speakers: [].concat(...action.payload.map(zone => zone.coordinator)),
        speakerZones: action.payload,
      }

      // Check if exists in array and merge
    case SOCKET_SONOS_EMIT_TRANSPORT_RECEIVED:
      return {
        ...state,
        speakers: mergeSonos([action.payload], state.speakers, 'uuid'),
        previousTracksObj: updatePreviousTrack(action, state),
      }

    case SOCKET_SONOS_EMIT_TOPOLOGY_RECEIVED:
      return {
        ...state,
        speakers: mergeTop(action.topology, state.speakers, 'uuid'),
        speakerZones: action.topology,
      }

    default:
      return state
  }
}
