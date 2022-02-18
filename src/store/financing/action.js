import { sumTotalEarnings } from 'src/utils/simulationHelperFunctions';

import { SIMULATION_FAILED, SIMULATION_PASS } from './action-types';

const calculatePMT = (amount, duration, rate) => {
  rate = parseFloat(rate) / 100 / 12;
  duration = duration * 12;
  amount = Number(amount.replace(/\D/g, ''));

  let pmt = Math.round((amount * rate) / (1 - (1 + rate) ** (-1 * duration)));
  return pmt;
};

const calculateMonthlyRate = (rate) => {
  rate = parseFloat(rate) / 100;
  const tem = (1 + rate) ** (1 / 12) - 1;
  const roundTem = +parseFloat(tem).toFixed(4);
  return (roundTem * 100).toFixed(2);
};

export const simulation = (amount, duration, rate, income, tenants) => {
  const { symbol, sum } = sumTotalEarnings(tenants, income);
  const pmt = calculatePMT(amount, duration, rate);
  const tem = calculateMonthlyRate(rate);
  if (Math.round(sum * 0.3) < pmt) {
    return {
      type: SIMULATION_FAILED,
      payload: {
        simulation: false,
        sum: Math.round(pmt / 0.3),
        symbol,
      },
    };
  }

  return {
    type: SIMULATION_PASS,
    payload: {
      simulation: true,
      pmt,
      sum: Math.round(sum * 0.3),
      symbol,
      rate,
      tem,
    },
  };
};