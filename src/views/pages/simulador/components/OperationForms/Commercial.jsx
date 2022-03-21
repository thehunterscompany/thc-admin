import React, { useEffect } from 'react';
import { Grid, InputAdornment } from '@mui/material';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import {
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

const CommercialForm = ({ formField, currencySymbol }) => {
  const { values, setFieldValue } = useFormikContext();

  const { time } = values;

  const { value, currentDeal, realEstateType, type } = formField;

  useEffect(() => {
    (async () => {
      axiosCall('GET', 'credit-type')
        .then((data) => setFieldValue(type.name, data))
        .catch(() => setFieldValue(type.name, 'Linea Comercial'));
    })();
  }, [setFieldValue, type]);

  const checkCurrencyFormat = ({ floatValue }) => {
    if (floatValue !== undefined) {
      if (floatValue <= 0) {
        return false;
      }
    }

    return true;
  };

  const currencyFormat = {
    prefix: `${currencySymbol} `,
    thousandSeparator: '.',
    decimalSeparator: ',',
    isAllowed: checkCurrencyFormat,
  };

  return (
    <React.Fragment>
      <h2>Financiación inmuebles comerciales</h2>
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
          <SelectField
            name={realEstateType.name}
            label={realEstateType.label}
            data={[
              { value: 'Bodega', label: 'Bodega' },
              { value: 'Consultorio', label: 'Consultorio' },
              { value: 'Oficina', label: 'Oficina' },
              { value: 'Local', label: 'Local' },
            ]}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={formField.time.name}
            label={formField.time.label}
            type="text"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {time > 1 ? 'años' : 'año'}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CommercialForm.propTypes = {
  formField: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

export default CommercialForm;
