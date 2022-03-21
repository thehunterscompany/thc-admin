import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import {
  AsyncComboBox,
  InputField,
  MaskedInput,
} from '../../../../../components/FormFields';
import { axiosCall } from '../../../../../utils';

import '../../Simulador.scss';

const useStyles = makeStyles(() => ({
  mainGrid: {
    position: 'relative !important',
  },
  button: {
    height: '30px',
    fontSize: '12px',
  },

  extraGrid: {
    paddingTop: '50px !important',
  },
  buttonLabel: {
    margin: '0 !important',
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
  { value: 'Independiente', label: 'Independiente' },
];

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const FinancialFields = ({ formField, laborTimeVal, tenants, setFieldValue }) => {
  const classes = useStyles();

  const { mainEmployment, laborTime, earnings, passive } = formField;

  const [extraTenants, setExtraTenants] = useState(0);

  const [employmentTypeData, setEmploymentTypeData] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && employmentTypeData.length === 0;

  const checkCurrencyFormat = ({ floatValue }) => {
    if (floatValue !== undefined) {
      if (floatValue <= 0) {
        return false;
      }
    }

    return true;
  };

  const currencyFormat = {
    prefix: 'COP ',
    thousandSeparator: '.',
    decimalSeparator: ',',
    isAllowed: checkCurrencyFormat,
  };

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);
      axiosCall('GET', 'employmentType')
        .then((data) => setEmploymentTypeData(data))
        .catch(() => setEmploymentTypeData(DATA));
    })();
  }, [loading]);

  const renderExtraTenants = () => {
    let array = [];
    for (let i = 0; i < extraTenants; i++) {
      array.push(
        <Grid container item spacing={3} className={classes.extraGrid}>
          <div className="_titular-space">
            <strong>Titular {i + 2}</strong>
            <Button
              className={`_eliminar-x ${classes.button}`}
              onClick={() => handleRemoveClick(i)}
            >
              <span> Elimar Titular</span>
            </Button>
          </div>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].firstNames`}
              label={'Nombres'}
              type="text"
              fullWidth
              value={tenants.length && tenants[i] ? tenants[i].firstNames : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name={`tenants[${i}].lastNames`}
              label="Apellidos"
              type="text"
              fullWidth
              value={tenants.length && tenants[i] ? tenants[i].lastNames : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <MaskedInput
              name={`tenants[${i}].earnings`}
              label={earnings.label}
              type="text"
              fullWidth
              value={tenants.length && tenants[i] ? tenants[i].earnings : ''}
              format={currencyFormat}
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
    let array = tenants.slice();
    array.splice(index, 1);
    setExtraTenants((preValue) => preValue - 1);
    setFieldValue('tenants', array);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.mainGrid}>
        <div className="_titular-space">
          <strong>Titular {1}</strong>
        </div>
        <Grid item xs={12} md={6}>
          <AsyncComboBox
            name={mainEmployment.name}
            label={mainEmployment.label}
            loading={loading}
            data={employmentTypeData}
            handleOpenChange={setOpen}
            open={open}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={laborTime.name}
            label={laborTime.label}
            type="number"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {laborTimeVal > 1 || laborTimeVal === 0 ? 'años' : 'año'}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={earnings.name}
            label={earnings.label}
            type="text"
            fullWidth
            format={currencyFormat}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={passive.name}
            label={passive.label}
            type="text"
            fullWidth
            format={currencyFormat}
          />
        </Grid>
        {renderExtraTenants().map((tenant, index) => (
          <React.Fragment key={index}>{tenant}</React.Fragment>
        ))}
        {extraTenants < 3 ? (
          <Grid item xs={12} className="_extra-tenants-button">
            <FormControl>
              <FormControlLabel
                label=""
                control={
                  <Button onClick={handleAddClick}>
                    <span className="_check-mark">
                      Añadir Titular (máximo 4 titulares por operación)
                    </span>
                  </Button>
                }
                className={classes.buttonLabel}
              />
            </FormControl>
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  );
};

FinancialFields.propTypes = {
  formField: PropTypes.object.isRequired,
  laborTimeVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tenants: PropTypes.arrayOf(PropTypes.object),
  setFieldValue: PropTypes.func,
};

export default FinancialFields;
