import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Lending = ({ income, tenants }) => {
  const [value, setValue] = useState({ symbol: '', totalSum: '' });

  useEffect(() => {
    let earningsArray = [];
    earningsArray = tenants.map((tenant) =>
      Number(tenant.earnings.split(' ')[1]),
    );
    let [symbol, earning] = income.split(' ');
    earningsArray.push(Number(earning));
    let sum = earningsArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );
    setValue({ symbol: symbol, totalSum: Math.round(sum * 0.3) });
  }, [income, tenants]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ textAlign: 'center' }}
    >
      <h1>Enhorabuena!</h1>
      <h2>Puedes tener una financiación de hasta</h2>
      <h2>{` ${value.symbol} ${value.totalSum
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</h2>
      <p>
        ** este valor es simulado con el promedio de cuotas desembolsadas en los
        últimos 3 meses, por lo que podría ser incluso mejor dependiendo de la
        entidad financiera donde presentemos tu operación.
      </p>
      <span>
        Si quieres solicitar tu financiación, contacta un bróker o continua el
        proceso en línea…
      </span>
    </Grid>
  );
};

Lending.propTypes = {
  income: PropTypes.string,
  tenants: PropTypes.array,
};

export default Lending;
