import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import InputField from './InputField';

const ComboBox = (props) => {
  const { data, ...rest } = props;
  const [field, , helpers] = useField(props);

  const { setValue } = helpers;
  const { value } = field;

  const checkInput = (dataArray, value) => {
    const checkUsername = (obj) => obj.value === value;
    if (!dataArray.some(checkUsername)) {
      setValue('');
    }
  };

  const enterInput = (value) => {
    return value ? { value, label: value } : null;
  };

  const [inputValue, setInputValue] = useState(enterInput(value));

  return (
    <Autocomplete
      options={data}
      value={inputValue}
      sx={{ width: '100%' }}
      onChange={(_e, newValue) => {
        setInputValue(newValue);
        setValue(newValue !== null ? newValue.value : '');
      }}
      openOnFocus
      blurOnSelect
      onClose={() => checkInput(data, value)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.value}
      renderInput={(params) => {
        return (
          <InputField
            {...params}
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
  data: PropTypes.arrayOf(PropTypes.object),
};
