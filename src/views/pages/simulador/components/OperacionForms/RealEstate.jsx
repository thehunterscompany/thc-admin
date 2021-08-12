import React from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';

const RealEstateForm = ({ formField, values, currencySymbol }) => {
  const { value, percentage, type, time, realEstateType } = formField;

  return (
    <React.Fragment>
      <h2>Financiación de vivienda</h2>
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
        <Grid item xs={12} md={6}>
          <SelectField
            name={type.name}
            label={type.label}
            data={[
              { value: 'Crédito', label: 'Crédito' },
              { value: 'Leasing Habitacional', label: 'Leasing Habitacional' },
            ]}
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
  currencySymbol: PropTypes.string,
};

export default RealEstateForm;
