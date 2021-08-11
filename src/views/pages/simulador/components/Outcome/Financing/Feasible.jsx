import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import CustomTable from '../Table/Table';

const headersTopTable = [
  { name: 'Linea de Financiación', align: 'center' },
  { name: 'Tasa Interés Efectiva Anual', align: 'center' },
  { name: 'Tasa Interés Mes Vencido', align: 'center' },
  { name: 'Cuota Sin Seguros', align: 'center' },
];

const headersBottomTable = [
  { name: 'Valor Compra', align: 'center' },
  { name: 'Valor a Financiar', align: 'center' },
  { name: '%Valor de Compra', align: 'center' },
  { name: 'Plazo', align: 'center' },
];

const Feasible = ({ values }) => {
  const [bottomData, setBottomData] = useState([]);
  useEffect(() => {
    if (Object.keys(values).length) {
      const { value, percentage, time } = values;
      let [symbol, currency] = value.split(' ');
      let percentNumber = parseFloat(percentage);
      setBottomData([
        {
          value: {
            1: `${symbol} ${currency
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            2: `${symbol} ${Math.round(
              (parseInt(currency) * percentNumber) / 100,
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            3: percentNumber,
            4: time,
          },
          align: 'center',
        },
      ]);
    }
  }, [values]);

  console.log(bottomData);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ textAlign: 'center' }}
    >
      <h1>Enhorabuena!</h1>
      <h2>Tu financiación es VIABLE</h2>
      {/* <CustomTable headers={headersTopTable} /> */}
      <p>
        ** este valor es simulado con el promedio de cuotas desembolsadas en los
        últimos 3 meses, por lo que podría ser incluso mejor dependiendo de la
        entidad financiera donde presentemos tu operación.
      </p>
      <span>
        ** la financiación tiene dos seguros de vida e incendio y terremoto que
        se calcularán según Banco elegido.
      </span>
      <CustomTable headers={headersBottomTable} rowData={bottomData} />
    </Grid>
  );
};

Feasible.propTypes = {
  values: PropTypes.object.isRequired,
};

export default Feasible;
