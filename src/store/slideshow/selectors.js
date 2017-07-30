export const initialState = {
  current: 0,
  max: 1,
  status: 'waiting',
}

// export const getInstagramData = (state = initialState) => state.instagram || []

export const maxSlideshow = (service = '') => {
  return (state = initialState) => state[service.toLowerCase()].slideshow.max || initialState.max
}

export const currentSlideshow = (service = '') => {
  return (state = initialState) => state[service.toLowerCase()].slideshow.current || initialState.current
}


// export const maxSlideshow = (service, state = initialState) => state[service].slideshow.max || initialState.max
// export const currentSlideshow = (service, state = initialState) => state[service].slideshow.max || initialState.current
