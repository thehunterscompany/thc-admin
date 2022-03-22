import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, LinearProgress } from '@mui/material';
import { useFormikContext } from 'formik';

import CustomTable from '../Table/Table';

const headersTopTable = [
  { name: 'Linea de Financiación', align: 'center' },
  { name: 'Tasa Interés Efectiva Anual', align: 'center' },
  { name: 'Tasa Interés Mes Vencido', align: 'center' },
  { name: 'Cuota Sin Seguros**', align: 'center' },
];

const headersBottomTable = [
  { name: 'Valor Compra', align: 'center' },
  { name: 'Valor a Financiar', align: 'center' },
  { name: 'Porcentaje de Financiación', align: 'center' },
  { name: 'Plazo', align: 'center' },
];

const Feasible = () => {
  const { values } = useFormikContext();

  const { value, currentDeal, time, type } = values;

  const [topData, setTopData] = useState([]);

  const [bottomData, setBottomData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const simulation = useSelector((state) => state.PmtSimulationState);

  useEffect(() => {
    let { pmt, symbol, rate, tem } = simulation;
    setTopData([
      {
        value: {
          1: type,
          2: rate,
          3: `${tem}%`,
          4: `${symbol} ${pmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        },
        align: 'center',
      },
    ]);
  }, [simulation, type]);

  useEffect(() => {
    if (Object.keys(values).length) {
      let [symbol, totalValue] = value.split(' ');
      totalValue = Number(totalValue.replace(/\D/g, ''));
      let financingValue = Number(currentDeal.replace(/\D/g, ''));
      let percent = ((financingValue / totalValue).toFixed(4) * 100).toFixed(2);
      setBottomData([
        {
          value: {
            1: `${symbol} ${totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
            2: `${symbol} ${financingValue
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
            3: `${percent}%`,
            4: `${time} ${time === 1 ? 'año' : 'años'}`,
          },
          align: 'center',
        },
      ]);
    }
  }, [values, value, currentDeal, time]);

  useEffect(() => {
    if (Object.keys(simulation).length) {
      setIsLoading(false);
    }
  }, [simulation]);

  useEffect(() => {
    const element = document.getElementById('top-point');
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  return isLoading ? (
    <LinearProgress id="top-point" />
  ) : (
    <Container className="_simulation_results">
      <h1 id="top-point">¡Felicitaciones!</h1>
      <h2>Tu financiación es VIABLE</h2>
      <CustomTable
        headers={headersTopTable}
        rowData={topData}
        className="_simulation_table"
      />
      <div style={{ textAlign: 'left', padding: '0 0.5vw' }}>
        <p>
          ** el valor de la cuota está calculado con base en el promedio de las tasas de
          interés vigentes en cada momento del mercado. Para cada operación buscamos la
          mejor tasa dependiendo del perfil del cliente.
        </p>
        <p>
          ** el valor de esta cuota no incluye los seguros obligatorios (vida e incendio y
          terremoto), estos dependen de cada Banco.
        </p>
      </div>

      <CustomTable headers={headersBottomTable} rowData={bottomData} />
      <span>{`Si deseas continuar con el proceso, haz click en el botón "Contáctanos" para
        comunicarte con uno de nuestros brokers.`}</span>
    </Container>
  );
};

export default Feasible;
