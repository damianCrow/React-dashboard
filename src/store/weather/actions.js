export const FETCH_WEATHER = 'FETCH_WEATHER'
export const FETCH_WEATHER_SUCCESSFUL = 'FETCH_WEATHER_SUCCESSFUL'
export const FETCH_WEATHER_FAILED = 'FETCH_WEATHER_FAILED'

export const fetchWeather = () => ({
  type: FETCH_WEATHER,
})

export const fetchWeatherSuccessful = (data) => ({
  type: FETCH_WEATHER_SUCCESSFUL,
  data,
})

export const fetchWeatherFailed = (reason) => ({
  type: FETCH_WEATHER_FAILED,
  reason,
})
