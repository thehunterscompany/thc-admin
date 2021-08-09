import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

function TextMaskCustom(props) {
  const { inputRef, code, type, values, singular, ...other } = props;

  const [mask, setMask] = useState(false);

  console.log(singular);

  useEffect(() => {
    if (code) {
      setMask(true);
    } else {
      setMask(false);
    }
  }, [code, type]);

  const creatingMaskSettings = () => {
    let setting;
    switch (type) {
      case 'phone':
        setting = {
          prefix: `+${code} `,
          includeThousandsSeparator: false,
          integerLimit: 15,
        };
        break;

      case 'currency':
        setting = {
          prefix: `${code} `,
          includeThousandsSeparator: false,
        };
        break;

      case 'percentage':
        setting = {
          prefix: '',
          suffix: `${code}`,
          integerLimit: 2,
          allowDecimal: true,
          decimalLimit: 2,
        };
        break;
      case 'year':
        setting = {
          prefix: '',
          suffix: ` ${singular !== code ? singular : code}`,
          integerLimit: 2,
        };
        break;
    }

    return setting;
  };

  const textMask = createNumberMask(creatingMaskSettings());
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask ? textMask : []}
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
  values: PropTypes.string,
  singular: PropTypes.string,
};

export default TextMaskCustom;
