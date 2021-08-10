import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { InputField, MaskedInput } from '../../../../../components/FormFields';
import useCurrencySymbol from '../../hooks/useCurrencySymbol';

const FinancialFields = ({ formField, values }) => {
  const { mainEmployment, laborTime, earnings, passive } = formField;

  const [extraTenants, setExtraTenants] = useState(0);

  const currencySymbol = useCurrencySymbol(values.country);

  const useStyles = makeStyles({
    root: {
      width: '101%',
    },
  });

  const renderExtraTenants = () => {
    let array = [];
    for (let i = 0; i < extraTenants; i++) {
      array.push(
        <React.Fragment>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].firstNames`}
              label={'Nombres'}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].lastNames`}
              label="Apellidos"
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <MaskedInput
              name={`tenants[${i}].earnings`}
              label={earnings.label}
              code={currencySymbol}
              width={'41.9vw'}
              type="currency"
            />
          </Grid>
        </React.Fragment>,
      );
    }
    return array;
  };

  const handleAddClick = () => {
    if (extraTenants === 4) {
    } else {
      setExtraTenants((preValue) => preValue + 1);
    }
  };

  const handleRemoveClick = () => {
    setExtraTenants((preValue) => preValue - 1);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={mainEmployment.name}
            label={mainEmployment.label}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={laborTime.name}
            label={laborTime.label}
            type="text"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {parseInt(values.laborTime) > 1 ? 'años' : 'año'}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={earnings.name}
            label={earnings.label}
            code={currencySymbol}
            type="currency"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={passive.name}
            label={passive.label}
            code={currencySymbol}
            type="currency"
            className={useStyles().root}
          />
        </Grid>
        {renderExtraTenants().map((tenant, index) => (
          <React.Fragment key={index}>{tenant}</React.Fragment>
        ))}
        {extraTenants < 4 ? (
          <Grid item xs={12} md={extraTenants > 0 && extraTenants < 4 ? 6 : 12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Button onClick={handleAddClick}>
                    Añadir Titular (máximo 4 titulares por operación)
                  </Button>
                }
              />
            </FormControl>
          </Grid>
        ) : null}
        {extraTenants ? (
          <Grid item xs={12} md={extraTenants > 0 && extraTenants < 4 ? 6 : 12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Button onClick={handleRemoveClick}>Elimar Titular</Button>
                }
              />
            </FormControl>
          </Grid>
        ) : null}
        <div style={{ minWidth: '50vw' }} />
      </Grid>
    </React.Fragment>
  );
};

FinancialFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
};

export default FinancialFields;
