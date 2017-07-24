import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import saga, * as sagas from './sagas'

describe('createSonos', () => {
  const data = { title: 'test' }

  it('calls success', () => {
    const generator = sagas.createSonos(data)
    expect(generator.next().value).toEqual(call(api.post, '/sonos', data))
    expect(generator.next(data).value).toEqual(put(actions.sonosCreateSuccess(data)))
  })

  it('calls failure', () => {
    const generator = sagas.createSonos(data)
    expect(generator.next().value).toEqual(call(api.post, '/sonos', data))
    expect(generator.throw('test').value).toEqual(put(actions.sonosCreateFailure('test')))
  })
})

describe('readSonosList', () => {
  it('calls success', () => {
    const data = [1, 2, 3]
    const generator = sagas.readSonosList({ _limit: 1 })
    expect(generator.next().value).toEqual(call(api.get, '/sonos', { params: { _limit: 1 } }))
    expect(generator.next(data).value).toEqual(put(actions.sonosListReadSuccess(data)))
  })

  it('calls failure', () => {
    const generator = sagas.readSonosList({ _limit: 1 })
    expect(generator.next().value).toEqual(call(api.get, '/sonos', { params: { _limit: 1 } }))
    expect(generator.throw('test').value).toEqual(put(actions.sonosListReadFailure('test')))
  })
})

describe('readSonosDetail', () => {
  it('calls success', () => {
    const data = { id: 1 }
    const generator = sagas.readSonosDetail(1)
    expect(generator.next().value).toEqual(call(api.get, '/sonos/1'))
    expect(generator.next(data).value).toEqual(put(actions.sonosDetailReadSuccess(1, data)))
  })

  it('calls failure', () => {
    const generator = sagas.readSonosDetail(1)
    expect(generator.next().value).toEqual(call(api.get, '/sonos/1'))
    expect(generator.throw('test').value).toEqual(put(actions.sonosDetailReadFailure(1, 'test')))
  })
})

describe('updateSonos', () => {
  it('calls success', () => {
    const data = { id: 1 }
    const generator = sagas.updateSonos(1, { title: 'foo' })
    expect(generator.next().value).toEqual(call(api.put, '/sonos/1', { title: 'foo' }))
    expect(generator.next(data).value).toEqual(put(actions.sonosUpdateSuccess(1, data)))
  })

  it('calls failure', () => {
    const generator = sagas.updateSonos(1, { title: 'foo' })
    expect(generator.next().value).toEqual(call(api.put, '/sonos/1', { title: 'foo' }))
    expect(generator.throw('test').value).toEqual(put(actions.sonosUpdateFailure(1, 'test')))
  })
})

describe('deleteSonos', () => {
  it('calls success', () => {
    const generator = sagas.deleteSonos(1)
    expect(generator.next().value).toEqual(call(api.delete, '/sonos/1'))
    expect(generator.next().value).toEqual(put(actions.sonosDeleteSuccess(1)))
  })

  it('calls failure', () => {
    const generator = sagas.deleteSonos(1)
    expect(generator.next().value).toEqual(call(api.delete, '/sonos/1'))
    expect(generator.throw('test').value).toEqual(put(actions.sonosDeleteFailure(1, 'test')))
  })
})

test('watchSonosCreateRequest', () => {
  const payload = { data: 1 }
  const generator = sagas.watchSonosCreateRequest()
  expect(generator.next().value).toEqual(take(actions.SONOS_CREATE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.createSonos, ...Object.values(payload)))
})

test('watchSonosListReadRequest', () => {
  const payload = { params: { _limit: 1 } }
  const generator = sagas.watchSonosListReadRequest()
  expect(generator.next().value).toEqual(take(actions.SONOS_LIST_READ_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.readSonosList, ...Object.values(payload)))
})

test('watchSonosDetailReadRequest', () => {
  const payload = { needle: 1 }
  const generator = sagas.watchSonosDetailReadRequest()
  expect(generator.next().value).toEqual(take(actions.SONOS_DETAIL_READ_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.readSonosDetail, ...Object.values(payload)))
})

test('watchSonosUpdateRequest', () => {
  const payload = { needle: 1, data: { id: 1 } }
  const generator = sagas.watchSonosUpdateRequest()
  expect(generator.next().value).toEqual(take(actions.SONOS_UPDATE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.updateSonos, ...Object.values(payload)))
})

test('watchSonosDeleteRequest', () => {
  const payload = { needle: 1 }
  const generator = sagas.watchSonosDeleteRequest()
  expect(generator.next().value).toEqual(take(actions.SONOS_DELETE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.deleteSonos, ...Object.values(payload)))
})

test('saga', () => {
  const generator = saga()
  expect(generator.next().value).toEqual(fork(sagas.watchSonosCreateRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchSonosListReadRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchSonosDetailReadRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchSonosUpdateRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchSonosDeleteRequest))
})
