import React, { useEffect } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import { InputField, MaskedInput } from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

const WalletForm = ({ formField, values, currencySymbol, setFieldValue }) => {
  const { value, currentDeal, currentDealMonth, institution, time, rates, type } =
    formField;

  useEffect(() => {
    (async () => {
      axiosCall('GET', 'credit-type')
        .then((data) => setFieldValue(type.name, data))
        .catch(() => setFieldValue(type.name, 'Crédito Hipotecario'));
    })();
  }, [setFieldValue, type]);

  return (
    <React.Fragment>
      <h2>Compra de cartera</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={value.name}
            label={value.label}
            code={currencySymbol}
            type="currency"
            value={values.value}
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
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDealMonth.name}
            label={currentDealMonth.label}
            code={currencySymbol}
            type="currency"
            value={values.currentDealMonth}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={institution.name}
            label={institution.label}
            type="text"
            fullWidth
            value={values.institution}
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
            value={values.time}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={rates.name}
            label={rates.label}
            code="%"
            type="percentage"
            value={values.rates}
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
  currencySymbol: PropTypes.string,
  setFieldValue: PropTypes.func,
};

export default WalletForm;
