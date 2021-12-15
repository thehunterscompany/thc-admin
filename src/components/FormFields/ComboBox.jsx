import React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

const ComboBox = (props) => {
  const {
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

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      open={open}
      onOpen={() => {
        handleOpenChange(true);
      }}
      onClose={() => {
        handleOpenChange(false);
      }}
      onChange={(_e, newValue) => {
        setFieldValue(name, newValue !== null ? newValue.value : '');
      }}
      getOptionLabel={(option) => option.label}
      options={data}
      loading={loading}
      renderInput={(params) => (
        <TextField
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
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default ComboBox;

ComboBox.propTypes = {
  name: PropTypes.string,
  errorText: PropTypes.string,
  open: PropTypes.bool,
  handleOpenChange: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  setFieldValue: PropTypes.func,
};
