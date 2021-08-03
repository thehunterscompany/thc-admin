import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ROLES, GET_ROLES_ASYNC } from './action-types'
import { fetchService } from '../../utils'
import { roles } from '../../utils/path'

function* getRolesAsync(action) {
  try {
    const response = yield call(fetchService, roles, 'GET', action.payload)
    const payloadObject = {
      result: response.result,
      error: null,
    }

    yield put({
      type: GET_ROLES_ASYNC,
      payload: payloadObject,
    })
  } catch (error) {
    const payloadObject = {
      result: null,
      error: error.response.data,
    }

    yield put({
      type: GET_ROLES_ASYNC,
      payload: payloadObject,
    })
  }
}

export function* watchGetRolesAsync() {
  yield takeLatest(GET_ROLES, getRolesAsync)
}
