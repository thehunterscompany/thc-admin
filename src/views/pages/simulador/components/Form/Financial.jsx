import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { InputField, MaskedInput } from '../../../../../components/FormFields';
import useCurrencySymbol from '../../hooks/useCurrencySymbol';

import '../../Simulador.scss';

const useStyles = makeStyles(() => ({
  button: {
    height: '30px',
    fontSize: '12px',
  },
  root: {
    marginLeft: '4px',
  },
}));

const FinancialFields = ({ formField, values, setFieldValue }) => {
  const classes = useStyles();

  const { mainEmployment, laborTime, earnings, passive } = formField;

  const [extraTenants, setExtraTenants] = useState(values.tenants.length);

  const currencySymbol = useCurrencySymbol(values.country);

  useEffect(() => {
    if (values.earnings) {
      if (currencySymbol !== values.earnings.split(' ')[0]) {
        setFieldValue('earnings', `${currencySymbol} ${values.earnings.split(' ')[1]}`);
        setFieldValue('passive', `${currencySymbol} ${values.passive.split(' ')[1]}`);
        if (values.tenants.length) {
          for (let i = 0; i < values.tenants.length; i++) {
            setFieldValue(
              `tenants[${i}].earnings`,
              `${currencySymbol} ${values.tenants[i].earnings.split(' ')[1]}`,
            );
          }
        }
      }
    }
  }, [currencySymbol]);

  const renderExtraTenants = () => {
    let array = [];
    for (let i = 0; i < extraTenants; i++) {
      array.push(
        <Grid container item spacing={3}>
          <div className="_titular-space">
            <strong>Titular {i + 1}</strong>
            <Button
              className={`_eliminar-x ${classes.button}`}
              onClick={() => handleRemoveClick(i)}
            >
              Elimar Titular
            </Button>
          </div>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].firstNames`}
              label={'Nombres'}
              type="text"
              fullWidth
              value={
                values.tenants.length && values.tenants[i]
                  ? values.tenants[i].firstNames
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].lastNames`}
              label="Apellidos"
              type="text"
              fullWidth
              value={
                values.tenants.length && values.tenants[i]
                  ? values.tenants[i].lastNames
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MaskedInput
              name={`tenants[${i}].earnings`}
              label={earnings.label}
              code={currencySymbol}
              width="41.5vw"
              type="currency"
              value={
                values.tenants.length && values.tenants[i]
                  ? values.tenants[i].earnings
                  : ''
              }
            />
          </Grid>
        </Grid>,
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

  const handleRemoveClick = (index) => {
    let array = values.tenants.slice();
    array.splice(index, 1);
    setExtraTenants((preValue) => preValue - 1);
    setFieldValue('tenants', array);
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
            value={values.mainEmployment}
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
            value={values.laborTime}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={earnings.name}
            label={earnings.label}
            code={currencySymbol}
            type="currency"
            value={values.earnings}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={passive.name}
            label={passive.label}
            code={currencySymbol}
            type="currency"
            value={values.passive}
          />
        </Grid>
        {renderExtraTenants().map((tenant, index) => (
          <React.Fragment key={index}>{tenant}</React.Fragment>
        ))}
        {extraTenants < 4 ? (
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Button onClick={handleAddClick} className={classes.root}>
                    Añadir Titular (máximo 4 titulares por operación)
                  </Button>
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
