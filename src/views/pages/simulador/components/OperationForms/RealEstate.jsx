import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment } from '@mui/material';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import useWindowSize from 'src/hooks/useWindowSize';

import {
  AsyncComboBox,
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

const RealEstateForm = ({ formField, currencySymbol }) => {
  const { values } = useFormikContext();

  const { time } = values;

  const { value, currentDeal, type, realEstateType } = formField;

  const [creditLineType, setCreditLineType] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && creditLineType.length === 0;

  const { width } = useWindowSize();

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
    allowLeadingZeros: false,
    isAllowed: checkCurrencyFormat,
  };

  return (
    <React.Fragment>
      <h2>Financiación de vivienda</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AsyncComboBox
            name={type.name}
            label={type.label}
            loading={loading}
            data={creditLineType}
            handleOpenChange={setOpen}
            open={open}
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
              { value: 'None', label: 'No se aún' },
            ]}
            fullWidth
          />
        </Grid>
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

        <Grid item xs={width >= 960 ? 6 : 12}>
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

RealEstateForm.propTypes = {
  formField: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

export default RealEstateForm;
