import { REGISTRATION_ASYNC } from './action-types'

const initialState = {
  result: null,
  error: null,
}

const registrationState = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTRATION_ASYNC:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default registrationState
