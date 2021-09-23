const sumTotalEarnings = (tenants, income) => {
  let earningsArray = [];
  earningsArray = tenants.length
    ? tenants.map((tenant) => Number(tenant.earnings.split(' ')[1]))
    : [];
  let [symbol, earning] = income.split(' ');
  earningsArray.push(Number(earning));
  let sum = earningsArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );

  return { symbol, sum };
};

export { sumTotalEarnings };
