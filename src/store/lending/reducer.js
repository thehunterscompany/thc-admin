import { SIMULATION } from './action-types';

const initialState = {
  maxLoanValue: null,
  symbol: null,
  sum: null,
};

const LendingSimulationState = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIMULATION:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default LendingSimulationState;
