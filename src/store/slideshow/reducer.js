import { initialState, initalSlideshowCarouselState } from './selectors'
import {
  SLIDESHOW_NEXT,
  SLIDESHOW_RESTART,
  SLIDESHOW_META,
  SLIDESHOW_RESUME,
  SLIDESHOW_EDIT,
  SLIDESHOW_CLEAN,
} from './actions'

export const slideshowState = (service = '', carousel = '') => {
  const slideshowStateType = carousel ? initalSlideshowCarouselState : initialState
  const restartCarousel = () => (carousel && { carousel: initialState })

  return function counter(state = slideshowStateType, action) {
    switch (action.type) {
      case `${service}_${SLIDESHOW_META}`: {
        const max = ((action.max - 1) < 0) ? 0 : action.max - 1
        return {
          ...state,
          // max: action.max - 1,
          max,
          current: (state.current > max) ? max : state.current,
          status: 'ready',
        }
      }
      case `${service}_${SLIDESHOW_RESUME}`:
        return {
          ...state,
          delay: action.delay,
        }

      case `${service}_${SLIDESHOW_NEXT}`:
        return {
          ...state,
          current: ((state.current + 1) > state.max) ? 0 : (state.current + 1),
          restartCarousel,
        }

      case `${service}_${SLIDESHOW_RESTART}`:
        return {
          ...state,
          current: 0,
        }

      case `${service}_${SLIDESHOW_EDIT}`:
        return {
          ...state,
          max: ((action.max - 1) < 0) ? 0 : action.max - 1,
        }

      case `${service}_${SLIDESHOW_CLEAN}`:
        return {
          ...initialState,
        }

      default:
        return state
    }
  }
}
