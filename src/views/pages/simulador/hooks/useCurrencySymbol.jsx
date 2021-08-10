import { useEffect, useState } from 'react';
import { formatValue } from 'react-currency-input-field';
import currencies from 'currency-codes';

const useCurrencySymbol = (countryObject) => {
  const [currencySymbol, setCurrencySymbol] = useState('');

  useEffect(() => {
    if (countryObject['currencyCode']) {
      let currencyCode = currencies.number(countryObject.currencyCode).code;
      const symbol = formatValue({
        value: '0',
        intlConfig: {
          locale: `en-${countryObject.code}`,
          currency: currencyCode,
        },
      });
      let r = /\D+/;
      setCurrencySymbol(r.exec(symbol)[0].trim());
    }
  }, [countryObject]);

  return currencySymbol;
};

export default useCurrencySymbol;
