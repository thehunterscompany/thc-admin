import React, { useEffect, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import esLocale from 'date-fns/locale/es';
import { useField } from 'formik';

const localeMap = {
  es: esLocale,
};

const maskMap = {
  es: '__/__/____',
};

const DateField = (props) => {
  // eslint-disable-next-line react/prop-types
  const { minDate, maxDate, ...other } = props;
  const [field, helper] = useField(props);
  const { setValue } = helper;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(value ? value : null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

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
        mask={maskMap[localeMap.es]}
        minDate={minDate}
        maxDate={maxDate}
        value={selectedDate}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...other}
            variant="standard"
            helperText={'dd/mm/yyyy'}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
