import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { InputField, SelectField } from '../../../../../components/FormFields';
import { FormControl, FormControlLabel, Button } from '@material-ui/core';
import country from 'currency-codes';

const OperationalFields = ({ formField, values }) => {
  return (
    <div>
      <h3>Hi</h3>
    </div>
  );
};

OperationalFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default OperationalFields;
