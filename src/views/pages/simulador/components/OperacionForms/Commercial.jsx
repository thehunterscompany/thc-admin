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

const CommercialForm = ({ formField, values }) => {
  // const classes = useStyles();
  const { value, percentage, realEstateType, time } = formField;

  return (
    <React.Fragment>
      {/* <ThemeProvider theme={theme}>
        <Typography variant="h2" gutterBottom>
          Financiación de vivienda
        </Typography>
      </ThemeProvider> */}
      <h2>Financiación inmuebles comerciales</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={'currency'}
            label={'Tipo de Moneda'}
            value={values.currency}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
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
            name={percentage.name}
            label={percentage.label}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            name={realEstateType.name}
            label={realEstateType.label}
            data={[
              { value: 'Local', label: 'Local' },
              { value: 'Oficina', label: 'Oficina' },
              { value: 'Consultorio', label: 'Consultorio' },
            ]}
            fullWidth
            style={{ marginTop: '25px' }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputField
            name={time.name}
            label={time.label}
            type="text"
            fullWidth
          />
        </Grid>

        <div style={{ minWidth: '50vw' }} />
      </Grid>
    </React.Fragment>
  );
};

CommercialForm.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default CommercialForm;
