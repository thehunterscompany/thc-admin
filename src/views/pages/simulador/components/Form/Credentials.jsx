import React, { useState } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

import { InputField } from '../../../../../components/FormFields';

import '../../Simulador.scss';

const CredentialFields = ({ formField, values }) => {
  const { email, password, repeatPassword } = formField;

  const [showPassword, setShowPassword] = useState(false);

  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword((state) => !state)}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <InputField
              name={repeatPassword.name}
              label={repeatPassword.label}
              type={showRepeatPassword ? 'text' : 'password'}
              fullWidth
              value={values.repeatPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowRepeatPassword((state) => !state)}
                    >
                      {showRepeatPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </div>
                  </InputAdornment>
                ),
              }}
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
