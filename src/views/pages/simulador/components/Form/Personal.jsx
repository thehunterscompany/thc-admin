import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import {
  InputField,
  FormattedInputs,
  SelectField,
  DateField,
  CountrySelect,
} from '../../../../../components/FormFields';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';
import countryList from 'react-select-country-list';
import { formatValue } from 'react-currency-input-field';

const formattedValue2 = formatValue({
  value: '500000',
  intlConfig: { locale: 'en-CO', currency: 'INR' },
});

console.log(formattedValue2);

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

const PersonalFields = ({ formField, values, setFieldValue }) => {
  const [state, setState] = useState({
    checkedA: values?.checkedA ? values.checkedA : false,
    checkedB: values?.checkedB ? values.checkedB : false,
  });

  console.log(state);

  const [phoneCountryCode, setPhoneCountryCode] = useState('');

  useEffect(() => {
    if (values.country['phone']) {
      if (values.country?.phone > 1) {
        setPhoneCountryCode(values.country?.phone);
      } else {
        setPhoneCountryCode('');
      }
    } else {
      setPhoneCountryCode('');
    }
  }, [values.country]);

  const {
    firstNames,
    lastNames,
    documentType,
    documentId,
    dateOfBirth,
    email,
    country,
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
          <CountrySelect
            name={country.name}
            label={country.label}
            fullWidth
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormattedInputs
            name={telephone.name}
            label={telephone.label}
            code={phoneCountryCode}
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
  setFieldValue: PropTypes.func,
};

export default PersonalFields;
