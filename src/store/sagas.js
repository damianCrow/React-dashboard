import { fork, take, call, put } from 'redux-saga/effects'

const req = require.context('.', true, /\.\/.+\/sagas\.js$/)

// Sagas which rely on sockets, are split out.
const sagas = []

// TODO: Split this into sagas that require socket and those that don't
req.keys().forEach((key) => {
  sagas.push(req(key).default)
})

export default function* () {
  yield sagas.map(fork)
  // yield sagas.map(saga =>
  //   fork(saga, socket)
  // )
}
