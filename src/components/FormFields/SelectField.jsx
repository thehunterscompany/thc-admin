import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

const SelectField = ({ label, data, ...props }) => {
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  const _renderHelperText = () => {
    if (isError) {
      return <FormHelperText error>{error}</FormHelperText>;
    }
  };

  return (
    <FormControl {...props} variant="filled" margin="normal" error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue ? selectedValue : ''}>
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
        S
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
};

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default React.memo(SelectField);
