import { sumTotalEarnings } from 'src/utils/utils';

import { SIMULATION } from './action-types';

const calculateValueofLoan = (earnings, rate, duration = 20) => {
  // Rate is fixed at %, duration is in months
  rate = rate / 100; // Convert rate to decimal
  const months = duration * 12;

  // Monthly interest rate
  const MV = Math.pow(1 + rate, 1 / 12) - 1;

  // Maximum monthly payment (30% of earnings)
  const maxPayment = earnings * 0.3;

  // Formula for max loan amount
  const amount =
    maxPayment * ((Math.pow(1 + MV, months) - 1) / (MV * Math.pow(1 + MV, months)));

  return Math.round(amount);
};

export const lendingSimulation = (income, tenantsIncome, rate, duration = 20) => {
  const { symbol, sum } = sumTotalEarnings(tenantsIncome, income);
  const maxLoanValue = calculateValueofLoan(sum, rate, duration);

  return {
    type: SIMULATION,
    payload: {
      maxLoanValue,
      symbol,
      sum,
    },
  };
};
