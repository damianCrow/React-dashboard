import { initialState } from './selectors'
import {
  SLIDESHOW_INCREMENT,
  SLIDESHOW_PAUSE,
  SLIDESHOW_RESTART,
  SLIDESHOW_START,
  SLIDESHOW_RESUME,
} from './actions'


export const slideshowState = (service = '') => {
  return function counter(state = initialState, action) {
    switch (action.type) {

      case `${service}_${SLIDESHOW_START}`:
        return {
          ...state,
          max: action.max,
          status: 'playing',
        }

      case `${service}_${SLIDESHOW_RESUME}`:
        return {
          ...state,
          status: 'playing',
        }

      case `${service}_${SLIDESHOW_INCREMENT}`:
        return {
          ...state,
          current: state.current + 1,
        }

      case `${service}_${SLIDESHOW_RESTART}`:
        return {
          ...state,
          current: 0,
        }

      case `${service}_${SLIDESHOW_PAUSE}`:
        return {
          ...state,
          status: 'paused',
        }

      default:
        return state
    }
  }
}

// export default (state = initialState, action) => {
//   switch (action.type) {

//     case SLIDESHOW_START:
//       return {
//         ...state,
//         max: action.max,
//       }

//     case SLIDESHOW_INCREMENT:
//       return {
//         ...state,
//         current: state.current + 1,
//       }

//     case SLIDESHOW_RESTART:
//       return {
//         ...state,
//         current: 0,
//       }

//     case SLIDESHOW_PAUSE:
//       return {
//         ...state,
//         message: action.message,
//       }

//     default:
//       return state
//   }
// }
