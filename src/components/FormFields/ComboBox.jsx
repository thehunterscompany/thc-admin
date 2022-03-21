import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import InputField from './InputField';

const ComboBox = ({ data, disabled, handleChange, ...props }) => {
  const [field, , helpers] = useField(props);
  const { setValue } = helpers;
  const { value } = field;

  const enterInput = (value) => {
    return value ? { value, label: value } : null;
  };

  const [userValue, setUserValue] = useState(enterInput(value));

  const checkInput = (dataArray, value) => {
    const checkUsername = (obj) => obj.value === value;
    if (!dataArray.some(checkUsername)) {
      setUserValue(null);
      setValue('');
    }
  };

  return (
    <Autocomplete
      disabled={disabled}
      options={data}
      value={userValue}
      inputValue={value}
      sx={{ width: '100%' }}
      onChange={(_e, newValue) => {
        setUserValue(newValue);
        setValue(newValue !== null ? newValue.value : '');
        if (handleChange !== undefined) {
          handleChange();
        }
      }}
      onInputChange={() => setUserValue(null)}
      onBlur={() => checkInput(data, value)}
      openOnFocus
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.value}
      renderInput={(params) => {
        return (
          <InputField
            {...params}
            {...field}
            {...props}
            disabled={disabled}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
};
