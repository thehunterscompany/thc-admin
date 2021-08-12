import { combineReducers } from 'redux';

import changeState from './dashboard/sidebar/reducer';
import loginState from './login/reducer';
import PmtSimulationState from './pmt/reducer';
import registrationState from './registration/reducer';
import roleState from './roles/reducer';

const reducers = combineReducers({
  registrationState,
  roleState,
  loginState,
  changeState,
  PmtSimulationState,
});

export default reducers;
