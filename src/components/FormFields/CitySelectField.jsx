import React, { useMemo } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

const CitySelect = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { errorText, type, setFieldValue, value, ...rest } = props;
  const [field, meta] = useField(props);

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  const data = useMemo(() => cities, []);

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={data}
      classes={{
        option: classes.option,
      }}
      onChange={(_e, newValue) => {
        setFieldValue(
          'location',
          newValue !== null ? newValue : { label: '', state: '' },
        );
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.label}</span>
        </React.Fragment>
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
