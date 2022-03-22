import React, { useEffect, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import esLocale from 'date-fns/locale/es';
import { useField } from 'formik';
import { at } from 'lodash';
import PropTypes from 'prop-types';

const localeMap = {
  es: esLocale,
};

const maskMap = {
  es: '__/__/____',
};

const DateField = ({ minDate, maxDate, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setError, setValue, setTouched } = helpers;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(value ? value : null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    } else {
      return 'dd/mm/yyyyy';
    }
  };

  const handleInputBlur = () => {
    if (selectedDate === null) {
      setError('Este campo es requerido');
      setTouched(true, false);
    } else if (meta.error) {
      setTouched(true, false);
    }
  };

  const handleChange = (date) => {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['es']}>
      <DatePicker
        views={['year', 'month', 'day']}
        mask={maskMap.es}
        minDate={minDate}
        maxDate={maxDate}
        value={selectedDate}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            variant="standard"
            helperText={_renderHelperText()}
            onBlur={handleInputBlur}
            error={meta.touched && meta.error && true}
          />
        )}
      />
    </LocalizationProvider>
  );
};

DateField.propTypes = {
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

export default DateField;
