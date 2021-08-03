import { SET_SIDEBAR } from './action-types'

const initialState = {
  sidebarUnfoldable: false,
}

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SIDEBAR:
      return { ...state, sidebarUnfoldable: payload }
    default:
      return state
  }
}

export default changeState
