import { put, call, fork, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'

function* fetchCountdown() {
  try {
    // Tell redux-saga to call fetch with the specified options
    const response = yield call(fetch, '/public/user-data/countdown.json', { method: 'GET' })
    const countdownData = yield response.json()
    // Tell redux-saga to dispatch the fetchCountdownSuccessful action
    yield put(actions.fetchCountdownSuccessful(countdownData))
  } catch (err) {
    // You get it
    yield put(actions.fetchCountdownFailed(err))
  }
}

function* flow() {
  // Wait to see if the server is happy to provide data
  yield takeLatest(actions.FETCH_COUNTDOWN, fetchCountdown)
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(flow)
}
