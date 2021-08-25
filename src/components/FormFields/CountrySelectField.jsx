import React from 'react';
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
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
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
  // eslint-disable-next-line react/prop-types
  const { errorText, type, setFieldValue, value, ...rest } = props;
  const [field, meta] = useField(props);

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  const findIfSelectedOption = () => {
    // eslint-disable-next-line react/prop-types
    const country = (element) => element.label === value?.label;
    const index = countries.findIndex(country);
    if (index > -1) {
      return countries[index];
    }
    return countries[47];
  };

  const enterInput = () => {
    // eslint-disable-next-line react/prop-types
    if (value.label) {
      // eslint-disable-next-line react/prop-types
      return value.label;
    }
    return '';
  };

  const [inputValue, setInputValue] = React.useState(enterInput());
  const [userValue, setValue] = React.useState(findIfSelectedOption());

  return (
    <Autocomplete
      inputValue={inputValue}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={countries}
      classes={{
        option: classes.option,
      }}
      onChange={(e, newValue) => {
        setValue(newValue);
        setFieldValue(
          'country',
          newValue !== null
            ? newValue
            : { code: '', label: '', phone: '', currencyCode: '' },
        );
      }}
      onInputChange={(event, newInputValue) => {
        const country = (element) => element.label === newInputValue;
        const index = countries.findIndex(country);
        if (index > -1) {
          setFieldValue('country', countries[index]);
        }
        setInputValue(newInputValue);
      }}
      value={userValue}
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
