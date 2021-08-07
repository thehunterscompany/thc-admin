import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { InputField, SelectField } from '../../../../../components/FormFields';

const RealEstateForm = ({ formField, values }) => {
  const { value, percentage, type, time, realEstateType } = formField;

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        Financiación de vivienda
      </Typography>
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
            name={type.name}
            label={type.label}
            data={[
              { value: 'Crédito', label: 'Crédito' },
              { value: 'Leasing Habitacional', label: 'Leasing Habitacional' },
            ]}
            fullWidth
            style={{ marginTop: '25px' }}
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
          <SelectField
            name={realEstateType.name}
            label={realEstateType.label}
            data={[
              { value: 'Usada', label: 'Usada' },
              { value: 'Nueva', label: 'Nueva' },
              { value: 'None', label: 'No se aun' },
            ]}
            fullWidth
            style={{ marginTop: '25px' }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

RealEstateForm.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default RealEstateForm;
