import { all, fork } from 'redux-saga/effects';

import { watchLoginAsync } from './login/saga';
import { watchRegistrationAsync } from './registration/saga';
import { watchGetRolesAsync } from './roles/saga';

export default function* foo() {
  yield all([
    fork(watchRegistrationAsync),
    fork(watchGetRolesAsync),
    fork(watchLoginAsync),
  ]);
}
