import React from 'react';
import { Grid, Typography } from '@mui/material';

const MientrasTanto = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ textAlign: 'center' }}
    >
      <h1>Gracias por completar el simulador</h1>
      <p>
        Si deseas continuar con el proceso. Haz click en botón para comunicarte con uno de
        nuestros brokers
      </p>
    </Grid>
  );
};

export default MientrasTanto;
