import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { name, onChange, format, ...other } = props;

  return (
    <NumberFormat
      {...other}
      name={name}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(name, values);
      }}
      {...format}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  format: PropTypes.object.isRequired,
};

export default NumberFormatCustom;
