import { GET_ROLES_ASYNC } from './action-types'

const initialState = {
  result: null,
  error: null,
}

const roleState = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROLES_ASYNC:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default roleState
