import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextMaskCustom from './TextMaskCustom/TextMaskCustom';
import InputField from './InputField';

const MaskedInput = (props) => {
  const useStyles = makeStyles({
    root: {
      width: '20vw',
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
        <InputField
          label={props.label}
          value={values}
          onChange={handleChange}
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

MaskedInput.propTypes = {
  code: PropTypes.string,
  label: PropTypes.string,
};

export default MaskedInput;
