import { SET_SIDEBAR } from './action-types';
export const responsiveSidebar = (data) => {
  return {
    type: SET_SIDEBAR,
    payload: data,
  };
};
