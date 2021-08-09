import React, { useEffect, useMemo, useState } from 'react';
import { Grid, InputAdornment, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';

const CommercialForm = ({ formField, values, currencySymbol }) => {
  const { value, percentage, realEstateType, time } = formField;

  return (
    <React.Fragment>
      <h2>Financiación inmuebles comerciales</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={value.name}
            label={value.label}
            code={currencySymbol}
            type="currency"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={percentage.name}
            label={percentage.label}
            type="percentage"
            code="%"
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

        <Grid item xs={12} md={6}>
          <InputField
            name={time.name}
            label={time.label}
            type="text"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {parseInt(values.time) > 1 ? 'años' : 'año'}
                </InputAdornment>
              ),
            }}
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
  currencySymbol: PropTypes.string,
};

export default CommercialForm;
