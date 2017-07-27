export const SLIDESHOW_START = 'SLIDESHOW_START'
export const SLIDESHOW_RESUME = 'SLIDESHOW_RESUME'
export const SLIDESHOW_INCREMENT = 'SLIDESHOW_INCREMENT'
export const SLIDESHOW_PAUSE = 'SLIDESHOW_PAUSE'
export const SLIDESHOW_RESTART = 'SLIDESHOW_RESTART'
export const SLIDESHOW_EDIT = 'SLIDESHOW_EDIT'

export const incrementSlideshow = (service) => ({
  type: SLIDESHOW_INCREMENT,
  service,
})

export const startSlideshow = (service, max) => ({
  type: SLIDESHOW_START,
  service,
  max,
})

export const restartSlideshow = (service) => ({
  type: SLIDESHOW_RESTART,
  service,
})

export const startServiceSlideshow = (service, max) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_START}`,
  service,
  max,
})

export const resumeServiceSlideshow = (service, delay = 0) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_RESUME}`,
  service,
  delay,
})

export const incrementServiceSlideshow = (service) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_INCREMENT}`,
  service,
})

export const restartServiceSlideshow = (service) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_RESTART}`,
  service,
})

export const pauseServiceSlideshow = (service) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_PAUSE}`,
  service,
})

export const numberOfSlideshowPosts = (service, max) => ({
  type: `${service.toUpperCase()}_${SLIDESHOW_EDIT}`,
  service,
  max,
})

// export const newInstagramPostsError = (err) => ({
//   type: INSTAGRAM_NEW_POSTS_ERROR,
//   message: err,
// })

// export const updateSlideshow = (slideShow) => ({
//   type: UPDATE_INSTAGRAM_SLIDESHOW,
//   slideShow
// })
