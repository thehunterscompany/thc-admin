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

const checkForIntersectionKeys = (object1, object2) => {
  const intersectingArray = Object.entries(object1).filter(([key]) => key in object2);
  const convertToObject = intersectingArray.reduce(function (object, array) {
    object[array[0]] = array[1];
    return object;
  }, {});

  return convertToObject;
};

export { checkForIntersectionKeys, sumTotalEarnings };
