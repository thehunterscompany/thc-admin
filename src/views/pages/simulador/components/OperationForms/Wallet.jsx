import React, { useEffect } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import { InputField, MaskedInput } from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

const WalletForm = ({ formField, values, currencySymbol, setFieldValue }) => {
  const { value, currentDeal, currentDealMonth, institution, time, rates, type } =
    formField;

  const checkCurrencyFormat = ({ floatValue }) => {
    if (floatValue !== undefined) {
      if (floatValue <= 0) {
        return false;
      }
    }

    return true;
  };

  const checkPercentageFormat = ({ floatValue }) => {
    if (floatValue !== undefined) {
      if (floatValue > 100 || floatValue === 0) {
        return false;
      }
    }

    return true;
  };

  const currencyFormat = {
    prefix: 'COP ',
    thousandSeparator: '.',
    decimalSeparator: ',',
    allowLeadingZeros: false,
    isAllowed: checkCurrencyFormat,
  };

  const percentageFormat = {
    suffix: '%',
    isAllowed: checkPercentageFormat,
  };

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
            value={values.value}
            type="text"
            fullWidth
            format={currencyFormat}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDeal.name}
            label={currentDeal.label}
            value={values.currentDeal}
            type="text"
            fullWidth
            format={currencyFormat}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDealMonth.name}
            label={currentDealMonth.label}
            value={values.currentDealMonth}
            type="text"
            fullWidth
            format={currencyFormat}
            setFieldValue={setFieldValue}
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
            value={values.rates}
            type="text"
            fullWidth
            format={percentageFormat}
            setFieldValue={setFieldValue}
          />
        </Grid>
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
