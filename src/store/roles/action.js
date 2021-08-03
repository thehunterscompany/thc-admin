import { GET_ROLES } from './action-types'
export const getRoles = (data) => {
  return {
    type: GET_ROLES,
    payload: data,
  }
}
