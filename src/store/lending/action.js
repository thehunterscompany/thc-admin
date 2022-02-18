import { sumTotalEarnings } from 'src/utils/simulationHelperFunctions';

import { SIMULATION } from './action-types';

const calculateValueofLoan = (earnings, rate, duration = 20) => {
  rate = parseFloat(rate) / 100 / 12;
  duration = duration * 12;
  earnings = earnings * 0.3;

  const maxLoanValue = Math.round(
    (earnings / rate) * (1 - (1 + rate) ** (-1 * duration)),
  );

  return maxLoanValue;
};

export const lendingSimulation = (income, tenantsIncome, rate, duration = 20) => {
  const { symbol, sum } = sumTotalEarnings(tenantsIncome, income);
  const maxLoanValue = calculateValueofLoan(sum, rate, duration);

  return {
    type: SIMULATION,
    payload: {
      maxLoanValue,
      symbol,
    },
  };
};
