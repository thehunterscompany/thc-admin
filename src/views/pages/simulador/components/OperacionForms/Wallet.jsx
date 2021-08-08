import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { InputField, SelectField } from '../../../../../components/FormFields';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiTypography: {
      // Name of the rule
      h2: {
        // Some CSS
        fontSize: '2em',
      },
    },
  },
});

const WalletForm = ({ formField, values }) => {
  // const classes = useStyles();
  const { value, currentDeal, currentDealMonth, institution, time, rates } =
    formField;

  return (
    <React.Fragment>
      {/* <ThemeProvider theme={theme}>
        <Typography variant="h2" gutterBottom>
          Financiación de vivienda
        </Typography>
      </ThemeProvider> */}
      <h2>Compra de cartera</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={value.name}
            label={value.label}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={currentDeal.name}
            label={currentDeal.label}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={currentDealMonth.name}
            label={currentDealMonth.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={institution.name}
            label={institution.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={time.name}
            label={time.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={rates.name}
            label={rates.label}
            type="text"
            fullWidth
          />
        </Grid>

        <div style={{ minWidth: '50vw' }} />
      </Grid>
    </React.Fragment>
  );
};

WalletForm.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default WalletForm;
