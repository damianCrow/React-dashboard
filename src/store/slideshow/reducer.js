import { initialState } from './selectors'
import {
  SLIDESHOW_INCREMENT,
  SLIDESHOW_PAUSE,
  SLIDESHOW_RESTART,
  SLIDESHOW_START,
  SLIDESHOW_RESUME,
  SLIDESHOW_EDIT,
} from './actions'


export const slideshowState = (service = '') => {
  return function counter(state = initialState, action) {
    switch (action.type) {

      case `${service}_${SLIDESHOW_START}`:
        return {
          ...state,
          max: action.max - 1,
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

      case `${service}_${SLIDESHOW_EDIT}`:
        return {
          ...state,
          max: action.max - 1,
        }

      default:
        return state
    }
  }
}
