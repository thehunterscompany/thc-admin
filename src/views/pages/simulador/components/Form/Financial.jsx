import React, { useEffect, useMemo, useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid } from '@material-ui/core';
import country from 'currency-codes';
import PropTypes from 'prop-types';

import { InputField, SelectField } from '../../../../../components/FormFields';

const FinancialFields = ({ formField, values }) => {
  const { mainEmployment, laborTime, earnings, currency, passive } = formField;

  const [extraTenants, setExtraTenants] = useState(0);

  const [countryCurrency, setCountryCurrency] = useState([]);

  const mapCurrency = () => {
    let array;
    array = country.data.map(({ code }) => {
      let object = {};
      object = { value: code, label: code };
      return object;
    });
    return array;
  };

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
          <Grid item xs={12} md={6}>
            <InputField
              name={currency.name}
              label={currency.label}
              value={countryCurrency}
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].earnings`}
              label={earnings.label}
              type="text"
              fullWidth
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

  const currencyOptions = useMemo(() => mapCurrency(), []);

  useEffect(() => {
    if (values.currency) {
      setCountryCurrency(values.currency);
    }
  }, [values.currency]);

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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            name={currency.name}
            label={currency.label}
            data={currencyOptions}
            fullWidth
            style={{ marginTop: '25px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={earnings.name}
            label={earnings.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={currency.name}
            label={currency.label}
            value={countryCurrency}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={passive.name}
            label={passive.label}
            type="text"
            fullWidth
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
};

export default FinancialFields;
