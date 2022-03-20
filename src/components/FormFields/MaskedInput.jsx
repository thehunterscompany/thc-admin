import React from 'react';
import { useField } from 'formik';

import TextField from './InputField';
import NumberFormatCustom from './NumberFormat';

const FormattedInputs = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setFieldValue, format, ...other } = props;
  const [field, , helpers] = useField(props);

  const { setValue } = helpers;
  const { value } = field;

  const handleChange = (value) => {
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
      value={value}
      {...other}
    />
  );
};

export default FormattedInputs;
