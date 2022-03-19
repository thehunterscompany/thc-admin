import React, { useState } from 'react';
import { FormControl, FormControlLabel, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { StyleRoot } from 'radium';
import useWindowSize from 'src/hooks/useWindowSize';
import cities from 'src/utils/data/colombiaCities.json';
import states from 'src/utils/data/colombiaStates.json';

import {
  ComboBox,
  DateField,
  InputField,
  MaskedInput,
  SelectField,
} from '../../../../../components/FormFields';
import { CustomSwitch } from '../../../../../components/Switch';

const simulationOptions = [
  { value: 1, label: 'Calcular Cuota' },
  { value: 2, label: 'Cuanto me prestan' },
];

const rateSimulation = [
  { value: 1, label: 'Financiación de vivienda' },
  { value: 2, label: 'Financiación inmuebles comerciales' },
  { value: 3, label: 'Compra de cartera' },
];

const idType = [
  { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
  { value: 'Cédula de extranjería', label: 'Cédula de extranjería' },
];

const statesData = states.states;
const citiesData = cities.cities;

const PersonalFields = ({ formField, values, setFieldValue }) => {
  const [checkboxes, setCheckboxes] = useState({
    checkedA: values?.checkedA ? values.checkedA : false,
    checkedB: values?.checkedB ? values.checkedB : false,
  });

  const { width } = useWindowSize();

  const phoneFormatting = { format: '+57 (###) ###-####', mask: '_' };

  const labelStyle = {
    // Adding media query..
    '@media (max-width: 500px)': {
      paddingLeft: '20px',
    },
  };

  const {
    firstNames,
    lastNames,
    documentType,
    documentId,
    dateOfBirth,
    email,
    city,
    state,
    telephone,
    simulation,
    simulationType,
  } = formField;

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
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
            value={values.firstNames}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={lastNames.name}
            label={lastNames.label}
            type="text"
            fullWidth
            value={values.lastNames}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectField
            name={documentType.name}
            label={documentType.label}
            value={values.documentType}
            data={idType}
            fullWidth
            style={width >= 960 ? { marginTop: '16px' } : {}}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={documentId.name}
            label={documentId.label}
            type="text"
            value={values.documentId}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            name={email.name}
            label={email.label}
            type="text"
            value={values.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedInput
            name={telephone.name}
            label={telephone.label}
            type="text"
            value={values.telephone}
            fullWidth
            setFieldValue={setFieldValue}
            format={phoneFormatting}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ComboBox
            name={state.name}
            label={state.label}
            value={values.state}
            data={statesData}
            fullWidth
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ComboBox
            name={city.name}
            label={city.label}
            value={values.city}
            data={citiesData}
            fullWidth
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateField
            name={dateOfBirth.name}
            label={dateOfBirth.label}
            value={values.dateOfBirth}
            format="dd/MM/yyyy"
            minDate={new Date('1900/01/01')}
            maxDate={new Date()}
            style={width >= 960 ? { marginTop: '25px' } : {}}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectField
            name={simulation.name}
            label={simulation.label}
            data={simulationOptions}
            fullWidth
            style={{ marginTop: '16px' }}
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

        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl>
            <FormControlLabel
              label=""
              control={
                <CustomSwitch
                  checked={checkboxes.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
            />
          </FormControl>
          <StyleRoot style={labelStyle}>
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
          </StyleRoot>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl>
            <FormControlLabel
              label=""
              control={
                <CustomSwitch
                  checked={checkboxes.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                />
              }
            />
          </FormControl>
          <StyleRoot style={labelStyle}>
            <small>
              Autorizo a thcsas.com.co a consultar mi información en centrales de riesgo.
            </small>
          </StyleRoot>
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
