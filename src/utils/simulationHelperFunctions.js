const sumTotalEarnings = (tenants, income) => {
  let earningsArray = [];
  earningsArray = tenants.length
    ? tenants.map((tenant) => Number(tenant.earnings.replace(/\D/g, '')))
    : [];
  let [symbol, earning] = income.split(' ');
  earningsArray.push(Number(earning.replace(/\D/g, '')));
  let sum = earningsArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );

  return { symbol, sum };
};

export { sumTotalEarnings };
