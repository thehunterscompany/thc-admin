import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, LinearProgress } from '@mui/material';

const NotFeasible = () => {
  const [isLoading, setIsLoading] = useState(true);

  const simulation = useSelector((state) => state.PmtSimulationState);

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
      <h1 id="top-point">¡Lo sentimos!</h1>
      <h2>
        Para este valor de inmueble, debes contar con unos ingresos mensuales mínimos de
      </h2>
      <h2 className="_value">{`${simulation.symbol} ${simulation.sum
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`}</h2>
      <div style={{ textAlign: 'left', padding: '0 0.5vw' }}>
        <p>
          **Recuerda que puedes consolidar ingresos hasta segundo grado de consanguinidad
          y primero de afinidad.
        </p>
        <span>
          {`Si deseas continuar con el proceso, haz click en el botón "Contáctanos" para
        comunicarte con uno de nuestros brokers.`}
        </span>
      </div>
    </Container>
  );
};

export default NotFeasible;
