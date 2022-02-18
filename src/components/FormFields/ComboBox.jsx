import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

import InputField from './InputField';

const ComboBox = (props) => {
  const { value, errorText, data, name, setFieldValue, ...rest } = props;
  const [field, meta] = useField(props);
  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  const enterInput = (value) => {
    // eslint-disable-next-line react/prop-types
    return value ? { value, label: value } : null;
  };

  const [userValue, setValue] = useState(enterInput(value));

  return (
    <Autocomplete
      options={data}
      value={userValue}
      sx={{ width: '100%' }}
      onChange={(_e, newValue) => {
        setValue(newValue);
        setFieldValue(name, newValue !== null ? newValue.value : '');
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.value}
      renderInput={(params) => {
        return (
          <InputField
            {...params}
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()}
            variant="filled"
            margin="normal"
            {...field}
            {...rest}
            InputProps={{
              ...params.InputProps,
            }}
          />
        );
      }}
    />
  );
};

export default ComboBox;

ComboBox.propTypes = {
  name: PropTypes.string,
  errorText: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  setFieldValue: PropTypes.func,
  value: PropTypes.string,
};
