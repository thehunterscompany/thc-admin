import { REGISTRATION } from './action-types';
export const register = (data) => {
  return {
    type: REGISTRATION,
    payload: data,
  };
};
