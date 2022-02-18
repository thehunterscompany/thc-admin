import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchService } from '../../utils';
import { login } from '../../utils/path';

import { LOGIN, LOGIN_ASYNC } from './action-types';

function* loginAsync(action) {
  try {
    const response = yield call(fetchService, login, 'POST', action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: LOGIN_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
    const payloadObject = {
      result: null,
      error: error.response,
    };

    yield put({
      type: LOGIN_ASYNC,
      payload: payloadObject,
    });
  }
}

export function* watchLoginAsync() {
  yield takeLatest(LOGIN, loginAsync);
}
