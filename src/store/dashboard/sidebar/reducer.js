import { SET_SIDEBAR } from './action-types';

const initialState = {
  sidebarUnfoldable: false,
  sidebarShow: true,
};

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SIDEBAR:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default changeState;
