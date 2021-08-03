import { watchRegistrationAsync } from './registration/saga'
import { watchGetRolesAsync } from './roles/saga'
import { watchLoginAsync } from './login/saga'
import { all, fork } from 'redux-saga/effects'

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([fork(watchRegistrationAsync), fork(watchGetRolesAsync), fork(watchLoginAsync)])
}
