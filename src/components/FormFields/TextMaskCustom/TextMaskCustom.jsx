import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

function TextMaskCustom(props) {
  const { inputRef, code, type, ...other } = props;

  const [mask, setMask] = useState(false);

  useEffect(() => {
    if (code) {
      setMask(true);
    } else {
      setMask(false);
    }
  }, [code, type]);

  const numberMask = createNumberMask({
    prefix: type === 'phone' ? `+${code} ` : `${code} `,
    includeThousandsSeparator: false,
    integerLimit: type === 'phone' ? 15 : null,
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
      guide={true}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  code: PropTypes.string,
  type: PropTypes.string,
};

export default TextMaskCustom;
