import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { InputField } from '../../../../../components/FormFields';

import '../../Simulador.scss';

const CredentialFields = ({ formField, values }) => {
  const { email, password, repeatPassword } = formField;

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ textAlign: 'center' }}
      >
        <h1>Crea tu cuenta!</h1>

        <Grid container spacing={3} item>
          <Grid item xs={12}>
            <InputField
              name={email.name}
              label={email.label}
              type="text"
              fullWidth
              value={values.email}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name={password.name}
              label={password.label}
              type="password"
              fullWidth
              value={values.password}
            />
          </Grid>

          <Grid item xs={12}>
            <InputField
              name={repeatPassword.name}
              label={repeatPassword.label}
              type="password"
              fullWidth
              value={values.repeatPassword}
            />
          </Grid>

          <div style={{ minWidth: '50vw' }} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CredentialFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default CredentialFields;
