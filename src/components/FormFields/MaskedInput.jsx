import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import TextField from './InputField';
import NumberFormatCustom from './NumberFormat';

const FormattedInputs = ({ format, ...props }) => {
  const [field, , helpers] = useField(props);

  const { setValue } = helpers;
  const { value } = field;

  const handleChange = () => {
    setValue(value !== null ? value : '');
  };

  return (
    <TextField
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      inputProps={{
        format,
      }}
      {...props}
    />
  );
};

FormattedInputs.propTypes = {
  format: PropTypes.object.isRequired,
};

export default FormattedInputs;
