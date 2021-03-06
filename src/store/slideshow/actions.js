export const SLIDESHOW_START = 'SLIDESHOW_START'
export const SLIDESHOW_TIMEOUT = 'SLIDESHOW_TIMEOUT'
export const SLIDESHOW_RESUME = 'SLIDESHOW_RESUME'
export const SLIDESHOW_NEXT = 'SLIDESHOW_NEXT'
export const SLIDESHOW_CLEAR_TIME = 'SLIDESHOW_CLEAR_TIME'
export const SLIDESHOW_RESTART = 'SLIDESHOW_RESTART'
export const SLIDESHOW_EDIT = 'SLIDESHOW_EDIT'
export const SLIDESHOW_META = 'SLIDESHOW_META'
export const SLIDESHOW_CLEAN = 'SLIDESHOW_CLEAN'

// For the sake of the sagas, passes the service name and inital length.
export const startSlideshowLogic = (service, max) => ({
  type: SLIDESHOW_START,
  service,
  max,
})

// Fired by sagas only for the sake of the reducer.
export const slideshowMeta = (service, max) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_META}`,
  service,
  max,
})

export const startComponentTimeout = service => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_TIMEOUT}`,
  service,
})

export const nextComponentSlideshow = service => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_NEXT}`,
  service,
})

export const restartSlideshow = service => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_RESTART}`,
  service,
})

export const cleanSlideshow = service => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_CLEAN}`,
})

export const clearComponentTimeout = service => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_CLEAR_TIME}`,
  service,
})

