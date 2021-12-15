import React from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';

const RealEstateForm = ({ formField, values, currencySymbol }) => {
  const { value, currentDeal, type, time, realEstateType } = formField;

  return (
    <React.Fragment>
      <h2>Financiación de vivienda</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SelectField
            name={type.name}
            label={type.label}
            data={[
              { value: 'Crédito Hipotecario', label: 'Crédito Hipotecario' },
              { value: 'Leasing Habitacional', label: 'Leasing Habitacional' },
            ]}
            fullWidth
            value={values.type}
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
            value={values.realEstateType}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={value.name}
            label={value.label}
            code={currencySymbol}
            value={values['value']}
            type="currency"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDeal.name}
            label={currentDeal.label}
            code={currencySymbol}
            type="currency"
            value={values.currentDeal}
          />
        </Grid>

        <Grid item xs={12}>
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
            value={values.time}
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
