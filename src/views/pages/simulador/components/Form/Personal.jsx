import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import {
  InputField,
  SelectField,
  DateField,
} from '../../../../../components/FormFields';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';
import countryList from 'react-select-country-list';

const simulationOptions = [
  { value: 1, label: 'Calular Cuota' },
  { value: 2, label: 'Cuanto me prestan' },
];

const rateSimulation = [
  { value: 1, label: 'Financiación de vivienda' },
  { value: 2, label: 'Financiación inmuebles comerciales' },
  { value: 3, label: 'Compra de cartera' },
];

const idType = [
  { value: 1, label: 'Cedula de ciudadanía' },
  { value: 2, label: 'Cedula de extrangería' },
  { value: 3, label: 'Pasaporte' },
];

const PersonalFields = ({ formField, values }) => {
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  });

  const {
    firstNames,
    lastNames,
    documentType,
    documentId,
    dateOfBirth,
    email,
    countryCode,
    telephone,
    simulation,
    simulationType,
  } = formField;

  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const calculateMaxDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let yearDiff = year - 18;
    today.setFullYear(yearDiff);
    return today;
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={firstNames.name}
            label={firstNames.label}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={lastNames.name}
            label={lastNames.label}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            name={documentType.name}
            label={documentType.label}
            data={idType}
            fullWidth
            style={{ marginTop: '25px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={documentId.name}
            label={documentId.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateField
            name={dateOfBirth.name}
            label={dateOfBirth.label}
            format="dd/MM/yyyy"
            minDate={new Date('1900/01/01')}
            maxDate={calculateMaxDate()}
            style={{ marginTop: '25px' }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={email.name}
            label={email.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectField
            name={countryCode.name}
            label={countryCode.label}
            data={options}
            fullWidth
            style={{ marginTop: '25px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={telephone.name}
            label={telephone.label}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={values.simulation === 1 ? 6 : 12}>
          <SelectField
            name={simulation.name}
            label={simulation.label}
            data={simulationOptions}
            fullWidth
          />
        </Grid>

        {values.simulation === 1 ? (
          <Grid item xs={12} md={6}>
            <SelectField
              name={simulationType.name}
              label={simulationType.label}
              data={rateSimulation}
              fullWidth
            />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
            />
          </FormControl>

          <small>
            Acepto{' '}
            <a
              href="https://thcsas.com.co/terminos-y-condiciones"
              target="_blank"
              rel="noreferrer noopener"
            >
              términos, condiciones y política de tratamiento de datos
            </a>
          </small>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
            />
          </FormControl>
          <small>
            Autorizo a thcsas.com.co a consultar mi información en centrales de
            riesgo.
          </small>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

PersonalFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default PersonalFields;
