import { sumTotalEarnings } from 'src/utils/utils';

import { SIMULATION_FAILED, SIMULATION_PASS } from './action-types';

const calculatePMT = (amount, duration, rate) => {
  rate = rate / 100;
  duration = duration * 12;
  amount = Number(amount.replace(/\D/g, ''));
  const MV = Math.pow(1 + rate, 1 / 12) - 1;
  let pmt =
    (amount * (MV * Math.pow(1 + MV, duration))) / (Math.pow(1 + MV, duration) - 1);
  return Math.round(pmt);
};

const calculateMonthlyRate = (rate) => {
  rate = rate / 100;
  const tem = (1 + rate) ** (1 / 12) - 1;
  const roundTem = +parseFloat(tem).toFixed(4);
  return (roundTem * 100).toFixed(2);
};

export const pmtSimulation = (amount, duration, rate, income, tenants) => {
  const { symbol, sum } = sumTotalEarnings(tenants, income);
  const pmt = calculatePMT(amount, duration, rate);
  const tem = calculateMonthlyRate(rate);
  if (Math.round(sum * 0.3) < pmt) {
    return {
      type: SIMULATION_FAILED,
      payload: {
        simulation: false,
        sum: Math.round(pmt / 0.3),
        totalEarnings: sum,
        symbol,
      },
    };
  }

  return {
    type: SIMULATION_PASS,
    payload: {
      simulation: true,
      pmt,
      totalEarnings: sum,
      sum: Math.round(sum * 0.3),
      symbol,
      rate,
      tem,
    },
  };
};
