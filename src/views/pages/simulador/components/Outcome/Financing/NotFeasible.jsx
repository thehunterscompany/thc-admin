import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, LinearProgress } from '@material-ui/core';

const NotFeasible = () => {
  const [isLoading, setIsLoading] = useState(true);

  const simulation = useSelector((state) => state.PmtSimulationState);

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
      <h1>Lo sentimos!</h1>
      <h2>
        Para ese valor de inmueble, debes tener unos ingresos mensuales mínimos
        de
      </h2>
      <h2>{`${simulation.symbol} ${simulation.sum
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</h2>
      <p>
        **Recuerda que puedes consolidar ingresos hasta segundo grado de
        afinidad y tercero de consanguinidad
      </p>
      <span>
        Si quieres más información contacta un bróker o continua vuelve al
        proceso…
      </span>
    </Grid>
  );
};

export default NotFeasible;
