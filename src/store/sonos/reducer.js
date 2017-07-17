import unionBy from 'lodash/unionBy'
import merge from 'lodash/merge'
import find from 'lodash/find'
import { initialState } from './selectors'
import {
  SONOS_PULL_REQUEST,
  SONOS_READ_REQUEST,
  SONOS_READ_SUCCESS,
  SONOS_CREATE_SUCCESS,
  SONOS_NEW_STATE,
  SONOS_NEW_TOPOLOGY,
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


export default (state = initialState, action) => {
  switch (action.type) {

    case SONOS_CREATE_SUCCESS:
      return {
        ...state,
        connected: true,
      }

    case SONOS_PULL_REQUEST:
      return {
        ...state,
        requested: true,
      }

    case SONOS_READ_REQUEST:
      return {
        ...state,
        speakers: [action.speakers],
      }

    case SONOS_READ_SUCCESS:
      return {
        ...state,
        speakers: [action.speakers],
      }

      // Check if exists in array and merge
    case SONOS_NEW_STATE:
      return {
        ...state,
        speakers: mergeSonos([action.speakers], state.speakers, 'uuid'),
      }

    case SONOS_NEW_TOPOLOGY:
      return {
        ...state,
        speakers: mergeTop(action.topology, state.speakers, 'uuid'),
        // speakersNames: action.speakerNames,
        // uuid: action.uuid,
      }


    default:
      return state
  }
}
