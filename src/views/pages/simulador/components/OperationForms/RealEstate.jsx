import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  ComboBox,
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const DATA = [
  { value: 'Crédito Hipotecario', label: 'Crédito Hipotecario' },
  { value: 'Leasing Habitacional', label: 'Leasing Habitacional' },
];

const RealEstateForm = ({ formField, values, currencySymbol, setFieldValue }) => {
  const { value, currentDeal, type, time, realEstateType } = formField;

  const [creditLineType, setCreditLineType] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && creditLineType.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);
      axiosCall('GET', 'credit-type')
        .then((data) => setCreditLineType(data))
        .catch(() => setCreditLineType(DATA));
    })();
  }, [loading]);

  return (
    <React.Fragment>
      <h2>Financiación de vivienda</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ComboBox
            name={type.name}
            label={type.label}
            loading={loading}
            data={creditLineType}
            setFieldValue={setFieldValue}
            handleOpenChange={setOpen}
            open={open}
            value={values.type}
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
            value={values.realEstateType}
            style={{ marginTop: '5%' }}
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

        <Grid item xs={6}>
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
  setFieldValue: PropTypes.func,
};

export default RealEstateForm;
