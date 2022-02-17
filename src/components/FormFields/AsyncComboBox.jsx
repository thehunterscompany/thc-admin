import React, { useState } from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

import InputField from './InputField';

const AsyncComboBox = (props) => {
  const {
    value,
    errorText,
    open,
    handleOpenChange,
    data,
    loading,
    name,
    setFieldValue,
    ...rest
  } = props;
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

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      return option.label;
    },
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
        setValue(newValue);
        setFieldValue(name, newValue !== null ? newValue.value : '');
      }}
      isOptionEqualToValue={(option, value) => option.label === value.value}
      loading={loading}
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
  name: PropTypes.string,
  errorText: PropTypes.string,
  open: PropTypes.bool,
  handleOpenChange: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  setFieldValue: PropTypes.func,
  value: PropTypes.string,
};
