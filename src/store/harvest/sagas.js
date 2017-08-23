import { put, call, fork, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'

function* filterUsers(users) {
  try {
    // Tell redux-saga to call fetch with the specified options
    const response = yield call(fetch, 'public/none-google-users.json', { method: 'GET' })
    const nonGoogleUsers = yield response.json()
    const filterUsers = users.payload.filter(user => !nonGoogleUsers.ignore.includes(user.email))

    // Tell redux-saga to dispatch the fetchWeatherSuccessful action
    yield put(actions.newHarvestUsersAndTimes(filterUsers))
  } catch (err) {
    // You get it
    yield put(actions.newHarvestUsersAndTimesError(err))
  }
}

function* flow() {
  // Wait to see if the server is happy to provide data
  yield takeEvery(actions.SOCKET_HARVEST_PULL_GETUSERSANDTIMES_SUCCESS, filterUsers)
}

// Handles connecting, message processing and disconnecting
export default function* () {
  yield fork(flow)
}
