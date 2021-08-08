import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import { at } from 'lodash';
import { countries } from 'src/utils/data/countryData';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397),
        )
    : isoCode;
};

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const CountrySelect = (props) => {
  const classes = useStyles();

  const options = useMemo(() => countries, []);

  // eslint-disable-next-line react/prop-types
  const { errorText, type, setFieldValue, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <Autocomplete
      id="country-select-demo"
      options={options}
      classes={{
        option: classes.option,
      }}
      onChange={(e, value) => {
        setFieldValue(
          'country',
          value !== null
            ? value
            : { name: '', code: '', phone: '', currencyCode: '' },
        );
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code}) +{option.phone}
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

export default CountrySelect;
