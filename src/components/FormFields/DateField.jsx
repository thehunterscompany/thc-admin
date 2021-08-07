import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

export default function DateField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const { value } = field;

  const isError = touched && error && true;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      try {
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );
        setValue(newDate.toISOString().split('T')[0]);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          value={selectedDate}
          onChange={handleDateChange}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          // {...field}
          {...props}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
