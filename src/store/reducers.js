import { combineReducers } from 'redux';

import changeState from './dashboard/sidebar/reducer';
import PmtSimulationState from './financing/reducer';
import LendingSimulationState from './lending/reducer';
import loginState from './login/reducer';
import registrationState from './registration/reducer';
import roleState from './roles/reducer';

const reducers = combineReducers({
  registrationState,
  roleState,
  loginState,
  changeState,
  PmtSimulationState,
  LendingSimulationState,
});

export default reducers;
