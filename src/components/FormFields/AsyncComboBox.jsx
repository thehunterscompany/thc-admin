import React, { useState } from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

import InputField from './InputField';

const AsyncComboBox = ({ open, handleOpenChange, data, loading, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const { setValue } = helpers;
  const { value } = field;

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  const enterInput = (value) => {
    return value ? { value, label: value } : null;
  };

  const [userValue, setUserValue] = useState(enterInput(value));

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      return option.label;
    },
  };

  const checkInput = (dataArray, value) => {
    const checkUsername = (obj) => obj.value === value;
    if (!dataArray.some(checkUsername)) {
      setUserValue(null);
      setValue('');
    }
  };

  return (
    <Autocomplete
      {...defaultProps}
      value={userValue}
      sx={{ width: '100%' }}
      open={open}
      onOpen={() => {
        handleOpenChange(true);
      }}
      onClose={() => {
        handleOpenChange(false);
      }}
      onChange={(_e, newValue) => {
        setUserValue(newValue);
        setValue(newValue !== null ? newValue.value : '');
      }}
      onBlur={() => checkInput(data, value)}
      isOptionEqualToValue={(option, value) => option.label === value.value}
      loading={loading}
      openOnFocus
      renderInput={(params) => {
        return (
          <InputField
            {...params}
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()}
            variant="filled"
            margin="normal"
            {...field}
            {...props}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress style={{ color: 'rgb(211, 73, 150)' }} size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default AsyncComboBox;

AsyncComboBox.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpenChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
