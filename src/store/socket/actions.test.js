import * as actions from './actions'

test('sonosCreateRequest', () => {
  expect(actions.sonosCreateRequest({ title: 'test' })).toEqual({
    type: actions.SONOS_CREATE_REQUEST,
    data: { title: 'test' },
  })
})

test('sonosCreateSuccess', () => {
  expect(actions.sonosCreateSuccess({ id: 1, title: 'test' })).toEqual({
    type: actions.SONOS_CREATE_SUCCESS,
    detail: { id: 1, title: 'test' },
  })
})

test('sonosCreateFailure', () => {
  expect(actions.sonosCreateFailure('error')).toEqual({
    type: actions.SONOS_CREATE_FAILURE,
    error: 'error',
  })
})

test('sonosListReadRequest', () => {
  expect(actions.sonosListReadRequest({ fields: 'test' })).toEqual({
    type: actions.SONOS_LIST_READ_REQUEST,
    params: { fields: 'test' },
  })
})

test('sonosListReadSuccess', () => {
  expect(actions.sonosListReadSuccess([1, 2, 3])).toEqual({
    type: actions.SONOS_LIST_READ_SUCCESS,
    list: [1, 2, 3],
  })
})

test('sonosListReadFailure', () => {
  expect(actions.sonosListReadFailure('error')).toEqual({
    type: actions.SONOS_LIST_READ_FAILURE,
    error: 'error',
  })
})

test('sonosDetailReadRequest', () => {
  expect(actions.sonosDetailReadRequest(1)).toEqual({
    type: actions.SONOS_DETAIL_READ_REQUEST,
    needle: 1,
  })
})

test('sonosDetailReadSuccess', () => {
  expect(actions.sonosDetailReadSuccess(1, { id: 1, title: 'test' })).toEqual({
    type: actions.SONOS_DETAIL_READ_SUCCESS,
    needle: 1,
    detail: { id: 1, title: 'test' },
  })
})

test('sonosDetailReadFailure', () => {
  expect(actions.sonosDetailReadFailure(1, 'error')).toEqual({
    type: actions.SONOS_DETAIL_READ_FAILURE,
    needle: 1,
    error: 'error',
  })
})

test('sonosUpdateRequest', () => {
  expect(actions.sonosUpdateRequest(1, { title: 'test' })).toEqual({
    type: actions.SONOS_UPDATE_REQUEST,
    needle: 1,
    data: { title: 'test' },
  })
})

test('sonosUpdateSuccess', () => {
  expect(actions.sonosUpdateSuccess(1, { id: 1, title: 'test' })).toEqual({
    type: actions.SONOS_UPDATE_SUCCESS,
    needle: 1,
    detail: { id: 1, title: 'test' },
  })
})

test('sonosUpdateFailure', () => {
  expect(actions.sonosUpdateFailure(1, 'error')).toEqual({
    type: actions.SONOS_UPDATE_FAILURE,
    needle: 1,
    error: 'error',
  })
})

test('sonosDeleteRequest', () => {
  expect(actions.sonosDeleteRequest(1)).toEqual({
    type: actions.SONOS_DELETE_REQUEST,
    needle: 1,
  })
})

test('sonosDeleteSuccess', () => {
  expect(actions.sonosDeleteSuccess(1)).toEqual({
    type: actions.SONOS_DELETE_SUCCESS,
    needle: 1,
  })
})

test('sonosDeleteFailure', () => {
  expect(actions.sonosDeleteFailure(1, 'error')).toEqual({
    type: actions.SONOS_DELETE_FAILURE,
    needle: 1,
    error: 'error',
  })
})
