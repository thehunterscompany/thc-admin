import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';

import TextMaskCustom from './TextMaskCustom/TextMaskCustom';
import InputField from './InputField';

const MaskedInput = (props) => {
  const { code, type, width } = props;

  const useStyles = makeStyles({
    root: {
      width: width ? width : '100%',
    },
  });

  const [values, setValues] = useState(
    type === 'phone' ? `+${code}` : type === 'currency' ? `${code}` : ` ${code}`,
  );

  const handleChange = (event) => {
    setValues(event.target.value);
  };
  useEffect(() => {
    if (code && code.length > 0) {
      if (type === 'phone') setValues(`+${code}`);
      else if (type === 'currency') setValues(`${code}`);
      else if (type === 'percentage') setValues(` ${code}`);
    } else {
      setValues('');
    }
  }, [code, type]);

  return (
    <div>
      <FormControl className={useStyles().root}>
        <InputField
          label={props.label}
          value={values}
          onChange={handleChange}
          InputProps={{
            inputComponent: TextMaskCustom,
            inputProps: { code, type },
          }}
          {...props}
        />
      </FormControl>
    </div>
  );
};

MaskedInput.propTypes = {
  code: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.string,
};

export default React.memo(MaskedInput);
