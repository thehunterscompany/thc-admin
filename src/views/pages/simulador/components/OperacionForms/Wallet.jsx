import React, { useEffect, useMemo, useState } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import { InputField, MaskedInput } from '../../../../../components/FormFields';

const WalletForm = ({ formField, values, currencySymbol }) => {
  const { value, currentDeal, currentDealMonth, institution, time, rates } =
    formField;

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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDeal.name}
            label={currentDeal.label}
            code={currencySymbol}
            type="currency"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={currentDealMonth.name}
            label={currentDealMonth.label}
            code={currencySymbol}
            type="currency"
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
                  {parseInt(values.time) > 1 ? 'meses' : 'mes'}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={rates.name}
            label={rates.label}
            code="%"
            type="percentage"
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
};

export default WalletForm;
