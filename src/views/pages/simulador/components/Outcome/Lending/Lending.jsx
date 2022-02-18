import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

const Lending = () => {
  const { maxLoanValue, symbol } = useSelector((state) => state.LendingSimulationState);

  return (
    <Container className="_simulation_results">
      <h1>¡Felicitaciones!</h1>
      <h2>Puedes tener una financiación de hasta</h2>
      <h2 className="_value">{` ${symbol} ${maxLoanValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`}</h2>
      <p>
        ** este valor está calculado con base en el promedio de las tasas de interés
        vigentes en cada momento del mercado. Para cada operación buscamos la mejor tasa
        dependiendo del perfil del cliente.
      </p>
      <span>
        {`Si quieres solicitar tu financiación, haz click en el botón "Contáctanos" para
        comunicarte con uno de nuestros brokers.`}
      </span>
    </Container>
  );
};

export default Lending;
