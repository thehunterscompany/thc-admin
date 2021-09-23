import React from 'react';
import PropTypes from 'prop-types';

import useCurrencySymbol from '../../hooks/useCurrencySymbol';
import { CommercialForm, RealEstateForm, WalletForm } from '../OperacionForms';

const OperationalFields = ({ formField, values }) => {
  const currencySymbol = useCurrencySymbol(values.country);

  const formSelector = (simulationType) => {
    let component;
    const { value, currentDeal, time } = formField;

    if (simulationType === 1)
      component = (
        <RealEstateForm
          formField={{ value, currentDeal, time, ...formField.realEstate }}
          values={values}
          currencySymbol={currencySymbol}
        />
      );
    if (simulationType === 2)
      component = (
        <CommercialForm
          formField={{ value, currentDeal, time, ...formField.commercial }}
          values={values}
          currencySymbol={currencySymbol}
        />
      );

    if (simulationType === 3)
      component = (
        <WalletForm
          formField={{ value, currentDeal, time, ...formField.wallet }}
          values={values}
          currencySymbol={currencySymbol}
        />
      );

    return component;
  };

  return <React.Fragment>{formSelector(values.simulationType)}</React.Fragment>;
};

OperationalFields.propTypes = {
  formField: PropTypes.object,
  values: PropTypes.object,
};

export default OperationalFields;
