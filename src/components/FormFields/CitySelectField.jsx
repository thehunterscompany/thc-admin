import React, { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import { cities } from 'src/utils/data/colombiaCities';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const findIfSelectedOption = (value, data) => {
  // eslint-disable-next-line react/prop-types
  const city = (element) => element.label === value?.label;
  const index = data.findIndex(city);
  if (index > -1) {
    return data[index];
  }
  return data[1];
};

const enterInput = (value) => {
  // eslint-disable-next-line react/prop-types
  if (value.label) {
    // eslint-disable-next-line react/prop-types
    return value.label;
  }
  return '';
};

const CitySelect = (props) => {
  // eslint-disable-next-line react/prop-types
  const { errorText, type, setFieldValue, value, ...rest } = props;
  const data = useMemo(() => cities, []);

  const [inputValue, setInputValue] = useState(enterInput(value));
  const [userValue, setValue] = useState(findIfSelectedOption(value, data));
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const [field, meta] = useField(props);

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  return (
    <Autocomplete
      options={data}
      autoHighlight
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
        const city = (element) => element.label === newInputValue;
        const index = data.findIndex(city);
        if (index > -1) {
          setFieldValue('location', data[index]);
        }
        setInputValue(newInputValue);
      }}
      value={userValue}
      getOptionLabel={(option) => option.label || ''}
      classes={{
        option: classes.option,
      }}
      onChange={(_e, newValue) => {
        setValue(newValue);
        setFieldValue(
          'location',
          newValue !== null ? newValue : { label: '', state: '' },
        );
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ width: '100%' }} {...props}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          error={meta.touched && meta.error && true}
          helperText={_renderHelperText()}
          variant="filled"
          margin="normal"
          {...field}
          {...rest}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default React.memo(CitySelect);
