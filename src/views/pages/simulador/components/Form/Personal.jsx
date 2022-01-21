import React, { useState } from 'react';
import { FormControl, FormControlLabel, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  CitySelect,
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
  { value: 'Cedula de ciudadanía', label: 'Cedula de ciudadanía' },
  { value: 'Cedula de extragería', label: 'Cedula de extragería' },
];

const PersonalFields = ({ formField, values, setFieldValue }) => {
  const [state, setState] = useState({
    checkedA: values?.checkedA ? values.checkedA : false,
    checkedB: values?.checkedB ? values.checkedB : false,
  });

  const {
    firstNames,
    lastNames,
    documentType,
    documentId,
    dateOfBirth,
    email,
    location,
    telephone,
    simulation,
    simulationType,
  } = formField;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
            style={{ marginTop: '16px' }}
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
          <DateField
            name={dateOfBirth.name}
            label={dateOfBirth.label}
            format="dd/MM/yyyy"
            minDate={new Date('1900/01/01')}
            maxDate={new Date()}
            style={{ marginTop: '25px' }}
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
          <CitySelect
            name={location.name}
            label={location.label}
            fullWidth
            setFieldValue={setFieldValue}
            value={values.location}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MaskedInput
            name={telephone.name}
            label={telephone.label}
            code={'57'}
            type="phone"
            value={values.telephone}
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

        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
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

        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                />
              }
            />
          </FormControl>
          <small>
            Autorizo a thcsas.com.co a consultar mi información en centrales de riesgo.
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
