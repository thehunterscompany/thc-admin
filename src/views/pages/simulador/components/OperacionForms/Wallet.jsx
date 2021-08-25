import React, { useEffect, useMemo, useState } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import { DateField, InputField, MaskedInput } from '../../../../../components/FormFields';

const WalletForm = ({ formField, values, currencySymbol }) => {
  const { value, currentDeal, currentDealMonth, institution, time, rates } = formField;

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
          <DateField
            name={time.name}
            label={time.label}
            format="dd/MM/yyyy"
            minDate={new Date('1900/01/01')}
            maxDate={new Date()}
            style={{ marginTop: '25px' }}
            fullWidth
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
};

export default WalletForm;
