import { watchRegistrationAsync } from './registration/saga';
import { watchGetRolesAsync } from './roles/saga';
import { watchLoginAsync } from './login/saga';
import { all, fork } from 'redux-saga/effects';

export default function* () {
  yield all([
    fork(watchRegistrationAsync),
    fork(watchGetRolesAsync),
    fork(watchLoginAsync),
  ]);
}
