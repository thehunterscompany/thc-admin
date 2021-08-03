import { combineReducers } from 'redux'
import registrationState from './registration/reducer'
import roleState from './roles/reducer'
import loginState from './login/reducer'
import changeState from './dashboard/sidebar/reducer'

const reducers = combineReducers({
  registrationState,
  roleState,
  loginState,
  changeState,
})

export default reducers
