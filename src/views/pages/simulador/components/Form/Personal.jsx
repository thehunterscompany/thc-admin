import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
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

const PersonalFields = ({ formField }) => {
  const { values, setFieldValue } = useFormikContext();

  const { state, checkedA, checkedB, simulation } = values;

  const [checkboxes, setCheckboxes] = useState({
    checkedA: checkedA ? checkedA : false,
    checkedB: checkedB ? checkedB : false,
  });

  const [selectedState, setSelectedState] = useState(state);

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
    telephone,
    simulationType,
  } = formField;

  useEffect(() => {
    if (state !== selectedState) {
      setSelectedState(state);
      setFieldValue('city', '');
    }
  }, [selectedState, setFieldValue, state]);

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  const citiesForStateInput = (stateInput) => {
    if (stateInput) {
      const checkIfCityInState = (obj) => obj.state === stateInput;
      const filteredObject = citiesData.filter((obj) => checkIfCityInState(obj));
      return filteredObject;
    }

    return citiesData;
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
            style={width >= 960 ? { marginTop: '16px' } : {}}
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
          <InputField name={email.name} label={email.label} type="text" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={telephone.name}
            label={telephone.label}
            type="text"
            fullWidth
            format={phoneFormatting}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ComboBox
            name={formField.state.name}
            label={formField.state.label}
            data={statesData}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ComboBox
            name={city.name}
            label={city.label}
            data={citiesForStateInput(state)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateField
            name={dateOfBirth.name}
            label={dateOfBirth.label}
            format="dd/MM/yyyy"
            minDate={new Date('1900/01/01')}
            maxDate={new Date()}
            style={width >= 960 ? { marginTop: '25px' } : {}}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectField
            name={formField.simulation.name}
            label={formField.simulation.label}
            data={simulationOptions}
            fullWidth
            style={{ marginTop: '16px' }}
          />
        </Grid>

        {simulation === 1 ? (
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
  formField: PropTypes.object.isRequired,
};

export default PersonalFields;
