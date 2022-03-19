import React from 'react';

import TextField from './InputField';
import NumberFormatCustom from './NumberFormat';

const FormattedInputs = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setFieldValue, format, ...other } = props;
  const handleChange = (name, value) => {
    setFieldValue(name, value !== null ? value : '');
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
      {...other}
    />
  );
};

export default FormattedInputs;
