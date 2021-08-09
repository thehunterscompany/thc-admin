import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';
import { useCurrencySymbol } from '../../hooks/useCurrencySymbol';

const RealEstateForm = ({ formField, values }) => {
  const { value, percentage, type, time, realEstateType } = formField;

  const currencySymbol = useCurrencySymbol(values.country);

  return (
    <React.Fragment>
      <h2> Financiación de vivienda</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaskedInput
            name={value.name}
            label={value.label}
            code={currencySymbol}
            type="currency"
            width="42.4vw"
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
          <MaskedInput
            name={time.name}
            label={time.label}
            type="year"
            code="años"
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
        <div style={{ minWidth: '50vw' }} />
      </Grid>
    </React.Fragment>
  );
};

RealEstateForm.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default RealEstateForm;
