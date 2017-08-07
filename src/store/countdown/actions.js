export const FETCH_COUNTDOWN = 'FETCH_COUNTDOWN'
export const FETCH_COUNTDOWN_SUCCESSFUL = 'FETCH_COUNTDOWN_SUCCESSFUL'
export const FETCH_COUNTDOWN_FAILED = 'FETCH_COUNTDOWN_FAILED'
export const UPDATE_COUNTDOWN = 'UPDATE_COUNTDOWN'

export const fetchCountdown = () => ({
  type: FETCH_COUNTDOWN,
})

export const fetchCountdownSuccessful = data => ({
  type: FETCH_COUNTDOWN_SUCCESSFUL,
  data,
})

export const fetchCountdownFailed = reason => ({
  type: FETCH_COUNTDOWN_FAILED,
  reason,
})

export const updateCountdown = newTime => ({
  type: UPDATE_COUNTDOWN,
  payload: newTime,
})
