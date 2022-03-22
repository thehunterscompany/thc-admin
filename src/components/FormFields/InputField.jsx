import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

const InputField = (props) => {
  const [field, meta] = useField(props);

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  return (
    <TextField
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      variant="filled"
      margin="normal"
      {...field}
      {...props}
    />
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  type: 'text',
};

export default React.memo(InputField);
