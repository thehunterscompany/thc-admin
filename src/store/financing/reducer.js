import { SIMULATION_FAILED, SIMULATION_PASS } from './action-types';

const initialState = {
  pmt: null,
  symbol: null,
  sum: null,
  simulation: null,
};

const PmtSimulationState = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIMULATION_PASS:
      return { ...state, ...payload };
    case SIMULATION_FAILED:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default PmtSimulationState;
