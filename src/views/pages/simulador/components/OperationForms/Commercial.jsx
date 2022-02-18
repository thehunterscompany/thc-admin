import React, { useEffect } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import useWindowSize from 'src/hooks/useWindowSize';

import {
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

const CommercialForm = ({ formField, values, currencySymbol, setFieldValue }) => {
  const { value, currentDeal, realEstateType, time, type } = formField;

  const { width } = useWindowSize();

  useEffect(() => {
    (async () => {
      axiosCall('GET', 'credit-type')
        .then((data) => setFieldValue(type.name, data))
        .catch(() => setFieldValue(type.name, 'Linea Comercial'));
    })();
  }, [setFieldValue, type]);

  return (
    <React.Fragment>
      <h2>Financiación inmuebles comerciales</h2>
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
            style={width >= 960 ? { marginTop: '16px' } : {}}
            value={values.realEstateType}
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
      </Grid>
    </React.Fragment>
  );
};

CommercialForm.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
  currencySymbol: PropTypes.string,
  setFieldValue: PropTypes.func,
};

export default CommercialForm;