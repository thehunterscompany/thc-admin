import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { ComboBox, InputField, MaskedInput } from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

import '../../Simulador.scss';

const useStyles = makeStyles(() => ({
  button: {
    height: '30px',
    fontSize: '12px',
  },
  root: {
    marginLeft: '4px',
  },
  loadingProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

const DATA = [
  { value: 'Empleado término indefinido', label: 'Empleado término indefinido' },
  { value: 'Empleado término fijo', label: 'Empleado término fijo' },
  {
    value: 'Contratista y prestador de servicio',
    label: 'Contratista y prestador de servicio',
  },
  { value: 'Pensionado', label: 'Pensionado' },
  { value: 'Fuerzas Militares', label: 'Fuerzas Militares' },
  { value: 'Rentista de capital', label: 'Rentista de capital' },
];

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const FinancialFields = ({ formField, values, setFieldValue }) => {
  const classes = useStyles();

  const { mainEmployment, laborTime, earnings, passive } = formField;

  const [extraTenants, setExtraTenants] = useState(0);

  const [employmentTypeData, setEmploymentType] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && employmentTypeData.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);
      axiosCall('GET', 'employmentType')
        .then((data) => setEmploymentType(data))
        .catch(() => setEmploymentType(DATA));
    })();
  }, [loading]);

  const renderExtraTenants = () => {
    let array = [];
    for (let i = 0; i < extraTenants; i++) {
      array.push(
        <Grid container item spacing={3}>
          <div className="_titular-space">
            <strong>Titular {i + 2}</strong>
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
              code={'COP'}
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
        <div className="_titular-space">
          <strong>Titular {1}</strong>
        </div>
        <Grid item xs={12} md={6}>
          <ComboBox
            name={mainEmployment.name}
            label={mainEmployment.label}
            loading={loading}
            data={employmentTypeData}
            setFieldValue={setFieldValue}
            handleOpenChange={setOpen}
            open={open}
            fullWidth
            value={values.earnings}
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
                  {parseInt(values.laborTime) > 1 || parseInt(values.laborTime) === 0
                    ? 'años'
                    : 'año'}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={earnings.name}
            label={earnings.label}
            code={'COP'}
            type="currency"
            value={values.earnings}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={passive.name}
            label={passive.label}
            code={'COP'}
            type="currency"
            value={values.passive}
          />
        </Grid>
        {renderExtraTenants().map((tenant, index) => (
          <React.Fragment key={index}>{tenant}</React.Fragment>
        ))}
        {extraTenants < 3 ? (
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
