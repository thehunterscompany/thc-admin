import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, format, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(_e, values) => {
        onChange(values);
      }}
      {...format}
    />
  );
});

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
  format: PropTypes.object.isRequired,
};

export default NumberFormatCustom;
