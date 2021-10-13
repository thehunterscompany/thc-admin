import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, LinearProgress } from '@material-ui/core';
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
  { name: 'Porcentaje de Financiamiento', align: 'center' },
  { name: 'Plazo', align: 'center' },
];

const Feasible = ({ values }) => {
  const [topData, setTopData] = useState([]);

  const [bottomData, setBottomData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const simulation = useSelector((state) => state.PmtSimulationState);

  useEffect(() => {
    let { pmt, symbol, rate, tem } = simulation;
    setTopData([
      {
        value: {
          1: `Crédito`,
          2: rate,
          3: `${tem}%`,
          4: `${symbol} ${pmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        },
        align: 'center',
      },
    ]);
  }, [simulation]);

  useEffect(() => {
    if (Object.keys(values).length) {
      const { value, currentDeal, time } = values;
      let [symbol, totalValue] = value.split(' ');
      totalValue = Number(totalValue.replace(/\D/g, ''));
      let financingValue = Number(currentDeal.replace(/\D/g, ''));
      let percent = ((financingValue / totalValue).toFixed(4) * 100).toFixed(2);
      setBottomData([
        {
          value: {
            1: `${symbol} ${totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            2: `${symbol} ${financingValue
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            3: `${percent}%`,
            4: time,
          },
          align: 'center',
        },
      ]);
    }
  }, [values]);

  useEffect(() => {
    if (Object.keys(simulation).length) {
      setIsLoading(false);
    }
  }, [simulation]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ textAlign: 'center' }}
    >
      <h1>Enhorabuena!</h1>
      <h2>Tu financiación es VIABLE</h2>
      <CustomTable headers={headersTopTable} rowData={topData} />
      <p>
        ** este valor es simulado con el promedio de cuotas desembolsadas en los últimos 3
        meses, por lo que podría ser incluso mejor dependiendo de la entidad financiera
        donde presentemos tu operación.
      </p>
      <span>
        ** la financiación tiene dos seguros de vida e incendio y terremoto que se
        calcularán según Banco elegido.
      </span>
      <CustomTable headers={headersBottomTable} rowData={bottomData} />
    </Grid>
  );
};

Feasible.propTypes = {
  values: PropTypes.object.isRequired,
};

export default Feasible;
