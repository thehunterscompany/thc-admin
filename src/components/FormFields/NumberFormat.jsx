import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(
  { onChange, format, ...props },
  ref,
) {
  return (
    <NumberFormat
      {...props}
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
