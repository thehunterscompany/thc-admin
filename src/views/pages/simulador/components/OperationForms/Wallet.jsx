import React, { useEffect } from 'react';
import { Grid, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

import { InputField, MaskedInput } from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

const WalletForm = ({ formField, timeVal, currencySymbol, setFieldValue }) => {
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
            type="text"
            fullWidth
            format={currencyFormat}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDeal.name}
            label={currentDeal.label}
            type="text"
            fullWidth
            format={currencyFormat}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDealMonth.name}
            label={currentDealMonth.label}
            type="text"
            fullWidth
            format={currencyFormat}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {timeVal > 1 ? 'años' : 'año'}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={rates.name}
            label={rates.label}
            type="text"
            fullWidth
            format={percentageFormat}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

WalletForm.propTypes = {
  formField: PropTypes.object,
  timeVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currencySymbol: PropTypes.string,
  setFieldValue: PropTypes.func,
};

export default WalletForm;
