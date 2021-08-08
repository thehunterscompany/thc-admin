import { combineReducers } from 'redux';

import changeState from './dashboard/sidebar/reducer';
import loginState from './login/reducer';
import registrationState from './registration/reducer';
import roleState from './roles/reducer';

const reducers = combineReducers({
  registrationState,
  roleState,
  loginState,
  changeState,
});

export default reducers;
