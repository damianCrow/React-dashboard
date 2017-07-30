export const initialState = {
  fetching: false,
  playlist: [],
}

export const currentShowcaseSlideshow = (state = initialState) => {
  console.log('state', state)
  return state.showcase.slideshow.current || 0
}
