import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

export default function InputField(props) {
  // eslint-disable-next-line react/prop-types
  const { errorText, type, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type={type}
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      variant="filled"
      margin="normal"
      {...field}
      {...rest}
    />
  );
}
