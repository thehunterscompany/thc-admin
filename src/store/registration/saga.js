import { takeLatest, call, put } from 'redux-saga/effects'
import { REGISTRATION, REGISTRATION_ASYNC } from './action-types'
import { fetchService } from '../../utils'
import { registration } from '../../utils/path'

function* registrationAsync(action) {
  try {
    const response = yield call(fetchService, registration, 'POST', action.payload)
    const payloadObject = {
      result: response.result,
      error: null,
    }

    yield put({
      type: REGISTRATION_ASYNC,
      payload: payloadObject,
    })
  } catch (error) {
    const payloadObject = {
      result: null,
      error: error.response,
    }

    yield put({
      type: REGISTRATION_ASYNC,
      payload: payloadObject,
    })
  }
}

export function* watchRegistrationAsync() {
  yield takeLatest(REGISTRATION, registrationAsync)
}
