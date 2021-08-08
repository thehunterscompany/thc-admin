import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

function TextMaskCustom(props) {
  const { inputRef, code, ...other } = props;

  const [mask, setMask] = useState(false);

  useEffect(() => {
    if (code) {
      setMask(true);
    } else {
      setMask(false);
    }
  }, [code]);

  const numberMask = createNumberMask({
    prefix: `+${code} `,
    includeThousandsSeparator: false,
    integerLimit: 15,
  });
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask ? numberMask : []}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  code: PropTypes.string,
};

export default TextMaskCustom;
