import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import TextMaskCustom from './TextMaskCustom';

const FormattedInputs = (props) => {
  const useStyles = makeStyles({
    root: {
      width: '20vw',
      marginTop: '16px',
    },
  });

  const { code } = props;
  const [values, setValues] = useState(`+${code}`);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  useEffect(() => {
    if (code && code.length >= 1) {
      setValues(`+${code}`);
    } else {
      setValues('');
    }
  }, [code]);

  return (
    <div>
      <FormControl className={useStyles().root}>
        <TextField
          label={props.label}
          value={values}
          onChange={handleChange}
          variant="filled"
          id="formatted-text-mask-input"
          InputProps={{
            inputComponent: TextMaskCustom,
            inputProps: { code },
          }}
          {...props}
        />
      </FormControl>
    </div>
  );
};

FormattedInputs.propTypes = {
  code: PropTypes.string,
  label: PropTypes.string,
};

export default FormattedInputs;
