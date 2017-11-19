import mergeable from 'redux-merge-reducers'

import { initialState, initalSlideshowCarouselState } from './selectors'
import {
  SLIDESHOW_NEXT,
  SLIDESHOW_RESTART,
  SLIDESHOW_META,
  SLIDESHOW_RESUME,
  SLIDESHOW_EDIT,
  SLIDESHOW_CLEAN,
} from './actions'

export const slideshowState = (service = '', carousel = false) => {
  const slideshowStateType = carousel ? initalSlideshowCarouselState : initialState
  // const restartCarousel = () => (carousel && { carousel: initialState })

  function counter(state = slideshowStateType, action) {
    const slideLevel = (carousel ? state.carousel : state)
    switch (action.type) {
      case `${service}_${SLIDESHOW_META}`: {
        const max = ((action.max - 1) < 0) ? 0 : action.max - 1
        const newState = {
          current: (slideLevel.current > max) ? max : slideLevel.current,
          max,
          status: 'ready',
        }
        // return { ...state, ...newState }
        return (carousel ? { ...state, carousel: { ...newState } } : { ...state, ...newState })
      }

      case `${service}_${SLIDESHOW_RESUME}`:
        return {
          ...state,
          delay: action.delay,
        }

      case `${service}_${SLIDESHOW_NEXT}`: {
        const current = ((slideLevel.current + 1) > slideLevel.max) ? 0 : (slideLevel.current + 1)
        return (carousel ? {
          ...state,
          carousel: {
            ...slideLevel,
            current,
          },
        } : {
          ...state,
          current,
          carousel: { ...initialState, status: 'ready' },
        })
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

  return mergeable(counter)
}
