/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Grid, InputAdornment, Popover, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import { InputField } from '../../../../../components/FormFields';

import LinearWithValueLabel from './LinearProgressWithLabel';

import '../../Simulador.scss';

const CredentialFields = ({ formField, values }) => {
  const { email, password, repeatPassword } = formField;

  const [showPassword, setShowPassword] = useState(false);

  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = () => {
  //   setAnchorEl(ref.current);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);

  const ref = useRef();

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
              // onClick={handleClick}
              // innerRef={ref}
            />
            {/* <Popover
              style={{ borderRadius: '10px' }}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              disableAutoFocus={true}
              disableRestoreFocus={true}
            >
              <PassswordRulesContainer password={values.password} />
            </Popover> */}
            <LinearWithValueLabel />
            <PassswordRulesContainer password={values.password} />
          </Grid>

          <Grid item xs={12}>
            <InputField
              name={repeatPassword.name}
              label={repeatPassword.label}
              type={showRepeatPassword ? 'text' : 'password'}
              fullWidth
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

const PassswordRulesContainer = (props) => {
  const [correctLength, setCorrectLength] = useState(false);
  const [upperCaseLetter, setUpperCaseLetter] = useState(false);
  const [lowerCaseLetter, setLowerCaseLetter] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);

  // eslint-disable-next-line react/prop-types
  const Item = ({ label, color }) => (
    <span
      style={{
        display: 'flex',
        color: `${color ? 'green' : 'auto'}`,
        padding: '5px 5px 5px 0px',
        marginLeft: '-5px',
        alignItems: 'center',
      }}
    >
      {color ? <CheckIcon htmlColor="green" /> : <ClearIcon />}
      {label}
    </span>
  );

  useEffect(() => {
    if (props?.password?.length >= 8) {
      setCorrectLength(true);
    } else {
      setCorrectLength(false);
    }
    if (/\d/.test(props?.password)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    if (/[A-Z]/.test(props?.password)) {
      setUpperCaseLetter(true);
    } else {
      setUpperCaseLetter(false);
    }
    if (/[a-z]/.test(props?.password)) {
      setLowerCaseLetter(true);
    } else {
      setLowerCaseLetter(false);
    }
    if (/[$%^&*#@!.,?/><+=)(;:~]/.test(props?.password)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }
  }, [props.password]);

  return (
    <Box
      style={{
        display: 'flex',
        borderRadius: '5px',
        flexDirection: 'column',
      }}
    >
      <Item color={correctLength} label="8 caracteres" />
      <Item color={upperCaseLetter} label="1 letra mayúscula" />
      <Item color={lowerCaseLetter} label="1 letra minúscula" />
      <Item color={number} label="1 número" />
      <Item color={specialCharacter} label="1 caracter especial e.g. $%#&*+" />
    </Box>
  );
};

CredentialFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default CredentialFields;
