import { put, call, fork, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'

function* fetchWeather() {
  try {
    // Tell redux-saga to call fetch with the specified options
    const response = yield call(fetch, 'http://api.openweathermap.org/data/2.5/weather?q=London,UK&units=metric&APPID=d4715be9a9535bb0b47b98901e84511e', { method: 'GET' })
    const weather = yield response.json()
    // Tell redux-saga to dispatch the fetchWeatherSuccessful action
    yield put(actions.fetchWeatherSuccessful(weather))
  } catch (err) {
    // You get it
    yield put(actions.fetchWeatherFailed(err))
  }
}

function* flow() {
  // Wait to see if the server is happy to provide data
  yield takeLatest(actions.FETCH_WEATHER, fetchWeather)
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(flow)
}
